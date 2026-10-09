import Link from "next/link";
import {
  Scale,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Building2,
  BookOpen,
  ChevronRight,
  Clock,
  Award,
} from "lucide-react";
import { LegalNav } from "@/components/layout/LegalNav";
import { SubpageHeader } from "@/components/layout/SubpageHeader";

export const metadata = {
  title: "Terms of Service & End-User Agreement",
  description:
    "Comprehensive, legally binding Terms of Service and End-User Agreement governing all access, tools, and calculators on Flunked.online.",
  alternates: {
    canonical: "https://flunked.online/terms",
  },
};

export default function TermsPage() {
  const sections = [
    { id: "preamble", title: "1. Legal Enforceability & Legislative Framework" },
    { id: "definitions", title: "2. Definitions & Interpretation" },
    { id: "capacity", title: "3. Legal Capacity, Student Status & Age of Majority" },
    { id: "authentication", title: "4. Campus Affiliation & Client Session Integrity" },
    { id: "license", title: "5. Grant of Limited License & Intellectual Property" },
    { id: "prohibited", title: "6. Acceptable Use & Prohibited Conduct" },
    { id: "heuristic", title: "7. Heuristic Calculations & Non-Official Nature" },
    { id: "submissions", title: "8. User Feedback & Tool Suggestions" },
    { id: "thirdparty", title: "9. Third-Party Integrations & External Platforms" },
    { id: "warranties", title: "10. Comprehensive Disclaimer of Warranties" },
    { id: "liability", title: "11. Limitation of Liability & Academic Risk" },
    { id: "indemnity", title: "12. User Indemnification Covenants" },
    { id: "termination", title: "13. Term, Suspension & Access Revocation" },
    { id: "disputes", title: "14. Governing Law & Dispute Resolution" },
    { id: "miscellaneous", title: "15. Severability, Force Majeure & Entirety" },
    { id: "grievance", title: "16. Statutory Grievance Redressal Officer" },
  ];

  return (
    <div className="flex-1 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      {/* Breadcrumbs & Back button */}
      <SubpageHeader breadcrumbLabel="Terms of Service" backLabel="Back to Tools Hub" />

      {/* Shared Legal Navigation */}
      <LegalNav />

      {/* Main Legal Card */}
      <article className="bg-white border-2 border-black rounded-2xl p-6 sm:p-12 shadow-neo space-y-10">
        {/* Document Header */}
        <header className="border-b-2 border-black pb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-flunked-yellow border-2 border-black text-xs font-mono font-black text-black shadow-neo-sm">
              <Scale className="w-3.5 h-3.5 text-black" />
              <span>STATUTORY BINDING AGREEMENT</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-flunked-bg border-2 border-black text-xs font-mono font-bold text-black">
              <Clock className="w-3.5 h-3.5 text-black/70" />
              <span>Effective Date: Academic Cycle 2024–2026</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-black text-white text-xs font-mono font-bold">
              <span>Version: 3.4 (Civil &amp; IT Act Enforceable)</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight leading-tight">
            Terms of Service &amp; End-User License Agreement
          </h1>

          <p className="text-xs sm:text-sm font-mono text-black/70 font-semibold leading-relaxed">
            Please read these Terms of Service carefully before utilizing Flunked.online. This
            document constitutes a legally binding electronic agreement between you and
            Flunked.online governing your access to student tools, mathematical routines, and
            client-side calculators.
          </p>
        </header>

        {/* Executive Summary / Plain English Callout */}
        <section className="p-6 rounded-2xl bg-flunked-bg border-2 border-black shadow-neo-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-black uppercase text-black">
            <CheckCircle2 className="w-4 h-4 text-black" />
            <span>Executive Plain-English Summary (The Student Covenant)</span>
          </div>
          <p className="text-xs sm:text-sm text-black/85 font-medium leading-relaxed font-sans">
            Flunked.online is an independent, non-corporate educational suite built to help college
            students estimate attendance, calculate projected CGPAs, breakdown campus CTC offer
            letters, and resolve hostel expenses. By accessing or authenticating on this platform,
            you agree that you are an actively enrolled student using these tools solely for
            personal, non-commercial self-auditing. All mathematical outputs are algorithmic
            projections and heuristics; they do not replace official university ordinances,
            statutory regulations, or college ERPs. You retain 100% individual accountability for
            your academic decisions, exam hall tickets, and attendance compliance.
          </p>
        </section>

        {/* Table of Contents / Interactive Jump Links */}
        <section className="p-6 rounded-2xl bg-white border-2 border-black shadow-neo-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-black uppercase tracking-wider text-black">
            <BookOpen className="w-4 h-4 text-black" />
            <span>Table of Contents &amp; Contract Structure</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono font-bold">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-1.5 p-2 rounded-lg hover:bg-flunked-yellow border border-transparent hover:border-black text-black/80 hover:text-black transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5 text-black shrink-0" />
                <span className="truncate">{s.title}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Legal Sections Body */}
        <div className="space-y-12 text-black/90 font-sans leading-relaxed text-sm sm:text-base divide-y-2 divide-black/10">
          {/* Section 1 */}
          <section id="preamble" className="space-y-4 pt-6">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                1
              </span>
              <span>Legal Enforceability &amp; Legislative Framework</span>
            </h2>
            <div className="space-y-3 text-black/80 font-medium leading-relaxed pl-1">
              <p>
                This electronic document is published in complete accordance with the provisions of
                Rule 3(1) of the{" "}
                <strong className="text-black font-bold">
                  Information Technology (Intermediary Guidelines and Digital Media Ethics Code)
                  Rules, 2021
                </strong>
                , and constitutes an electronic contract under the provisions of the{" "}
                <strong className="text-black font-bold">Information Technology Act, 2000</strong>,
                read together with the{" "}
                <strong className="text-black font-bold">Indian Contract Act, 1872</strong>.
              </p>
              <p>
                These Terms of Service (&quot;Terms&quot;, &quot;Agreement&quot;, &quot;EULA&quot;)
                represent a legally valid and enforceable agreement between you—whether
                individually, as a student, researcher, or guest (&quot;User&quot;,
                &quot;Student&quot;, &quot;Data Principal&quot;, or &quot;you&quot;)—and the
                operators, maintainers, and contributors of{" "}
                <strong className="text-black font-black">Flunked.online</strong>{" "}
                (&quot;Flunked&quot;, &quot;Platform&quot;, &quot;we&quot;, &quot;our&quot;, or
                &quot;us&quot;).
              </p>
              <p>
                By opening, browsing, accessing, bookmarking, or invoking any mathematical
                computation on Flunked.online, you provide your irrevocable, unreserved, and
                affirmative consent to be bound by these Terms and our companion{" "}
                <Link
                  href="/privacy"
                  className="font-bold text-black underline hover:bg-flunked-yellow px-1"
                >
                  Privacy Policy
                </Link>
                ,{" "}
                <Link
                  href="/disclaimer"
                  className="font-bold text-black underline hover:bg-flunked-yellow px-1"
                >
                  Academic Disclaimer
                </Link>
                , and{" "}
                <Link
                  href="/cookies"
                  className="font-bold text-black underline hover:bg-flunked-yellow px-1"
                >
                  Cookie Policy
                </Link>
                . If you do not unconditionally assent to every provision set forth herein, you must
                immediately terminate your session and discontinue use of Flunked.online.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="definitions" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                2
              </span>
              <span>Definitions &amp; Interpretation</span>
            </h2>
            <div className="space-y-3 text-black/80 font-medium leading-relaxed pl-1">
              <p>
                Throughout these Terms, unless context specifically requires otherwise, capitalized
                and operational terms shall bear the following statutory and technical meanings:
              </p>
              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm pl-2 font-medium text-black/85">
                <li>
                  <strong className="text-black">
                    &quot;Calculators&quot; or &quot;Tools&quot;:
                  </strong>{" "}
                  Refers collectively to all 19 programmatic utilities hosted on Flunked.online,
                  including but not limited to the Bunk Calculator, CGPA Calculator, Semester
                  Survival Check, Backlog Planner, CTC to In-Hand Calculator, Placement Readiness
                  Quiz, Attend or Skip decider, Am I Cooked? diagnostic, Hostel Expense Splitter,
                  Assignment Panic Calculator, Grade Required to Pass, Is This Stipend Good?,
                  LinkedIn Bio Auditor, Mess Food Calorie Estimator, Sleep Debt Calculator, What
                  Tier Engineer Are You?, Which Startup Should You Build?, How Indian College
                  Student Are You?, and CGPA Marriage Market.
                </li>
                <li>
                  <strong className="text-black">&quot;Institutional Domain&quot;:</strong> An
                  authorized higher education domain name (such as{" "}
                  <code className="font-mono font-bold bg-flunked-yellow/40 px-1 rounded border border-black/20">
                    .edu
                  </code>
                  ,{" "}
                  <code className="font-mono font-bold bg-flunked-yellow/40 px-1 rounded border border-black/20">
                    .ac.in
                  </code>
                  ,{" "}
                  <code className="font-mono font-bold bg-flunked-yellow/40 px-1 rounded border border-black/20">
                    .edu.in
                  </code>
                  , or verified autonomous campus sub-domains) issued to a currently enrolled
                  college or university student.
                </li>
                <li>
                  <strong className="text-black">
                    &quot;Client-Side Runtime Computation&quot;:
                  </strong>{" "}
                  The mathematical execution architecture wherein user-supplied data (such as
                  attendance ratios, grades, salary CTC splits, and room expenses) is processed
                  strictly within the local memory of the user&apos;s browser client and is never
                  transmitted, serialized, or logged on remote web application servers.
                </li>
                <li>
                  <strong className="text-black">&quot;Official Academic ERP&quot;:</strong>{" "}
                  Institutional proprietary student lifecycle software systems (including SAP, TCS
                  iON, CollPoll, Academia ERP, Contineo, Camu, or custom college portals) officially
                  utilized by universities for statutory record-keeping.
                </li>
                <li>
                  <strong className="text-black">&quot;Heuristic Output&quot;:</strong> Indicative,
                  probabilistic, or generalized mathematical approximations produced by platform
                  algorithms based upon user input parameters.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section id="capacity" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                3
              </span>
              <span>Legal Capacity, Student Status &amp; Age of Majority</span>
            </h2>
            <div className="space-y-3 text-black/80 font-medium leading-relaxed pl-1">
              <p>
                In compliance with Section 11 of the{" "}
                <strong className="text-black font-bold">Indian Contract Act, 1872</strong>, you
                represent, warrant, and covenant that you possess the requisite legal capacity to
                enter into a binding contractual agreement. You affirmatively confirm that:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm pl-2 font-medium text-black/85">
                <li>
                  You are at least eighteen (18) years of age, or an emancipated student enrolled in
                  a recognized tertiary education program;
                </li>
                <li>
                  If you are under eighteen (18) years of age (such as first-year undergraduate
                  entrants), you represent that you access this educational resource with the
                  informed knowledge, guidance, and consent of your parent, legal guardian, or bona
                  fide academic supervisor;
                </li>
                <li>
                  You are of sound mind and are not otherwise legally disqualified from entering
                  into contracts under Indian law;
                </li>
                <li>
                  You access Flunked.online exclusively for personal, educational, non-commercial
                  self-auditing purposes.
                </li>
              </ol>
            </div>
          </section>

          {/* Section 4 */}
          <section id="authentication" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                4
              </span>
              <span>Campus Affiliation &amp; Client Session Integrity</span>
            </h2>
            <div className="space-y-3 text-black/80 font-medium leading-relaxed pl-1">
              <p>
                Flunked.online provides a frictionless student computing utility. Access to full
                calculator tool suites requires designating your student name/nickname and
                institutional campus name.
              </p>
              <div className="p-4 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm space-y-2">
                <div className="font-mono text-xs font-black uppercase text-black flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-black" />
                  <span>Session Rules &amp; Local Storage</span>
                </div>
                <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-black/85 font-medium">
                  <li>
                    You may provide your preferred first name, alias, or nickname alongside your
                    recognized tertiary institution or campus name.
                  </li>
                  <li>
                    All session data is persisted purely client-side via your browser&apos;s{" "}
                    <code className="font-mono font-bold">localStorage</code>; no user database or
                    remote credentials are maintained.
                  </li>
                  <li>
                    Session state is non-transferable and can be reset or cleared at any time via
                    the user profile menu.
                  </li>
                  <li>
                    You assume responsibility for resetting your session when utilizing shared
                    university lab terminals or public workstation hardware.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section id="license" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                5
              </span>
              <span>Grant of Limited License &amp; Intellectual Property</span>
            </h2>
            <div className="space-y-3 text-black/80 font-medium leading-relaxed pl-1">
              <p>
                Subject to your continuous compliance with these Terms, Flunked.online grants you a
                personal, revocable, non-exclusive, non-transferable, non-sublicensable, and limited
                license to access and interact with the user interface and calculators solely for
                your individual academic self-evaluation.
              </p>
              <p>
                <strong className="text-black font-black">
                  Reservation of Proprietary Rights:
                </strong>{" "}
                All intellectual property rights in and to Flunked.online—including but not limited
                to the underlying TypeScript/React/Next.js codebase, mathematical models, formula
                calibrations, editorial copy, question databases, Neo-Brutalist design tokens,
                vector illustrations, trademarks, domain names, and brand identifiers—are the
                exclusive intellectual property of Flunked.online and are protected under the{" "}
                <strong className="text-black font-bold">Copyright Act, 1957</strong>, the{" "}
                <strong className="text-black font-bold">Trade Marks Act, 1999</strong>, and
                international intellectual property conventions.
              </p>
              <p>
                Except as expressly authorized herein, no part of this Platform may be copied,
                reproduced, republished, modified, mirrored, framed, distributed, or broadcast
                without prior written authorization from the operators of Flunked.online.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section id="prohibited" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                6
              </span>
              <span>Acceptable Use &amp; Prohibited Conduct</span>
            </h2>
            <div className="space-y-3 text-black/80 font-medium leading-relaxed pl-1">
              <p>
                To maintain the integrity, security, and performance of Flunked.online for all
                college students across India, you explicitly agree that you shall NOT, directly or
                indirectly:
              </p>
              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm pl-2 font-medium text-black/85">
                <li>
                  <strong className="text-black">Automated Data Harvesting:</strong> Deploy,
                  program, or execute web scrapers, spiders, headless crawlers, extraction scripts,
                  or automated tools to capture calculator formulas, quiz banks, or campus
                  directories.
                </li>
                <li>
                  <strong className="text-black">Reverse Engineering:</strong> Decompile,
                  disassemble, reverse engineer, decrypt, or attempt to derive the proprietary
                  mathematical heuristics or source code from our client-side bundles.
                </li>
                <li>
                  <strong className="text-black">Security Compromise &amp; Penetration:</strong>{" "}
                  Probe, scan, or test the vulnerability of our application, server infrastructure,
                  or DNS endpoints; or attempt to circumvent authentication gates, rate limits, or
                  denial-of-service protections without written bug-bounty authorization.
                </li>
                <li>
                  <strong className="text-black">Commercial Resale &amp; White-Labeling:</strong>{" "}
                  Monetize, re-brand, syndicate, iframe, or package Flunked.online calculators as a
                  commercial paid service or enterprise product.
                </li>
                <li>
                  <strong className="text-black">System Overload &amp; Abuse:</strong> Transmit
                  automated requests at volumes exceeding normal human interaction, initiate
                  distributed denial-of-service (DDoS) floods, or inject malicious code, worms, or
                  trojans.
                </li>
                <li>
                  <strong className="text-black">Impersonation &amp; False Affiliation:</strong>{" "}
                  Impersonate university administrators, deans, college professors, placement
                  officers, or other students in tool feedback submissions or communication
                  channels.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 7 */}
          <section id="heuristic" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                7
              </span>
              <span>Heuristic Calculations &amp; Non-Official Nature</span>
            </h2>
            <div className="space-y-3 text-black/80 font-medium leading-relaxed pl-1">
              <div className="p-4 rounded-xl bg-flunked-yellow/20 border-2 border-black space-y-2">
                <span className="font-mono text-xs font-black uppercase text-black flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-black shrink-0" />
                  <span>Algorithmic Heuristics Notice</span>
                </span>
                <p className="text-xs sm:text-sm font-medium text-black/90">
                  Every calculation, percentage threshold, exam mark target, tax withholding
                  estimate, and hostel debt settlement provided on Flunked.online is an{" "}
                  <strong className="text-black font-black">
                    unverified mathematical heuristic
                  </strong>{" "}
                  designed for secondary sanity checks.
                </p>
              </div>
              <p>
                You acknowledge that university statutes, institutional ordinances, autonomous
                college regulations, and departmental examination circulars{" "}
                <strong className="text-black font-black">supersede and overrule</strong> all
                results rendered on this platform. Flunked.online possesses zero legal, academic, or
                institutional authority to certify attendance compliance, exam eligibility, degree
                completion, or tax liability.
              </p>
              <p>
                For exhaustive, tool-by-tool operational boundaries and regulatory assumptions,
                refer to our statutory{" "}
                <Link
                  href="/disclaimer"
                  className="font-bold text-black underline hover:bg-flunked-yellow px-1"
                >
                  Academic &amp; Operational Disclaimer
                </Link>
                .
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section id="submissions" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                8
              </span>
              <span>User Feedback &amp; Tool Suggestions</span>
            </h2>
            <div className="space-y-3 text-black/80 font-medium leading-relaxed pl-1">
              <p>
                When you submit tool ideas, formulas, campus-specific grading tables, or bug reports
                via our &quot;Suggest a Tool&quot; interface (
                <Link
                  href="/suggest"
                  className="font-bold text-black underline hover:bg-flunked-yellow px-1"
                >
                  /suggest
                </Link>
                ) or electronic mail, you acknowledge that such submissions are non-confidential and
                non-proprietary. Submissions include your college or university name and an optional
                student name or alias (which automatically defaults to &quot;Anonymous&quot; if
                omitted).
              </p>
              <p>
                By submitting ideas, you grant Flunked.online an unrestricted, perpetual,
                irrevocable, worldwide, royalty-free, transferable, and sublicensable license to
                utilize, test, implement, modify, publish, and commercialize such concepts without
                compensation, royalty, accounting, or attribution obligation to you.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section id="thirdparty" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                9
              </span>
              <span>Third-Party Integrations &amp; External Platforms</span>
            </h2>
            <div className="space-y-3 text-black/80 font-medium leading-relaxed pl-1">
              <p>
                The Platform may provide deep-links, web share triggers, or technical references to
                third-party services, including:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm pl-2 font-medium text-black/85">
                <li>
                  <strong className="text-black">Unified Payments Interface (UPI):</strong>{" "}
                  Deep-links for settlement via Google Pay, PhonePe, Paytm, or BHIM. Flunked.online
                  is NOT an intermediary or payment aggregator under the Payment and Settlement
                  Systems Act, 2007;
                </li>
                <li>
                  <strong className="text-black">
                    Voluntary Creator Support (&quot;Buy Me a Coffee&quot;):
                  </strong>{" "}
                  Links to external creator support channels (
                  <code className="font-bold">buymeacoffee.com/fayezahmad</code>). Any contribution
                  is strictly voluntary, gratuitous, and non-refundable, processed externally by Buy
                  Me a Coffee / Stripe. Flunked.online never collects, handles, or stores payment
                  cards, banking credentials, or UPI PINs. Voluntary tips do NOT constitute fees for
                  software licenses, premium features, or service contracts;
                </li>
                <li>
                  <strong className="text-black">Social &amp; Messaging APIs:</strong> Direct share
                  links to WhatsApp, Telegram, or LinkedIn;
                </li>
                <li>
                  <strong className="text-black">
                    College Portals &amp; University Registries:
                  </strong>{" "}
                  External reference links to institutional guidelines.
                </li>
              </ul>
              <p>
                Flunked.online maintains zero control over third-party terms of service, server
                uptime, security practices, or privacy policies. Your interaction with third-party
                software is governed solely by their respective agreements.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section id="warranties" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                10
              </span>
              <span>Comprehensive Disclaimer of Warranties</span>
            </h2>
            <div className="p-5 rounded-2xl bg-[#FFF5F5] border-2 border-black space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-black text-rose-700 uppercase">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                <span>
                  Statutory &quot;As Is&quot; &amp; &quot;As Available&quot; Warranty Exclusion
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-black/90 leading-relaxed uppercase">
                TO THE MAXIMUM EXTENT PERMISSIBLE UNDER APPLICABLE INDIAN LAW, FLUNKED.ONLINE, ITS
                OPERATORS, CONTRIBUTORS, AFFILIATES, AND AGENTS EXPRESSLY DISCLAIM ALL WARRANTIES OF
                ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE.
              </p>
              <p className="text-xs sm:text-sm font-medium text-black/85 leading-relaxed">
                WE EXPRESSLY DISCLAIM ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                ACADEMIC OR PROFESSIONAL PURPOSE, TITLE, ACCURACY, TIMELINESS, NON-INFRINGEMENT, OR
                UNINTERRUPTED AVAILABILITY. WE MAKE NO REPRESENTATION THAT:
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm font-medium text-black/85 pl-1">
                <li>
                  THE CALCULATOR FORMULAS WILL ACCURATELY REFLECT YOUR INSTITUTION&apos;S CURRENT
                  INTERNAL MARKING SCHEMES OR PASSING CRITERIA;
                </li>
                <li>
                  CALCULATION OUTPUTS WILL PREVENT ATTENDANCE SHORTAGES, ACADEMIC DETENTION, OR
                  DEBARMENT;
                </li>
                <li>
                  SALARY TAX ESTIMATIONS WILL CORRESPOND PRECISELY TO EMPLOYER PAYROLL TDS
                  DEDUCTIONS UNDER THE INCOME TAX ACT, 1961;
                </li>
                <li>
                  PLATFORM ACCESS WILL BE ERROR-FREE, VIRUS-FREE, OR UNINTERRUPTED DURING SEMESTER
                  EXAM PERIODS.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 11 */}
          <section id="liability" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                11
              </span>
              <span>Limitation of Liability &amp; Academic Risk</span>
            </h2>
            <div className="space-y-3 text-black/80 font-medium leading-relaxed pl-1">
              <p>
                Under no circumstances—including breach of contract, tort, negligence, strict
                liability, or statutory duty—shall Flunked.online, its maintainers, or hosting
                affiliates be held liable for any direct, indirect, incidental, special, exemplary,
                consequential, or punitive damages arising out of your use or inability to use the
                Platform.
              </p>
              <p className="font-bold text-black">
                Without limiting the generality of the foregoing, Flunked.online assumes zero
                liability for:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm pl-2 font-medium text-black/85">
                <li>
                  Any student debarment, attendance shortage notices, withheld hall tickets, or
                  barred end-semester examinations resulting from reliance upon the Bunk Calculator
                  or Attend or Skip tool;
                </li>
                <li>
                  Grade point deductions, semester failure, backlog accumulation, year backs, or
                  delayed degree awards resulting from reliance on the CGPA Calculator or Semester
                  Survival Check;
                </li>
                <li>
                  Tax penalties, interest assessments under Section 234A/B/C, or notice issues from
                  the Income Tax Department or employers resulting from reliance on the CTC In-Hand
                  Calculator;
                </li>
                <li>
                  Unpaid roommate debts, financial loss, UPI transaction timeouts, or interpersonal
                  peer disputes originating from calculations via the Hostel Expense Splitter;
                </li>
                <li>
                  Placement interview rejections, campus recruitment test disqualifications, or
                  psychological distress related to the Placement Readiness Quiz or Am I Cooked?
                  diagnostic.
                </li>
              </ul>
              <p className="text-xs sm:text-sm font-mono text-black/80 font-bold pt-1">
                In all events, the total cumulative monetary liability of Flunked.online under these
                Terms shall be strictly capped at{" "}
                <strong className="text-black font-black">
                  INR ₹500 (Indian Rupees Five Hundred Only)
                </strong>{" "}
                or the aggregate amount paid by you to Flunked.online during the preceding thirty
                (30) days, whichever is lower (which is zero for all non-paying users).
              </p>
            </div>
          </section>

          {/* Section 12 */}
          <section id="indemnity" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                12
              </span>
              <span>User Indemnification Covenants</span>
            </h2>
            <div className="space-y-3 text-black/80 font-medium leading-relaxed pl-1">
              <p>
                You agree to defend, indemnify, and hold harmless Flunked.online, its founders,
                operators, contributors, and service providers from and against any claims,
                liabilities, damages, losses, costs, demands, investigations, and legal expenses
                (including reasonable attorney fees) arising out of or in connection with:
              </p>
              <ol className="list-decimal list-inside space-y-1.5 text-xs sm:text-sm pl-2 font-medium text-black/85">
                <li>Your breach or violation of any provision of these Terms of Service;</li>
                <li>
                  Your violation of any applicable Indian statute, regulation, university ordinance,
                  or third-party intellectual property rights;
                </li>
                <li>
                  Any claim by an educational institution, professor, or third party concerning your
                  misuse of calculations or unauthorized attendance absence;
                </li>
                <li>
                  Your fraudulent misrepresentation of institutional student status or domain
                  ownership.
                </li>
              </ol>
            </div>
          </section>

          {/* Section 13 */}
          <section id="termination" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                13
              </span>
              <span>Term, Suspension &amp; Access Revocation</span>
            </h2>
            <div className="space-y-3 text-black/80 font-medium leading-relaxed pl-1">
              <p>
                These Terms shall remain in full force and effect for as long as you access the
                Platform or retain verified session tokens in your browser.
              </p>
              <p>
                Flunked.online reserves the absolute right, without prior notice or liability, to
                suspend, terminate, rate-limit, or permanently block your access (including
                domain-level or IP-level blocking) if we detect:
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm pl-2 font-medium text-black/85">
                <li>Breach of these Terms or acceptable use policies;</li>
                <li>Automated bot traffic, brute-force requests, or denial-of-service attempts;</li>
                <li>Submission of fraudulent institutional domains or malicious payloads;</li>
                <li>
                  Statutory directive from competent law enforcement authorities or judicial courts.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 14 */}
          <section id="disputes" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                14
              </span>
              <span>Governing Law &amp; Dispute Resolution</span>
            </h2>
            <div className="space-y-3 text-black/80 font-medium leading-relaxed pl-1">
              <p>
                These Terms and any dispute, controversy, or claim arising out of or relating to
                your use of Flunked.online shall be governed by, construed, and interpreted in
                accordance with the substantive laws of the{" "}
                <strong className="text-black font-black">Republic of India</strong>, without regard
                to its conflict of law principles.
              </p>
              <div className="p-4 rounded-xl bg-white border-2 border-black shadow-neo-sm space-y-2">
                <div className="font-mono text-xs font-black uppercase text-black">
                  Mandatory 30-Day Amicable Conciliation &amp; Arbitration
                </div>
                <p className="text-xs sm:text-sm text-black/80 font-medium">
                  Prior to initiating any legal proceedings, you agree to notify us of the dispute
                  in writing at <code className="font-mono font-bold">legal@flunked.online</code>.
                  Both parties agree to engage in good-faith informal negotiations for a minimum
                  period of thirty (30) days.
                </p>
                <p className="text-xs sm:text-sm text-black/80 font-medium">
                  In the event the dispute cannot be amicably resolved within thirty (30) days, it
                  shall be referred to and finally settled by binding arbitration in accordance with
                  the{" "}
                  <strong className="text-black font-bold">
                    Arbitration and Conciliation Act, 1996
                  </strong>
                  . The seat and venue of arbitration shall be{" "}
                  <strong className="text-black font-bold">New Delhi, India</strong>. The
                  arbitration shall be conducted in the English language by a sole arbitrator
                  mutually appointed by the parties.
                </p>
              </div>
              <p>
                Subject to the arbitration agreement, the competent civil courts located in{" "}
                <strong className="text-black font-black">New Delhi, India</strong> shall possess
                exclusive territorial and subject-matter jurisdiction over any judicial actions.
              </p>
            </div>
          </section>

          {/* Section 15 */}
          <section id="miscellaneous" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                15
              </span>
              <span>Severability, Force Majeure &amp; Entirety</span>
            </h2>
            <div className="space-y-3 text-black/80 font-medium leading-relaxed pl-1">
              <p>
                <strong className="text-black">Severability:</strong> If any provision of these
                Terms is found to be unlawful, void, or unenforceable by an arbitrator or competent
                court, such provision shall be deemed severable and shall not affect the validity
                and enforceability of any remaining provisions.
              </p>
              <p>
                <strong className="text-black">Force Majeure:</strong> Flunked.online shall not be
                held liable for failure or delay in performance resulting from causes beyond our
                reasonable control, including internet backbone outages, DDoS attacks, electrical
                failures, server hosting downtime, acts of civil authorities, or changes in
                statutory regulations.
              </p>
              <p>
                <strong className="text-black">Entire Agreement &amp; Non-Waiver:</strong> These
                Terms, together with our Privacy Policy, Academic Disclaimer, and Cookie Policy,
                constitute the entire agreement between you and Flunked.online regarding your use of
                the Platform. Our failure to enforce any strict right or provision shall not
                constitute a waiver of such right.
              </p>
            </div>
          </section>

          {/* Section 16 */}
          <section id="grievance" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                16
              </span>
              <span>Statutory Grievance Redressal Officer &amp; Notices</span>
            </h2>
            <div className="space-y-3 text-black/80 font-medium leading-relaxed pl-1">
              <p>
                In compliance with Rule 3(2) of the{" "}
                <strong className="text-black font-bold">
                  Information Technology (Intermediary Guidelines and Digital Media Ethics Code)
                  Rules, 2021
                </strong>
                , and applicable provisions of the{" "}
                <strong className="text-black font-bold">
                  Digital Personal Data Protection Act, 2023
                </strong>
                , the name and contact details of the designated Grievance Officer are set forth
                below:
              </p>
              <div className="p-5 rounded-2xl bg-flunked-bg border-2 border-black shadow-neo space-y-3 font-mono text-xs sm:text-sm">
                <div className="flex items-center gap-2 font-black text-black text-sm uppercase">
                  <Award className="w-4 h-4 text-black" />
                  <span>Statutory Grievance Redressal Cell</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-black/90 font-medium">
                  <div>
                    <span className="text-black/60 block text-[11px] uppercase font-bold">
                      Officer Designation
                    </span>
                    <span className="font-bold text-black">
                      Nodal Grievance &amp; Compliance Officer
                    </span>
                  </div>
                  <div>
                    <span className="text-black/60 block text-[11px] uppercase font-bold">
                      Entity
                    </span>
                    <span className="font-bold text-black">
                      Flunked.online Legal &amp; Student Rights Desk
                    </span>
                  </div>
                  <div>
                    <span className="text-black/60 block text-[11px] uppercase font-bold">
                      Grievance Electronic Mail
                    </span>
                    <a
                      href="mailto:grievance@flunked.online"
                      className="font-bold text-black underline hover:bg-flunked-yellow"
                    >
                      grievance@flunked.online
                    </a>
                  </div>
                  <div>
                    <span className="text-black/60 block text-[11px] uppercase font-bold">
                      General Legal Inquiries
                    </span>
                    <a
                      href="mailto:legal@flunked.online"
                      className="font-bold text-black underline hover:bg-flunked-yellow"
                    >
                      legal@flunked.online
                    </a>
                  </div>
                  <div>
                    <span className="text-black/60 block text-[11px] uppercase font-bold">
                      Jurisdiction
                    </span>
                    <span className="font-bold text-black">
                      National Capital Territory of Delhi, India
                    </span>
                  </div>
                  <div>
                    <span className="text-black/60 block text-[11px] uppercase font-bold">
                      Statutory Response Window
                    </span>
                    <span className="font-bold text-black">
                      Acknowledgment within 48 hours; resolution within 30 days
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Note */}
        <footer className="pt-6 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-black/70">
          <div>
            <span>
              © {new Date().getFullYear()} Flunked.online. Standard Indian Higher Education License.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/privacy" className="hover:text-black underline">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/disclaimer" className="hover:text-black underline">
              Academic Disclaimer
            </Link>
            <span>•</span>
            <Link href="/cookies" className="hover:text-black underline">
              Cookie Policy
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
