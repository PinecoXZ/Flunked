# Flunked.online Pre-Launch Defensive Hardening & QA Plan (v9)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement production-grade defensive hardening, distributed abuse prevention, domain migration, QA verification, and an optional system-aware Neo-Brutalist dark mode across Flunked prior to public release on `flunked.online`.

---

## Confirmed Launch Parameters

1. **Prior Exposure:** Codebase is local-only and has never been pushed or deployed elsewhere. Zero historical secrets leaked.
2. **Canonical Domain:** **Apex (`https://flunked.online`)**. Redirection of `www.flunked.online` -> `flunked.online` is delegated entirely to Vercel Domains at the Edge (no middleware host redirects, no `host.ts`).
3. **Suggestion Forwarding Destination:** **Google Sheets Webhook** via server-only `SUGGESTIONS_WEBHOOK_URL` authenticated with `SUGGESTIONS_WEBHOOK_SECRET`. Formula injection defended (`=`, `+`, `-`, `@`, `\t`, `\r` checked before trimming); 5s timeout.
4. **Brand Name:** Fully update brand name and copy to **Flunked.online** (case-insensitive replacement).
5. **Legacy Domain History:** `flunked.fun` and `flunked.in` were never live or public (0 hits for `flunked.in`); no legacy 301 domain redirect required.
6. **Attendance Target 100%:** Option A ("not reachable" impossible state) selected. Never assert 999. Denominator guard in place.
7. **Email Removal:** Formally approved. The vestigial `email?: string` field in `AuthContext.tsx` will be deleted, and all false legal claims regarding institutional email authentication will be purged in Task 12 (dedicated commit).
8. **Dark Mode Launch Policy (Task 15):** Task 15 is strictly **ON HOLD** pending v9 review. Dark mode is **optional for launch**. Tailwind `black`/`white` remain literal colors; semantic tokens (`ink`, `paper`, `on-accent`) are used instead. All 19 tool pages will be screenshot-verified; if the visual pass fails or exhibits regressions, Flunked ships launch-day without dark mode.

---

## Environment Variables to Configure (Vercel Preview & Production)

| Environment Variable | Scope | Description |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_BASE_URL` | Public (Client + Server) | Set to `https://flunked.online` in Production; preview URL or `https://flunked.online` in Preview. |
| `SUGGESTIONS_WEBHOOK_URL` | Server-Only | Destination Google Apps Script Webhook URL. |
| `SUGGESTIONS_WEBHOOK_SECRET` | Server-Only | Shared secret token passed in suggestion payload to authenticate to Apps Script. |
| `UPSTASH_REDIS_REST_URL` | Server-Only | Upstash Redis REST endpoint for distributed rate limiting. |
| `UPSTASH_REDIS_REST_TOKEN` | Server-Only | Upstash Redis REST authentication token. |
| `RATE_LIMIT_SALT` | Server-Only | Cryptographic salt used for HMAC-SHA256 IP anonymization in Redis keys. |
| `ALLOW_LOCAL_PRODUCTION_IPS` | Server-Only (Dev/Local Only) | Set to `"true"` strictly for local `npm run start` testing. Automatically disabled/ignored when `VERCEL_ENV` is set. |

> [!WARNING]
> **Missing Upstash or Salt in Production:** An `instrumentation.ts` startup hook will emit a loud console error if Upstash variables or `RATE_LIMIT_SALT` are missing when `VERCEL_ENV === "production"`. When `RATE_LIMIT_SALT` is missing, `/api/suggest` skips rate limiting, logs a critical error, fails open, and does **not** store any raw or partial IP addresses.

---

## Global Constraints & Execution Rules

- **Execution Phasing:** 
  - **Batch 1 (Security Core & Infrastructure):** Tasks 1, 2, 5, 6, 10, 13, 7.
  - **Batch 2 (UX, Content & Quality Gates):** Tasks 3, 4, 8, 9, 11, 12, 14.
  - **Batch 3 (Visual Polish & Theme System - Runs LAST, Optional):** Task 15 (ON HOLD).
- **Review Boundary:** Stop and review the complete git diff with the user before every commit.
- **Verification Gate:** After each commit, run:
  1. `npm run test` (Vitest)
  2. `npm run lint` (ESLint)
  3. `npx tsc --noEmit` (TypeScript Compiler)
  4. `npm run build` (Next.js Production Build)
- **Stop Condition:** Stop immediately and report if any test, lint check, build, or command produces unexpected output.
- **No Force Overwrites:** Never use `npm audit fix --force`.

---

## Batch 1: Security Core & Infrastructure

### Task 1: Secrets & Repository Hygiene (Blocker 1 & Fix 8)

**Objective:** Create `.gitignore` before initializing git, verify `.env.local` is never staged, verify tracked files, run secret scan, and create the initial commit.

**Files:**
- Create: `.gitignore`

- [ ] **Step 1: Create standard Next.js `.gitignore` before `git init`**
  ```gitignore
  # Dependencies
  /node_modules
  /.pnp
  .pnp.js

  # Testing & Coverage
  /coverage

  # Next.js build output
  /.next/
  /out/
  /build

  # Environment files (strictly ignored)
  .env
  .env*.local
  .env.development
  .env.production
  .env.test
  !.env.example

  # Debug & OS files
  npm-debug.log*
  yarn-debug.log*
  .DS_Store
  Thumbs.db
  *.pem
  tsconfig.tsbuildinfo
  ```
- [x] **Step 2: Initialize git and verify ignore rules**
  - Run: `git init`
  - Run: `git status`
  - Run: `git add -A`
  - Run: `git status` and verify:
    - `.env.local` is **NOT** staged.
    - `.next/`, `node_modules/`, `coverage/` are **NOT** staged.
    - `.env.example`, `eslint.config.mjs`, `postcss.config.mjs`, `vitest.config.mts`, `src/`, `public/`, `docs/` **ARE** staged.
- [x] **Step 3: Run secret scan across all source and configuration files**
  - Run: `npx -y @secretlint/quick-start "src/**/*.{ts,tsx}" "*.{json,mjs,ts}" ".env*"`
  - Verify 0 secrets found.
- [x] **Step 4: Show diff & commit**
  - Review diff with user.
  - Run: `git commit -m "chore: establish gitignore and verify zero tracked secrets"`

---

### Task 2: Host Redirect Cleanup & Vercel Apex Delegation (Fix 1, 5)

**Objective:** Remove in-code middleware host redirects (`www -> apex` and `http -> https`), delegating them cleanly to Vercel Domains configuration. Do not create `host.ts`. Retain the fail-loud check in `src/lib/env.ts` to throw if `NEXT_PUBLIC_BASE_URL` is missing when `VERCEL_ENV === "production"`.

**Files:**
- Modify: `src/middleware.ts`
- Modify: `src/lib/env.ts`
- Test: `src/lib/__tests__/env.test.ts`

**Architecture Decisions:**
- **No `host.ts` created:** Host resolution and canonical domain redirection are delegated to Vercel Domains infrastructure:
  - `flunked.online` (Production, Primary)
  - `www.flunked.online` (Redirects to `flunked.online` via 308)
- **Pre-Deploy Configuration in Vercel Dashboard:**
  - In Vercel Project Settings -> Domains: Add `flunked.online` as Primary Production domain. Add `www.flunked.online` and set it to redirect to `flunked.online` (Status code: 308 Permanent Redirect).
- **Middleware Cleanup:** Delete lines 33–45 in `src/middleware.ts` (the HTTP/host check block) to eliminate redundant redirect logic and host-header attack surface.
- **Fail-Loud Environment Guard:** `src/lib/env.ts` throws if `process.env.VERCEL_ENV === "production"` and `!process.env.NEXT_PUBLIC_BASE_URL`.

