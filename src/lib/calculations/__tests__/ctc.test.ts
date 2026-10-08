import { describe, it, expect } from "vitest";
import { calculateCtcInHand } from "../ctc";

describe("calculateCtcInHand", () => {
  it("returns zero take-home for zero CTC", () => {
    const r = calculateCtcInHand(0);
    expect(r.monthlyTakeHome).toBe(0);
    expect(r.deductionPercentage).toBe(0);
  });

  it("applies 87A rebate for low taxable income", () => {
    const r = calculateCtcInHand(500000); // 5 LPA
    expect(r.section87aRebate).toBeGreaterThan(0);
    expect(r.totalTaxAnnual).toBe(0);
  });

  it("calculates correct deduction percentage for high CTC", () => {
    const r = calculateCtcInHand(2000000); // 20 LPA
    expect(r.deductionPercentage).toBeGreaterThanOrEqual(25);
    expect(r.deductionPercentage).toBeLessThan(50);
  });

  it("adjusts HRA for non-metro cities", () => {
    const metro = calculateCtcInHand(1200000, 0, 0, true);
    const nonMetro = calculateCtcInHand(1200000, 0, 0, false);
    expect(metro.hra).toBeGreaterThanOrEqual(nonMetro.hra);
  });

  it("subtracts bonus from monthly take-home calculation", () => {
    const withBonus = calculateCtcInHand(1200000, 200000);
    expect(withBonus.monthlyTakeHomeWithoutBonus).toBeLessThan(withBonus.monthlyTakeHome);
  });

  it("handles extreme 100 LPA CTC without overflow or NaN", () => {
    const r = calculateCtcInHand(10000000); // 100 LPA
    expect(Number.isFinite(r.monthlyTakeHome)).toBe(true);
    expect(r.monthlyTakeHome).toBeGreaterThan(400000);
    expect(r.deductionPercentage).toBeGreaterThan(30);
  });

  it("handles negative CTC input gracefully via Math.max clamping", () => {
    const r = calculateCtcInHand(-500000);
    expect(r.monthlyTakeHome).toBe(0);
    expect(r.deductionPercentage).toBe(0);
  });
});
