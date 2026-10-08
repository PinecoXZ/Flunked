import { describe, it, expect } from "vitest";
import { sanitizeString, validateSuggestion } from "../sanitize";

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

describe("validateSuggestion", () => {
  it("accepts valid suggestion", () => {
    const r = validateSuggestion("Add a sleep calculator", "academics");
    expect(r.isValid).toBe(true);
  });

  it("rejects too-short ideas", () => {
    const r = validateSuggestion("Hi", "academics");
    expect(r.isValid).toBe(false);
  });

  it("rejects SQL injection attempts", () => {
    const r = validateSuggestion("'; DROP TABLE users; --", "academics");
    expect(r.isValid).toBe(false);
  });

  it("rejects script injection in campus field", () => {
    const r = validateSuggestion("Normal idea", "academics", "<script>alert(1)</script>");
    expect(r.isValid).toBe(false);
  });

  it("accepts valid campus names with conjunctions like and", () => {
    const r = validateSuggestion(
      "Add a hostel laundry tracker",
      "daily",
      "College of Engineering and Technology"
    );
    expect(r.isValid).toBe(true);
    expect(r.sanitized.campus).toBe("College of Engineering and Technology");
  });

  it("rejects invalid categories", () => {
    const r = validateSuggestion("Good idea here", "hacking");
    expect(r.isValid).toBe(false);
  });
});