- [x] **Step 1 (TDD A & B): Write test verifying `src/lib/env.ts` behavior with `vi.resetModules()` and `vi.stubEnv`**
  ```typescript
  describe("env.ts production base URL guard", () => {
    beforeEach(() => {
      vi.resetModules();
    });
    afterEach(() => {
      vi.unstubAllEnvs();
    });

    it("throws in production if NEXT_PUBLIC_BASE_URL is missing", async () => {
      vi.stubEnv("VERCEL_ENV", "production");
      vi.stubEnv("NEXT_PUBLIC_BASE_URL", "");
      await expect(import("@/lib/env")).rejects.toThrow(
        "NEXT_PUBLIC_BASE_URL must be defined in production."
      );
    });

    it("does not throw in development if NEXT_PUBLIC_BASE_URL is missing", async () => {
      vi.stubEnv("VERCEL_ENV", "development");
      vi.stubEnv("NEXT_PUBLIC_BASE_URL", "");
      await expect(import("@/lib/env")).resolves.toBeDefined();
    });
  });
  ```
- [x] **Step 2 (TDD C): Implement check in `src/lib/env.ts`**
  ```typescript
  if (process.env.VERCEL_ENV === "production" && !process.env.NEXT_PUBLIC_BASE_URL) {
    throw new Error("NEXT_PUBLIC_BASE_URL must be defined in production.");
  }
  ```
- [x] **Step 3: Remove lines 33–45 from `src/middleware.ts`**
  - Eliminate the `x-forwarded-proto` and `host` redirect block from middleware.
- [x] **Step 4: Run tests, lint, tsc, and build**
- [x] **Step 5: Show diff & commit**
  - Review diff with user.
  - Commit message: `fix(sec): delegate domain canonicalization to Vercel and enforce base URL guard`

---

### Task 5: Client IP Resolution Hardening & Strict Unknown IP Bucket (Fix 5)

**Objective:** On Vercel, trust only platform-verified `x-vercel-forwarded-for`. Assign unknown IPs in production to a single strict shared bucket (1/4 quota: 1 req/10 min). Bypass strict unknown pool in local development (`NODE_ENV === "development"`). Support `ALLOW_LOCAL_PRODUCTION_IPS=true` for local `npm run start` testing (strictly ignored when `VERCEL_ENV` is set).

**Files:**
- Create: `src/lib/ip.ts`
- Modify: `src/lib/rateLimit.ts`
- Test: `src/lib/__tests__/client-ip.test.ts`

**Interfaces:**
- Export `getClientIp(request: Request): { ip: string; isUnknown: boolean }` from `src/lib/ip.ts`.

- [x] **Step 1 (TDD A): Extract existing `getClientIp`**
- [x] **Step 2 (TDD B): Write test for spoofed header rejection, unknown IP handling, local override, and strict 429 exhaustion**
  - Test cases:
    - Custom `X-Forwarded-For: 1.2.3.4` without Vercel header -> MUST NOT be trusted.
    - Verified `x-vercel-forwarded-for: 203.0.113.195` -> Returns `{ ip: "203.0.113.195", isUnknown: false }`.
    - Request with zero IP headers in production -> Returns `{ ip: "unknown_client_pool", isUnknown: true }`.
    - **Restored quota test:** 20 requests with no IP headers in production mode hit 429 after 1 request under strict unknown quota (1 req/10 min).
    - Request with zero IP headers in development -> Returns `{ ip: "127.0.0.1", isUnknown: false }`.
    - Request with `ALLOW_LOCAL_PRODUCTION_IPS="true"` when `VERCEL_ENV` is unset -> Returns `{ ip: "127.0.0.1", isUnknown: false }`.
    - Request with `ALLOW_LOCAL_PRODUCTION_IPS="true"` when `VERCEL_ENV="production"` -> Ignored; returns `{ ip: "unknown_client_pool", isUnknown: true }`.
  - **Run test against unhardened logic: Show FAIL.**
- [x] **Step 3 (TDD C): Implement hardened IP extraction with development bypass**
  ```typescript
  export function getClientIp(request: Request): { ip: string; isUnknown: boolean } {
    // In local development or local production override (strictly ignored on Vercel)
    const isLocalDev = process.env.NODE_ENV === "development" && !process.env.VERCEL_ENV;
    const isLocalProdOverride = process.env.ALLOW_LOCAL_PRODUCTION_IPS === "true" && !process.env.VERCEL_ENV;
    if (isLocalDev || isLocalProdOverride) {
      return { ip: "127.0.0.1", isUnknown: false };
    }

    // On Vercel, trust x-vercel-forwarded-for exclusively
    const vercelIp = request.headers.get("x-vercel-forwarded-for");
    if (vercelIp) {
      const clean = vercelIp.split(",")[0].trim();
      if (clean) return { ip: clean, isUnknown: false };
    }

    // All unverified/headerless requests in production share a single strict pool bucket (1/4 quota)
    return { ip: "unknown_client_pool", isUnknown: true };
  }
  ```
- [x] **Step 4: Run tests, lint, tsc, and build**
- [x] **Step 5: Show diff & commit**
  - Review diff with user.
  - Commit message: `fix(sec): harden client IP resolution with strict shared bucket for unknown IPs`

---

### Task 6: Distributed Rate Limiter with Fail-Open Salt, Edge Runtime Isolation & Smoke Test (Fix 1, 4)

**Objective:** Implement distributed serverless rate limiting using an atomic single Lua script (`INCR` + conditional `EXPIRE`) or `@upstash/ratelimit`. Hash client IPs with HMAC-SHA256 (`RATE_LIMIT_SALT`). Fail open for `/api/suggest` if Redis is down or salt is missing, logging an alert without throwing, and never storing raw or partial IPs. Isolate `src/middleware.ts` from `src/lib/rateLimit.ts` and Node `crypto`. Add `instrumentation.ts` startup check for missing Upstash vars in production. Run manual smoke test.

**Files:**
- Modify: `src/lib/rateLimit.ts`
- Modify: `src/middleware.ts` (remove `rateLimit.ts` imports and in-memory rate limiting)
- Create: `src/instrumentation.ts`
- Modify: `src/app/api/suggest/route.ts`
- Test: `src/lib/__tests__/rate-limit-multi-instance.test.ts`
- Test: `src/lib/__tests__/rate-limit-salt.test.ts`
- Test: `src/lib/__tests__/upstash-smoke.test.ts` (skipped if env vars unset)

**Legacy Middleware Route Coverage Audit:**
The old `src/middleware.ts` matched `pathname.startsWith("/api/")`.
- **Route Audit:** Inspection of `src/app/api/` reveals **only one single route**: `/api/suggest` (`src/app/api/suggest/route.ts`).
- **Protection Mapping:** `/api/suggest` is protected directly in its route handler with Upstash Redis rate limiting. There are **zero** other API routes in the project. Any future API routes will explicitly invoke the rate limiter in their route handlers.

**Edge Runtime Isolation Verification & Import Chain:**
`src/middleware.ts` runs on the Next.js Edge Runtime. To prevent Edge crashes, `src/lib/rateLimit.ts` and Node `crypto` are NOT imported by `middleware.ts`:
```
src/middleware.ts (Edge Runtime)
└── next/server (NextResponse, NextRequest)
    [ZERO imports of src/lib/rateLimit.ts, ZERO imports of Node.js 'crypto']
```
API rate limiting is enforced directly in the Node.js route handler (`src/app/api/suggest/route.ts`):
```
src/app/api/suggest/route.ts (Node.js Serverless Function)
├── src/lib/rateLimit.ts (Distributed Upstash Redis rate limiter)
│   └── Web Crypto API (globalThis.crypto.subtle)
└── src/lib/ip.ts (getClientIp)
```

