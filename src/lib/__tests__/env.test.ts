import { describe, it, expect } from "vitest";
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
