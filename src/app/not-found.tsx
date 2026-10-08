import React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  Calculator,
  Flame,
  GraduationCap,
  Home,
  ShieldCheck,
} from "lucide-react";

export const metadata = {
  title: "404 — Page Flunked / Not Found",
  description:
    "Looks like this page got detached or bunked. Browse all 19 free academic survival calculators on Flunked.fun.",
};

const POPULAR_TOOLS = [
  {
    name: "75% Bunk Calculator",
    slug: "bunk-calculator",
    icon: Calculator,
    tag: "Most Popular",
  },
  {
    name: "Am I Cooked? Meter",
    slug: "am-i-cooked",
    icon: Flame,
    tag: "Semester Survival",
  },
  {
    name: "Official CGPA to %",
    slug: "cgpa-calculator",
    icon: GraduationCap,
    tag: "Academics",
  },
  {
    name: "CTC In-Hand Take Home",
    slug: "ctc-calculator",
    icon: ShieldCheck,
    tag: "Placements",
  },
];

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 sm:py-24 max-w-2xl mx-auto w-full text-center space-y-8">
      {/* 404 Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-flunked-yellow border-2 border-black text-xs font-mono font-black text-black shadow-neo-sm uppercase tracking-wider">
        <AlertTriangle className="w-4 h-4 text-black stroke-[2.5]" />
        <span>404 // ATTENDANCE SHORTAGE // ROUTE NOT FOUND</span>
      </div>

      {/* Main Heading (Single H1) */}
      <div className="space-y-3">
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-black leading-none">
          Looks like this page got{" "}
          <span className="bg-flunked-yellow px-2 py-0.5 border-2 border-black rounded-md inline-block shadow-neo-sm -rotate-1 mt-1">
            bunked.
          </span>
        </h1>
        <p className="text-base sm:text-lg text-black/75 font-sans font-medium max-w-lg mx-auto leading-relaxed">
          The URL you are trying to reach doesn&apos;t exist or was moved. Don&apos;t panic — your
          GPA and safe bunk margins are still intact.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md pt-2">
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-flunked-yellow hover:bg-[#FFD000] border-2 border-black font-black text-sm text-black shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo-lg active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
        >
          <Home className="w-4 h-4 text-black" />
          <span>Back to Home</span>
        </Link>
        <Link
          href="/tools"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-flunked-bg border-2 border-black font-mono font-black text-sm text-black shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-black" />
          <span>Browse All 19 Tools</span>
        </Link>
      </div>

      {/* Popular Tools Quick Links */}
      <div className="w-full pt-8 border-t-2 border-black/10 space-y-4 text-left">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-black uppercase tracking-wider text-black/60">
            Quick recovery destinations
          </span>
          <Link href="/tools" className="text-xs font-mono font-bold text-black hover:underline">
            View all 19 tools →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {POPULAR_TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="p-3.5 rounded-xl bg-white hover:bg-flunked-yellow/20 border-2 border-black flex items-center justify-between shadow-neo-sm hover:shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-black shadow-neo-sm">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-black group-hover:underline">
                      {tool.name}
                    </div>
                    <div className="text-[10px] font-mono text-black/60">{tool.tag}</div>
                  </div>
                </div>
                <span className="text-xs font-mono font-black text-black group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
