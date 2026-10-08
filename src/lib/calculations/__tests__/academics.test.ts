import { describe, it, expect } from "vitest";
import {
  calculateCgpa,
  calculateSemesterSurvival,
  calculateGradeToPass,
  calculateBacklogRecovery,
} from "../academics";

describe("calculateCgpa", () => {
  it("computes correct CGPA with standard formula", () => {
    const subjects = [
      { name: "Math", gradePoint: 9, credits: 4 },
      { name: "Physics", gradePoint: 8, credits: 3 },
    ];
    const r = calculateCgpa(subjects, "standard");
    expect(r.cgpa).toBeCloseTo(8.57, 1);
    expect(r.percentage).toBeCloseTo(85.7, 0);
    expect(r.status).toBe("safe");
  });

  it("handles AICTE formula correctly", () => {
    const subjects = [{ name: "A", gradePoint: 8, credits: 4 }];
    const r = calculateCgpa(subjects, "aicte");
    expect(r.percentage).toBeCloseTo((8 - 0.75) * 10, 0);
  });

  it("handles VTU, Standard95, and Mumbai formulas", () => {
    const subjects = [{ name: "A", gradePoint: 8, credits: 4 }];
    const vtu = calculateCgpa(subjects, "vtu");
    expect(vtu.percentage).toBeCloseTo((8 - 0.75) * 10, 0);

    const s95 = calculateCgpa(subjects, "standard95");
    expect(s95.percentage).toBeCloseTo(8 * 9.5, 0);

    const mum = calculateCgpa(subjects, "mumbai");
    expect(mum.percentage).toBeCloseTo(7.1 * 8 + 12, 0);

    const mumLow = calculateCgpa([{ name: "A", gradePoint: 6, credits: 4 }], "mumbai");
    expect(mumLow.percentage).toBeCloseTo(7.2 * 6 + 12, 0);
  });

  it("handles topper CGPA (>= 9.0) and survivable (>= 6.0)", () => {
    const topper = calculateCgpa([{ name: "A", gradePoint: 9.5, credits: 4 }]);
    expect(topper.verdict).toContain("Topper energy");

    const survivable = calculateCgpa([{ name: "A", gradePoint: 6.5, credits: 4 }]);
    expect(survivable.status).toBe("warning");
  });

  it("returns danger for low CGPA", () => {
    const subjects = [{ name: "A", gradePoint: 4, credits: 4 }];
    const r = calculateCgpa(subjects);
    expect(r.status).toBe("danger");
  });

  it("handles empty subject list", () => {
    const r = calculateCgpa([]);
    expect(r.cgpa).toBe(0);
    expect(r.totalCredits).toBe(0);
  });
});

describe("calculateSemesterSurvival", () => {
  it("detects impossible scenarios", () => {
    const r2 = calculateSemesterSurvival(0, 40, 90, 60, 0);
    expect(r2.isImpossible).toBe(true);
    expect(r2.status).toBe("critical");
  });

  it("detects already passed", () => {
    const r = calculateSemesterSurvival(40, 40, 40, 60, 0);
    expect(r.isAlreadyPassed).toBe(true);
    expect(r.status).toBe("safe");
  });
});

describe("calculateGradeToPass", () => {
  it("returns safe for easy pass requirements", () => {
    const r = calculateGradeToPass(35, 40, 40, 40);
    expect(r.status).toBe("safe");
    expect(r.requiredFinalsPct).toBeLessThan(60);
  });

  it("returns critical when passing is impossible", () => {
    const r = calculateGradeToPass(0, 40, 40, 90);
    expect(r.status).toBe("critical");
    expect(r.requiredFinalsPct).toBeGreaterThan(100);
  });

  it("handles target grade already achieved (marks needed <= 0)", () => {
    const r = calculateGradeToPass(50, 50, 50, 40);
    expect(r.status).toBe("safe");
    expect(r.headline).toBe("Already Passed");
    expect(r.metricDisplay).toBe("0%");
    expect(r.neededFromFinals).toBeLessThanOrEqual(0);
  });

  it("handles subjects with zero total credits gracefully", () => {
    const r = calculateCgpa([{ name: "Audit Course", gradePoint: 10, credits: 0 }]);
    expect(r.cgpa).toBe(0);
    expect(r.totalCredits).toBe(0);
    expect(r.percentage).toBe(0);
  });
});

describe("calculateBacklogRecovery", () => {
  it("handles zero backlogs", () => {
    const r = calculateBacklogRecovery(0, 4, 2, 8);
    expect(r.yearBackRisk).toBe("safe");
    expect(r.totalBacklogs).toBe(0);
  });

  it("flags critical for high backlogs", () => {
    const r = calculateBacklogRecovery(7, 7, 2, 4);
    expect(r.yearBackRisk).toBe("critical");
  });

  it("generates a roadmap", () => {
    const r = calculateBacklogRecovery(3, 5, 2, 8);
    expect(r.roadmap.length).toBeGreaterThan(0);
    const totalCleared = r.roadmap.reduce((s, x) => s + x.backlogsToClear, 0);
    expect(totalCleared).toBe(3);
  });
});
