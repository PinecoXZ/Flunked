import { describe, it, expect, vi } from "vitest";
import { serverLogger } from "../logger";

describe("serverLogger", () => {
  it("logs info messages with anonymized IP", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    serverLogger.info("Test info", { ip: "192.168.1.55", path: "/api/test" });
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Test info | IP: 192.168.1.0 | Path: /api/test")
    );
    consoleSpy.mockRestore();
  });

  it("logs warnings with anonymized IPv6", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    serverLogger.warn("Test warn", { ip: "2001:0db8:85a3:0000:0000:8a2e:0370:7334" });
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Test warn | IP: 2001:0db8:85a3::")
    );
    consoleSpy.mockRestore();
  });

  it("logs error and returns a correlation requestId", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const reqId = serverLogger.error("Test error", new Error("Boom"), { ip: "invalid" });
    expect(reqId).toMatch(/^req_/);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it("handles empty IP as anonymous", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    serverLogger.info("No IP");
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("IP: anonymous"));
    consoleSpy.mockRestore();
  });
});
