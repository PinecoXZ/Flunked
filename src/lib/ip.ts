/**
 * Hardened client IP extraction for abuse defense.
 * On Vercel, trust only platform-verified `x-vercel-forwarded-for`.
 * All unverified or header-less requests in production share a single strict pool bucket.
 */
export function getClientIp(input: Request | Headers): { ip: string; isUnknown: boolean } {
  // In local development or local production override (strictly ignored on Vercel)
  const isLocalDev = process.env.NODE_ENV === "development" && !process.env.VERCEL_ENV;
  const isLocalProdOverride =
    process.env.ALLOW_LOCAL_PRODUCTION_IPS === "true" && !process.env.VERCEL_ENV;
  if (isLocalDev || isLocalProdOverride) {
    return { ip: "127.0.0.1", isUnknown: false };
  }

  const headers = "headers" in input ? input.headers : input;

  // On Vercel, trust x-vercel-forwarded-for exclusively
  const vercelIp = headers.get("x-vercel-forwarded-for");
  if (vercelIp) {
    const clean = vercelIp.split(",")[0].trim();
    if (clean) return { ip: clean, isUnknown: false };
  }

  // All unverified/headerless requests in production share a single strict pool bucket
  return { ip: "unknown_client_pool", isUnknown: true };
}
