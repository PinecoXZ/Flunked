/**
 * Server-only structured logger for Flunked.fun.
 *
 * Rules:
 * 1. Log real errors, authentication attempts, rate limits, and unusual traffic on server side.
 * 2. NEVER log or expose raw passwords, student credentials, API secrets, or PII.
 * 3. In production, sanitize messages returned to clients with generic safe messages and anonymous request correlation IDs.
 */

export interface LogContext {
  ip?: string;
  campus?: string;
  path?: string;
  method?: string;
  requestId?: string;
  userId?: string;
  [key: string]: unknown;
}

/**
 * Anonymizes an IP address (e.g. 192.168.1.55 -> 192.168.1.0, 2001:db8:... -> 2001:db8::)
 */
function anonymizeIp(ip?: string): string {
  if (!ip) return "anonymous";
  if (ip.includes(".")) {
    const parts = ip.split(".");
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.${parts[2]}.0`;
    }
  }
  if (ip.includes(":")) {
    const parts = ip.split(":");
    return parts.slice(0, 3).join(":") + "::";
  }
  return "masked";
}

/**
 * Generate a short anonymous request ID for error correlation
 */
function generateRequestId(): string {
  return `req_${Math.random().toString(36).substring(2, 9)}_${Date.now().toString(36)}`;
}

export const serverLogger = {
  info(message: string, context?: LogContext) {
    if (typeof window !== "undefined") return; // Server only
    const timestamp = new Date().toISOString();
    const safeIp = anonymizeIp(context?.ip);
    // eslint-disable-next-line no-console
    console.log(
      `[INFO] [${timestamp}] ${message} | IP: ${safeIp} ${
        context?.path ? `| Path: ${context.path}` : ""
      }`
    );
  },

  warn(message: string, context?: LogContext) {
    if (typeof window !== "undefined") return; // Server only
    const timestamp = new Date().toISOString();
    const safeIp = anonymizeIp(context?.ip);
    console.warn(
      `[WARN] [${timestamp}] ${message} | IP: ${safeIp} ${
        context?.path ? `| Path: ${context.path}` : ""
      }`
    );
  },

  error(message: string, error?: unknown, context?: LogContext) {
    if (typeof window !== "undefined") return; // Server only
    const timestamp = new Date().toISOString();
    const safeIp = anonymizeIp(context?.ip);
    const reqId = context?.requestId || generateRequestId();

    console.error(
      `[ERROR] [${timestamp}] [${reqId}] ${message} | IP: ${safeIp} ${
        context?.path ? `| Path: ${context.path}` : ""
      }`,
      error instanceof Error ? error.stack || error.message : error
    );

    return reqId;
  },
};
