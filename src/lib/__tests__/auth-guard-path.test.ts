import { describe, it, expect } from "vitest";
import { buildRedirectPath, safeRedirect } from "../redirect";

describe("buildRedirectPath utility", () => {
  it("returns pathname when search params string is empty or undefined", () => {
    expect(buildRedirectPath("/tools/bunk-calculator")).toBe("/tools/bunk-calculator");
    expect(buildRedirectPath("/tools/bunk-calculator", "")).toBe("/tools/bunk-calculator");
    expect(buildRedirectPath("/tools/bunk-calculator", "   ")).toBe("/tools/bunk-calculator");
  });

  it("attaches query parameters when present", () => {
    expect(buildRedirectPath("/tools/bunk-calculator", "held=20&attended=15")).toBe(
      "/tools/bunk-calculator?held=20&attended=15"
    );
    expect(buildRedirectPath("/tools/cgpa-calculator", "campus=VIT")).toBe(
      "/tools/cgpa-calculator?campus=VIT"
    );
  });

  it("handles search params that already have a leading question mark", () => {
    expect(buildRedirectPath("/tools/bunk-calculator", "?held=20")).toBe(
      "/tools/bunk-calculator?held=20"
    );
  });

  it("defaults to / if pathname is empty or undefined", () => {
    expect(buildRedirectPath("", "tab=summary")).toBe("/?tab=summary");
    // @ts-expect-error testing undefined edge case
    expect(buildRedirectPath(undefined)).toBe("/");
  });

  it("works with safeRedirect to ensure deep-link targets remain internal", () => {
    const deepLink = buildRedirectPath("/tools/bunk-calculator", "held=30&target=75");
    expect(safeRedirect(deepLink)).toBe("/tools/bunk-calculator?held=30&target=75");
  });
});
