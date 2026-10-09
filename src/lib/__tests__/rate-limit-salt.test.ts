import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { hashIp, checkDistributedRateLimit, RATE_LIMIT_CONFIGS } from "../rateLimit";

describe("hashIp and fail-open salt behavior", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns null, logs critical error, and stores zero IP when salt is missing", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const result = await hashIp("203.0.113.195", undefined);

    expect(result).toBeNull();
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "[CRITICAL] RATE_LIMIT_SALT is missing. Skipping rate limiting and failing open."
      )
    );
  });

  it("returns null when salt is empty string", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const result = await hashIp("203.0.113.195", "");

    expect(result).toBeNull();
    expect(errorSpy).toHaveBeenCalled();
  });

  it("produces deterministic 32-char hex HMAC when salt is provided", async () => {
    const salt = "test-secret-salt-12345678";
    const h1 = await hashIp("203.0.113.195", salt);
    const h2 = await hashIp("203.0.113.195", salt);
    const h3 = await hashIp("198.51.100.1", salt);

    expect(h1).toBeTruthy();
    expect(h1?.length).toBe(32);
    expect(/^[0-9a-f]{32}$/.test(h1!)).toBe(true);
    expect(h1).toBe(h2);
    expect(h1).not.toBe(h3);
    // Never contains raw or partial IP
    expect(h1).not.toContain("203.0.113.195");
    expect(h1).not.toContain("203");
  });

  it("checkDistributedRateLimit fails open without throwing when RATE_LIMIT_SALT is missing", async () => {
    vi.stubEnv("RATE_LIMIT_SALT", "");
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const result = await checkDistributedRateLimit(
      "203.0.113.195",
      "/api/suggest",
      RATE_LIMIT_CONFIGS.suggest
    );

    expect(result.success).toBe(true);
    expect(result.remaining).toBe(1);
    expect(errorSpy).toHaveBeenCalled();
  });
});
