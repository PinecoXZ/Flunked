import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST } from "../../app/api/suggest/route";
import { sanitizeForSheets } from "../sanitize";

describe("sanitizeForSheets (Formula Defense)", () => {
  it("prefixes individual dangerous formula start characters with single quote", () => {
    expect(sanitizeForSheets("=SUM(A1:A5)")).toBe("'=SUM(A1:A5)");
    expect(sanitizeForSheets("+123456")).toBe("'+123456");
    expect(sanitizeForSheets("-100")).toBe("'-100");
    expect(sanitizeForSheets("@SUM")).toBe("'@SUM");
  });

  it("prefixes values with leading tabs or carriage returns before trimming", () => {
    expect(sanitizeForSheets("\t=calc")).toBe("'=calc");
    expect(sanitizeForSheets("\r+cmd")).toBe("'+cmd");
  });

  it("leaves standard safe text untouched", () => {
    expect(sanitizeForSheets("Attendance calculator for labs")).toBe("Attendance calculator for labs");
    expect(sanitizeForSheets("Hello world")).toBe("Hello world");
    expect(sanitizeForSheets("")).toBe("");
  });
});

describe("/api/suggest POST route handler validation & hardening", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.stubEnv("RATE_LIMIT_SALT", "test-salt");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  let testIpCounter = 10;

  function createRequest(body: unknown, headers: Record<string, string> = {}) {
    const ip = `203.0.113.${testIpCounter++}`;
    return new Request("https://flunked.online/api/suggest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-vercel-forwarded-for": ip,
        ...headers,
      },
      body: typeof body === "string" ? body : JSON.stringify(body),
    });
  }

  it("rejects unlisted campus with 400", async () => {
    const req = createRequest({
      category: "academics",
      campus: "HackerUniversity",
      idea: "Need a new tool",
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/campus/i);
  });

  it("accepts recognized allowlist campus or 'Other' or empty string", async () => {
    const req1 = createRequest({
      category: "academics",
      campus: "VIT",
      idea: "Valid idea",
    });
    const res1 = await POST(req1);
    expect(res1.status).toBe(201);

    const req2 = createRequest({
      category: "attendance",
      campus: "Other",
      idea: "Another valid idea",
    });
    const res2 = await POST(req2);
    expect(res2.status).toBe(201);
  });

  it("rejects idea with 0 characters or only whitespace with 400", async () => {
    const req = createRequest({
      category: "academics",
      campus: "VIT",
      idea: "   ",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/idea/i);
  });

  it("rejects idea exceeding 500 characters with 400", async () => {
    const req = createRequest({
      category: "academics",
      campus: "VIT",
      idea: "a".repeat(501),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/500/);
  });

  it("rejects unknown extra fields due to strict Zod validation with 400", async () => {
    const req = createRequest({
      category: "academics",
      campus: "VIT",
      idea: "Valid idea",
      unexpectedAdminParam: true,
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("drops honeypot before validation and returns silent 200 without calling Apps Script", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    const req = createRequest({
      category: "academics",
      campus: "VIT",
      idea: "Valid idea",
      _honeypot: "I am a bot",
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);

    // fetch should NOT be called to forward to Apps Script
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it("handles Apps Script error payload even if HTTP 200 is returned", async () => {
    vi.stubEnv("SUGGESTIONS_WEBHOOK_URL", "https://script.google.com/macros/s/fake/exec");
    vi.stubEnv("SUGGESTIONS_WEBHOOK_SECRET", "super-secret");

    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    const req = createRequest({
      category: "academics",
      campus: "VIT",
      idea: "Valid suggestion for sheets",
    });

    const res = await POST(req);
    expect(res.status).toBe(502);
    const data = await res.json();
    expect(data.error).toMatch(/forward/i);

    fetchSpy.mockRestore();
  });

  it("rejects body larger than 2 KB with 413 Payload Too Large", async () => {
    const bigIdea = "x".repeat(3000);
    const req = createRequest({
      category: "academics",
      campus: "VIT",
      idea: bigIdea,
    });

    const res = await POST(req);
    expect(res.status).toBe(413);
  });
});
