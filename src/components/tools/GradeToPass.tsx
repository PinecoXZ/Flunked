"use client";

import React, { useState } from "react";
import { ResultCard } from "@/components/ui/ResultCard";
import { Target } from "lucide-react";
import { calculateGradeToPass } from "@/lib/calculations";

export function GradeToPass() {
  const [internalScored, setInternalScored] = useState<number>(22);
  const [internalMax, setInternalMax] = useState<number>(50);
  const [internalWeightage, setInternalWeightage] = useState<number>(50);
  const [passThreshold, setPassThreshold] = useState<number>(40);

  const safeMax = Math.max(1, internalMax);
  const safeWeight = Math.max(1, Math.min(99, internalWeightage));
  const finalsWeight = 100 - safeWeight;

  const result = calculateGradeToPass(
    internalScored,
    internalMax,
    internalWeightage,
    passThreshold
  );

  const {
    headline,
    metricDisplay,
    metricLabel,
    verdict,
    status,
    internalContribution,
    neededFromFinals,
  } = result;

  const presets = [
    { label: "50-50 / 40% Pass", intMax: 50, intWeight: 50, pass: 40 },
    { label: "40-60 / 40% Pass", intMax: 40, intWeight: 40, pass: 40 },
    { label: "30-70 / 35% Pass", intMax: 30, intWeight: 30, pass: 35 },
    { label: "60-40 / 50% Pass", intMax: 60, intWeight: 60, pass: 50 },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Parameter Box */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-black shadow-neo space-y-6">
        <div className="border-b-2 border-black pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-black shadow-neo-sm">
              <Target className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-xl font-black text-black">Grade Required to Pass</h2>
              <p className="text-xs text-flunked-muted font-bold font-sans">
                What do you actually need in finals to not fail? Let&apos;s find out.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-black uppercase bg-flunked-yellow px-2 py-0.5 rounded border border-black text-black shadow-neo-sm">
            Finals Math
          </span>
        </div>

        {/* Quick Presets */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-black uppercase tracking-wider text-black">
            Common University Patterns
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {presets.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setInternalMax(p.intMax);
                  setInternalWeightage(p.intWeight);
                  setPassThreshold(p.pass);
                  if (internalScored > p.intMax) setInternalScored(Math.floor(p.intMax * 0.5));
                }}
                className={`px-2.5 py-1.5 rounded-lg border-2 border-black text-[11px] font-mono font-black transition-all shadow-neo-sm cursor-pointer ${
                  internalWeightage === p.intWeight && passThreshold === p.pass
                    ? "bg-flunked-yellow text-black"
                    : "bg-white text-black hover:bg-flunked-bgSubtle"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-black uppercase text-black">
              Internals Score (Earned)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max={safeMax}
                value={internalScored}
                onChange={(e) => setInternalScored(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-white font-mono font-bold text-sm text-black shadow-neo-sm focus:outline-none"
              />
              <span className="font-mono text-xs text-black font-bold">/</span>
              <input
                type="number"
                min="10"
                max="100"
                value={internalMax}
                onChange={(e) => setInternalMax(Number(e.target.value))}
                className="w-24 px-3.5 py-2.5 rounded-xl border-2 border-black bg-white font-mono font-bold text-sm text-black shadow-neo-sm focus:outline-none"
                title="Max Internals"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-black uppercase text-black">
              Internals Weightage (%)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="10"
                max="90"
                value={internalWeightage}
                onChange={(e) => setInternalWeightage(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-white font-mono font-bold text-sm text-black shadow-neo-sm focus:outline-none"
              />
              <span className="font-mono text-xs text-black font-bold whitespace-nowrap">
                (Finals: {finalsWeight}%)
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-black uppercase text-black">
              Passing Aggregate Threshold (%)
            </label>
            <span className="text-xs font-mono font-black text-black">{passThreshold}%</span>
          </div>
          <input
            type="range"
            min="30"
            max="60"
            step="1"
            value={passThreshold}
            onChange={(e) => setPassThreshold(Number(e.target.value))}
            className="w-full accent-black cursor-pointer"
          />
        </div>
      </div>

      {/* Result Card */}
      <ResultCard
        headline={headline}
        metric={metricDisplay}
        metricLabel={metricLabel}
        verdict={verdict}
        status={status}
        shareText={`I need ${metricDisplay} in my finals to pass this semester! Calculated on flunked.online`}
      >
        <div className="mt-4 pt-4 border-t-2 border-black/10 grid grid-cols-3 gap-2 text-center text-xs font-mono font-bold text-black">
          <div className="p-2.5 rounded-lg bg-flunked-bg border border-black/20">
            <span className="block text-[10px] text-flunked-muted">Secured So Far</span>
            <span className="text-sm font-black">
              {internalContribution.toFixed(1)} / {safeWeight}
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-flunked-bg border border-black/20">
            <span className="block text-[10px] text-flunked-muted">Needed in Finals</span>
            <span className="text-sm font-black">
              {neededFromFinals > 0 ? neededFromFinals.toFixed(1) : "0.0"} / {finalsWeight}
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-flunked-bg border border-black/20">
            <span className="block text-[10px] text-flunked-muted">Pass Mark</span>
            <span className="text-sm font-black">{passThreshold}% Total</span>
          </div>
        </div>
      </ResultCard>
    </div>
  );
}
