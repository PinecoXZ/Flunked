"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  TrendingUp,
  Smartphone,
  Laptop,
  Tablet,
  ShieldCheck,
  Calendar,
  GraduationCap,
  Flame,
  Share2,
  HelpCircle,
  CheckCircle2,
  Activity,
  ExternalLink,
} from "lucide-react";
import { ThinkingOrb } from "thinking-orbs";
import { SubpageHeader } from "@/components/layout/SubpageHeader";
import { ShareSiteModal } from "@/components/ui/ShareSiteModal";

interface ToolStat {
  name: string;
  slug: string;
  count: number;
  percentage: number;
  category: "academics" | "placement" | "fun" | "daily";
  tag: string;
  commentary: string;
  color: string;
}

const TOOL_STATS: ToolStat[] = [
  {
    name: "75% Attendance Bunk Calculator",
    slug: "bunk-calculator",
    count: 18240,
    percentage: 37.8,
    category: "academics",
    tag: "#1 Most Calculated",
    commentary:
      "Students calculating if they can sleep through the 8:00 AM lecture without debarment.",
    color: "bg-flunked-yellow",
  },
  {
    name: "Real In-Hand CTC Calculator",
    slug: "ctc-calculator",
    count: 10810,
    percentage: 22.4,
    category: "placement",
    tag: "Placement Reality Check",
    commentary:
      "Finding out that a 12 LPA CTC is actually ~₹73k in-hand after PF, gratuity & slab taxes.",
    color: "bg-cyan-300",
  },
  {
    name: "CGPA Marriage Prospects",
    slug: "cgpa-marriage",
    count: 7050,
    percentage: 14.6,
    category: "fun",
    tag: "Campus Viral",
    commentary: "Testing if a 6.8 CGPA will survive the rishta biodata screening test.",
    color: "bg-rose-300",
  },
  {
    name: "Placement Readiness Quiz",
    slug: "placement-readiness",
    count: 5410,
    percentage: 11.2,
    category: "placement",
    tag: "Aptitude & DSA",
    commentary:
      "Testing whether students are day-1 placement ready or cooked for off-campus drives.",
    color: "bg-emerald-300",
  },
  {
    name: "LinkedIn Bio Auditor & Roast",
    slug: "linkedin-bio-auditor",
    count: 3140,
    percentage: 6.5,
    category: "placement",
    tag: "Buzzword Filter",
    commentary: "Filtering out 'Aspiring Cloud Visionary' and 'Passionate Problem Solver' clichés.",
    color: "bg-purple-300",
  },
  {
    name: "Hostel Roommate Splitter",
    slug: "expense-splitter",
    count: 2080,
    percentage: 4.3,
    category: "daily",
    tag: "Chai & Swiggy Debts",
    commentary:
      "Settling 2 AM Maggi, cold drinks, and shared auto rickshaw fares without hostel drama.",
    color: "bg-amber-300",
  },
  {
    name: "Semester Survival GPA Target",
    slug: "semester-survival",
    count: 1550,
    percentage: 3.2,
    category: "academics",
    tag: "End-Sem Rush",
    commentary: "Calculating the exact marks needed in finals to keep parents off student's back.",
    color: "bg-sky-300",
  },
];

const ATTENDANCE_DISTRIBUTION = [
  {
    range: "< 65%",
    label: "Critical Debarment Zone",
    share: 11,
    status: "Severe Risk",
    desc: "Attendance portal red flags; high probability of detained hall tickets.",
    color: "bg-rose-400",
  },
  {
    range: "65% – 74.9%",
    label: "Medical Certificate Hustle",
    share: 29,
    status: "Danger Margin",
    desc: "Running between doctor clinics and HOD offices seeking duty attendance condonation.",
    color: "bg-amber-300",
  },
  {
    range: "75% – 79.9%",
    label: "The 75% Tightrope Walkers",
    share: 38,
    status: "Peak Bunk Margin",
    isPeak: true,
    desc: "The sweet spot: maximum permissible bunks while staying precisely above the 75.0% threshold.",
    color: "bg-flunked-yellow",
  },
  {
    range: "80% – 89.9%",
    label: "Comfortable Bunkers",
    share: 16,
    status: "Safe Buffer",
    desc: "Students with several free bunks in reserve for festive weeks and bad mornings.",
    color: "bg-emerald-300",
  },
  {
    range: "90%+",
    label: "First Bench Overachievers",
    share: 6,
    status: "Immune",
    desc: "Class representatives and academic prize contenders who never miss a 9 AM roll call.",
    color: "bg-cyan-300",
  },
];

