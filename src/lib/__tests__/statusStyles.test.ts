import { describe, it, expect } from "vitest";
import { getStatusStyle, mapToSeverity } from "../statusStyles";

describe("statusStyles", () => {
  it("returns safe style set for safe severity", () => {
    const style = getStatusStyle("safe");
    expect(style.badge).toContain("green");
    expect(style.dot).toContain("green");
  });

  it("returns warning, danger, and critical style sets", () => {
    expect(getStatusStyle("warning").badge).toContain("yellow");
    expect(getStatusStyle("danger").badge).toContain("orange");
    expect(getStatusStyle("critical").badge).toContain("red");
  });

  it("falls back to safe for unknown severity", () => {
    // @ts-expect-error testing fallback
    const style = getStatusStyle("unknown");
    expect(style.badge).toContain("green");
  });

  it("maps custom domain tiers to canonical ToolSeverity", () => {
    expect(mapToSeverity("fine")).toBe("safe");
    expect(mapToSeverity("risky")).toBe("warning");
    expect(mapToSeverity("cooked")).toBe("danger");
    expect(mapToSeverity("gone")).toBe("critical");
    expect(mapToSeverity("chill")).toBe("safe");
    expect(mapToSeverity("manageable")).toBe("warning");
    expect(mapToSeverity("all_nighter")).toBe("danger");
    expect(mapToSeverity("impossible")).toBe("critical");
    expect(mapToSeverity("unknown")).toBe("safe");
  });
});
