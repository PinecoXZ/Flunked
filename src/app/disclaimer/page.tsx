import Link from "next/link";
import {
  AlertCircle,
  BookOpen,
  GraduationCap,
  Building2,
  Landmark,
  ShieldAlert,
  Clock,
  Briefcase,
  Flame,
  PhoneCall,
  Coins,
  FileSpreadsheet,
  ChevronRight,
} from "lucide-react";
import { LegalNav } from "@/components/layout/LegalNav";
import { SubpageHeader } from "@/components/layout/SubpageHeader";

export const metadata = {
  title: "Academic & Operational Disclaimer",
  description:
    "Official Academic Disclaimer, Institutional Non-Affiliation Declaration, and Tool-by-Tool Regulatory Assumptions for Flunked.online.",
  alternates: {
    canonical: "https://flunked.online/disclaimer",
  },
};

export default function DisclaimerPage() {
  const sections = [
    { id: "non-affiliation", title: "1. Institutional Non-Affiliation & Trademark Notice" },
    { id: "erp-primacy", title: "2. Primacy of Official College ERPs & Ordinances" },
    {
      id: "attendance-tools",
      title: "3. Attendance & Bunk Models (Bunk Calculator & Attend/Skip)",
    },
    { id: "cgpa-tools", title: "4. Grading & Academic Curves (CGPA & Semester Survival)" },
    { id: "backlog-tools", title: "5. Backlog Rules & N+2 Year-Back Regulations" },
    { id: "ctc-tools", title: "6. CTC Salary & Taxation Disclaimers (Income Tax Act & EPF)" },
    { id: "placement-quiz", title: "7. Placement Benchmarking & Career Outcomes" },
    { id: "expense-tools", title: "8. Hostel Expense Splitter & RBI Non-Banking Notice" },
    { id: "stress-tools", title: "9. Academic Stress & Crisis Helplines (Tele-MANAS)" },
    { id: "due-diligence", title: "10. Student Due Diligence & Disciplinary Indemnity" },
  ];

  return (
    <div className="flex-1 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      {/* Breadcrumbs & Back button */}
      <SubpageHeader breadcrumbLabel="Disclaimer" backLabel="Back to Tools Hub" />

      {/* Shared Legal Navigation */}
      <LegalNav />

      {/* Main Legal Card */}
      <article className="bg-white border-2 border-black rounded-2xl p-6 sm:p-12 shadow-neo space-y-10">
        {/* Document Header */}
        <header className="border-b-2 border-black pb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-flunked-yellow border-2 border-black text-xs font-mono font-black text-black shadow-neo-sm">
              <AlertCircle className="w-3.5 h-3.5 text-black" />
              <span>STATUTORY INSTITUTIONAL NOTICE</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-flunked-bg border-2 border-black text-xs font-mono font-bold text-black">
              <Clock className="w-3.5 h-3.5 text-black/70" />
              <span>Covers All 19 Algorithmic Tools</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-black text-white text-xs font-mono font-bold">
              <span>Independent Student Software</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight leading-tight">
            Academic &amp; Operational Disclaimer
          </h1>

          <p className="text-xs sm:text-sm font-mono text-black/70 font-semibold leading-relaxed">
            This document outlines the strict operational boundaries, statutory limitations, and
            tool-by-tool mathematical assumptions governing Flunked.online under Indian higher
            education ordinances, labor laws, and financial statutes.
          </p>
        </header>

        {/* Highlighted Non-Affiliation Banner */}
        <section className="p-6 rounded-2xl bg-flunked-bg border-2 border-black shadow-neo-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-black uppercase text-black">
            <Building2 className="w-4 h-4 text-black" />
            <span>Statutory Non-Affiliation Declaration</span>
          </div>
          <p className="text-xs sm:text-sm text-black/85 font-medium leading-relaxed font-sans">
            <strong className="text-black font-black">
              Flunked.online is an independent, student-built mathematical utility platform.
            </strong>{" "}
            It is NOT affiliated with, authorized by, sponsored by, endorsed by, or associated in
            any official capacity with the University Grants Commission (UGC), the All India Council
            for Technical Education (AICTE), the Ministry of Education (MoE), or any central
            institute, autonomous university, deemed-to-be-university, state technical board, or
            private college in India (including, but not limited to, Indian Institutes of Technology
            [IITs], National Institutes of Technology [NITs], BITS Pilani, VIT Vellore, SRM
            Institute of Science and Technology, Delhi Technological University [DTU], University of
            Delhi [DU], Anna University, VTU, JNTU, or Mumbai University).
          </p>
          <p className="text-xs font-mono text-black/70 font-bold pt-1">
            All institutional trademarks, college domain names, and campus insignias referenced on
            this platform are used exclusively for descriptive, nominative fair-use identification
            purposes under Section 30 of the Trade Marks Act, 1999.
          </p>
        </section>

        {/* Table of Contents / Interactive Jump Links */}
        <section className="p-6 rounded-2xl bg-white border-2 border-black shadow-neo-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-black uppercase tracking-wider text-black">
            <BookOpen className="w-4 h-4 text-black" />
            <span>Disclaimer Table of Contents &amp; Tool Sections</span>
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

        {/* Disclaimer Sections Body */}
        <div className="space-y-12 text-black/90 font-sans leading-relaxed text-sm sm:text-base divide-y-2 divide-black/10">
          {/* Section 1 */}
          <section id="non-affiliation" className="space-y-4 pt-6">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                1
              </span>
              <span>Institutional Non-Affiliation &amp; Nominative Fair Use</span>
            </h2>
            <div className="space-y-3 text-black/80 font-medium leading-relaxed pl-1">
              <p>
                Flunked.online operates entirely free from institutional patronage. When a student
                enters their campus name (such as{" "}
                <code className="font-mono font-bold bg-flunked-yellow/40 px-1 rounded border border-black/20">
                  IIT Bombay
                </code>{" "}
                or{" "}
                <code className="font-mono font-bold bg-flunked-yellow/40 px-1 rounded border border-black/20">
                  BITS Pilani
                </code>
                ) during local profile onboarding, such information is utilized strictly on the
                client side to personalize their browser workspace.
              </p>
              <p>
                Mention of any university, college, institute of national importance, or educational
                testing agency does NOT imply that such institution has reviewed, audited,
                calibrated, or certified the mathematical algorithms used on Flunked.online.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="erp-primacy" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                2
              </span>
              <span>Primacy of Official College ERPs &amp; Academic Ordinances</span>
            </h2>
            <div className="space-y-3 text-black/80 font-medium leading-relaxed pl-1">
              <div className="p-5 rounded-2xl bg-[#FFF5F5] border-2 border-black space-y-2">
                <div className="flex items-center gap-2 font-mono text-xs font-black uppercase text-rose-700">
                  <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>The Primacy Doctrine</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-black leading-relaxed">
                  YOUR COLLEGE&apos;S STATUTORY ACADEMIC ORDINANCES, EXAMINATION CIRCULARS, AND
                  OFFICIAL ERP SYSTEMS (SUCH AS SAP SLCM, TCS iON, COLLPOLL, ACADEMIA ERP, CONTINEO,
                  CAMU, OR UNIVERSITY GAZETTES) ARE THE ONLY LEGALLY RECOGNIZED MEASURE OF YOUR
                  ACADEMIC STATUS.
                </p>
                <p className="text-xs text-black/80 font-medium">
                  If any discrepancy arises between a calculation produced on Flunked.online and your
                  college&apos;s ERP database, your college&apos;s official ERP record shall be
                  conclusive, final, and absolute.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="attendance-tools" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                3
              </span>
              <span>Attendance &amp; Bunk Calculators (Bunk Calculator &amp; Attend or Skip)</span>
            </h2>
            <div className="space-y-4 text-black/80 font-medium leading-relaxed pl-1">
              <div className="p-4 rounded-xl bg-white border-2 border-black shadow-neo-sm space-y-2">
                <div className="flex items-center gap-2 font-mono text-xs font-black text-black uppercase">
                  <GraduationCap className="w-4 h-4 text-black" />
                  <span>
                    Applicable to Tools: Bunk Calculator &amp; Should I Attend This Lecture?
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-black/85">
                  The Bunk Calculator evaluates the standard statutory{" "}
                  <strong className="text-black font-bold">75% minimum attendance rule</strong>{" "}
                  mandated by the University Grants Commission (UGC) and the All India Council for
                  Technical Education (AICTE). However, users must account for severe real-world
                  operational variations:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-xs text-black/80 pl-1">
                  <li>
                    <strong className="text-black">Faculty Discretion:</strong> Professors retain
                    absolute prerogative over classroom roll calls, unannounced surprise quizzes,
                    and biometric/RFID verification. A professor may mark proxy attendance as absent
                    or cancel attendance for classroom misconduct;
                  </li>
                  <li>
                    <strong className="text-black">Lab vs. Lecture Weightings:</strong> In many
                    engineering curricula, practical lab sessions carry double attendance weight, or
                    require a mandatory 80%–85% threshold independent of theory classes;
                  </li>
                  <li>
                    <strong className="text-black">Condonation Caps:</strong> Medical Leave (ML),
                    Duty Leave (DL) for college fests, or Sports Quota condonations are strictly
                    subject to administrative approval by the Dean or Vice-Chancellor upon
                    submission of certified hospital discharge summaries;
                  </li>
                  <li>
                    <strong className="text-black">Attendance Debarment:</strong> Flunked.online
                    accepts ZERO liability if a student misses lectures in reliance upon our
                    calculations and subsequently receives an attendance shortage notice, is
                    debarred from end-sem examinations, or has their admit card / hall ticket
                    withheld.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section id="cgpa-tools" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                4
              </span>
              <span>Grading &amp; Academic Curves (CGPA &amp; Semester Survival Check)</span>
            </h2>
            <div className="space-y-4 text-black/80 font-medium leading-relaxed pl-1">
              <div className="p-4 rounded-xl bg-white border-2 border-black shadow-neo-sm space-y-2">
                <div className="flex items-center gap-2 font-mono text-xs font-black text-black uppercase">
                  <BookOpen className="w-4 h-4 text-black" />
                  <span>Applicable to Tools: CGPA Calculator &amp; Semester Survival Check</span>
                </div>
                <p className="text-xs sm:text-sm text-black/85">
                  The CGPA Calculator computes weighted grade point averages based upon standard
                  10-point scales and AICTE percentage conversion recommendations. However:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-xs text-black/80 pl-1">
                  <li>
                    <strong className="text-black">Conversion Formula Multiplicity:</strong>{" "}
                    Different universities enforce contradictory percentage formulas (e.g., VTU uses{" "}
                    <code className="font-mono font-bold">[CGPA - 0.75] * 10</code>, Mumbai
                    University uses specific linear equations, CBSE/AICTE historically used{" "}
                    <code className="font-mono font-bold">CGPA * 9.5</code>, while other colleges
                    use a direct 10-multiplier). The user must independently verify which formula
                    their institute&apos;s Registrar mandates;
                  </li>
                  <li>
                    <strong className="text-black">Relative Bell Curves:</strong> In institutions
                    utilizing relative grading (such as IITs, NITs, and BITS Pilani), grade
                    thresholds depend on statistical cohort standard deviations (
                    <code className="font-mono">μ ± σ</code>) and fluctuate each semester;
                  </li>
                  <li>
                    <strong className="text-black">Separate Theory Passing Criteria:</strong> In the
                    Semester Survival Check, passing an overall subject frequently requires securing
                    a minimum percentage (often 35%–40%) in the end-sem theory paper independently
                    of high continuous internal assessment (CIA) scores.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section id="backlog-tools" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                5
              </span>
              <span>Backlog Rules &amp; N+2 Year-Back Regulations</span>
            </h2>
            <div className="space-y-4 text-black/80 font-medium leading-relaxed pl-1">
              <div className="p-4 rounded-xl bg-white border-2 border-black shadow-neo-sm space-y-2">
                <div className="flex items-center gap-2 font-mono text-xs font-black text-black uppercase">
                  <FileSpreadsheet className="w-4 h-4 text-black" />
                  <span>Applicable to Tool: Backlog Planner</span>
                </div>
                <p className="text-xs sm:text-sm text-black/85">
                  The Backlog Planner assists with organizing multi-semester supplementary exam
                  roadmaps. Users must observe that:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-xs text-black/80 pl-1">
                  <li>
                    <strong className="text-black">Year-Back &amp; Promotion Ordinances:</strong>{" "}
                    Many autonomous colleges prohibit students from registering for 3rd year or 4th
                    year coursework if they possess pending backlogs from 1st year subjects
                    (&quot;Critical Backlog Rules&quot;);
                  </li>
                  <li>
                    <strong className="text-black">UGC N+2 Degree Time Caps:</strong> Under UGC
                    guidelines, undergraduate degrees have a strict maximum completion period
                    (typically Normal Duration N + 2 years, e.g., 6 years for a 4-year B.Tech).
                    Exceeding this cap results in academic registration forfeiture;
                  </li>
                  <li>
                    <strong className="text-black">Timetable Clashes:</strong> Universities often
                    schedule supplementary examinations concurrently with regular semester exams.
                    Flunked.online cannot predict institutional exam timetable conflicts.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section id="ctc-tools" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                6
              </span>
              <span>CTC Salary &amp; Taxation Disclaimers (Income Tax Act &amp; EPF)</span>
            </h2>
            <div className="space-y-4 text-black/80 font-medium leading-relaxed pl-1">
              <div className="p-5 rounded-2xl bg-white border-2 border-black shadow-neo-sm space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs font-black text-black uppercase">
                  <Landmark className="w-4 h-4 text-black" />
                  <span>
                    Statutory Non-Financial Advice Declaration (CTC to In-Hand Calculator)
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-black/85 font-medium leading-relaxed">
                  THE CTC IN-HAND CALCULATOR IS A GENERALIZED MATHEMATICAL ESTIMATOR AND DOES NOT
                  CONSTITUTE CHARTERED ACCOUNTANT (CA), LEGAL, TAX, OR FINANCIAL PLANNING ADVICE
                  UNDER THE INSTITUTE OF CHARTERED ACCOUNTANTS OF INDIA (ICAI) OR SEBI REGULATIONS.
                </p>
                <div className="space-y-2 text-xs text-black/80">
                  <p>
                    <strong className="text-black">• Income Tax Act, 1961:</strong> Calculations
                    model the New Tax Regime (Section 115BAC) as amended by recent Union Budgets,
                    incorporating the standard deduction, Section 87A rebate thresholds, and the
                    mandatory 4% Health and Education Cess. They do not account for individual tax
                    deductions under the Old Tax Regime (Section 80C, 80D, HRA exemptions), personal
                    capital gains, or foreign income.
                  </p>
                  <p>
                    <strong className="text-black">• Employee Provident Fund (EPF):</strong> EPF
                    deductions assume standard statutory 12% employee contributions on Basic Pay.
                    Corporate Flexible Benefit Plans (FBP) or voluntary higher contributions (VPF)
                    will alter monthly in-hand deposits.
                  </p>
                  <p>
                    <strong className="text-black">• Gratuity &amp; Retention Clauses:</strong>{" "}
                    Deductions for Gratuity (Payment of Gratuity Act, 1972) are calculated at 4.81%
                    of basic salary but are legally payable only after 5 years of continuous
                    service. Joining bonuses frequently contain 1-year or 2-year retention clawback
                    provisions if you resign early.
                  </p>
                  <p>
                    <strong className="text-black">• State Professional Tax (PT):</strong> State PT
                    slabs vary across Maharashtra, Karnataka, Telangana, West Bengal, and Tamil
                    Nadu. The calculator applies standard metro averages.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section id="placement-quiz" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                7
              </span>
              <span>Placement Benchmarking &amp; Career Outcomes</span>
            </h2>
            <div className="space-y-4 text-black/80 font-medium leading-relaxed pl-1">
              <div className="p-4 rounded-xl bg-white border-2 border-black shadow-neo-sm space-y-2">
                <div className="flex items-center gap-2 font-mono text-xs font-black text-black uppercase">
                  <Briefcase className="w-4 h-4 text-black" />
                  <span>
                    Applicable to Tools: Placement Readiness Quiz, LinkedIn Bio Auditor &amp; Is
                    This Stipend Good?
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-black/85">
                  The Placement Readiness Quiz, LinkedIn Bio Auditor, and Stipend Checker offer
                  automated self-benchmarking heuristics across Data Structures &amp; Algorithms,
                  profile completeness, internship living costs, and interview composure. Scoring
                  high on these diagnostics provides ZERO legal guarantee or representation that you
                  will receive job offers, clear Day 1 on-campus hiring assessments, or pass
                  corporate recruitment panels.
                </p>
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section id="expense-tools" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                8
              </span>
              <span>Hostel Expense Splitter &amp; RBI Non-Banking Notice</span>
            </h2>
            <div className="space-y-4 text-black/80 font-medium leading-relaxed pl-1">
              <div className="p-4 rounded-xl bg-white border-2 border-black shadow-neo-sm space-y-2">
                <div className="flex items-center gap-2 font-mono text-xs font-black text-black uppercase">
                  <Coins className="w-4 h-4 text-black" />
                  <span>Applicable to Tool: Hostel Expense Splitter</span>
                </div>
                <p className="text-xs sm:text-sm text-black/85">
                  The Hostel Expense Splitter executes a purely mathematical graph minimization
                  algorithm to compute minimal peer-to-peer settlement transactions. Flunked.online is
                  NOT a bank, non-banking financial company (NBFC), payment aggregator, or prepaid
                  payment instrument (PPI) issuer under the{" "}
                  <strong className="text-black font-bold">
                    Payment and Settlement Systems Act, 2007
                  </strong>
                  .
                </p>
                <p className="text-xs text-black/80">
                  Flunked.online does not hold, escrow, process, or transmit fiat currency. All
                  settlements are executed directly between users via external third-party UPI
                  applications (such as Google Pay, PhonePe, Paytm). Flunked.online bears zero
                  responsibility for unpaid roommate debts, banking transfer failures, or UPI fraud.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white border-2 border-black shadow-neo-sm space-y-2 mt-4">
                <div className="flex items-center gap-2 font-mono text-xs font-black text-black uppercase">
                  <Coins className="w-4 h-4 text-black" />
                  <span>Voluntary Creator Contributions (&quot;Buy Me a Coffee&quot;)</span>
                </div>
                <p className="text-xs sm:text-sm text-black/85">
                  Any voluntary contributions or tips transferred via external links (such as Buy Me
                  a Coffee) represent purely gratuitous gifts to support hosting costs and
                  maintenance. Such contributions do NOT constitute fees for software services, do
                  NOT purchase service warranties, and do NOT alter the free, non-commercial,
                  &quot;as-is&quot; academic heuristic nature of Flunked.online.
                </p>
              </div>
            </div>
          </section>

          {/* Section 9 */}
          <section id="stress-tools" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                9
              </span>
              <span>Academic Stress, Lifestyle Heuristics &amp; Mental Health Helplines</span>
            </h2>
            <div className="space-y-4 text-black/80 font-medium leading-relaxed pl-1">
              <div className="p-4 rounded-xl bg-white border-2 border-black shadow-neo-sm space-y-2">
                <div className="flex items-center gap-2 font-mono text-xs font-black text-black uppercase">
                  <Flame className="w-4 h-4 text-black" />
                  <span>
                    Applicable to Tools: Am I Cooked?, Assignment Panic, Mess Calories, Sleep Debt
                    &amp; Satirical Diagnostics
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-black/85">
                  Tools including &quot;Am I Cooked?&quot;, &quot;Assignment Panic Calculator&quot;,
                  &quot;Mess Food Calorie Estimator&quot;, &quot;Sleep Debt Calculator&quot;,
                  &quot;What Tier Engineer Are You?&quot;, &quot;Which Startup Should You
                  Build?&quot;, &quot;How Indian College Student Are You?&quot;, and &quot;CGPA →
                  Marriage Prospects&quot; are designed with satirical humor, cultural archetypes,
                  and student coping heuristics. They do NOT constitute clinical psychological
                  advice, dietary/nutritional prescriptions, medical sleep diagnoses, or matrimonial
                  matching endorsements.
                </p>
              </div>

              {/* National Helplines Box */}
              <div className="p-4 rounded-xl bg-flunked-bg border-2 border-black shadow-neo space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-black text-black uppercase">
                  <PhoneCall className="w-4 h-4 text-black" />
                  <span>Official National Student Mental Health Support Resources</span>
                </div>
                <p className="text-xs text-black/85 font-medium">
                  If you are experiencing severe academic anxiety, panic, or distress, please reach
                  out to official government counseling services:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono font-bold pt-1">
                  <div className="p-2.5 bg-white rounded-lg border border-black space-y-0.5">
                    <span className="text-black font-black block">
                      Tele-MANAS (Ministry of Health)
                    </span>
                    <span className="text-black/70">Toll-Free 24/7: </span>
                    <a href="tel:14416" className="text-black font-black underline">
                      14416
                    </a>
                    <span className="text-black/70"> or </span>
                    <a href="tel:18008914416" className="text-black font-black underline">
                      1800-891-4416
                    </a>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-black space-y-0.5">
                    <span className="text-black font-black block">
                      Kiran Mental Health Helpline
                    </span>
                    <span className="text-black/70">Toll-Free: </span>
                    <a href="tel:18005990019" className="text-black font-black underline">
                      1800-599-0019
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 10 */}
          <section id="due-diligence" className="space-y-4 pt-8">
            <h2 className="text-xl sm:text-2xl font-black text-black font-mono tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-sm font-black shrink-0 shadow-neo-sm">
                10
              </span>
              <span>Student Due Diligence &amp; Disciplinary Indemnity Covenant</span>
            </h2>
            <div className="space-y-3 text-black/80 font-medium leading-relaxed pl-1">
              <p>
                By accessing Flunked.online, you make an affirmative and irrevocable covenant that:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm pl-2 font-medium text-black/85">
                <li>
                  You shall NOT cite, introduce, or present Flunked.online calculation outputs as
                  evidence, legal justification, or mitigating defense in any university
                  disciplinary committee hearing, proctorial inquiry, attendance appeal, or judicial
                  proceeding against an educational institution;
                </li>
                <li>
                  You bear the exclusive, unassignable responsibility for cross-checking all
                  attendance and grade projections against your official institutional ERP portal;
                </li>
                <li>
                  You acknowledge that skipping lectures, missing exam submissions, or
                  underestimating tax obligations based on platform tools is entirely at your own
                  academic, financial, and legal peril.
                </li>
              </ol>
            </div>
          </section>
        </div>

        {/* Footer Note */}
        <footer className="pt-6 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-black/70">
          <div>
            <span>© {new Date().getFullYear()} Flunked.online. Standard Academic Disclaimer.</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/terms" className="hover:text-black underline">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-black underline">
              Privacy Policy
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
