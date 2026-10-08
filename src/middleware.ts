import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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
  const userAgent = (request.headers.get("user-agent") || "").toLowerCase();

  // Block known malicious vulnerability scanners and automated exploitation bots
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

  return NextResponse.next();
}

// Protect all app routes while bypassing Next.js static assets, images, and icons
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon|apple-icon).*)"],
};
