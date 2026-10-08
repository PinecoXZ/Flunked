import { describe, it, expect } from "vitest";
import { safeRedirect } from "../redirect";

describe("safeRedirect open redirect defense", () => {
  it("allows valid relative internal paths", () => {
    expect(safeRedirect("/tools/bunk-calculator")).toBe("/tools/bunk-calculator");
    expect(safeRedirect("/tools")).toBe("/tools");
    expect(safeRedirect("/tools/cgpa-calculator?campus=VIT")).toBe("/tools/cgpa-calculator?campus=VIT");
    expect(safeRedirect("/")).toBe("/");
  });

  it("rejects absolute URLs pointing to external domains", () => {
    expect(safeRedirect("https://evil.com")).toBe("/");
    expect(safeRedirect("http://evil.com/tools")).toBe("/");
    expect(safeRedirect("ftp://evil.com")).toBe("/");
  });

  it("rejects protocol-relative URLs", () => {
    expect(safeRedirect("//evil.com")).toBe("/");
    expect(safeRedirect("//flunked.online.evil.com")).toBe("/");
  });

  it("rejects backslash bypass vectors", () => {
    expect(safeRedirect("/\\evil.com")).toBe("/");
    expect(safeRedirect("\\evil.com")).toBe("/");
    expect(safeRedirect("/tools\\evil.com")).toBe("/");
  });

  it("rejects javascript: and data: URIs", () => {
    expect(safeRedirect("javascript:alert(1)")).toBe("/");
    expect(safeRedirect("data:text/html,<script>alert(1)</script>")).toBe("/");
  });

  it("rejects encoded CRLF injection attempts", () => {
    expect(safeRedirect("/%0d%0aevil.com")).toBe("/");
    expect(safeRedirect("/tools%0d%0aSet-Cookie:bad")).toBe("/");
  });

  it("rejects control characters and whitespace tricks", () => {
    expect(safeRedirect("/\t/evil.com")).toBe("/");
    expect(safeRedirect("/\n/evil.com")).toBe("/");
    expect(safeRedirect("/\x00/evil.com")).toBe("/");
    expect(safeRedirect("/\x7F/evil.com")).toBe("/");
  });

  it("defaults to / on null, undefined, or empty string", () => {
    expect(safeRedirect(null)).toBe("/");
    expect(safeRedirect(undefined)).toBe("/");
    expect(safeRedirect("")).toBe("/");
    expect(safeRedirect("   ")).toBe("/");
  });
});
