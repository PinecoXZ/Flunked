import { describe, it, expect } from "vitest";
import { sanitizeString, sanitizeForSheets } from "../sanitize";

describe("sanitizeString", () => {
  it("strips HTML tags", () => {
    expect(sanitizeString("<script>alert('xss')</script>hello")).toBe("hello");
  });

  it("removes null bytes", () => {
    expect(sanitizeString("hello\x00world")).toBe("helloworld");
  });

  it("enforces max length", () => {
    expect(sanitizeString("a".repeat(1000), 50).length).toBe(50);
  });

  it("returns empty string for non-string input", () => {
    expect(sanitizeString(123)).toBe("");
    expect(sanitizeString(null)).toBe("");
  });
});

describe("sanitizeForSheets", () => {
  it("escapes formula injection characters (=, +, -, @)", () => {
    expect(sanitizeForSheets("=SUM(A1:A10)")).toBe("'=SUM(A1:A10)");
    expect(sanitizeForSheets("+12345")).toBe("'+12345");
    expect(sanitizeForSheets("-100")).toBe("'-100");
    expect(sanitizeForSheets("@HYPERLINK('evil.com')")).toBe("'@HYPERLINK('evil.com')");
  });

  it("escapes tabs and carriage returns before trimming", () => {
    expect(sanitizeForSheets("\t=evil()")).toBe("'=evil()");
  });

  it("passes safe strings through trimmed", () => {
    expect(sanitizeForSheets("  IIT Bombay  ")).toBe("IIT Bombay");
    expect(sanitizeForSheets("")).toBe("");
  });
});