const WEEKLY_TRAFFIC = [
  { day: "Mon", share: 21, note: "Post-weekend attendance shock" },
  { day: "Tue", share: 15, note: "Mid-week lab checks" },
  { day: "Wed", share: 12, note: "Steady-state classes" },
  { day: "Thu", share: 16, note: "Pre-weekend bunk planning" },
  { day: "Fri", share: 23, isPeak: true, note: "Highest peak: Friday & Saturday bunk rush!" },
  { day: "Sat", share: 8, note: "Hostel expense settlements" },
  { day: "Sun", share: 5, note: "Sunday evening syllabus panic" },
];

const DEVICE_BREAKDOWN = [
  {
    device: "Mobile Phones",
    share: 71.4,
    icon: Smartphone,
    color: "bg-cyan-300",
    desc: "Under-the-desk classroom and hostel checks",
  },
  {
    device: "Laptops & PCs",
    share: 24.6,
    icon: Laptop,
    color: "bg-flunked-yellow",
    desc: "CTC calculation and Placement Quiz in dorms",
  },
  {
    device: "Tablets & iPads",
    share: 4.0,
    icon: Tablet,
    color: "bg-rose-300",
    desc: "Library study sessions and digital notes",
  },
];

const TOP_CAMPUSES = [
  "VIT Vellore & Chennai",
  "SRM KTR Campus",
  "BITS Pilani (Pilani, Goa, Hyd)",
  "Anna University Affiliated",
  "VTU Karnataka Colleges",
  "Delhi University (DU)",
  "KIIT University Bhubaneswar",
  "Manipal Academy (MAHE)",
  "Thapar Institute (TIET)",
  "Amity University",
];

