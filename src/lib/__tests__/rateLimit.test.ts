import { describe, it, expect } from "vitest";
import { checkRateLimit } from "../rateLimit";

describe("checkRateLimit", () => {
  const config = { windowMs: 10000, maxRequests: 3 };

  it("allows requests under the limit", () => {
    const key = `test-${Date.now()}`;
    expect(checkRateLimit(key, config).success).toBe(true);
    expect(checkRateLimit(key, config).success).toBe(true);
    expect(checkRateLimit(key, config).success).toBe(true);
  });

  it("blocks requests over the limit", () => {
    const key = `test-block-${Date.now()}`;
    checkRateLimit(key, config);
    checkRateLimit(key, config);
    checkRateLimit(key, config);
    const r = checkRateLimit(key, config);
    expect(r.success).toBe(false);
    expect(r.remaining).toBe(0);
  });

  it("blocks with blockDurationMs when specified", () => {
    const blockConfig = { windowMs: 10000, maxRequests: 2, blockDurationMs: 5000 };
    const key = `test-blocked-${Date.now()}`;
    checkRateLimit(key, blockConfig);
    checkRateLimit(key, blockConfig);
    const rBlocked = checkRateLimit(key, blockConfig);
    expect(rBlocked.success).toBe(false);
    expect(rBlocked.retryAfterSeconds).toBeGreaterThan(0);

    // Call again while blocked
    const rStillBlocked = checkRateLimit(key, blockConfig);
    expect(rStillBlocked.success).toBe(false);
    expect(rStillBlocked.retryAfterSeconds).toBeDefined();
  });

  it("reports remaining correctly", () => {
    const key = `test-remaining-${Date.now()}`;
    const r1 = checkRateLimit(key, config);
    expect(r1.remaining).toBe(2);
    checkRateLimit(key, config);
    const r3 = checkRateLimit(key, config);
    expect(r3.remaining).toBe(0);
  });
});

describe("getClientIp re-export", () => {
  it("re-exports getClientIp with { ip, isUnknown } shape", async () => {
    const { getClientIp } = await import("../rateLimit");
    const headers = new Headers();
    const result = getClientIp(headers);
    expect(result).toHaveProperty("ip");
    expect(result).toHaveProperty("isUnknown");
  });
});
