import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { getClientIp } from "../ip";

describe("getClientIp", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("extracts and trusts x-vercel-forwarded-for exclusively on Vercel/production", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    const headers = new Headers();
    headers.set("x-vercel-forwarded-for", "203.0.113.195, 70.41.3.18");
    const res = getClientIp(headers);
    expect(res).toEqual({ ip: "203.0.113.195", isUnknown: false });
  });

  it("rejects untrusted spoofed x-forwarded-for and x-real-ip headers in production", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    const headers = new Headers();
    headers.set("x-forwarded-for", "1.2.3.4");
    headers.set("x-real-ip", "5.6.7.8");
    const res = getClientIp(headers);
    expect(res).toEqual({ ip: "unknown_client_pool", isUnknown: true });
  });

  it("assigns requests with zero IP headers in production to the unknown_client_pool", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    const headers = new Headers();
    const res = getClientIp(headers);
    expect(res).toEqual({ ip: "unknown_client_pool", isUnknown: true });
  });

  it("returns localhost in local development environment", () => {
    vi.stubEnv("NODE_ENV", "development");
    // Ensure VERCEL_ENV is unset
    delete process.env.VERCEL_ENV;
    const headers = new Headers();
    const res = getClientIp(headers);
    expect(res).toEqual({ ip: "127.0.0.1", isUnknown: false });
  });

  it("returns localhost when ALLOW_LOCAL_PRODUCTION_IPS=true and VERCEL_ENV is unset", () => {
    vi.stubEnv("ALLOW_LOCAL_PRODUCTION_IPS", "true");
    delete process.env.VERCEL_ENV;
    const headers = new Headers();
    const res = getClientIp(headers);
    expect(res).toEqual({ ip: "127.0.0.1", isUnknown: false });
  });

  it("ignores ALLOW_LOCAL_PRODUCTION_IPS when VERCEL_ENV=production", () => {
    vi.stubEnv("ALLOW_LOCAL_PRODUCTION_IPS", "true");
    vi.stubEnv("VERCEL_ENV", "production");
    const headers = new Headers();
    const res = getClientIp(headers);
    expect(res).toEqual({ ip: "unknown_client_pool", isUnknown: true });
  });

  it("accepts a Request object as well as Headers", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    const req = new Request("https://flunked.online/api/suggest", {
      headers: { "x-vercel-forwarded-for": "198.51.100.22" },
    });
    const res = getClientIp(req);
    expect(res).toEqual({ ip: "198.51.100.22", isUnknown: false });
  });

  it("exhausts strict unknown quota after 1 request for 20 headerless requests", async () => {
    vi.stubEnv("VERCEL_ENV", "production");
    const headers = new Headers();
    const { ip, isUnknown } = getClientIp(headers);
    expect(isUnknown).toBe(true);
    expect(ip).toBe("unknown_client_pool");

    const { checkRateLimit, RATE_LIMIT_CONFIGS } = await import("../rateLimit");
    const results: boolean[] = [];
    const testKey = `unknown_pool_exhaust_${Date.now()}`;
    for (let i = 0; i < 20; i++) {
      const check = checkRateLimit(testKey, RATE_LIMIT_CONFIGS.unknownPool);
      results.push(check.success);
    }

    // First request passes, subsequent 19 hit rate limit
    expect(results[0]).toBe(true);
    expect(results.slice(1).every((s) => s === false)).toBe(true);
  });
});
