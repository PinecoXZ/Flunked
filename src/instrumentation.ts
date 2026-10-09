export async function register() {
  if (process.env.VERCEL_ENV === "production") {
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      console.error(
        "[CRITICAL] UPSTASH_REDIS credentials missing in production! Rate limiting will fail open."
      );
    }
    if (!process.env.RATE_LIMIT_SALT) {
      console.error(
        "[CRITICAL] RATE_LIMIT_SALT missing in production! IP HMAC cannot be computed securely."
      );
    }
  }
}
