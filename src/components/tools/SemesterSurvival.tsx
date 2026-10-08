"use client";

import React, { useState, useId } from "react";
import { calculateSemesterSurvival } from "@/lib/calculations";
import { ResultCard } from "@/components/ui/ResultCard";
import { ShieldAlert } from "lucide-react";

export function SemesterSurvival() {
  const internalSecuredId = useId();
  const internalTotalId = useId();
  const endSemWeightageId = useId();
  const minPassPercentId = useId();
  const minEndSemPercentId = useId();

  // State
  const [internalSecured, setInternalSecured] = useState<number | "">(24);
  const [internalTotal, setInternalTotal] = useState<number | "">(50);
  const [endSemWeightage, setEndSemWeightage] = useState<number | "">(50);
  const [minPassPercent, setMinPassPercent] = useState<number>(40);
  const [minEndSemPercent, setMinEndSemPercent] = useState<number>(35);

  const numSecured = typeof internalSecured === "number" ? internalSecured : 0;
  const numIntTotal = typeof internalTotal === "number" ? internalTotal : 50;
  const numEndSem = typeof endSemWeightage === "number" ? endSemWeightage : 50;

  // Validation
  const isInternalSecuredExceeding = numSecured > numIntTotal && numIntTotal > 0;
  const safeSecured = isInternalSecuredExceeding ? numIntTotal : numSecured;

  // Live calculation
  const result = calculateSemesterSurvival(
    safeSecured,
    numIntTotal,
    minPassPercent,
    numEndSem,
    minEndSemPercent
  );

  const applyPatternPreset = (intT: number, endT: number, aggMin: number, endMin: number) => {
    setInternalTotal(intT);
    setEndSemWeightage(endT);
    setMinPassPercent(aggMin);
    setMinEndSemPercent(endMin);
    if (typeof internalSecured === "number" && internalSecured > intT) {
      setInternalSecured(Math.floor(intT * 0.5));
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Parameters Panel */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-black shadow-neo space-y-6">
        <div className="border-b-2 border-black pb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-black flex items-center gap-2.5">
              <ShieldAlert className="w-5 h-5 stroke-[2.5]" />
              <span>Semester Survival Calculator</span>
            </h2>
            <span className="text-xs font-mono text-black bg-flunked-yellow px-2.5 py-0.5 rounded border border-black font-black shadow-neo-sm uppercase">
              Exam Math
            </span>
          </div>
          <p className="text-xs text-flunked-muted mt-1 font-mono font-bold">
            Can you still pass? Enter your internal exam scores and university cutoffs.
          </p>
        </div>

        {/* Quick Pattern Presets */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-black font-black">
            College Exam Pattern Presets:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => applyPatternPreset(50, 50, 40, 35)}
              className={`p-3 rounded-xl text-left border-2 border-black text-xs font-mono transition cursor-pointer ${
                numIntTotal === 50 && numEndSem === 50
                  ? "bg-flunked-yellow text-black font-black shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px]"
                  : "bg-white text-black font-bold shadow-neo-sm hover:bg-flunked-bg"
              }`}
            >
              <div className="font-black text-black">50 / 50 Split</div>
              <div className="text-[10px] text-flunked-muted font-bold">VIT, SRM, Autonomous</div>
            </button>

            <button
              type="button"
              onClick={() => applyPatternPreset(40, 60, 40, 35)}
              className={`p-3 rounded-xl text-left border-2 border-black text-xs font-mono transition cursor-pointer ${
                numIntTotal === 40 && numEndSem === 60
                  ? "bg-flunked-yellow text-black font-black shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px]"
                  : "bg-white text-black font-bold shadow-neo-sm hover:bg-flunked-bg"
              }`}
            >
              <div className="font-black text-black">40 / 60 Split</div>
              <div className="text-[10px] text-flunked-muted font-bold">AKTU, Anna, Mumbai</div>
            </button>

            <button
              type="button"
              onClick={() => applyPatternPreset(30, 70, 40, 35)}
              className={`p-3 rounded-xl text-left border-2 border-black text-xs font-mono transition cursor-pointer ${
                numIntTotal === 30 && numEndSem === 70
                  ? "bg-flunked-yellow text-black font-black shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px]"
                  : "bg-white text-black font-bold shadow-neo-sm hover:bg-flunked-bg"
              }`}
            >
              <div className="font-black text-black">30 / 70 Split</div>
              <div className="text-[10px] text-flunked-muted font-bold">RTU, RGPV, State Univs</div>
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Internal Marks Secured */}
          <div className="space-y-2">
            <label
              htmlFor={internalSecuredId}
              className="block text-xs font-mono font-black text-black uppercase tracking-wider"
            >
              Internal Marks Secured
            </label>
            <div className="relative">
              <input
                id={internalSecuredId}
                type="number"
                min="0"
                max={numIntTotal}
                value={internalSecured}
                onChange={(e) => {
                  const val = e.target.value;
                  setInternalSecured(val === "" ? "" : Math.max(0, parseFloat(val) || 0));
                }}
                placeholder="e.g. 24"
                className="w-full bg-white border-2 border-black text-black text-lg font-mono font-black rounded-xl px-4 py-3 outline-none shadow-neo-sm focus:ring-2 focus:ring-flunked-yellow transition"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-flunked-muted font-bold">
                marks
              </span>
            </div>
          </div>

          {/* Total Internal Marks */}
          <div className="space-y-2">
            <label
              htmlFor={internalTotalId}
              className="block text-xs font-mono font-black text-black uppercase tracking-wider"
            >
              Total Internal Marks
            </label>
            <div className="relative">
              <input
                id={internalTotalId}
                type="number"
                min="1"
                max="100"
                value={internalTotal}
                onChange={(e) => {
                  const val = e.target.value;
                  setInternalTotal(val === "" ? "" : Math.max(1, parseInt(val, 10) || 1));
                }}
                placeholder="e.g. 50"
                className="w-full bg-white border-2 border-black text-black text-lg font-mono font-black rounded-xl px-4 py-3 outline-none shadow-neo-sm focus:ring-2 focus:ring-flunked-yellow transition"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-flunked-muted font-bold">
                max
              </span>
            </div>
          </div>

          {/* End Sem Exam Weightage */}
          <div className="space-y-2">
            <label
              htmlFor={endSemWeightageId}
              className="block text-xs font-mono font-black text-black uppercase tracking-wider"
            >
              End Sem Exam Weightage
            </label>
            <div className="relative">
              <input
                id={endSemWeightageId}
                type="number"
                min="1"
                max="100"
                value={endSemWeightage}
                onChange={(e) => {
                  const val = e.target.value;
                  setEndSemWeightage(val === "" ? "" : Math.max(1, parseInt(val, 10) || 1));
                }}
                placeholder="e.g. 50"
                className="w-full bg-white border-2 border-black text-black text-lg font-mono font-black rounded-xl px-4 py-3 outline-none shadow-neo-sm focus:ring-2 focus:ring-flunked-yellow transition"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-flunked-muted font-bold">
                marks
              </span>
            </div>
          </div>

          {/* Total Course Aggregate */}
          <div className="space-y-2">
            <span className="block text-xs font-mono font-black text-black uppercase tracking-wider">
              Total Course Weightage
            </span>
            <div className="flex items-center h-[52px] px-4 rounded-xl bg-flunked-bg border-2 border-black text-black font-mono font-black text-sm shadow-neo-sm">
              <span>{result.totalCourseMarks} marks total</span>
            </div>
          </div>
        </div>

        {/* Passing Rule Thresholds */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3 border-t-2 border-black">
          {/* Aggregate Passing % */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <label htmlFor={minPassPercentId} className="text-black font-black">
                Overall Aggregate Pass Cutoff
              </label>
              <span className="text-black font-black bg-flunked-yellow border border-black px-1.5 py-0.2 rounded shadow-neo-sm">
                {minPassPercent}%
              </span>
            </div>
            <input
              id={minPassPercentId}
              type="range"
              min="30"
              max="60"
              step="5"
              value={minPassPercent}
              onChange={(e) => setMinPassPercent(parseInt(e.target.value, 10))}
              className="w-full cursor-pointer"
            />
            <div className="text-[10px] text-flunked-muted font-mono font-bold">
              Usually 40% across total marks
            </div>
          </div>

          {/* Min End Sem % */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <label htmlFor={minEndSemPercentId} className="text-black font-black">
                End-Sem Paper Individual Cutoff
              </label>
              <span className="text-black font-black bg-flunked-yellow border border-black px-1.5 py-0.2 rounded shadow-neo-sm">
                {minEndSemPercent}%
              </span>
            </div>
            <input
              id={minEndSemPercentId}
              type="range"
              min="0"
              max="50"
              step="5"
              value={minEndSemPercent}
              onChange={(e) => setMinEndSemPercent(parseInt(e.target.value, 10))}
              className="w-full cursor-pointer"
            />
            <div className="text-[10px] text-flunked-muted font-mono font-bold">
              Minimum required in the final paper alone (often 35%)
            </div>
          </div>
        </div>
      </div>

      {/* Result Card */}
      <ResultCard
        title="Survival Verdict"
        headline={
          result.isImpossible
            ? "Mathematically Impossible to Pass"
            : result.isAlreadyPassed
              ? "Course Already Cleared!"
              : `You need ${result.marksNeededInEndSem} / ${result.endSemWeightage} in End Sem (${result.percentageNeededInEndSem}%)`
        }
        metric={
          result.isImpossible
            ? "RIP"
            : result.isAlreadyPassed
              ? "PASS"
              : `${result.marksNeededInEndSem} / ${result.endSemWeightage}`
        }
        metricLabel={
          result.isImpossible
            ? "Impossible"
            : result.isAlreadyPassed
              ? "Cleared"
              : `Needed (${result.percentageNeededInEndSem}%)`
        }
        verdict={result.verdict}
        description={result.subDescription}
        status={result.status}
        shareText={result.shareText}
      >
        {/* Breakdown details */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
          <div className="p-3 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm">
            <div className="text-flunked-muted text-[10px] uppercase font-bold">
              Aggregate Passing Mark
            </div>
            <div className="text-base font-black text-black mt-0.5">
              {result.aggregateMarksNeeded} / {result.totalCourseMarks}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm">
            <div className="text-flunked-muted text-[10px] uppercase font-bold">
              Paper Cutoff (Alone)
            </div>
            <div className="text-base font-black text-black mt-0.5">
              {((result.endSemWeightage * result.minEndSemPercent) / 100).toFixed(1)} /{" "}
              {result.endSemWeightage}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm col-span-2 sm:col-span-1">
            <div className="text-flunked-muted text-[10px] uppercase font-bold">
              Internal Marks Banked
            </div>
            <div className="text-base font-black text-black mt-0.5">
              {safeSecured} / {numIntTotal}
            </div>
          </div>
        </div>
      </ResultCard>
    </div>
  );
}
