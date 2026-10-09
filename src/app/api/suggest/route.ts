import { NextResponse } from "next/server";
import { sanitizeForSheets, suggestSchema } from "@/lib/sanitize";
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

    // 2. Measure actual body byte length after reading (do not rely on Content-Length header)
    const rawText = await request.text();
    const byteLength = new TextEncoder().encode(rawText).length;

    if (byteLength > 2048) {
      return NextResponse.json(
        { error: "Payload too large. Maximum 2 KB allowed." },
        { status: 413 }
      );
    }

    let rawBody: Record<string, unknown>;
    try {
      rawBody = JSON.parse(rawText);
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    // 3. Honeypot check FIRST - if bot filled it, return silent 200 without calling Apps Script
    if (
      rawBody &&
      typeof rawBody === "object" &&
      typeof rawBody._honeypot === "string" &&
      rawBody._honeypot.trim().length > 0
    ) {
      serverLogger.info("Honeypot triggered on /api/suggest, dropping submission silently", {
        ip,
        path: "/api/suggest",
      });
      return NextResponse.json(
        {
          success: true,
          message: "Suggestion submitted successfully. Thank you for making Flunked better!",
        },
        { status: 200 }
      );
    }

    // Drop honeypot field before passing to strict Zod validator
    if (rawBody && typeof rawBody === "object") {
      delete rawBody._honeypot;
    }

    // 4. Strict Zod validation against allowlisted campus and length constraints
    const validation = suggestSchema.safeParse(rawBody);

    if (!validation.success) {
      const issue = validation.error.issues?.[0];
      const errorMessage = issue
        ? issue.path.length > 0
          ? `${issue.path.join(".")}: ${issue.message}`
          : issue.message
        : validation.error.message || "Invalid suggestion input.";
      serverLogger.warn("Tool suggestion rejected by Zod validation", {
        ip,
        path: "/api/suggest",
        reason: errorMessage,
      });

      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const { idea, category, campus, name } = validation.data;

    // 5. Google Sheets formula injection defense (prefix =, +, -, @, \t, \r with ')
    const sanitizedIdea = sanitizeForSheets(idea);
    const sanitizedCategory = sanitizeForSheets(category);
    const sanitizedCampus = sanitizeForSheets(campus);
    const sanitizedName = sanitizeForSheets(name);

    // 6. Forward to Google Sheets Apps Script Webhook with shared secret and 5s timeout
    const webhookUrl = process.env.SUGGESTIONS_WEBHOOK_URL;
    if (webhookUrl) {
      const forwardPayload = {
        secret: process.env.SUGGESTIONS_WEBHOOK_SECRET,
        category: sanitizedCategory,
        campus: sanitizedCampus,
        name: sanitizedName,
        idea: sanitizedIdea,
        timestamp: new Date().toISOString(),
      };

      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(forwardPayload),
          signal: AbortSignal.timeout(15000),
        });

        const resultText = await response.text();
        let resultJson: { status?: string; error?: string } = {};
        try {
          resultJson = JSON.parse(resultText);
        } catch {
          // Response may not be JSON
        }

        if (!response.ok || resultJson.error) {
          serverLogger.error("Apps Script webhook failed", undefined, {
            ip,
            path: "/api/suggest",
            error: resultJson.error || `HTTP ${response.status}`,
          });
          return NextResponse.json({ error: "Failed to forward suggestion" }, { status: 502 });
        }
      } catch (err) {
        serverLogger.error("Apps Script webhook timed out or failed network request", err, {
          ip,
          path: "/api/suggest",
        });
        return NextResponse.json({ error: "Failed to forward suggestion" }, { status: 502 });
      }
    }

    // Log the valid student suggestion securely on the server
    serverLogger.info("Student tool suggestion received and processed", {
      ip,
      path: "/api/suggest",
      category: sanitizedCategory,
      campus: sanitizedCampus || "unspecified",
      name: sanitizedName,
      idea: sanitizedIdea,
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
