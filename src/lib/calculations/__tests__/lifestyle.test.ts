import { describe, it, expect } from "vitest";
import { calculateAmICooked, solveExpenseSplit, calculateAssignmentPanic } from "../lifestyle";

describe("calculateAmICooked", () => {
  it("returns 'fine' for good metrics", () => {
    const r = calculateAmICooked(90, 85, 10, 0);
    expect(r.tier).toBe("fine");
    expect(r.cookedPercentage).toBeLessThan(30);
  });

  it("returns 'gone' for terrible metrics", () => {
    const r = calculateAmICooked(40, 20, 1, 15);
    expect(r.tier).toBe("gone");
    expect(r.cookedPercentage).toBeGreaterThanOrEqual(85);
  });

  it("amplifies score for low runway (≤2 weeks)", () => {
    const longRunway = calculateAmICooked(70, 50, 12, 5);
    const shortRunway = calculateAmICooked(70, 50, 1, 5);
    expect(shortRunway.cookedPercentage).toBeGreaterThan(longRunway.cookedPercentage);
  });
});

describe("solveExpenseSplit", () => {
  it("returns zero settlements when one person pays all equally", () => {
    const r = solveExpenseSplit(
      ["A", "B"],
      [{ description: "Food", amount: 200, paidBy: "A", splitAmong: ["A", "B"] }]
    );
    expect(r.settlements.length).toBe(1);
    expect(r.settlements[0].from).toBe("B");
    expect(r.settlements[0].to).toBe("A");
    expect(r.settlements[0].amount).toBe(100);
  });

  it("handles no expenses", () => {
    const r = solveExpenseSplit(["A", "B"], []);
    expect(r.totalSpent).toBe(0);
    expect(r.settlements.length).toBe(0);
  });

  it("handles 1 participant with 0 total expenses", () => {
    const r = solveExpenseSplit(["Solo Student"], []);
    expect(r.totalSpent).toBe(0);
    expect(r.settlements).toEqual([]);
    expect(r.perPersonSpent["Solo Student"]).toBe(0);
  });

  it("generates WhatsApp summary", () => {
    const r = solveExpenseSplit(
      ["A", "B"],
      [{ description: "X", amount: 100, paidBy: "A", splitAmong: ["A", "B"] }]
    );
    expect(r.whatsAppSummary).toContain("Flunked.online");
  });
});

describe("calculateAssignmentPanic", () => {
  it("returns 'chill' for easy workload", () => {
    const r = calculateAssignmentPanic(5, 10, "typed", "chai", false);
    expect(r.status).toBe("chill");
  });

  it("returns 'impossible' for extreme workload", () => {
    const r = calculateAssignmentPanic(50, 2, "handwritten", "none", false);
    expect(r.status).toBe("impossible");
    expect(r.beggingCrProbability).toBeGreaterThanOrEqual(90);
  });
});
