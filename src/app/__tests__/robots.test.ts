import { describe, it, expect } from "vitest";
import robots from "../robots";

describe("robots.ts search engine crawling configuration", () => {
  it("allows static assets by omitting /_next/ from disallow list", () => {
    const config = robots();
    const rules = Array.isArray(config.rules) ? config.rules : [config.rules];

    const defaultRule = rules.find((r) => r.userAgent === "*");
    expect(defaultRule).toBeDefined();

    const disallows = Array.isArray(defaultRule?.disallow)
      ? defaultRule?.disallow
      : [defaultRule?.disallow];

    expect(disallows).toContain("/api/");
    expect(disallows).not.toContain("/_next/");
  });

  it("configures canonical sitemap and host", () => {
    const config = robots();
    expect(config.sitemap).toMatch(/\/sitemap\.xml$/);
    expect(config.host).toBeDefined();
  });
});
