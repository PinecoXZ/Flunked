import Link from "next/link";
import {
  Shield,
  CheckCircle2,
  Lock,
  EyeOff,
  AlertTriangle,
  FileText,
  Clock,
  Trash2,
  UserCheck,
  Server,
  ChevronRight,
  Cpu,
} from "lucide-react";
import { LegalNav } from "@/components/layout/LegalNav";
import { SubpageHeader } from "@/components/layout/SubpageHeader";

export const metadata = {
  title: "Privacy Policy & Student Data Protection Standards",
  description:
    "Official Privacy Policy and Data Protection Standards for Flunked.online, fully compliant with India's Digital Personal Data Protection Act, 2023 (DPDP Act).",
  alternates: {
    canonical: "https://flunked.online/privacy",
  },
};

export default function PrivacyPage() {
  const sections = [
    { id: "legislative", title: "1. Legislative Scope & Data Fiduciary Mandate" },
    { id: "sandboxing", title: "2. Privacy by Design: Client-Side Memory Sandboxing" },
    { id: "classification", title: "3. Comprehensive Data Inventory & Classification" },
    { id: "lawful-basis", title: "4. Lawful Grounds for Processing (DPDP Act)" },
    { id: "non-disclosure", title: "5. Absolute Non-Disclosure & Non-Monetization Manifesto" },
    { id: "client-storage", title: "6. Local Browser Storage & State Mechanics" },
    { id: "retention", title: "7. Data Retention Protocols & Instant Session Erasure" },
    { id: "security", title: "8. Cryptographic Safeguards & Infrastructure Security" },
    { id: "principal-rights", title: "9. Data Principal Rights under Chapter III (DPDP Act)" },
    { id: "minors", title: "10. Protection of Students & Minors under Section 9" },
    { id: "transfers", title: "11. Data Locality & Cross-Border Transfer Boundaries" },
    { id: "dpo", title: "12. Data Protection Officer & Grievance Redressal (DPBI)" },
  ];

  return (
    <div className="flex-1 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      {/* Breadcrumbs & Back button */}
      <SubpageHeader breadcrumbLabel="Privacy Policy" backLabel="Back to Tools Hub" />

      {/* Shared Legal Navigation */}
      <LegalNav />

      {/* Main Legal Card */}
      <article className="bg-white border-2 border-black rounded-2xl p-6 sm:p-12 shadow-neo space-y-10">
        {/* Document Header */}
        <header className="border-b-2 border-black pb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-flunked-yellow border-2 border-black text-xs font-mono font-black text-black shadow-neo-sm">
              <Shield className="w-3.5 h-3.5 text-black" />
              <span>DATA PROTECTION STANDARDS</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-flunked-bg border-2 border-black text-xs font-mono font-bold text-black">
              <Clock className="w-3.5 h-3.5 text-black/70" />
              <span>Effective Date: Academic Cycle 2024–2026</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-black text-white text-xs font-mono font-bold">
              <span>DPDP Act 2023 &amp; IT Rules Compliant</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight leading-tight">
            Privacy Policy &amp; Student Data Protection Policy
          </h1>

          <p className="text-xs sm:text-sm font-mono text-black/70 font-semibold leading-relaxed">
            This Privacy Policy governs the collection, processing, local storage, and absolute
            non-disclosure of digital personal data across Flunked.online under the Digital Personal
            Data Protection Act, 2023 (DPDP Act, Act No. 22 of 2023) and the Information Technology
            Act, 2000.
          </p>
        </header>

        {/* Executive Summary / Plain English Callout */}
        <section className="p-6 rounded-2xl bg-flunked-bg border-2 border-black shadow-neo-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-black uppercase text-black">
            <CheckCircle2 className="w-4 h-4 text-black" />
            <span>The Student Privacy Manifesto (In Plain English)</span>
          </div>
          <p className="text-xs sm:text-sm text-black/85 font-medium leading-relaxed font-sans">
            Flunked.online was created by university students who refuse to participate in the
            corporate surveillance web. We practice{" "}
            <strong className="text-black font-black">radical data minimization</strong>. We do not
            sell student emails, we run zero programmatic advertising networks, and we never report
            your attendance calculations to university deans, registrars, or proctorial boards.
            Every calculation variable—your missed class count, CGPA scores, offered salary
            breakdown, roommate bills, and panic index responses—is computed{" "}
            <strong className="text-black font-black">
              locally inside your browser&apos;s runtime memory
            </strong>
            . It is never transmitted to, inspected by, or stored in our backend databases.
          </p>
        </section>

        {/* Table of Contents / Interactive Jump Links */}
        <section className="p-6 rounded-2xl bg-white border-2 border-black shadow-neo-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-black uppercase tracking-wider text-black">
            <FileText className="w-4 h-4 text-black" />
            <span>Policy Index &amp; Statutory Architecture</span>
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

        {/* Privacy Sections Body */}
        <div className="space-y-12 text-black/90 font-sans leading-relaxed text-sm sm:text-base divide-y-2 divide-black/10">
          {/* Section 1 */}
          <section id="legislative" className="space-y-4 pt-6">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                1
              </span>
              <span>Legislative Scope &amp; Data Fiduciary Mandate</span>
            </h2>
            <div className="space-y-3 text-black/80 font-medium leading-relaxed pl-1">
              <p>
                This Privacy Policy establishes the statutory standards under which{" "}
                <strong className="text-black font-black">Flunked.online</strong> acts as a{" "}
                <strong className="text-black font-bold">&quot;Data Fiduciary&quot;</strong>{" "}
                pursuant to Section 2(i) of the{" "}
                <strong className="text-black font-bold">
                  Digital Personal Data Protection Act, 2023 (DPDP Act, Act No. 22 of 2023)
                </strong>
                . You, as the enrolled student or user accessing our services, are recognized as the{" "}
                <strong className="text-black font-bold">&quot;Data Principal&quot;</strong> under
                Section 2(j) of the DPDP Act.
              </p>
              <p>
                This Policy applies to all digital personal data processed in connection with any
                service, interactive calculator, quiz, or feature hosted on the domain{" "}
                <strong className="text-black font-bold">flunked.online</strong> and its sub-domains.
                It is drafted in compliance with the DPDP Act 2023, the{" "}
                <strong className="text-black font-bold">Information Technology Act, 2000</strong>,
                and the{" "}
                <strong className="text-black font-bold">
                  Information Technology (Reasonable Security Practices and Procedures and Sensitive
                  Personal Data or Information) Rules, 2011 (SPDI Rules)
                </strong>
                .
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="sandboxing" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                2
              </span>
              <span>Privacy by Design: Client-Side Memory Sandboxing</span>
            </h2>
            <div className="space-y-3 text-black/80 font-medium leading-relaxed pl-1">
              <p>
                Flunked.online is architected from the ground up on the principle of{" "}
                <strong className="text-black font-black">Privacy by Design and Default</strong>.
                Unlike traditional corporate web applications that log every user interaction to
                backend analytical datastores, Flunked.online enforces strict{" "}
                <strong className="text-black font-black">Client-Side Memory Sandboxing</strong>.
              </p>
              <div className="p-5 rounded-2xl bg-flunked-bg border-2 border-black shadow-neo-sm space-y-3">
                <div className="font-mono text-xs font-black uppercase text-black flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-black" />
                  <span>Technical Proof of Client-Side Isolation</span>
                </div>
                <p className="text-xs sm:text-sm text-black/85 font-medium leading-relaxed">
                  When you slide the attendance percentage bar in the Bunk Calculator, type your
                  mid-sem marks into the Semester Survival Check, paste your placement CTC offer,
                  enter roommate expenses, or answer the Placement Quiz, the computations are
                  evaluated{" "}
                  <strong className="text-black font-black">
                    entirely in your device&apos;s browser JavaScript runtime memory (DOM)
                  </strong>
                  .
                </p>
                <div className="p-3 bg-white rounded-xl border border-black text-xs font-mono text-black font-bold space-y-1">
                  <div>
                    • Network Payload Inspection: Zero outgoing calculation POST/PUT telemetry
                    requests
                  </div>
                  <div>
                    • Server Logging: Zero remote storage of student grades, salaries, or attendance
                    rates
                  </div>
                  <div>
                    • Memory Persistence: Variables are flushed upon page refresh or tab closure
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="classification" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                3
              </span>
              <span>Comprehensive Data Inventory &amp; Classification</span>
            </h2>
            <div className="space-y-4 text-black/80 font-medium leading-relaxed pl-1">
              <p>We categorize all information into three distinct technical tiers:</p>

              <div className="space-y-3">
                {/* Category A */}
                <div className="p-4 rounded-xl bg-white border-2 border-black shadow-neo-sm space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs font-black text-black uppercase">
                    <Lock className="w-3.5 h-3.5 text-black" />
                    <span>Tier 1: Client-Side Student Profile (No Remote Server Storage)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-black/80">
                    When you enter the campus hub, you provide your preferred{" "}
                    <strong className="text-black">name / nickname</strong> and{" "}
                    <strong className="text-black">college / campus name</strong>. This information
                    is stored exclusively in your local browser&apos;s{" "}
                    <code className="font-mono font-bold">localStorage</code> to personalize your
                    interface and display your campus benchmark. We do not maintain a user database,
                    and no passwords or email addresses are ever required.
                  </p>
                </div>

                {/* Category B */}
                <div className="p-4 rounded-xl bg-white border-2 border-black shadow-neo-sm space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs font-black text-black uppercase">
                    <EyeOff className="w-3.5 h-3.5 text-black" />
                    <span>Tier 2: Client-Side Ephemeral Variables (Strictly Non-Transmitted)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-black/80">
                    Calculated variables—including attended lectures, bunk numbers, semester marks,
                    credits, CTC packages, base salary, EPF allocations, hostel roommate expense
                    logs, and quiz selections—are{" "}
                    <strong className="text-black font-bold">never collected or uploaded</strong>.
                    Flunked.online possesses zero copies or logs of these personal values.
                  </p>
                </div>

                {/* Category C */}
                <div className="p-4 rounded-xl bg-white border-2 border-black shadow-neo-sm space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs font-black text-black uppercase">
                    <Server className="w-3.5 h-3.5 text-black" />
                    <span>Tier 3: Standard Technical Transmission Telemetry</span>
                  </div>
                  <p className="text-xs sm:text-sm text-black/80">
                    Like any secure web infrastructure, our hosting edge servers ephemerally receive
                    standard HTTP request headers—including your IP address, browser User-Agent,
                    device type, and referring URL—strictly for socket transmission, rate-limiting,
                    and volumetric DDoS defense. IP logs are automatically rotated and purged.
                  </p>
                </div>

                {/* Community Tool Suggestions Processing */}
                <div className="p-4 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs font-black text-black uppercase">
                    <FileText className="w-3.5 h-3.5 text-black" />
                    <span>Community Tool Suggestions Processing</span>
                  </div>
                  <p className="text-xs sm:text-sm text-black/80">
                    When you submit a tool suggestion, your selected tool category, college/university
                    name, optional student name (which automatically defaults to &quot;Anonymous&quot; if
                    omitted), and idea description are forwarded to Google Sheets (Google is the data
                    processor) using a secure server-to-server webhook. To prevent denial-of-service
                    abuse, your IP address is salted with a secret key, hashed with HMAC-SHA256, and
                    stored temporarily in Upstash Redis for 10 minutes before expiring. No accounts or
                    persistent user profiles are created.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section id="lawful-basis" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                4
              </span>
              <span>Lawful Grounds for Processing (DPDP Act 2023)</span>
            </h2>
            <div className="space-y-3 text-black/80 font-medium leading-relaxed pl-1">
              <p>
                Under Section 4 and Section 7 of the DPDP Act, 2023, Flunked.online collects zero
                email addresses or institutional credentials, processing technical connection data
                and voluntary user inputs solely on the following lawful statutory grounds:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm pl-2 font-medium text-black/85">
                <li>
                  <strong className="text-black">Specified Purpose Consent (Section 6):</strong> By
                  entering your student name and campus name to access calculator utilities, you
                  authorize purely local browser persistence to establish your active session.
                </li>
                <li>
                  <strong className="text-black">
                    Legitimate Uses &amp; Security Compliance (Section 7):
                  </strong>{" "}
                  Processing technical connection logs to prevent denial-of-service cyber incidents,
                  enforce rate limits, and block automated scrapers.
                </li>
              </ul>
              <p>
                We do NOT process student personal data for any purpose incompatible with the
                specific academic utility requested by you.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section id="non-disclosure" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                5
              </span>
              <span>Absolute Non-Disclosure &amp; Non-Monetization Manifesto</span>
            </h2>
            <div className="p-5 rounded-2xl bg-[#FFF5F5] border-2 border-black space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-black text-rose-700 uppercase">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Binding Guarantees of Absolute Student Confidentiality</span>
              </div>
              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm font-medium text-black/85">
                <li>
                  <strong className="text-black">Zero Institutional Reporting:</strong> Flunked.online
                  will NEVER disclose, furnish, or transmit your name, campus affiliation,
                  attendance numbers, or calculation history to any college administration, Dean of
                  Academic Affairs, Head of Department (HOD), Proctorial Board, or university
                  registrar.
                </li>
                <li>
                  <strong className="text-black">Zero Data Commercialization:</strong> We do NOT
                  sell, lease, rent, trade, or monetize student names, campus affiliations,
                  placement readiness quiz benchmarks, or salary estimations to ed-tech
                  corporations, student loan aggregators, coaching classes, or recruitment agencies.
                </li>
                <li>
                  <strong className="text-black">Zero Surveillance Advertising:</strong> We load
                  zero Meta Pixels, zero Google Tag Manager ad trackers, zero TikTok beacons, zero
                  LinkedIn Insight tags, and zero behavioral retargeting scripts.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section id="client-storage" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                6
              </span>
              <span>Local Browser Storage &amp; State Mechanics</span>
            </h2>
            <div className="space-y-3 text-black/80 font-medium leading-relaxed pl-1">
              <p>
                To provide a seamless, non-invasive experience, Flunked.online utilizes standard W3C{" "}
                <strong className="text-black font-bold">HTML5 Web Storage (localStorage)</strong>{" "}
                directly inside your browser rather than tracking cookies.
              </p>
              <div className="overflow-x-auto border-2 border-black rounded-xl">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-flunked-yellow border-b-2 border-black font-black text-black">
                    <tr>
                      <th className="p-3">Storage Key</th>
                      <th className="p-3">Mechanism</th>
                      <th className="p-3">Purpose</th>
                      <th className="p-3">Lifespan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y border-black bg-white text-black/85 font-medium">
                    <tr>
                      <td className="p-3 font-bold font-mono">flunked_user</td>
                      <td className="p-3">localStorage</td>
                      <td className="p-3 font-sans">
                        Persists student name/nickname, campus name, and session timestamp.
                      </td>
                      <td className="p-3">Until user resets profile</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold font-mono">flunked_tutorial_completed</td>
                      <td className="p-3">localStorage</td>
                      <td className="p-3 font-sans">
                        Remembers whether onboarding guide was completed or dismissed.
                      </td>
                      <td className="p-3">Persistent</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-black/70 font-mono">
                For detailed technical configurations and browser-by-browser clearing instructions,
                see our{" "}
                <Link
                  href="/cookies"
                  className="font-bold text-black underline hover:bg-flunked-yellow px-1"
                >
                  Cookie &amp; Local Storage Policy
                </Link>
                .
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section id="retention" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                7
              </span>
              <span>Data Retention Protocols &amp; Instant Session Erasure</span>
            </h2>
            <div className="space-y-3 text-black/80 font-medium leading-relaxed pl-1">
              <p>
                In accordance with Section 8(7) of the DPDP Act 2023, personal data must be erased
                as soon as the specified purpose for which it was processed is no longer being
                served.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-4 rounded-xl bg-white border-2 border-black shadow-neo-sm space-y-1.5">
                  <div className="font-mono text-xs font-black uppercase text-black flex items-center gap-1.5">
                    <Trash2 className="w-3.5 h-3.5 text-black" />
                    <span>Instant Profile Reset</span>
                  </div>
                  <p className="text-xs text-black/80 font-medium">
                    When you click &quot;Reset Profile&quot; in the profile dropdown, Flunked.online
                    executes an immediate programmatic purge of the{" "}
                    <code className="font-bold">flunked_user</code> payload from your browser&apos;s
                    local storage, severing all session data.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white border-2 border-black shadow-neo-sm space-y-1.5">
                  <div className="font-mono text-xs font-black uppercase text-black flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-black" />
                    <span>Pure In-Memory Local Search</span>
                  </div>
                  <p className="text-xs text-black/80 font-medium">
                    Queries typed into the navbar search box and Command Palette are filtered
                    strictly within local JavaScript memory and are never transmitted to any
                    analytics service or server datastore.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section id="security" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                8
              </span>
              <span>Cryptographic Safeguards &amp; Infrastructure Security</span>
            </h2>
            <div className="space-y-3 text-black/80 font-medium leading-relaxed pl-1">
              <p>
                In fulfillment of Section 8(5) of the DPDP Act and Rule 8 of the Information
                Technology SPDI Rules 2011, Flunked.online implements reasonable security practices and
                procedures:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm pl-2 font-medium text-black/85">
                <li>
                  <strong className="text-black">Transport Layer Security:</strong> All
                  client-server transmissions are strictly enforced over TLS 1.3 encryption with
                  HTTP Strict Transport Security (HSTS) headers;
                </li>
                <li>
                  <strong className="text-black">Secure Headers &amp; Content Security:</strong> We
                  deploy strict Content-Security-Policy (CSP), X-Frame-Options (DENY), and
                  X-Content-Type-Options (nosniff) headers to prevent cross-site scripting (XSS) and
                  clickjacking attacks;
                </li>
                <li>
                  <strong className="text-black">No Password Datastores:</strong> We do not store
                  student passwords, eliminating the risk of credential database leaks.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 9 */}
          <section id="principal-rights" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                9
              </span>
              <span>Data Principal Rights under Chapter III (DPDP Act 2023)</span>
            </h2>
            <div className="space-y-3 text-black/80 font-medium leading-relaxed pl-1">
              <p>
                As a student Data Principal under Chapter III of the DPDP Act, 2023, you are vested
                with specific statutory rights regarding your digital personal data:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm space-y-1">
                  <span className="font-mono text-xs font-black text-black uppercase flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-black" />
                    <span>Right to Access &amp; Summary (Sec. 11)</span>
                  </span>
                  <p className="text-xs text-black/80 font-medium">
                    You have the right to request a confirmation and summary of personal data held,
                    identities of any service processors, and categories of processing.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm space-y-1">
                  <span className="font-mono text-xs font-black text-black uppercase flex items-center gap-1.5">
                    <Trash2 className="w-3.5 h-3.5 text-black" />
                    <span>Right to Correction &amp; Erasure (Sec. 12)</span>
                  </span>
                  <p className="text-xs text-black/80 font-medium">
                    You have full autonomy to update or clear your stored name and campus at any
                    time directly through the client-side profile menu without submitting
                    administrative requests.
                  </p>
                </div>
              </div>
              <p className="text-xs sm:text-sm font-medium text-black/80 pt-1">
                For any privacy or data rights inquiries under the DPDP Act, contact our designated
                desk at <code className="font-mono font-bold">privacy@flunked.online</code>.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section id="minors" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                10
              </span>
              <span>Protection of Students &amp; Minors under Section 9</span>
            </h2>
            <div className="space-y-3 text-black/80 font-medium leading-relaxed pl-1">
              <p>
                Section 9 of the DPDP Act, 2023 prescribes specific obligations regarding the
                personal data of children (individuals under eighteen years of age). While
                Flunked.online is targeted primarily at university students who have completed
                secondary school, we strictly abide by the following protective mandates:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm pl-2 font-medium text-black/85">
                <li>
                  We do NOT engage in behavioral monitoring, psychological profiling, or targeted
                  advertising directed at any user;
                </li>
                <li>
                  We do NOT process personal data in any manner likely to cause detrimental effects
                  to the well-being or physical safety of young students;
                </li>
                <li>
                  Calculators remain strictly neutral mathematical tools devoid of manipulative
                  gamification algorithms.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 11 */}
          <section id="transfers" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                11
              </span>
              <span>Data Locality &amp; Cross-Border Transfer Boundaries</span>
            </h2>
            <div className="space-y-3 text-black/80 font-medium leading-relaxed pl-1">
              <p>
                Flunked.online prioritizes Indian domestic cloud edge infrastructure. Any operational
                transmission of technical telemetry complies with Section 16 of the DPDP Act, 2023.
                We do NOT transfer student personal data to any foreign country or territory
                blacklisted or restricted by the Central Government of India.
              </p>
            </div>
          </section>

          {/* Section 12 */}
          <section id="dpo" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                12
              </span>
              <span>Data Protection Officer &amp; Grievance Redressal (DPBI)</span>
            </h2>
            <div className="space-y-3 text-black/80 font-medium leading-relaxed pl-1">
              <p>
                In compliance with Section 13 of the DPDP Act, 2023 and Rule 3(2) of the Information
                Technology Rules, 2021, Flunked.online has designated a Nodal Data Protection &amp;
                Grievance Officer:
              </p>
              <div className="p-5 rounded-2xl bg-flunked-bg border-2 border-black shadow-neo space-y-3 font-mono text-xs sm:text-sm">
                <div className="flex items-center gap-2 font-black text-black text-sm uppercase">
                  <Shield className="w-4 h-4 text-black" />
                  <span>Statutory Data Protection Office</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-black/90 font-medium">
                  <div>
                    <span className="text-black/60 block text-[11px] uppercase font-bold">
                      Designation
                    </span>
                    <span className="font-bold text-black">
                      Nodal Data Protection &amp; Grievance Officer
                    </span>
                  </div>
                  <div>
                    <span className="text-black/60 block text-[11px] uppercase font-bold">
                      Institutional Domain Desk
                    </span>
                    <span className="font-bold text-black">
                      Flunked.online Privacy &amp; Data Rights Bureau
                    </span>
                  </div>
                  <div>
                    <span className="text-black/60 block text-[11px] uppercase font-bold">
                      Privacy Electronic Mail
                    </span>
                    <a
                      href="mailto:privacy@flunked.online"
                      className="font-bold text-black underline hover:bg-flunked-yellow"
                    >
                      privacy@flunked.online
                    </a>
                  </div>
                  <div>
                    <span className="text-black/60 block text-[11px] uppercase font-bold">
                      Formal Grievances
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
                      Statutory SLA
                    </span>
                    <span className="font-bold text-black">
                      Acknowledgment within 48h; resolution within 30 days
                    </span>
                  </div>
                  <div>
                    <span className="text-black/60 block text-[11px] uppercase font-bold">
                      Appellate Regulatory Body
                    </span>
                    <span className="font-bold text-black">
                      Data Protection Board of India (DPBI)
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-black/70 pt-1">
                If you are not satisfied with the resolution provided by our Grievance Officer
                within 30 days, you retain the statutory right under Section 13(4) of the DPDP Act
                to file a complaint before the{" "}
                <strong className="text-black font-bold">
                  Data Protection Board of India (DPBI)
                </strong>
                .
              </p>
            </div>
          </section>
        </div>

        {/* Footer Note */}
        <footer className="pt-6 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-black/70">
          <div>
            <span>© {new Date().getFullYear()} Flunked.online. DPDP Act (India) Protected.</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/terms" className="hover:text-black underline">
              Terms of Service
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