**HMAC-SHA256 Implementation & Strict Zero-Raw-IP Fail-Open Behavior:**
```typescript
export async function hashIp(ip: string, salt: string | undefined): Promise<string | null> {
  if (!salt) {
    console.error("[CRITICAL] RATE_LIMIT_SALT is missing. Skipping rate limiting and failing open.");
    return null; // NEVER store raw or partial IP!
  }
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(salt),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(ip));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 32);
}
```
If `RATE_LIMIT_SALT` is missing, `checkDistributedRateLimit()` logs `[CRITICAL] RATE_LIMIT_SALT is missing. Skipping rate limiting and failing open.`, returns `{ success: true, remaining: 1 }` immediately without contacting Redis or storing any IP representation, and does **not** throw.

- [ ] **Step 1 (TDD A & B): Write tests in `rate-limit-salt.test.ts` and `rate-limit-multi-instance.test.ts`**
  - Test: Missing `RATE_LIMIT_SALT` fails open, logs `console.error`, stores zero IP, and does not throw.
  - Test: Multi-instance atomic rate limit holds across simulated instances.
  - **Run tests against baseline: Show FAIL.**
- [ ] **Step 2 (TDD C): Implement atomic rate limiter store interface with Web Crypto HMAC IP hashing and zero-raw-IP fail-open handling**
- [ ] **Step 3: Remove `rateLimit.ts` import from `src/middleware.ts` to isolate Edge runtime**
- [ ] **Step 4: Create `src/instrumentation.ts`**
  ```typescript
  export async function register() {
    if (process.env.VERCEL_ENV === "production") {
      if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
        console.error("[CRITICAL] UPSTASH_REDIS credentials missing in production! Rate limiting will fail open.");
      }
      if (!process.env.RATE_LIMIT_SALT) {
        console.error("[CRITICAL] RATE_LIMIT_SALT missing in production! IP HMAC cannot be computed securely.");
      }
    }
  }
  ```
- [ ] **Step 5: Update `/api/suggest/route.ts` to use distributed limiter with fail-open fallback**
- [ ] **Step 6: Run tests, lint, tsc, and build**
- [ ] **Step 7: Show diff & commit**
  - Review diff with user.
  - Commit message: `feat(sec): implement atomic distributed rate limiter with Web Crypto HMAC IP hashing and fail-open salt`

---

### Task 10: Suggestion Endpoint Hardening: Zod Validation, Apps Script Secret, Formula Defense & Log Sanitization (Fix 3)

**Objective:** Protect `/api/suggest` with honeypot-first check, strict Zod validation (verified campus allowlist, 1–500 char idea, `.strict()`), body size measurement after read (2 KB limit), Sheets formula injection defense (`=`, `+`, `-`, `@`, `\t`, `\r` checked before trimming), Apps Script shared secret with error payload handling, 5s timeout without URL logging, CRLF log sanitization (500-char cap), and accurate privacy policy text.

**Files:**
- Modify: `src/app/api/suggest/route.ts`
- Modify: `src/components/suggest/SuggestForm.tsx`
- Modify: `src/lib/logger.ts`
- Modify: `src/app/privacy/page.tsx`
- Test: `src/lib/__tests__/suggest-validation.test.ts`
- Test: `src/lib/__tests__/logger-sanitize.test.ts`

**Allowlist Export in `src/data/campuses.ts:5`:**
```typescript
export const POPULAR_CAMPUSES = [
```

**Zod Validation Schema in `src/app/api/suggest/route.ts`:**
```typescript
import { z } from "zod";
import { POPULAR_CAMPUSES } from "@/data/campuses";

export const suggestSchema = z
  .object({
    category: z.enum(["academics", "attendance", "placements", "lifestyle", "other"]).default("academics"),
    campus: z
      .string()
      .trim()
      .refine(
        (val) => val === "" || POPULAR_CAMPUSES.includes(val) || val === "Other",
        { message: "Campus must be a recognized campus from allowlist or 'Other'" }
      ),
    idea: z.string().trim().min(1, "Idea cannot be empty").max(500, "Idea cannot exceed 500 characters"),
    _honeypot: z.string().optional(),
  })
  .strict();
```

**Formula Injection Sanitization Specification (Check First Character BEFORE Trim):**
```typescript
export function sanitizeForSheets(value: string): string {
  if (!value) return "";
  // Check the first character of the raw string BEFORE trimming whitespace so \t and \r are caught
  if (/^[=+\-@\t\r]/.test(value)) {
    return `'${value.trim()}`;
  }
  const trimmed = value.trim();
  if (/^[=+\-@\t\r]/.test(trimmed)) {
    return `'${trimmed}`;
  }
  return trimmed;
}
```

**Apps Script Response Parsing (Handle HTTP 200 with Error JSON):**
```typescript
const response = await fetch(SUGGESTIONS_WEBHOOK_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(forwardPayload),
  signal: AbortSignal.timeout(5000),
});

const resultText = await response.text();
let resultJson: { status?: string; error?: string } = {};
try {
  resultJson = JSON.parse(resultText);
} catch {
  // Not JSON
}

