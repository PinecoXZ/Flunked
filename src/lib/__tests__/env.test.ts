import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { env } from "../env";

describe("env", () => {
  it("provides valid base URL without trailing slash", () => {
    expect(env.NEXT_PUBLIC_BASE_URL).toMatch(/^https?:\/\//);
    expect(env.NEXT_PUBLIC_BASE_URL.endsWith("/")).toBe(false);
  });

  it("provides valid NODE_ENV", () => {
    expect(["development", "production", "test"]).toContain(env.NODE_ENV);
  });
});

describe("env.ts production base URL guard", () => {
  beforeEach(() => {
    vi.resetModules();
  });
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("throws in production if NEXT_PUBLIC_BASE_URL is missing", async () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_BASE_URL", "");
    await expect(import("@/lib/env")).rejects.toThrow(
      "NEXT_PUBLIC_BASE_URL must be defined in production."
    );
  });

  it("does not throw in development if NEXT_PUBLIC_BASE_URL is missing", async () => {
    vi.stubEnv("VERCEL_ENV", "development");
    vi.stubEnv("NEXT_PUBLIC_BASE_URL", "");
    await expect(import("@/lib/env")).resolves.toBeDefined();
  });
});
