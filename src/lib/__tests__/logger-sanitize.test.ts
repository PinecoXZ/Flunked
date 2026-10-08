import { describe, it, expect, vi } from "vitest";
import { serverLogger, sanitizeLogValue } from "../logger";

describe("logger sanitization", () => {
  it("sanitizeLogValue strips control characters and CRLF", () => {
    const malicious = "Hello\r\nInjected log line\x00\x1B[31mRed\x7FText";
    const cleaned = sanitizeLogValue(malicious);
    expect(cleaned).not.toContain("\r");
    expect(cleaned).not.toContain("\n");
    expect(cleaned).not.toContain("\x00");
    expect(cleaned).not.toContain("\x1B");
    expect(cleaned).not.toContain("\x7F");
    expect(cleaned).toContain("Hello  Injected log line");
  });

  it("sanitizeLogValue caps values at 500 characters", () => {
    const hugeString = "a".repeat(650);
    const capped = sanitizeLogValue(hugeString);
    expect(capped.length).toBe(500);
  });

  it("serverLogger strips CRLF from message before printing to console", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    serverLogger.info("Admin login\r\n[CRITICAL] System breached", { path: "/api/test" });

    expect(logSpy).toHaveBeenCalled();
    const loggedCall = logSpy.mock.calls[0][0];
    expect(loggedCall).not.toContain("\r");
    expect(loggedCall).not.toContain("\n");
    expect(loggedCall).toContain("Admin login  [CRITICAL] System breached");

    logSpy.mockRestore();
  });

  it("serverLogger strips control characters and caps long context fields", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const longValue = "B".repeat(600);
    serverLogger.warn("Malicious context", {
      path: "/api/test\r\nX-Forwarded-Host: evil.com",
      custom: longValue,
    });

    expect(warnSpy).toHaveBeenCalled();
    const loggedCall = warnSpy.mock.calls[0][0];
    expect(loggedCall).not.toContain("\r");
    expect(loggedCall).not.toContain("\n");
    expect(loggedCall).not.toContain("B".repeat(501));

    warnSpy.mockRestore();
  });
});