if (!response.ok || resultJson.error) {
  logError("Apps Script webhook failed", { error: resultJson.error || "Non-200 response" });
  return NextResponse.json({ error: "Failed to forward suggestion" }, { status: 502 });
}
```

**Google Apps Script Setup Instructions & Snippet:**
1. Open the target Google Sheet -> Extensions -> Apps Script.
2. In Project Settings -> Script Properties: Add property `SUGGESTIONS_WEBHOOK_SECRET` with your secret value.
3. Deploy -> New Deployment -> Type: **Web App** -> Configuration:
   - **Execute as:** `Me`
   - **Who has access:** `Anyone`
4. Copy Web App URL into `SUGGESTIONS_WEBHOOK_URL` in `.env.local` / Vercel.
5. Paste script code:
```javascript
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({ error: "Empty request" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    var payload = JSON.parse(e.postData.contents);
    var expectedSecret = PropertiesService.getScriptProperties().getProperty("SUGGESTIONS_WEBHOOK_SECRET");
    
    // Verify shared secret - reject unauthorized requests
    if (!expectedSecret || payload.secret !== expectedSecret) {
      return ContentService.createTextOutput(JSON.stringify({ error: "Unauthorized" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      new Date(),
      payload.category || "",
      payload.campus || "",
      payload.idea || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

- [ ] **Step 1 (TDD A & B): Write tests in `logger-sanitize.test.ts` and `suggest-validation.test.ts`**
  - Test Zod validation:
    - Rejects unlisted campus (e.g. `"HackerUniversity"`) with 400.
    - Rejects idea with 0 characters or 501 characters with 400.
    - Rejects unknown extra fields (e.g. `{ idea: "abc", campus: "KIIT", extra: "val" }`) with 400.
  - Test formula injection prefixing:
    - Test each individual character: `=`, `+`, `-`, `@`, `\t`, and `\r`.
    - Verify `\t=calc` and `\r=calc` are prefixed with `'`.
  - Test honeypot dropped *before* Zod validation.
  - Test Apps Script JSON error parsing (`{ error: "Unauthorized" }` triggers 502).
  - **Run tests against unhardened route handler: Show FAIL.**
- [ ] **Step 2 (TDD C): Implement route handler validation, Sheets formula defense, 5s timeout, and logging**
- [ ] **Step 3 (TDD C): Implement CRLF sanitization and 500-char capping in `src/lib/logger.ts`**
- [ ] **Step 4: Update `src/app/privacy/page.tsx`**
  - State: *"When you submit a tool suggestion, your selected campus category and idea text are forwarded to Google Sheets (Google is the data processor) using a secure server-to-server webhook. To prevent denial-of-service abuse, your IP address is salted with a secret key, hashed with HMAC-SHA256, and stored temporarily in Upstash Redis for 10 minutes before expiring. No accounts or persistent user profiles are created."*
- [ ] **Step 5: Run tests, lint, tsc, and build**
- [ ] **Step 6: Show diff & commit**
  - Review diff with user.
  - Commit message: `feat(api): harden suggestion endpoint with Zod validation, Sheets secret, formula defense, and sanitized logging`

---

### Task 13: Full Repository Case-Insensitive Domain Migration & Dynamic Canonicals (Fix 7)

**Objective:** Update all occurrences of `flunked.fun` to `flunked.online`. Update `.env.local` and `.env.example`. Derive canonicals in `src/app/page.tsx` and `src/app/tools/page.tsx` dynamically from `env.NEXT_PUBLIC_BASE_URL`. Verify OG image and share canvas text layouts. Report search for `flunked.in` (0 hits verified).

**Files:**
- Modify: `.env.local`
- Modify: `.env.example`
- Modify: `src/app/page.tsx`
- Modify: `src/app/tools/page.tsx`
- Modify: 84 occurrences across `src/` (layout, metadata, terms, privacy, tools, share modals).
- Modify: `src/lib/calculations/__tests__/lifestyle.test.ts:47`

**Grep Result for `flunked.in`:** 0 occurrences found across repository.

- [ ] **Step 1: Update `.env.local` and `.env.example` to `https://flunked.online`**
- [ ] **Step 2: Update canonical URLs in `src/app/page.tsx` and `src/app/tools/page.tsx`**
  - In `src/app/page.tsx`: `canonical: `${env.NEXT_PUBLIC_BASE_URL}``
  - In `src/app/tools/page.tsx`: `canonical: `${env.NEXT_PUBLIC_BASE_URL}/tools``
- [ ] **Step 3: Execute case-insensitive replacement across source files**
  - Replace `Flunked.fun` -> `Flunked.online`
  - Replace `flunked.fun` -> `flunked.online`
  - Replace `FLUNKED.FUN` -> `FLUNKED.ONLINE`
- [ ] **Step 4: Check OG image and Share Canvas visual layout**
  - Verify `src/app/opengraph-image.tsx` and `src/components/ui/ShareStoryModal.tsx` for text wrapping or watermark overlap with the 14-char brand string `flunked.online`.
- [ ] **Step 5: Update `lifestyle.test.ts:47`**
- [ ] **Step 6: Run tests, lint, tsc, and build**
- [ ] **Step 7: Show diff & commit**
  - Review diff with user.
  - Commit message: `chore: migrate domain and brand to Flunked.online with dynamic canonical derivation`

---

### Task 7: Production-Only Strict CSP & Comprehensive Security Headers (Fix 8)

**Objective:** Apply strict CSP in production only (preserving `'unsafe-eval'` in dev for HMR). Remove external Google endpoints from client `connect-src` (Sheets webhook is strictly server-to-server). Configure security headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, and `HSTS` without preload). Ask user to confirm no other subdomains before enabling `includeSubDomains`.

**Files:**
- Modify: `next.config.mjs`

> [!IMPORTANT]
> **Subdomain Confirmation Check:** Confirm with user before deployment: *Please confirm that you have no other subdomains under `flunked.online` (e.g., staging, api, mail, internal tools) before enabling `includeSubDomains`. If you have unencrypted or third-party subdomains, HSTS with includeSubDomains will render them inaccessible.*

**Headers Configuration:**
- `Strict-Transport-Security`: `max-age=63072000; includeSubDomains` (`preload` omitted for launch)
- `X-Content-Type-Options`: `nosniff`
- `X-Frame-Options`: `DENY`
- `Referrer-Policy`: `strict-origin-when-cross-origin`
- `Permissions-Policy`: `camera=(), microphone=(), geolocation=(), browsing-topics=()`
- **Content-Security-Policy (Production):**
  ```text
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' blob: data: https:;
  connect-src 'self';
  object-src 'none';
  frame-ancestors 'none';
  form-action 'self';
  base-uri 'self';
  ```
- **Content-Security-Policy (Development):** Includes `'unsafe-eval'` under `script-src` for Next.js Fast Refresh.

- [ ] **Step 1: Update headers in `next.config.mjs` with production check**
- [ ] **Step 2: Run production build and test suite**
- [ ] **Step 3: Show diff & commit**
  - Review diff with user.
  - Commit message: `fix(sec): apply strict production CSP and comprehensive security headers`

---

## Batch 2: UX, Content & Quality Gates

### Task 3: Login Open Redirect Validation & Control Character Rejection

**Objective:** Enforce that login redirect targets are strictly internal relative paths, rejecting backslashes, control characters (`\x00-\x1f`, `\x7f`), and CRLF bypass attempts (`%0d%0a`, tabs).

**Files:**
- Create: `src/lib/redirect.ts`
- Modify: `src/components/auth/LoginForm.tsx:27-28, 58`
- Test: `src/lib/__tests__/redirect.test.ts`

**Interfaces:**
- Export `safeRedirect(target: string | null | undefined): string` from `src/lib/redirect.ts`.

- [ ] **Step 1 (TDD A): Extract unvalidated fallback into `src/lib/redirect.ts` (`target || "/"`)**
- [ ] **Step 2 (TDD B): Write test asserting rejection of external, bypass, CRLF, and control character URLs**
  - Test cases:
    - `/tools/bunk-calculator` -> `/tools/bunk-calculator`
    - `https://evil.com` -> `"/"`
    - `//evil.com` -> `"/"`
    - `/\evil.com` -> `"/"`
    - `javascript:alert(1)` -> `"/"`
    - `/%0d%0a` or CRLF strings -> `"/"`
    - `/\t/evil.com` or control characters (`[\x00-\x1F\x7F]`) -> `"/"`
  - **Run test against unhardened logic: Show FAIL.**
- [ ] **Step 3 (TDD C): Implement hardened validation in `src/lib/redirect.ts`**
  ```typescript
  export function safeRedirect(target: string | null | undefined): string {
    if (!target) return "/";
    const trimmed = target.trim();
    if (/[\x00-\x1F\x7F]/.test(trimmed)) {
      return "/";
    }
    if (/^\/(?!\/)[^\s]*$/.test(trimmed) && !trimmed.includes("\\") && !trimmed.toLowerCase().includes("%0d") && !trimmed.toLowerCase().includes("%0a")) {
      return trimmed;
    }
    return "/";
  }
  ```
- [ ] **Step 4: Import and use `safeRedirect` in `src/components/auth/LoginForm.tsx`**
- [ ] **Step 5: Run tests, lint, tsc, and build**
- [ ] **Step 6: Show diff & commit**
  - Review diff with user.
  - Commit message: `fix(sec): sanitize login redirect parameter and reject control characters`

---

### Task 4: AuthGuard Tool Deep-Link & Suspense Boundary

**Objective:** Preserve target tool URL during onboarding and wrap `useSearchParams` in `<Suspense>` to prevent Next.js CSR build de-optimization.

**Files:**
- Modify: `src/lib/redirect.ts` (add `buildRedirectPath`)
- Modify: `src/components/auth/AuthGuard.tsx:1-45`
- Test: `src/lib/__tests__/auth-guard-path.test.ts`

**Interfaces:**
- Export `buildRedirectPath(pathname: string, searchParamsString: string): string` from `src/lib/redirect.ts`.

- [ ] **Step 1 (TDD A & B): Write test for `buildRedirectPath`**
  - Verify query parameters are preserved when constructing the return URL.
  - **Run test against baseline: Show FAIL.**
- [ ] **Step 2 (TDD C): Implement `buildRedirectPath`**
  ```typescript
  export function buildRedirectPath(pathname: string, searchParamsString: string): string {
    const cleanPath = pathname || "/";
    return searchParamsString ? `${cleanPath}?${searchParamsString}` : cleanPath;
  }
  ```
- [ ] **Step 3: Update `src/components/auth/AuthGuard.tsx`**
  - Separate inner component that calls `useSearchParams()` and wrap it inside `<Suspense fallback={<LoginFormSkeleton />}>`.
  - Pass the computed `redirectTo` path into `<LoginForm redirectTo={fullPath} />`.
- [ ] **Step 4: Run tests, lint, tsc, and build**
  - Verify `npm run build` succeeds with zero CSR bailout warnings.
- [ ] **Step 5: Show diff & commit**
  - Review diff with user.
  - Commit message: `fix(ux): preserve deep-link path in AuthGuard with Suspense boundary`

---

### Task 8: JSON-LD Structured Data Script Escaping with 3-Step TDD

**Objective:** Prevent script breakout in structured data by escaping `<` (`\u003c`) across all JSON-LD script tags.

**Files:**
- Create: `src/lib/jsonLd.ts`
- Modify: `src/components/ui/Breadcrumbs.tsx:45`
- Modify: `src/app/page.tsx:41`
- Test: `src/lib/__tests__/jsonld-escape.test.ts`

**Interfaces:**
- Export `safeJsonLd(data: unknown): string` from `src/lib/jsonLd.ts`.

- [ ] **Step 1 (TDD A): Extract unescaped `JSON.stringify(data)` into `src/lib/jsonLd.ts`**
- [ ] **Step 2 (TDD B): Write test asserting `</script>` tag breakout is escaped**
  - Test input: `{ name: "</script><script>alert(1)</script>" }`.
  - Assert result does not contain literal `<` and contains `\u003c/script`.
  - **Run test against unhardened logic: Show FAIL.**
- [ ] **Step 3 (TDD C): Implement `safeJsonLd` with `.replace(/</g, "\\u003c")`**
- [ ] **Step 4: Update `Breadcrumbs.tsx` and `page.tsx` to use `safeJsonLd`**
- [ ] **Step 5: Run tests, lint, tsc, and build**
- [ ] **Step 6: Show diff & commit**
  - Review diff with user.
  - Commit message: `fix(sec): sanitize JSON-LD outputs against script tag breakout`

---

### Task 9: Search Engine Asset Crawling Fix in `robots.ts`

**Objective:** Allow search engine bots to crawl `/_next/` static JavaScript and CSS assets for complete mobile rendering.

**Files:**
- Modify: `src/app/robots.ts:12`

- [ ] **Step 1: Update `robots.ts` disallow rules**
  - Remove `/_next/` from `disallow: ["/api/"]`.
- [ ] **Step 2: Run tests, lint, tsc, and build**
- [ ] **Step 3: Show diff & commit**
  - Review diff with user.
  - Commit message: `fix(seo): allow search engine crawlers to access _next assets`

---

### Task 11: Dependency Security Audit (Production vs Dev-Only)

**Objective:** Audit and remediate dependencies, prioritizing production packages (`--omit=dev`) and forbidding `--force`.

**Files:**
- Modify: `package.json`, `package-lock.json`

- [ ] **Step 1: Run production audit baseline**
  - Run: `npm audit --omit=dev`
  - Record production vulnerabilities.
- [ ] **Step 2: Run targeted `npm audit fix --omit=dev` (NEVER `--force`)**
- [ ] **Step 3: Run full audit and document dev-only packages**
  - Run: `npm audit`
  - Document any remaining dev-only findings with risk classification.
- [ ] **Step 4: Run tests, lint, tsc, and build**
- [ ] **Step 5: Show diff & commit**
  - Review diff with user.
  - Commit message: `chore(deps): apply targeted npm audit fixes for production dependencies`

---

### Task 12: Client-Side Auth Threat Model, Storage Leakage Audit & Email Removal (Fix 2, 3)

**Objective:** Formally document the client-side UI gate threat model, delete the vestigial `email?: string` field from `AuthContext.tsx`, align all legal pages (`privacy/page.tsx`, `terms/page.tsx`, `cookies/page.tsx`) to state zero email collection, present the raw recursive grep output across `src/` proving zero tool storage, and add a network grep test verifying zero `localStorage` transmission to the server.

**Files:**
- Modify: `src/context/AuthContext.tsx`
- Modify: `src/app/privacy/page.tsx`
- Modify: `src/app/terms/page.tsx`
- Modify: `src/app/cookies/page.tsx`
- Test: `src/lib/__tests__/client-storage-leakage.test.ts`

**Real `User` Interface in `src/context/AuthContext.tsx:5-10`:**
```typescript
export interface User {
  name: string;
  campusName: string;
  email?: string; // Vestigial field to be removed
  loggedInAt: string;
}
```
**Stored Object Shape in `localStorage.getItem("flunked_user")`:**
```typescript
{
  name: string;
  campusName: string;
  loggedInAt: string;
}
```

**Legal Page Contradiction Remediation:**
- In `src/app/privacy/page.tsx:281-283`: Match the actual legal text at that execution point (Task 13 in Batch 1 will have already renamed `Flunked.fun` to `Flunked.online`: *"Flunked.online processes your institutional email address..."*). Remove this clause and replace with an explicit statement that zero email or institutional login is collected or processed.
- In `src/app/terms/page.tsx:153`: Remove *"authenticating via institutional email"*.
- In `src/context/AuthContext.tsx`: Delete `email?: string;` from `User` interface and remove `email: parsed.email` from mount sync.

**Derived Storage Table (Grep-Verified):**
| Component / File | Key | Value | Purpose | Classification |
| :--- | :--- | :--- | :--- | :--- |
| `src/context/AuthContext.tsx` | `"flunked_user"` | `{ name, campusName, loggedInAt }` | Client onboarding UI preference | User Profile (PII if real name used) |
| `src/components/tutorial/OnboardingTutorial.tsx` | `"flunked_tutorial_completed"` | `"true"` | Tutorial dismissed flag | Non-sensitive Preference |
| `src/context/ThemeContext.tsx` (Task 15) | `"flunked_theme"` | `"light"` \| `"dark"` \| `"system"` | UI color theme preference | Non-sensitive Preference |
| **All 19 Tool Components** | **None** | In-memory `useState` only | Resets on reload; 0 web storage used | N/A |

- [ ] **Step 1: Write smoke test auditing all network invocations in repository**
  - Automated smoke check regex scan across all `fetch()`, `sendBeacon()`, and `XMLHttpRequest` occurrences in `src/`, proving zero payload body incorporates `localStorage.getItem`, `"flunked_user"`, or `"flunked_theme"`.
  - Document in test comments: *This is an automated smoke check, not a formal mathematical proof.*
- [ ] **Step 2 (Dedicated Commit): Remove `email` from `AuthContext.tsx` and purge legal copy references**
  - Show diff to user.
  - Commit message: `fix(auth): remove vestigial email field and align privacy and terms copy`
- [ ] **Step 3: Run tests, lint, tsc, and build**
- [ ] **Step 4: Show diff & commit storage leakage test**
  - Review diff with user.
  - Commit message: `test(auth): verify zero client storage transmission across repository network calls`

---

### Task 14: Calculator Edge-Case Test Suite & Target 100% Attendance Handling (Fix 4)

**Objective:** Audit existing calculation tests and add explicit boundary tests for empty states, extreme values, and negative inputs. Implement Option A ("impossible" state with UI showing "Not reachable") when target = 100% and attendance < 100%. Guard denominator so it never produces `Infinity` or `NaN`. Do NOT assert 999.

**Files:**
- Modify: `src/lib/calculations/attendance.ts`
- Modify: `src/components/tools/BunkCalculator.tsx`
- Modify: `src/lib/calculations/__tests__/attendance.test.ts`
- Modify: `src/lib/calculations/__tests__/academics.test.ts`
- Modify: `src/lib/calculations/__tests__/ctc.test.ts`
- Modify: `src/lib/calculations/__tests__/lifestyle.test.ts`

**Diff to `src/lib/calculations/attendance.ts` (Option A):**
```diff
--- a/src/lib/calculations/attendance.ts
+++ b/src/lib/calculations/attendance.ts
@@ -6,6 +6,7 @@ export interface BunkResult {
   currentPercentage: number;
   targetPercentage: number;
   canBunk: boolean;
+  isReachable?: boolean;
   classesCount: number;
   headline: string;
   verdict: string;
@@ -61,6 +62,19 @@ export function calculateBunk(held: number, attended: number, target: number = 7
   } else {
+    if (safeTarget === 100 && safeAttended < safeHeld) {
+      return {
+        currentPercentage,
+        targetPercentage: 100,
+        canBunk: false,
+        isReachable: false,
+        classesCount: 0,
+        headline: "100% attendance is not reachable.",
+        verdict: "You missed a class. It is mathematically impossible to reach 100%.",
+        status: "critical",
+        shareText: `My attendance is ${currentPercentage}%. 100% is no longer reachable this semester. Calculated on Flunked.online`,
+      };
+    }
     const denominator = 100 - safeTarget;
     const numerator = safeTarget * safeHeld - 100 * safeAttended;
-    const classesNeeded = denominator > 0 ? Math.ceil(numerator / denominator) : 999;
+    // Guard against division by zero; never produce Infinity or NaN
+    const classesNeeded = denominator > 0 ? Math.ceil(numerator / denominator) : 0;
+    // Confirmed: changing Math.max(1, ...) to Math.max(0, ...) alters ZERO existing tests because
+    // in the reachable branch (where safeTarget < 100 and currentPercentage < safeTarget),
+    // numerator > 0 and denominator > 0, so classesNeeded is always >= 1.
+    // We retain Math.max(1, classesNeeded) for reachable states, while unreachable states return classesCount: 0.
     const classesCount = Math.max(1, classesNeeded);
```

**UI Text in `BunkCalculator.tsx`:**
- Headline: `"100% attendance is not reachable."`
- Verdict: `"You missed a class. It is mathematically impossible to reach 100%."`
- Badge / Metric: Displays `"Not reachable"` (or `0 lectures`).

- [ ] **Step 1: Write and run edge case tests across calculation suites asserting Option A**
  - `attendance.test.ts`:
    - `held = 0, attended = 0, target = 100` -> Expect `currentPercentage: 100, canBunk: true, classesCount: 0, status: "safe"`.
    - `held = 10, attended = 8, target = 100` -> Expect `isReachable: false, classesCount: 0, headline: "100% attendance is not reachable."` (never 999).
    - Negative held/attended (`-10`, `-5`).
    - Large numbers (100,000 classes).
  - `academics.test.ts`: 0 total credits, target grade already achieved (marks needed <= 0).
  - `ctc.test.ts`: 0 INR stipend/salary, 100 LPA extreme CTC.
  - `lifestyle.test.ts`: 0 total expenses, 1 participant.
- [ ] **Step 2: Run lint, tsc, and build**
- [ ] **Step 3: Show diff & commit**
  - Review diff with user.
  - Commit message: `feat(calc): handle 100% attendance boundary with unreachable state and expand calculation edge tests`

---

## Batch 3: Visual Polish & Theme System (Runs LAST - ON HOLD)

### Task 15: System-Aware Neo-Brutalist Dark Mode (ON HOLD - Optional for Launch)

> [!IMPORTANT]
> **Task 15 Status:** Strictly **ON HOLD** pending completion of Tasks 1-14 and formal user review. Dark mode is **optional for launch**. If the visual screenshot pass shows illegible text, disappearing borders, or aesthetic regressions, we ship launch-day without dark mode.

**Objective:** Implement a zero-flash, system-aware Neo-Brutalist dark mode using semantic tokens (`ink`, `paper`, `on-accent`) while **strictly preserving literal Tailwind `black` and `white`**. Text on yellow, green, red, pink, and amber backgrounds remains literal `text-black` in both themes. Capture and review screenshots of all 19 tool pages in dark mode with the user before committing.

**Files:**
- Modify: `tailwind.config.ts` (add semantic tokens: `ink`, `paper`, `surface`, `border-neo`, `shadow-neo`, `on-accent`)
- Modify: `src/app/globals.css` (define `:root` and `[data-theme="dark"]` CSS custom properties)
- Modify: `src/app/layout.tsx` (add inline anti-flash script, `<html suppressHydrationWarning>`, theme-color metas)
- Create: `src/lib/theme.ts`
- Create: `src/context/ThemeContext.tsx`
- Modify: `src/components/layout/Navbar.tsx` (add theme toggle with Reicon/Lucide icons)
- Test: `src/lib/__tests__/theme.test.ts`

---

#### 1. Color Usage Audit Across `src/`: Colored Backgrounds & Text
**Rule:** Tailwind's `black` (`#000000`) and `white` (`#FFFFFF`) must **NEVER** be overridden to variable tokens. Overriding `text-black` with light chalk text on high-luminance accent colors (Canary Yellow, Mint Green, Pink) destroys contrast (e.g. 1.27:1 on yellow).

**Comprehensive Inventory of 61 Files with `text-black` or `text-white` on Colored Backgrounds:**
1. **App Pages & Layouts (8 files):** `src/app/about/page.tsx`, `src/app/cookies/page.tsx`, `src/app/disclaimer/page.tsx`, `src/app/error.tsx`, `src/app/global-error.tsx`, `src/app/not-found.tsx`, `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`.
2. **Core Layout & Navigation (8 files):** `src/components/layout/Footer.tsx`, `src/components/layout/Header.tsx`, `src/components/layout/LegalNav.tsx`, `src/components/layout/SubpageHeader.tsx`, `src/components/auth/LoginForm.tsx`, `src/components/auth/UserBadge.tsx`, `src/components/search/SearchModal.tsx`, `src/components/suggest/SuggestForm.tsx`.
3. **Home & Landing Sections (8 files):** `src/components/home/AuthenticatedHub.tsx`, `src/components/home/CategoryTabs.tsx`, `src/components/home/SearchBar.tsx`, `src/components/home/ToolCard.tsx`, `src/components/landing/LandingFaq.tsx`, `src/components/landing/PublicHero.tsx`, `src/components/landing/ToolPreviews.tsx`, `src/components/landing/WhyCollegeOnly.tsx`.
4. **Tool Components (28 files):**
   - `src/components/tools/am-i-cooked/AmICookedForm.tsx`
   - `src/components/tools/am-i-cooked/AmICookedResult.tsx`
   - `src/components/tools/assignment-panic/AssignmentPanicForm.tsx`
   - `src/components/tools/assignment-panic/AssignmentPanicResult.tsx`
   - `src/components/tools/AttendOrSkip.tsx`
   - `src/components/tools/BacklogPlanner.tsx`
   - `src/components/tools/BunkCalculator.tsx`
   - `src/components/tools/cgpa-calculator/CgpaForm.tsx`
   - `src/components/tools/cgpa-calculator/SubjectRow.tsx`
   - `src/components/tools/CgpaMarriage.tsx`
   - `src/components/tools/ctc-calculator/CtcBreakdownTable.tsx`
   - `src/components/tools/ctc-calculator/CtcForm.tsx`
   - `src/components/tools/ctc-calculator/CtcPresetPills.tsx`
   - `src/components/tools/expense-splitter/ExpenseForm.tsx`
   - `src/components/tools/expense-splitter/ExpenseHistoryList.tsx`
   - `src/components/tools/expense-splitter/SettlementCard.tsx`
   - `src/components/tools/GradeToPass.tsx`
   - `src/components/tools/HowIndianAreYou.tsx`
   - `src/components/tools/LinkedInAuditor.tsx`
   - `src/components/tools/MessCalories.tsx`
   - `src/components/tools/PlacementQuiz.tsx`
   - `src/components/tools/RelatedTools.tsx`
   - `src/components/tools/SemesterSurvival.tsx`
   - `src/components/tools/SleepDebt.tsx`
   - `src/components/tools/StartupMatch.tsx`
   - `src/components/tools/StipendChecker.tsx`
   - `src/components/tools/TierEngineer.tsx`
   - `src/components/tools/ToolDetailClient.tsx`
   - `src/components/tools/ToolFaqSection.tsx`
5. **Shared UI & Tutorial (9 files):** `src/components/tutorial/OnboardingTutorial.tsx`, `src/components/ui/Breadcrumbs.tsx`, `src/components/ui/NeoButton.tsx`, `src/components/ui/ProgressBar.tsx`, `src/components/ui/ResultCard.tsx`, `src/components/ui/ShareButton.tsx`, `src/components/ui/ShareStoryModal.tsx`, `src/lib/__tests__/utils.test.ts`.

---

#### 2. Arbitrary Hex & `bg-[#...]` Audit (Counts, Theming & Exemptions)
- **Total Distinct Hex Values in `src/`:** 35.
- **Total `bg-[#...]` Occurrences:** 49 occurrences across 13 distinct hex codes.

| Hex Value | Occurrences / Files | Usage Context | Classification & Treatment |
| :--- | :--- | :--- | :--- |
| `#FFD000` | 19 across 16 files | Hover state for Canary Yellow buttons (`hover:bg-[#FFD000]`) | **Exempted / Preserved**: Active canary hover state; stays literal yellow with literal black text in both themes. |
| `#FFF5F5` | 4 across 4 files | Red warning card background in legal pages (`cookies`, `disclaimer`, `privacy`, `terms`) | **Themed**: Maps to `dark:bg-red-950/40 dark:border-red-500/30`. |
| `#FFF0F0` | 7 across 7 files | Danger/critical alert background (`error.tsx`, `login`, `bunk-calculator`, `result-card`) | **Themed**: Maps to `dark:bg-red-950/40 dark:border-flunked-danger/40`. |
| `#FDFBF7` | 2 across 2 files | Page background base (`global-error.tsx`, `Header.tsx`) | **Themed**: Replaced with semantic token `bg-flunked-paper`. |
| `#FFE600` | 2 across 1 files | Brand Canary accent in `global-error.tsx` | **Exempted / Accent**: Preserved brand canary; text remains literal black in both themes. |
| `#00C853` | 6 across 6 files | Success indicator / "Copied!" button / progress bar fill | **Exempted / Semantic Status**: Emerald green; text/border remains literal black in both themes. |
| `#1E1E22` | 1 across 1 files | Dark footer surface in `Footer.tsx` | **Exempted / Native Dark**: Already a dark surface (`text-zinc-300`), preserved as-is. |
| `#E8F8F0` | 1 across 1 files | In-hand salary highlight card in `CtcBreakdownTable.tsx` | **Themed**: Maps to `dark:bg-emerald-950/30`. |
| `#FEECEC` | 1 across 1 files | Deductions card in `CtcBreakdownTable.tsx` | **Themed**: Maps to `dark:bg-rose-950/30`. |
| `#FFE0E0` | 1 across 1 files | Danger answer pill in `PlacementQuiz.tsx` | **Themed**: Maps to `dark:bg-rose-950/30`. |
| `#FF3333` | 4 across 2 files | Danger bar fill / critical badge (`ProgressBar.tsx`, `ResultCard.tsx`) | **Exempted / Semantic Status**: Critical red status indicator. |
| `#25D366` | 1 across 1 files | WhatsApp share button in `ShareStoryModal.tsx` | **Exempted Brand Color**: Preserved with literal black text. |
| `#20BD5A` | 1 across 1 files | WhatsApp share hover in `ShareStoryModal.tsx` | **Exempted Brand Color**: Preserved hover state. |

---

#### 3. Tool-Measured Contrast Ratios (WCAG 2.1 Formula)

All values computed using standard WCAG 2.1 relative luminance:

| Contrast Pair | Foreground | Background | Measured Ratio | WCAG AA (>=4.5:1) | WCAG AAA (>=7.0:1) | Verdict |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Canary Accent (Literal Black)** | `#000000` | `#FFE600` | **16.57:1** | **PASS** | **PASS** | Primary Neo-Brutalist button text |
| **Canary Accent (White Text)** | `#FFFFFF` | `#FFE600` | **1.27:1** | **FAIL** | **FAIL** | **PROVES WHY WHITE TEXT MUST NEVER BE USED ON YELLOW** |
| **Canary Hover (Literal Black)** | `#000000` | `#FFD000` | **14.27:1** | **PASS** | **PASS** | Hover button text |
| **Success Green (Literal Black)** | `#000000` | `#00C853` | **9.39:1** | **PASS** | **PASS** | Status badges & "Copied!" button |
| **Success Green (White Text)** | `#FFFFFF` | `#00C853` | **2.24:1** | **FAIL** | **FAIL** | Proves white fails on bright green |
| **WhatsApp Green (Literal Black)** | `#000000` | `#25D366` | **10.59:1** | **PASS** | **PASS** | Share story WhatsApp CTA |
| **WhatsApp Green (White Text)** | `#FFFFFF` | `#25D366` | **1.98:1** | **FAIL** | **FAIL** | Proves white fails on WhatsApp green |
| **Critical Red (Literal Black)** | `#000000` | `#FF3333` | **5.77:1** | **PASS** | **FAIL** | Critical badge text |
| **Critical Red (White Text)** | `#FFFFFF` | `#FF3333` | **3.64:1** | **PASS (Large)** | **FAIL** | High-weight bold badges |
| **Light Red Alert (Literal Black)** | `#000000` | `#FFF5F5` | **19.63:1** | **PASS** | **PASS** | Legal warning cards |
| **Light Green Card (Literal Black)** | `#000000` | `#E8F8F0` | **19.12:1** | **PASS** | **PASS** | CTC in-hand breakdown card |
| **Light Base (Literal Black)** | `#000000` | `#FDFBF7` | **20.32:1** | **PASS** | **PASS** | Light theme default body text |
| **Dark Base (Chalk Text)** | `#F4F4F6` | `#121214` | **17.03:1** | **PASS** | **PASS** | Dark theme default body text |
| **Dark Base (Muted Zinc)** | `#A1A1AA` | `#121214` | **7.30:1** | **PASS** | **PASS** | Dark theme secondary/muted text |
| **Dark Base (Old Zinc #71717A)** | `#71717A` | `#121214` | **3.87:1** | **FAIL** | **FAIL** | **FAILS WCAG AA; Replaced by #A1A1AA** |
| **Dark Base (Chalk Neo-Border)** | `#E4E4E7` | `#121214` | **14.75:1** | **PASS** | **PASS** | Dark theme border & neo-shadow |
| **Dark Base (Canary Accent)** | `#FFE600` | `#121214` | **14.76:1** | **PASS** | **PASS** | Dark theme accent highlights |

---

#### 4. Architecture: Semantic Tokens (Preserving Literal Black/White)
In `tailwind.config.ts`, Tailwind's built-in `black` and `white` remain intact. New semantic tokens are added:
```typescript
colors: {
  // Literal colors preserved: black stays #000, white stays #fff
  flunked: {
    paper: "rgb(var(--color-paper) / <alpha-value>)",       // #FDFBF7 light / #121214 dark
    card: "rgb(var(--color-card) / <alpha-value>)",         // #FFFFFF light / #1E1E24 dark
    ink: "rgb(var(--color-ink) / <alpha-value>)",           // #000000 light / #F4F4F6 dark
    muted: "rgb(var(--color-muted) / <alpha-value>)",       // #4A4A4A light / #A1A1AA dark
    border: "rgb(var(--color-border) / <alpha-value>)",     // #000000 light / #E4E4E7 dark
    yellow: "#FFE600",                                      // Literal Canary Yellow (both themes)
    danger: "#FF3333",                                      // Literal Red (both themes)
    success: "#00C853",                                     // Literal Green (both themes)
    "on-accent": "#000000",                                 // Always literal black
  },
},
boxShadow: {
  neo: "4px 4px 0px 0px rgb(var(--color-shadow))",
  "neo-sm": "2px 2px 0px 0px rgb(var(--color-shadow))",
  "neo-lg": "6px 6px 0px 0px rgb(var(--color-shadow))",
  "neo-xl": "8px 8px 0px 0px rgb(var(--color-shadow))",
}
```

In `src/app/globals.css`:
```css
:root {
  --color-paper: 253 251 247;      /* #FDFBF7 */
  --color-card: 255 255 255;        /* #FFFFFF */
  --color-ink: 0 0 0;               /* #000000 */
  --color-muted: 74 74 74;          /* #4A4A4A */
  --color-border: 0 0 0;            /* #000000 */
  --color-shadow: 0 0 0;            /* #000000 hard black shadow */
}

[data-theme="dark"] {
  color-scheme: dark;
  --color-paper: 18 18 20;          /* #121214 deep black */
  --color-card: 30 30 36;           /* #1E1E24 dark surface card */
  --color-ink: 244 244 246;         /* #F4F4F6 chalk text */
  --color-muted: 161 161 170;       /* #A1A1AA zinc muted text (7.3:1 AAA) */
  --color-border: 228 228 231;      /* #E4E4E7 chalk neo-border */
  --color-shadow: 228 228 231;      /* #E4E4E7 chalk neo-shadow */
}
```

---

#### 5. Step-by-Step Execution Plan (When Taken Off Hold)

- [ ] **Step 1 (TDD Theme Resolution): Write tests in `src/lib/__tests__/theme.test.ts`**
  - Stored `"dark"` -> returns `"dark"`.
  - Stored `"light"` -> returns `"light"`.
  - Stored `"system"` or `null` -> matches system preference.
  - Invalid stored value (`"neon"`, `""`) -> falls back gracefully.
- [ ] **Step 2: Implement `src/lib/theme.ts` & `src/context/ThemeContext.tsx`**
- [ ] **Step 3: Anti-flash `<head>` script & `<html suppressHydrationWarning>` in `src/app/layout.tsx`**
- [ ] **Step 4: Add Theme Toggle in `src/components/layout/Navbar.tsx`**
- [ ] **Step 5: Apply Semantic CSS Custom Properties in `globals.css` and `tailwind.config.ts`**
- [ ] **Step 6: Ensure OG Image and Canvas Share Story are Strictly Light-Only**
  - `ShareStoryModal.tsx` canvas export remains locked to light palette (`#FDFBF7` canvas background, `#000000` text).
- [ ] **Step 7 (CRITICAL REVIEW GATE): Screenshot Every Tool Page in Dark Mode & Review with User**
  - Launch dev server, navigate to every tool page (`/tools/*`, all 19 tools) in dark mode.
  - Capture high-resolution screenshots.
  - Present gallery of screenshots to user for visual review and contrast verification.
  - **Decision Gate:** If user rejects visual presentation or flags regressions, **dark mode is discarded and Flunked ships in light mode**.
- [ ] **Step 8: Run quality gates (`npm run test`, `npm run lint`, `npx tsc --noEmit`, `npm run build`)**
- [ ] **Step 9: Present diff to user and commit**
  - Commit message: `feat(ui): add system-aware Neo-Brutalist dark mode with semantic tokens`

---

## Launch-Day Manual Verification Checklist

Upon completion of code tasks and deployment to production, perform these manual verification checks:

1. [ ] **DNS & Canonical Redirects (Max 2 Hops, No Loop):**
   - Run `curl -IL https://flunked.online` -> Verify direct 200 OK, 0 hops.
   - Run `curl -IL https://www.flunked.online` -> Verify single 308 redirect to `https://flunked.online`, max 1 hop.
   - Run `curl -IL http://flunked.online` -> Verify redirect to `https://flunked.online`, max 1 hop.
   - Run `curl -IL http://www.flunked.online` -> Verify redirect to `https://flunked.online`, max 2 hops, no loop.
2. [ ] **Security Headers Audit:**
   - Scan canonical URL on [securityheaders.com](https://securityheaders.com) -> Verify rating is **A or higher**.
3. [ ] **Subdomain Confirmation Check:**
   - Confirm user has verified no other subdomains exist before keeping `includeSubDomains`.
4. [ ] **Apps Script Secret Verification Test:**
   - Send manual test POST with invalid secret -> Verify rejection (HTTP 200 with `{ error: "Unauthorized" }`).
   - Send manual test POST with valid secret -> Verify success (`{ status: "success" }`) and spreadsheet row appended.
   - Send manual test POST with idea `=1+1` -> Verify it renders as literal text `'=1+1` in Google Sheet (not evaluating to formula).
5. [ ] **Theme Flash & Dark Mode Verification:**
   - Toggle theme to Dark, perform hard reload (Ctrl+Shift+R) -> Verify zero white flash before render.
   - Test share modal canvas generation in dark mode -> Verify generated PNG remains crisp light theme.
6. [ ] **Mobile Performance & Accessibility:**
   - Run Google Lighthouse on mobile for `/` and `/tools/bunk-calculator` in both Light and Dark modes -> Target 90+ across Performance, Accessibility, Best Practices, SEO.
7. [ ] **Zero CSP Violations in Browser:**
   - Launch production build, open Chrome DevTools Console, navigate through every primary route (`/`, `/tools`, `/tools/bunk-calculator`, `/suggest`, `/login`, `/about`, `/terms`, `/privacy`) -> Verify **0 CSP violation warnings**.
8. [ ] **Search Console:**
   - Submit `https://flunked.online/sitemap.xml` in Google Search Console.
