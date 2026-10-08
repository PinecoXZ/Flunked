import { describe, it, expect } from "vitest";
import { cn, formatCurrencyINR, clamp } from "../utils";

describe("utils", () => {
  it("merges classes correctly with cn", () => {
    expect(cn("px-2 py-1", "bg-red-500", { "text-white": true, hidden: false })).toBe(
      "px-2 py-1 bg-red-500 text-white"
    );
    expect(cn("p-4", "p-2")).toBe("p-2");
  });

  it("formats Indian rupees correctly", () => {
    const formatted = formatCurrencyINR(150000);
    expect(formatted).toContain("1,50,000");
  });

  it("clamps values between min and max", () => {
    expect(clamp(15, 0, 10)).toBe(10);
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(5, 0, 10)).toBe(5);
  });
});
