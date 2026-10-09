# 🎓 Flunked.online

> **Zero-BS survival utilities, placement analyzers, and academic diagnostics for Indian college students.**

[![Next.js](https://img.shields.io/badge/Next.js-15.2.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-5.0.1-6E9F18?style=for-the-badge&logo=vitest)](https://vitest.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

## ⚡ Overview

**Flunked.online** is a suite of 19 high-velocity, neo-brutalist interactive web utilities built for undergraduate engineering and university students across India. It eliminates guesswork around attendance debars, CTC deductions, backlog clearance roadmaps, and hostel finances.

Every tool runs purely client-side for rapid calculation speed and zero data leakage, backed by an edge-ready Next.js 15 App Router architecture.

---

## 🛠️ The 19 Student Tools

### 📚 Academics
* **Bunk Calculator** (`/tools/bunk-calculator`) — Precise 75% attendance margin solver with bunk allowances and recovery target calculations.
* **CGPA Calculator** (`/tools/cgpa-calculator`) — Per-semester grade-point averages, cumulative CGPA, standard percentage conversion, and placement eligibility checks.
* **Semester Survival Check** (`/tools/semester-survival`) — Internal exam vs. external exam target solver to secure passing grades.
* **Grade Required to Pass** (`/tools/grade-to-pass`) — Minimum final exam marks needed after internal component weightages.
* **Backlog Planner** (`/tools/backlog-planner`) — Multi-semester supplementary clearance plan that stays strictly within university year-back limits.

### 💼 Placement & Careers
* **CTC → In-Hand Calculator** (`/tools/ctc-calculator`) — Breaks down campus job offers (Base, EPF, Gratuity, Professional Tax, New Regime TDS) to calculate exact monthly bank credits.
* **Is This Stipend Good?** (`/tools/stipend-checker`) — Economic reality check comparing internship stipends against city-tier living expenses.
* **Placement Readiness Quiz** (`/tools/placement-quiz`) — 10 randomized evaluation questions spanning DSA, CS core, and interview prep.
* **LinkedIn Bio Auditor** (`/tools/linkedin-auditor`) — Instant heuristic analysis of student LinkedIn About sections with concrete improvements.

### 🏠 Daily Campus Life
* **Hostel Expense Splitter** (`/tools/expense-splitter`) — Multi-person room expense tracker with greedy debt-minimization algorithms and instant UPI settlement links.
* **Assignment Panic Calculator** (`/tools/assignment-panic`) — Feasibility and panic index calculator given deadlines, remaining pages, and caffeine levels.
* **Mess Food Calorie Estimator** (`/tools/mess-calories`) — Estimation engine tailored to Indian university mess menus.
* **Sleep Debt Calculator** (`/tools/sleep-debt`) — Cumulative sleep deficit tracker with scientifically backed weekend recovery schedules.

### 🔥 Fun & Chaos
* **Should I Attend This Lecture?** (`/tools/attend-or-skip`) — Deterministic verdict algorithm factoring proxy safety, teacher strictness, and current percentage.
* **Am I Cooked This Semester?** (`/tools/am-i-cooked`) — Brutally honest situation diagnostic with immediate academic damage-control steps.
* **What Tier Engineer Are You?** (`/tools/tier-engineer`) — S-to-F tier developer scorecard with shareable Neo-Brutalist credential badges.
* **Which Startup Should You Build?** (`/tools/startup-match`) — College startup concept generator tuned to engineering branch and chaos tolerance.
* **How Indian College Student Are You?** (`/tools/how-indian-are-you`) — Cultural diagnostic benchmarking student habits against national norms.
* **CGPA → Marriage Prospects** (`/tools/cgpa-marriage`) — Satirical calculator mapping engineering metrics to arranged marriage rishta ratings.

---

## 🏗️ Architecture & Tech Stack

```
flunked/
├── src/
│   ├── app/                      # Next.js 15 App Router
│   │   ├── api/suggest/          # Tool suggestion submission endpoint
│   │   ├── tools/                # All tools catalog & [slug] dynamic SSG routes
│   │   ├── layout.tsx            # Root layout with SEO and metadata
│   │   └── page.tsx              # Neo-brutalist landing page
│   ├── components/
│   │   ├── home/                 # Hero, category pills, tools search & grid
│   │   ├── layout/               # Header, mobile drawer, footer
│   │   ├── tools/                # 19 standalone calculator implementations
│   │   └── ui/                   # Neo-brutalist ResultCard, inputs, badges
│   ├── data/                     # Tool catalog metadata and definitions
│   └── lib/
│       ├── calculations/         # Pure mathematical calculation kernels
│       ├── env.ts                # Validated environment configuration
│       ├── logger.ts             # Structured JSON logger with sanitization
│       ├── rateLimit.ts          # Distributed (Upstash) + in-memory rate limiting
│       └── sanitize.ts           # Formula injection defense & Zod schemas
└── vitest.config.ts              # Unit and integration test runner
```

* **Framework**: Next.js 15.2.1 (Turbopack) with React 19
* **Styling**: Tailwind CSS with custom Neo-Brutalist design tokens (`border-3 border-black shadow-[4px_4px_0px_0px_#000]`)
* **Type Safety & Validation**: TypeScript 5.8 (Strict Mode) + Zod
* **Testing**: Vitest 5.0 with V8 coverage (130+ unit & integration tests)
* **Rate Limiting**: Multi-tier architecture (Upstash Redis with in-memory sliding-window fallback, salted SHA-256 IP anonymization)
* **Integration**: Zero-cost Google Apps Script webhook bridge with CSV/formula injection sanitization

---

## 🚀 Getting Started

### Prerequisites
* Node.js 18.18+ or Node.js 20+
* npm, pnpm, or yarn

### 1. Clone the repository
```bash
git clone https://github.com/your-username/flunked.git
cd flunked
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env.local` file in the root directory:
```bash
cp .env.example .env.local
```

Populate the required environment variables:
```env
# Optional: Upstash Redis for distributed multi-instance rate limiting
# UPSTASH_REDIS_REST_URL=https://...
# UPSTASH_REDIS_REST_TOKEN=...

# Rate limiting security salt
RATE_LIMIT_SALT=your-random-32-char-salt

# Optional: Google Apps Script webhook integration for student tool proposals
# APPS_SCRIPT_URL=https://script.google.com/macros/s/.../exec
# APPS_SCRIPT_SECRET=your-shared-webhook-secret
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Verification

Flunked maintains a comprehensive test suite covering mathematical calculations, rate limiting, sanitization, and security defenses:

```bash
# Run all unit and integration tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with code coverage
npm run test:coverage

# Run TypeScript type check
npx tsc --noEmit

# Run ESLint
npm run lint

# Build for production
npm run build
```

---

## 🛡️ Security & Privacy Engineering

* **Client-Side Compute**: All personal attendance logs, CGPAs, offer letters, and roommate expenses are computed purely in the browser. Zero personal calculations touch the server.
* **Privacy-First Rate Limiting**: Client IP addresses are hashed using `SHA-256(IP + RATE_LIMIT_SALT)` before being checked against rate-limit buckets, preventing plain-text IP storage.
* **Spreadsheet Injection Defense**: Any user-submitted suggestions pass through `sanitizeForSheets()` which prepends single quotes to characters (`=`, `+`, `-`, `@`, `\t`, `\r`) to eliminate CSV/Google Sheets formula injection vulnerabilities.
* **Bot Defense**: Silent honeypot trap fields filter automated spam submissions before hitting validation or external webhooks.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
