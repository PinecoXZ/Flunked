import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  checkRateLimit,
  getClientIp,
  RATE_LIMIT_CONFIGS,
  type RateLimitConfig,
} from "@/lib/rateLimit";

// Signatures of known aggressive scrapers and automated vulnerability scanners
const BLOCKED_USER_AGENTS = [
  "sqlmap",
  "nikto",
  "acunetix",
  "masscan",
  "nmap",
  "dirbuster",
  "gobuster",
  "wprecon",
  "havij",
  "netsparker",
  "nessus",
  "censys",
  "shodan",
  "zgrab",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = (request.headers.get("user-agent") || "").toLowerCase();
  const clientIp = getClientIp(request.headers);

  // 1. Enforce HTTPS in production
  const proto = request.headers.get("x-forwarded-proto");
  const host = request.headers.get("host") || "";

  if (
    process.env.NODE_ENV === "production" &&
    proto &&
    proto === "http" &&
    !host.includes("localhost") &&
    !host.includes("127.0.0.1")
  ) {
    return NextResponse.redirect(`https://${host}${pathname}${request.nextUrl.search}`, 301);
  }

  // 2. Block known malicious vulnerability scanners and automated exploitation bots
  const isMaliciousScanner = BLOCKED_USER_AGENTS.some((bot) => userAgent.includes(bot));

  if (isMaliciousScanner) {
    return new NextResponse(
      JSON.stringify({ error: "Access Denied: Automated scanning prohibited." }),
      {
        status: 403,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // 3. Apply Rate Limiting to API routes
  if (pathname.startsWith("/api/")) {
    const limitConfig: RateLimitConfig = pathname.startsWith("/api/suggest")
      ? RATE_LIMIT_CONFIGS.suggest
      : RATE_LIMIT_CONFIGS.api;

    const rateKey = `${clientIp}:${pathname.split("/").slice(0, 3).join("/")}`;
    const rateCheck = checkRateLimit(rateKey, limitConfig);

    if (!rateCheck.success) {
      return new NextResponse(
        JSON.stringify({
          error: "Too many requests. Please slow down and try again later.",
          retryAfter: rateCheck.retryAfterSeconds,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(rateCheck.retryAfterSeconds || 60),
            "X-RateLimit-Limit": String(rateCheck.limit),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }
  }

  return NextResponse.next();
}

// Protect all app routes while bypassing Next.js static assets, images, and icons
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon|apple-icon).*)"],
};
