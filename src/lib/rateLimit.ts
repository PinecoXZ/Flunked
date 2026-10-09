/**
 * Distributed and in-memory sliding window rate limiter.
 * Prevents DDoS, brute-force attempts, scraping, and endpoint abuse.
 * Uses atomic Lua script on Upstash Redis REST with Web Crypto HMAC IP anonymization.
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

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetMs: number;
  retryAfterSeconds?: number;
}

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

/**
 * HMAC-SHA256 IP anonymization using standard Web Crypto API.
 * Never throws, never logs raw IP, returns null when salt is missing.
 */
export async function hashIp(ip: string, salt: string | undefined): Promise<string | null> {
  if (!salt) {
    console.error(
      "[CRITICAL] RATE_LIMIT_SALT is missing. Skipping rate limiting and failing open."
    );
    return null; // NEVER store raw or partial IP!
  }
  try {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(salt),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signature = await crypto.subtle.sign("HMAC", key, enc.encode(ip));
    return Array.from(new Uint8Array(signature))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .slice(0, 32);
  } catch (err) {
    console.error("[CRITICAL] Failed to compute HMAC for IP:", err);
    return null;
  }
}

/**
 * Check and record a request against an in-memory rate limit window.
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
 * Distributed rate limiter with Upstash Redis and in-memory fallback.
 * Uses atomic Lua script on Upstash Redis REST endpoint.
 * Fails open if Redis is down or salt is missing, logging an alert without throwing.
 */
export async function checkDistributedRateLimit(
  ip: string,
  path: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const salt = process.env.RATE_LIMIT_SALT;
  const hashedIp = await hashIp(ip, salt);

  // If salt is missing or hashing failed, fail open immediately (never store raw IP)
  if (!hashedIp) {
    return {
      success: true,
      limit: config.maxRequests,
      remaining: 1,
      resetMs: 0,
    };
  }

  const rateKey = `rl:${hashedIp}:${path}`;
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  // Use Upstash Redis when configured
  if (upstashUrl && upstashToken) {
    try {
      const windowSeconds = Math.ceil(config.windowMs / 1000);
      const luaScript = `
        local current = redis.call('INCR', KEYS[1])
        if tonumber(current) == 1 then
          redis.call('EXPIRE', KEYS[1], ARGV[1])
        end
        return current
      `.trim();

      const response = await fetch(`${upstashUrl.replace(/\/$/, "")}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${upstashToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(["EVAL", luaScript, "1", rateKey, String(windowSeconds)]),
      });

      if (!response.ok) {
        console.error(
          `[ALERT] Upstash Redis returned non-200 status: ${response.status}. Failing open.`
        );
        return {
          success: true,
          limit: config.maxRequests,
          remaining: config.maxRequests,
          resetMs: 0,
        };
      }

      const data = await response.json();
      const currentCount =
        typeof data.result === "number" ? data.result : parseInt(data.result, 10) || 1;

      if (currentCount > config.maxRequests) {
        return {
          success: false,
          limit: config.maxRequests,
          remaining: 0,
          resetMs: config.windowMs,
          retryAfterSeconds: windowSeconds,
        };
      }

      return {
        success: true,
        limit: config.maxRequests,
        remaining: Math.max(0, config.maxRequests - currentCount),
        resetMs: config.windowMs,
      };
    } catch (error) {
      console.error("[ALERT] Upstash Redis rate limiter unreachable, failing open:", error);
      return {
        success: true,
        limit: config.maxRequests,
        remaining: config.maxRequests,
        resetMs: 0,
      };
    }
  }

  // Fallback to local in-memory store for development/testing
  return checkRateLimit(rateKey, config);
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
        record.timestamps[record.timestamps.length - 1] < now - 600000
      ) {
        rateLimitStore.delete(key);
      }
    }
  }, 60000);

  if (typeof cleanupTimer === "object" && "unref" in cleanupTimer) {
    cleanupTimer.unref();
  }
}
