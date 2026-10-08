/**
 * Server-only structured logger for Flunked.online.
 *
 * Rules:
 * 1. Log real errors, authentication attempts, rate limits, and unusual traffic on server side.
 * 2. NEVER log or expose raw passwords, student credentials, API secrets, or raw PII.
 * 3. In production, sanitize messages returned to clients with generic safe messages and anonymous request correlation IDs.
 * 4. Logs persist only in Vercel's runtime logs.
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
 * Strips control characters and CRLF ([\x00-\x1F\x7F]) and caps each value at 500 characters.
 */
export function sanitizeLogValue(val: unknown): string {
  if (val === null || val === undefined) return "";
  const str = typeof val === "string" ? val : String(val);
  return str.replace(/[\x00-\x1F\x7F]/g, " ").slice(0, 500);
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

function formatExtraContext(context?: LogContext): string {
  if (!context) return "";
  const extras: string[] = [];
  for (const [key, value] of Object.entries(context)) {
    if (key === "ip" || key === "path" || key === "requestId") continue;
    extras.push(`${sanitizeLogValue(key)}: ${sanitizeLogValue(value)}`);
  }
  return extras.length > 0 ? ` | ${extras.join(" | ")}` : "";
}

export const serverLogger = {
  info(message: string, context?: LogContext) {
    if (typeof window !== "undefined") return; // Server only
    const timestamp = new Date().toISOString();
    const cleanMessage = sanitizeLogValue(message);
    const safeIp = anonymizeIp(context?.ip);
    const safePath = context?.path ? `| Path: ${sanitizeLogValue(context.path)}` : "";
    const extras = formatExtraContext(context);

    // eslint-disable-next-line no-console
    console.log(
      `[INFO] [${timestamp}] ${cleanMessage} | IP: ${safeIp} ${safePath}${extras}`.trimEnd()
    );
  },

  warn(message: string, context?: LogContext) {
    if (typeof window !== "undefined") return; // Server only
    const timestamp = new Date().toISOString();
    const cleanMessage = sanitizeLogValue(message);
    const safeIp = anonymizeIp(context?.ip);
    const safePath = context?.path ? `| Path: ${sanitizeLogValue(context.path)}` : "";
    const extras = formatExtraContext(context);

    console.warn(
      `[WARN] [${timestamp}] ${cleanMessage} | IP: ${safeIp} ${safePath}${extras}`.trimEnd()
    );
  },

  error(message: string, error?: unknown, context?: LogContext) {
    if (typeof window !== "undefined") return; // Server only
    const timestamp = new Date().toISOString();
    const cleanMessage = sanitizeLogValue(message);
    const safeIp = anonymizeIp(context?.ip);
    const reqId = context?.requestId || generateRequestId();
    const safePath = context?.path ? `| Path: ${sanitizeLogValue(context.path)}` : "";
    const extras = formatExtraContext(context);

    console.error(
      `[ERROR] [${timestamp}] [${reqId}] ${cleanMessage} | IP: ${safeIp} ${safePath}${extras}`.trimEnd(),
      error instanceof Error ? error.stack || error.message : error
    );

    return reqId;
  },
};
