import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Sparkles, CheckCircle2, Crosshair } from "lucide-react";

export function PublicHero() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 text-left">
        {/* Left Column: Headline & Call To Action */}
        <div className="flex-1 space-y-7 text-center lg:text-left">
          {/* Student-Only Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-flunked-yellow border-2 border-black text-black text-xs font-mono font-black select-none shadow-neo-sm">
            <span>100% STUDENT TOOLS</span>
            <span className="text-black">|</span>
            <span>ZERO SIGNUP FRICTION</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-6xl font-black tracking-tight text-black leading-[1.12]">
            Tools built for the{" "}
            <span className="bg-flunked-yellow px-2 py-0.5 border-2 border-black rounded-md inline-block shadow-neo-sm -rotate-1 mt-1">
              chaos of college.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-flunked-muted font-sans font-medium leading-relaxed">
            Free micro-calculators for attendance bunks, CGPA reality checks, CTC in-hand take-home,
            and semester survival. No ads. No corporate fluff.
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-flunked-yellow hover:bg-[#FFD000] text-black font-black text-base border-2 border-black shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150 group select-none cursor-pointer"
            >
              <span>Enter Campus Hub</span>
              <ArrowRight className="w-5 h-5 text-black stroke-[3] group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="#tool-previews"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-flunked-bg border-2 border-black text-sm font-mono font-black text-black transition-all shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo active:translate-x-[1px] active:translate-y-[1px] active:shadow-none select-none cursor-pointer"
            >
              <span>Peek Preview Tools ↓</span>
            </a>
          </div>

          {/* Feature Micro-Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-4 text-xs font-mono text-black font-black">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white border-2 border-black shadow-neo-sm">
              <ShieldCheck className="w-4 h-4 text-black stroke-[2.5]" />
              <span>No passwords needed</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white border-2 border-black shadow-neo-sm">
              <Zap className="w-4 h-4 text-black stroke-[2.5]" />
              <span>Instant client math</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white border-2 border-black shadow-neo-sm">
              <Sparkles className="w-4 h-4 text-black stroke-[2.5]" />
              <span>Zero ads</span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Teaser Card */}
        <div className="w-full lg:w-[420px] shrink-0">
          <div className="rounded-2xl bg-white border-2 border-black p-6 sm:p-7 shadow-neo-lg relative overflow-hidden">
            <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-md bg-flunked-yellow border-2 border-black flex items-center justify-center text-black shadow-neo-sm">
                  <Crosshair className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <div className="text-xs font-mono font-black text-black">
                    Bunk Calculator Preview
                  </div>
                  <div className="text-[10px] font-mono text-flunked-muted font-bold">
                    Real-time cutoff math
                  </div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-flunked-yellow border-2 border-black text-black text-[10px] font-mono font-black shadow-neo-sm uppercase">
                Sample
              </span>
            </div>

            <div className="space-y-3 text-xs font-mono font-bold">
              <div className="flex justify-between items-center py-2.5 px-3.5 rounded-lg bg-flunked-bg border-2 border-black shadow-neo-sm">
                <span className="text-flunked-muted">Total Classes Held</span>
                <span className="text-black font-black tabular-nums">48 classes</span>
              </div>
              <div className="flex justify-between items-center py-2.5 px-3.5 rounded-lg bg-flunked-bg border-2 border-black shadow-neo-sm">
                <span className="text-flunked-muted">Classes Attended</span>
                <span className="text-black font-black tabular-nums">41 classes (85.4%)</span>
              </div>
              <div className="flex justify-between items-center py-2.5 px-3.5 rounded-lg bg-flunked-bg border-2 border-black shadow-neo-sm">
                <span className="text-flunked-muted">Target Threshold</span>
                <span className="text-black font-black">75% Mandatory</span>
              </div>
            </div>

            {/* Calculated Result Verdict Box */}
            <div className="mt-5 p-4 rounded-xl bg-flunked-yellow border-2 border-black shadow-neo flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-black shrink-0 mt-0.5 stroke-[3]" />
              <div className="space-y-0.5">
                <div className="text-[11px] font-mono font-black text-black uppercase tracking-wider">
                  Status: You Can Safely Bunk
                </div>
                <div className="text-2xl font-black font-mono text-black">6 Lectures</div>
                <p className="text-[11px] font-mono text-black font-bold leading-tight">
                  Skip next 6 classes in a row and attendance stays at 75.9%. Sleep in.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
