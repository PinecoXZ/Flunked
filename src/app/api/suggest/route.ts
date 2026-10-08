import { NextResponse } from "next/server";
import { validateSuggestion } from "@/lib/sanitize";
import { serverLogger } from "@/lib/logger";
import { getClientIp } from "@/lib/ip";
import { checkDistributedRateLimit, RATE_LIMIT_CONFIGS } from "@/lib/rateLimit";

export async function POST(request: Request) {
  const { ip, isUnknown } = getClientIp(request.headers);

  // 1. Enforce distributed rate limiting directly in Node.js route handler
  const rateConfig = isUnknown ? RATE_LIMIT_CONFIGS.unknownPool : RATE_LIMIT_CONFIGS.suggest;
  const rateCheck = await checkDistributedRateLimit(ip, "/api/suggest", rateConfig);

  if (!rateCheck.success) {
    return NextResponse.json(
      {
        error: "Too many requests. Please slow down and try again later.",
        retryAfter: rateCheck.retryAfterSeconds,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateCheck.retryAfterSeconds || 60),
          "X-RateLimit-Limit": String(rateCheck.limit),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  try {
    const contentType = request.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      return NextResponse.json({ error: "Unsupported content type. Send JSON." }, { status: 415 });
    }

    const body = await request.json().catch(() => ({}));
    const idea = body.idea || body.toolIdea || "";
    const category = body.category || "academics";
    const campus = body.campus || "";

    // Strict validation and sanitization against SQLi, command injection, and script injection
    const validation = validateSuggestion(idea, category, campus);

    if (!validation.isValid) {
      serverLogger.warn("Tool suggestion rejected by validation", {
        ip,
        path: "/api/suggest",
      });

      return NextResponse.json(
        { error: validation.error || "Invalid suggestion submission." },
        { status: 400 }
      );
    }

    // Log the valid student suggestion securely on the server
    serverLogger.info("Student tool suggestion received", {
      ip,
      path: "/api/suggest",
      category: validation.sanitized.category,
      campus: validation.sanitized.campus || "unspecified",
      idea: validation.sanitized.idea,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Suggestion submitted successfully. Thank you for making Flunked better!",
      },
      { status: 201 }
    );
  } catch (error) {
    const reqId = serverLogger.error("Failed to process tool suggestion", error, {
      ip,
      path: "/api/suggest",
    });

    return NextResponse.json(
      {
        error: "An unexpected error occurred while saving your suggestion. Please try again later.",
        requestId: reqId,
      },
      { status: 500 }
    );
  }
}
