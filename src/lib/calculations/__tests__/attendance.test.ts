import { describe, it, expect } from "vitest";
import { calculateBunk, attendOrSkipDecider } from "../attendance";

describe("calculateBunk", () => {
  it("allows bunking when above target", () => {
    const r = calculateBunk(100, 85, 75);
    expect(r.canBunk).toBe(true);
    expect(r.classesCount).toBe(13);
    expect(r.status).toBe("safe");
  });

  it("returns classes needed when below target", () => {
    const r = calculateBunk(100, 70, 75);
    expect(r.canBunk).toBe(false);
    expect(r.classesCount).toBeGreaterThan(0);
    expect(r.status).toBe("danger");
  });

  it("marks critical below 70%", () => {
    const r = calculateBunk(100, 60, 75);
    expect(r.status).toBe("critical");
  });

  it("handles zero classes held gracefully", () => {
    const r = calculateBunk(0, 0, 75);
    expect(r.currentPercentage).toBe(100);
    expect(r.canBunk).toBe(true);
    expect(r.status).toBe("safe");
  });

  it("clamps attended to not exceed held", () => {
    const r = calculateBunk(50, 100, 75); // attended > held
    expect(r.currentPercentage).toBe(100);
  });

  it("handles default target (75)", () => {
    const r = calculateBunk(100, 80);
    expect(r.targetPercentage).toBe(75);
  });

  it("handles target 100% with 0 classes held gracefully", () => {
    const r = calculateBunk(0, 0, 100);
    expect(r.currentPercentage).toBe(100);
    expect(r.canBunk).toBe(true);
    expect(r.classesCount).toBe(0);
    expect(r.status).toBe("safe");
  });

  it("handles target 100% when attendance is below 100% as impossible/unreachable state (never 999)", () => {
    const r = calculateBunk(10, 8, 100);
    expect(r.isReachable).toBe(false);
    expect(r.canBunk).toBe(false);
    expect(r.classesCount).toBe(0);
    expect(r.headline).toBe("100% attendance is not reachable.");
    expect(r.verdict).toContain("mathematically impossible to reach 100%");
    expect(r.status).toBe("critical");
  });

  it("handles negative inputs gracefully via Math.max safety clamping", () => {
    const r = calculateBunk(-10, -5, 75);
    expect(r.currentPercentage).toBe(100);
    expect(r.canBunk).toBe(true);
    expect(r.classesCount).toBe(0);
  });

  it("handles extreme numbers (100,000 classes) without overflow or NaN", () => {
    const r = calculateBunk(100000, 70000, 75);
    expect(Number.isFinite(r.classesCount)).toBe(true);
    expect(r.classesCount).toBe(20000);
    expect(r.canBunk).toBe(false);
  });
});

describe("attendOrSkipDecider", () => {
  it("forces attend for biometric + low attendance", () => {
    const r = attendOrSkipDecider(70, false, "biometric", true, "alive");
    expect(r.decision).toBe("attend");
    expect(r.riskScore).toBeGreaterThanOrEqual(90);
  });

  it("allows skip for high attendance + zombie tiredness", () => {
    const r = attendOrSkipDecider(90, false, "chill", false, "zombie");
    expect(r.decision).toBe("skip");
  });

  it("suggests proxy for chill teacher + low attendance", () => {
    const r = attendOrSkipDecider(70, true, "chill", false, "alive");
    expect(r.decision).toBe("proxy");
  });

  it("returns warning when zero skips left", () => {
    const r = calculateBunk(100, 75, 75);
    expect(r.canBunk).toBe(true);
    expect(r.classesCount).toBe(0);
    expect(r.status).toBe("warning");
  });

  it("handles 75-80% proxy vs strict branch", () => {
    const rProxy = attendOrSkipDecider(76, true, "chill", false, "alive");
    expect(rProxy.decision).toBe("proxy");

    const rStrict = attendOrSkipDecider(76, false, "strict", false, "alive");
    expect(rStrict.decision).toBe("attend");
  });

  it("handles high attendance important lecture", () => {
    const r = attendOrSkipDecider(85, false, "chill", true, "alive");
    expect(r.decision).toBe("attend");
    expect(r.riskScore).toBe(20);
  });

  it("handles high attendance normal lecture", () => {
    const r = attendOrSkipDecider(85, false, "chill", false, "alive");
    expect(r.decision).toBe("skip");
  });

  it("handles low attendance without proxy", () => {
    const r = attendOrSkipDecider(65, false, "chill", false, "alive");
    expect(r.decision).toBe("attend");
    expect(r.actionText).toBeDefined();
    expect(r.riskScore).toBe(90);
  });
});
