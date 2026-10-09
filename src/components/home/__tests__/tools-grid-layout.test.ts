import { describe, it, expect } from "vitest";
import { TOOLS } from "@/data/tools";

describe("AuthenticatedHub Tools Grid Layout & Spanning", () => {
  it("has 19 total tools in the tools registry", () => {
    expect(TOOLS.length).toBe(19);
    expect(TOOLS[0].slug).toBe("bunk-calculator");
    expect(TOOLS[18].slug).toBe("cgpa-marriage");
  });

  it("calculates 100% gapless rows on 2-column grid when the odd last card spans 2 columns", () => {
    const cols = 2;
    let col = 0;
    let rowCount = 0;

    for (let i = 0; i < TOOLS.length; i++) {
      // On 2-column grid, first card takes 1 col, last card takes 2 cols
      const span = i === TOOLS.length - 1 ? 2 : 1;

      if (col + span > cols) {
        expect(col).toBe(cols); // Previous row must have been completely filled
        rowCount++;
        col = 0;
      }
      col += span;
      if (col === cols) {
        rowCount++;
        col = 0;
      }
    }

    expect(col).toBe(0); // All columns filled, no leftover unfilled slot
    expect(rowCount).toBe(10); // Exactly 10 filled rows
  });

  it("calculates 100% gapless rows on 3-column grid when both first and last cards span 2 columns", () => {
    const cols = 3;
    let col = 0;
    let rowCount = 0;

    for (let i = 0; i < TOOLS.length; i++) {
      // On 3-column grid, first card takes 2 cols, last card takes 2 cols, other 17 take 1 col
      const span = i === 0 || i === TOOLS.length - 1 ? 2 : 1;

      if (col + span > cols) {
        expect(col).toBe(cols); // Previous row must have been completely filled
        rowCount++;
        col = 0;
      }
      col += span;
      if (col === cols) {
        rowCount++;
        col = 0;
      }
    }

    expect(col).toBe(0); // All columns filled, no leftover unfilled slot
    expect(rowCount).toBe(7); // Exactly 7 filled rows
  });
});
