/**
 * In-memory sliding window rate limiter with automatic stale window cleanup.
 * Prevents DDoS, brute-force login attempts, scraping, and endpoint abuse.
 */

interface RateLimitRecord {
  timestamps: number[];
  blockedUntil?: number;
}

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  blockDurationMs?: number;
}

/**
 * ⚠️ SERVERLESS LIMITATION:
 * This in-memory rate limiter works correctly in `next dev` and long-running
 * Node.js servers, but does NOT share state across Vercel serverless function
 * invocations. Each cold start gets a fresh Map.
 *
 * For production at scale, replace `rateLimitStore` with:
 * - Upstash Redis (@upstash/ratelimit) — recommended for Vercel
 * - Vercel KV
 * - Redis via ioredis
 *
 * The checkRateLimit() interface remains the same regardless of backend.
 */
const rateLimitStore = new Map<string, RateLimitRecord>();

// Preset configurations for different risk tiers
export const RATE_LIMIT_CONFIGS = {
  // Login & authentication attempts: 10 per minute, block for 5 minutes if exceeded
  auth: {
    windowMs: 60 * 1000,
    maxRequests: 10,
    blockDurationMs: 5 * 60 * 1000,
  },
  // Feedback & tool suggestions: 5 per 10 minutes
  suggest: {
    windowMs: 10 * 60 * 1000,
    maxRequests: 5,
    blockDurationMs: 15 * 60 * 1000,
  },
  // AI generation & computation-heavy requests: 10 per minute
  ai: {
    windowMs: 60 * 1000,
    maxRequests: 10,
    blockDurationMs: 5 * 60 * 1000,
  },
  // General API endpoints: 60 per minute
  api: {
    windowMs: 60 * 1000,
    maxRequests: 60,
  },
  // Strict pool for unverified/headerless client IPs in production (1 req / 10 min)
  unknownPool: {
    windowMs: 10 * 60 * 1000,
    maxRequests: 1,
    blockDurationMs: 15 * 60 * 1000,
  },
} as const;

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetMs: number;
  retryAfterSeconds?: number;
}

/**
 * Check and record a request against a rate limit window.
 */
export function checkRateLimit(identifier: string, config: RateLimitConfig): RateLimitResult {
  const now = Date.now();
  const record = rateLimitStore.get(identifier) || { timestamps: [] };

  // Check if currently blocked
  if (record.blockedUntil && record.blockedUntil > now) {
    const retryAfterSeconds = Math.ceil((record.blockedUntil - now) / 1000);
    return {
      success: false,
      limit: config.maxRequests,
      remaining: 0,
      resetMs: record.blockedUntil - now,
      retryAfterSeconds,
    };
  }

  // Filter out timestamps outside the sliding window
  const windowStart = now - config.windowMs;
  record.timestamps = record.timestamps.filter((ts) => ts > windowStart);

  // Check if over limit
  if (record.timestamps.length >= config.maxRequests) {
    if (config.blockDurationMs) {
      record.blockedUntil = now + config.blockDurationMs;
    }
    rateLimitStore.set(identifier, record);

    const oldest = record.timestamps[0] || now;
    const resetMs = config.blockDurationMs || oldest + config.windowMs - now;
    const retryAfterSeconds = Math.ceil(resetMs / 1000);

    return {
      success: false,
      limit: config.maxRequests,
      remaining: 0,
      resetMs,
      retryAfterSeconds,
    };
  }

  // Record this request
  record.timestamps.push(now);
  rateLimitStore.set(identifier, record);

  const remaining = Math.max(0, config.maxRequests - record.timestamps.length);
  const oldest = record.timestamps[0];
  const resetMs = Math.max(0, oldest + config.windowMs - now);

  return {
    success: true,
    limit: config.maxRequests,
    remaining,
    resetMs,
  };
}

/**
 * Re-export getClientIp from canonical ip.ts helper.
 */
export { getClientIp } from "./ip";

// Periodically clean up stale records every 60 seconds
if (typeof setInterval !== "undefined") {
  const cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
      if (record.blockedUntil && record.blockedUntil > now) {
        continue;
      }
      if (
        record.timestamps.length === 0 ||
        record.timestamps[record.timestamps.length - 1] < now - 15 * 60 * 1000
      ) {
        rateLimitStore.delete(key);
      }
    }
  }, 60 * 1000);

  // Don't keep Node process alive just for the cleanup timer
  if (cleanupTimer.unref) {
    cleanupTimer.unref();
  }
}
