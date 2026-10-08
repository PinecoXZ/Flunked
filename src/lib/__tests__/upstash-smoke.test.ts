import { describe, it, expect } from "vitest";
import { checkDistributedRateLimit, RATE_LIMIT_CONFIGS } from "../rateLimit";

describe("Upstash Redis live integration smoke test", () => {
  const isConfigured =
    Boolean(process.env.UPSTASH_REDIS_REST_URL) &&
    Boolean(process.env.UPSTASH_REDIS_REST_TOKEN) &&
    Boolean(process.env.RATE_LIMIT_SALT);

  it.runIf(isConfigured)("successfully contacts live Upstash Redis instance", async () => {
    const testIp = `198.51.100.${Math.floor(Math.random() * 200 + 1)}`;
    const result = await checkDistributedRateLimit(testIp, "/api/smoke-test", RATE_LIMIT_CONFIGS.suggest);
    expect(result).toHaveProperty("success");
    expect(result).toHaveProperty("remaining");
  });

  it.skipIf(isConfigured)("skips live Upstash smoke test when credentials are not configured", () => {
    expect(true).toBe(true);
  });
});