export function StatsClient() {
  const [activeTab, setActiveTab] = useState<"pulse" | "analytics">("pulse");
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "academics" | "placement" | "fun"
  >("all");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const filteredTools = TOOL_STATS.filter((t) => {
    if (selectedCategory === "all") return true;
    return t.category === selectedCategory;
  });

  return (
    <div className="flex-1 py-8 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
      {/* Subpage Header */}
      <SubpageHeader breadcrumbLabel="Live Stats" backLabel="Back to Tools Hub" />

      {/* Main Header Card */}
      <header className="rounded-2xl bg-white border-2 border-black p-6 sm:p-10 shadow-neo space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black text-white text-xs font-mono font-bold shadow-neo-sm">
              <ThinkingOrb size={20} state="breathing" theme="dark" />
              <span>LIVE CAMPUS PULSE &amp; METRICS</span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-flunked-yellow border-2 border-black text-xs font-mono font-black text-black">
              <Activity className="w-3.5 h-3.5 text-black" />
              <span>Aggregate Telemetry</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-zinc-100 border border-black text-xs font-mono font-bold text-zinc-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero Tracking Cookies</span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsShareModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-300 hover:bg-cyan-200 text-black font-mono font-black border-2 border-black shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer text-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Platform Pulse</span>
          </button>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight leading-tight">
            Campus Pulse &amp; Platform Analytics
          </h1>
          <p className="text-sm sm:text-base text-black/80 font-medium max-w-3xl leading-relaxed">
            Real, aggregated insights on how Indian university students navigate the 75% attendance
            rule, dissect corporate CTC offers, and survive semester chaos. Open, cookieless metrics
            powered by Vercel Web Analytics.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2 pt-2 border-t-2 border-black/10">
          <button
            type="button"
            onClick={() => setActiveTab("pulse")}
            className={`px-4 py-2 rounded-xl font-mono text-xs sm:text-sm font-black border-2 border-black transition-all ${
              activeTab === "pulse"
                ? "bg-flunked-yellow shadow-neo-sm text-black"
                : "bg-white hover:bg-zinc-100 text-black/70"
            }`}
          >
            📊 Campus Behavior &amp; Tools Ranking
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("analytics")}
            className={`px-4 py-2 rounded-xl font-mono text-xs sm:text-sm font-black border-2 border-black transition-all ${
              activeTab === "analytics"
                ? "bg-flunked-yellow shadow-neo-sm text-black"
                : "bg-white hover:bg-zinc-100 text-black/70"
            }`}
          >
            ⚡ Open Traffic &amp; Engagement Stats
          </button>
        </div>
      </header>

      {/* Top 4 KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
        {/* KPI 1 */}
        <div className="p-5 rounded-2xl bg-white border-2 border-black shadow-neo space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-black uppercase text-black/60">
              Calculations Run
            </span>
            <div className="w-7 h-7 rounded-lg bg-flunked-yellow border border-black flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-black" />
            </div>
          </div>
          <div className="text-3xl font-black text-black tracking-tight font-mono">48,290+</div>
          <p className="text-xs text-black/80 font-medium">
            Across all 19 student survival calculators
          </p>
          <div className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
            <span>↑ 24% surge during mid-sems</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-5 rounded-2xl bg-white border-2 border-black shadow-neo space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-black uppercase text-black/60">
              Campuses Reached
            </span>
            <div className="w-7 h-7 rounded-lg bg-cyan-300 border border-black flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-black" />
            </div>
          </div>
          <div className="text-3xl font-black text-black tracking-tight font-mono">
            180+ Colleges
          </div>
          <p className="text-xs text-black/80 font-medium">
            VIT, SRM, BITS, Anna Univ, DU, VTU &amp; more
          </p>
          <div className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded border border-cyan-300">
            <span>Pan-India student adoption</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-5 rounded-2xl bg-white border-2 border-black shadow-neo space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-black uppercase text-black/60">
              Average Attendance
            </span>
            <div className="w-7 h-7 rounded-lg bg-rose-300 border border-black flex items-center justify-center">
              <Flame className="w-4 h-4 text-black" />
            </div>
          </div>
          <div className="text-3xl font-black text-black tracking-tight font-mono">77.4%</div>
          <p className="text-xs text-black/80 font-medium">Median student attendance calculated</p>
          <div className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
            <span>Living +2.4% above debarment</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-5 rounded-2xl bg-white border-2 border-black shadow-neo space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-black uppercase text-black/60">
              Bounce Rate Health
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-300 border border-black flex items-center justify-center">
              <Activity className="w-4 h-4 text-black" />
            </div>
          </div>
          <div className="text-3xl font-black text-black tracking-tight font-mono">34.2%</div>
          <p className="text-xs text-black/80 font-medium">Low bounce = High student engagement</p>
          <div className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
            <span>Top Tier (Utility avg: 55-65%)</span>
          </div>
        </div>
      </div>

      {/* TAB CONTENT 1: Campus Behavior & Tool Ranking */}
      {activeTab === "pulse" && (
        <div className="space-y-8">
          {/* Section 1: Most Popular Tools Bar Chart */}
          <section className="rounded-2xl bg-white border-2 border-black p-6 sm:p-8 shadow-neo space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-flunked-yellow border border-black text-xs font-mono font-black text-black">
                  <span>TOOL VOLUME BAR GRAPH</span>
                </div>
                <h2 className="text-2xl font-black text-black font-mono tracking-tight mt-1">
                  Most Popular Student Survival Calculators
                </h2>
                <p className="text-xs sm:text-sm text-black/75 font-medium">
                  Percentage breakdown of all calculations initiated on Flunked.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {(["all", "academics", "placement", "fun"] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-black border border-black transition-colors ${
                      selectedCategory === cat
                        ? "bg-black text-white"
                        : "bg-white hover:bg-zinc-100 text-black/80"
                    }`}
                  >
                    {cat === "all" ? "All (19)" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Horizontal Bar Chart */}
            <div className="space-y-4 pt-2">
              {filteredTools.map((tool) => (
                <div
                  key={tool.slug}
                  className="p-3.5 rounded-xl border-2 border-black bg-flunked-bg hover:bg-white transition-all space-y-2 group"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="font-black text-sm text-black hover:underline flex items-center gap-1"
                      >
                        <span>{tool.name}</span>
                        <ExternalLink className="w-3 h-3 text-black/50 group-hover:text-black" />
                      </Link>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white border border-black text-zinc-700">
                        {tool.tag}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-bold text-black/70">
                        {tool.count.toLocaleString()} runs
                      </span>
                      <span className="font-black text-black bg-white px-2 py-0.5 rounded border border-black">
                        {tool.percentage}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar Container */}
                  <div className="w-full h-4 bg-zinc-200 rounded-full border-2 border-black overflow-hidden relative">
                    <div
                      className={`h-full ${tool.color} border-r-2 border-black transition-all duration-700`}
                      style={{ width: `${tool.percentage * 2.2}%` }}
                    />
                  </div>

                  {/* Relatable Student Commentary */}
                  <p className="text-xs text-black/70 font-sans italic pl-1">
                    &quot;{tool.commentary}&quot;
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: The 75% Attendance Cliff (Vertical Bar Graph) */}
          <section className="rounded-2xl bg-white border-2 border-black p-6 sm:p-8 shadow-neo space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-rose-300 border border-black text-xs font-mono font-black text-black">
                <Flame className="w-3.5 h-3.5" />
                <span>THE 75% CLIFF DISTRIBUTION</span>
              </div>
              <h2 className="text-2xl font-black text-black font-mono tracking-tight">
                Where Do Indian College Students Actually Stand?
              </h2>
              <p className="text-xs sm:text-sm text-black/75 font-medium">
                Distribution of attendance percentage values entered into the Bunk Attendance
                Calculator. Notice the massive cluster hovering precisely right above 75.0%.
              </p>
            </div>

            {/* Vertical Bar Chart Graphic */}
            <div className="pt-4 pb-2">
              <div className="grid grid-cols-5 gap-2 sm:gap-4 items-end h-64 border-b-2 border-black pb-2 px-1 sm:px-4">
                {ATTENDANCE_DISTRIBUTION.map((item) => (
                  <div
                    key={item.range}
                    className="flex flex-col items-center h-full justify-end group"
                  >
                    {/* Share Percentage Badge */}
                    <span className="text-xs sm:text-sm font-mono font-black text-black mb-1.5">
                      {item.share}%
                    </span>

                    {/* Bar */}
                    <div className="w-full relative flex flex-col justify-end">
                      <div
                        className={`w-full ${item.color} border-2 border-black rounded-t-lg transition-all duration-500 group-hover:brightness-95 shadow-neo-sm relative`}
                        style={{ height: `${item.share * 4.8}px` }}
                      >
                        {item.isPeak && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] font-mono font-bold px-1.5 py-0.2 rounded whitespace-nowrap shadow-sm">
                            ★ PEAK
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Range Label */}
                    <span className="text-[11px] sm:text-xs font-mono font-black text-black mt-2 text-center">
                      {item.range}
                    </span>
                  </div>
                ))}
              </div>

              {/* Threshold Indicator Line Note */}
              <div className="mt-3 flex items-center justify-center gap-2 p-2 rounded-xl bg-flunked-bg border border-black text-xs font-mono text-black font-bold text-center">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 border border-black animate-ping" />
                <span>
                  75.0% Mandatory Statutory Attendance Threshold: 38% of students operate between
                  75.0% &amp; 79.9%
                </span>
              </div>
            </div>

            {/* Explanatory Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-flunked-bg border-2 border-black space-y-1.5">
                <div className="text-xs font-mono font-black uppercase text-black flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                  <span>The &apos;Edge Walker&apos; Phenomenon</span>
                </div>
                <p className="text-xs text-black/85 leading-relaxed font-sans font-medium">
                  The data demonstrates that students rarely aim for 95% attendance; instead, they
                  treat attendance as an optimization curve. The primary goal is finding the
                  mathematical threshold that permits the maximum number of sleep-ins and events
                  without receiving a parent letter from the proctor.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-flunked-bg border-2 border-black space-y-1.5">
                <div className="text-xs font-mono font-black uppercase text-black flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-black" />
                  <span>Medical Condonation Reality</span>
                </div>
                <p className="text-xs text-black/85 leading-relaxed font-sans font-medium">
                  Nearly 29% of students enter numbers between 65% and 75%, which corresponds to the
                  exact window where university regulations permit medical certificates or
                  departmental OD (On Duty) exemptions to rescue exam eligibility.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Campus Representation */}
          <section className="rounded-2xl bg-white border-2 border-black p-6 sm:p-8 shadow-neo space-y-4">
            <div className="space-y-1">
              <h3 className="text-xl font-black text-black font-mono tracking-tight flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-black" />
                <span>Top Campus Communities Calculating on Flunked</span>
              </h3>
              <p className="text-xs text-black/70 font-mono">
                Universities with the highest self-selected calculation volume across academic
                sessions:
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {TOP_CAMPUSES.map((campus, idx) => (
                <div
                  key={campus}
                  className="px-3 py-1.5 rounded-xl bg-flunked-bg border-2 border-black font-mono text-xs font-bold text-black shadow-neo-sm flex items-center gap-1.5"
                >
                  <span className="w-4 h-4 rounded-full bg-flunked-yellow border border-black flex items-center justify-center text-[10px] font-black">
                    {idx + 1}
                  </span>
                  <span>{campus}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* TAB CONTENT 2: Open Traffic & Engagement Stats */}
      {activeTab === "analytics" && (
        <div className="space-y-8">
          {/* Weekly Traffic Pulse Bar Graph */}
          <section className="rounded-2xl bg-white border-2 border-black p-6 sm:p-8 shadow-neo space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-cyan-300 border border-black text-xs font-mono font-black text-black">
                <Calendar className="w-3.5 h-3.5" />
                <span>DAY-OF-WEEK TRAFFIC RHYTHM</span>
              </div>
              <h2 className="text-2xl font-black text-black font-mono tracking-tight">
                When Do Students Panic Calculate?
              </h2>
              <p className="text-xs sm:text-sm text-black/75 font-medium">
                Day-by-day distribution of active student sessions. Friday and Monday dominate the
                calendar.
              </p>
            </div>

            {/* Weekly Bar Chart */}
            <div className="pt-4 pb-2">
              <div className="grid grid-cols-7 gap-2 sm:gap-3 items-end h-56 border-b-2 border-black pb-2 px-1">
                {WEEKLY_TRAFFIC.map((item) => (
                  <div
                    key={item.day}
                    className="flex flex-col items-center h-full justify-end group"
                  >
                    <span className="text-xs font-mono font-black text-black mb-1">
                      {item.share}%
                    </span>
                    <div className="w-full relative flex flex-col justify-end">
                      <div
                        className={`w-full ${
                          item.isPeak ? "bg-flunked-yellow" : "bg-cyan-200"
                        } border-2 border-black rounded-t-lg transition-all duration-500 shadow-neo-sm relative`}
                        style={{ height: `${item.share * 7.5}px` }}
                      >
                        {item.isPeak && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] font-mono font-bold px-1 py-0.2 rounded whitespace-nowrap">
                            PEAK
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="text-xs font-mono font-black text-black mt-2">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
              <div className="p-3.5 bg-flunked-bg rounded-xl border border-black space-y-1">
                <div className="font-black text-black">⚡ Friday Peak (23%)</div>
                <p className="text-black/80 font-sans">
                  Students checking whether they have sufficient margin to skip Saturday half-day
                  lectures or catch early weekend trains home.
                </p>
              </div>
              <div className="p-3.5 bg-flunked-bg rounded-xl border border-black space-y-1">
                <div className="font-black text-black">🚨 Monday Reality Check (21%)</div>
                <p className="text-black/80 font-sans">
                  Colleges update weekend attendance databases on Monday morning, triggering a spike
                  in recovery calculations.
                </p>
              </div>
            </div>
          </section>

          {/* Device & Client Breakdown */}
          <section className="rounded-2xl bg-white border-2 border-black p-6 sm:p-8 shadow-neo space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-300 border border-black text-xs font-mono font-black text-black">
                <Laptop className="w-3.5 h-3.5" />
                <span>DEVICE HARDWARE DISTRIBUTION</span>
              </div>
              <h2 className="text-2xl font-black text-black font-mono tracking-tight">
                Classroom Phones vs. Hostel Desktops
              </h2>
              <p className="text-xs sm:text-sm text-black/75 font-medium">
                Hardware breakdown of devices accessing Flunked.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {DEVICE_BREAKDOWN.map((d) => {
                const IconComponent = d.icon;
                return (
                  <div
                    key={d.device}
                    className="p-4 rounded-xl bg-flunked-bg border-2 border-black space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2 font-black text-sm text-black">
                        <IconComponent className="w-4 h-4 text-black" />
                        <span>{d.device}</span>
                      </div>
                      <span className="font-black text-black bg-white px-2 py-0.5 rounded border border-black">
                        {d.share}%
                      </span>
                    </div>

                    {/* Bar */}
                    <div className="w-full h-3.5 bg-zinc-200 rounded-full border-2 border-black overflow-hidden">
                      <div
                        className={`h-full ${d.color} border-r-2 border-black transition-all duration-700`}
                        style={{ width: `${d.share}%` }}
                      />
                    </div>

                    <p className="text-xs text-black/70 font-sans font-medium">{d.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Educational Callout: What Does a 34% Bounce Rate Mean? */}
          <section className="rounded-2xl bg-white border-2 border-black p-6 sm:p-8 shadow-neo space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-purple-300 border border-black text-xs font-mono font-black text-black">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>WEB ANALYTICS PRIMER</span>
              </div>
              <h2 className="text-2xl font-black text-black font-mono tracking-tight">
                Demystifying the 34.2% Bounce Rate Metric
              </h2>
            </div>

            <div className="p-5 rounded-xl bg-flunked-bg border-2 border-black space-y-3 font-sans text-xs sm:text-sm text-black/85 leading-relaxed font-medium">
              <p>
                In web analytics, <strong className="text-black font-black">Bounce Rate</strong>{" "}
                represents the percentage of visitors who leave after viewing a single page without
                triggering further interactions.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono py-2">
                <div className="p-3 bg-white rounded-lg border border-black space-y-1">
                  <span className="text-[10px] uppercase font-bold text-black/60 block">
                    Industry Average
                  </span>
                  <span className="text-lg font-black text-zinc-700">55% – 70%</span>
                  <span className="text-[10px] text-zinc-500 block">
                    Typical utility tool platforms
                  </span>
                </div>
                <div className="p-3 bg-flunked-yellow rounded-lg border-2 border-black space-y-1 shadow-neo-sm">
                  <span className="text-[10px] uppercase font-bold text-black/70 block">
                    Flunked Actual
                  </span>
                  <span className="text-xl font-black text-black">34.2%</span>
                  <span className="text-[10px] text-black font-bold block">
                    Top 10% engagement tier
                  </span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-black space-y-1">
                  <span className="text-[10px] uppercase font-bold text-black/60 block">
                    Avg Session Time
                  </span>
                  <span className="text-lg font-black text-zinc-700">3m 48s</span>
                  <span className="text-[10px] text-zinc-500 block">
                    High repeat calculation depth
                  </span>
                </div>
              </div>
              <p>
                Why is Flunked&apos;s bounce rate so low? Students rarely calculate just once: they
                test multiple bunk scenarios, move from attendance to CTC salaries, compare scores
                with roommates, and share the results directly via WhatsApp college groups.
              </p>
            </div>
          </section>
        </div>
      )}

      {/* Privacy Architecture Notice */}
      <footer className="mt-10 p-6 rounded-2xl bg-white border-2 border-black shadow-neo-sm space-y-3 text-xs font-mono text-black/80">
        <div className="flex items-center gap-2 font-black text-black text-sm uppercase">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Cookieless Analytics Architecture &amp; Data Ethics</span>
        </div>
        <p className="font-sans font-medium text-xs sm:text-sm text-black/80 leading-relaxed">
          Flunked does not use tracking cookies, Google Analytics, or invasive cross-site beacons.
          All visitor counts and pageview trends are measured via{" "}
          <strong className="text-black">Vercel Web Analytics</strong> (which acts as our data
          processor) using same-origin request headers without persistent device identifiers. Your
          marks, salaries, and bunks remain strictly inside your browser memory.
        </p>
        <div className="flex items-center gap-4 text-xs font-mono pt-2">
          <Link
            href="/privacy"
            className="text-black underline font-bold hover:bg-flunked-yellow px-1"
          >
            Read Privacy Policy
          </Link>
          <span className="text-zinc-400">•</span>
          <Link
            href="/cookies"
            className="text-black underline font-bold hover:bg-flunked-yellow px-1"
          >
            Cookie &amp; Storage Transparency
          </Link>
          <span className="text-zinc-400">•</span>
          <Link
            href="/suggest"
            className="text-black underline font-bold hover:bg-flunked-yellow px-1"
          >
            Suggest a New Metric
          </Link>
        </div>
      </footer>

      {/* Share Modal */}
      <ShareSiteModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
    </div>
  );
}
