import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { checkDistributedRateLimit, RATE_LIMIT_CONFIGS } from "../rateLimit";

describe("checkDistributedRateLimit multi-instance atomic behavior", () => {
  beforeEach(() => {
    vi.stubEnv("RATE_LIMIT_SALT", "super-secret-salt-32-chars-long!");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("handles Upstash Redis communication and blocks after max requests", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://fake-redis.upstash.io");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "fake-token");

    let counter = 0;
    // Mock global fetch simulating Upstash EVAL response with atomic INCR
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockImplementation(async () => {
      counter++;
      return new Response(JSON.stringify({ result: counter }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });

    const ip = "192.0.2.10";
    const path = "/api/suggest";
    const config = { windowMs: 60000, maxRequests: 2 };

    const r1 = await checkDistributedRateLimit(ip, path, config);
    expect(r1.success).toBe(true);
    expect(r1.remaining).toBe(1);

    const r2 = await checkDistributedRateLimit(ip, path, config);
    expect(r2.success).toBe(true);
    expect(r2.remaining).toBe(0);

    const r3 = await checkDistributedRateLimit(ip, path, config);
    expect(r3.success).toBe(false);
    expect(r3.remaining).toBe(0);

    fetchSpy.mockRestore();
  });

  it("fails open gracefully when Upstash fetch throws a network error", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://fake-redis.upstash.io");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "fake-token");

    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockRejectedValue(new Error("Network timeout to Redis"));
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const result = await checkDistributedRateLimit(
      "192.0.2.10",
      "/api/suggest",
      RATE_LIMIT_CONFIGS.suggest
    );

    expect(result.success).toBe(true);
    expect(result.remaining).toBe(RATE_LIMIT_CONFIGS.suggest.maxRequests);
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining("[ALERT] Upstash Redis rate limiter unreachable"),
      expect.any(Error)
    );

    fetchSpy.mockRestore();
  });

  it("fails open gracefully when Upstash returns non-200 HTTP status", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://fake-redis.upstash.io");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "fake-token");

    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response("Internal Server Error", { status: 500 }));
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const result = await checkDistributedRateLimit(
      "192.0.2.10",
      "/api/suggest",
      RATE_LIMIT_CONFIGS.suggest
    );

    expect(result.success).toBe(true);
    expect(errorSpy).toHaveBeenCalled();

    fetchSpy.mockRestore();
  });
});
