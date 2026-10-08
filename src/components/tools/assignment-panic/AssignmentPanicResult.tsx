import React from "react";
import { type AssignmentPanicResult as AssignmentPanicResultType } from "@/lib/calculations";
import { Copy, Check, ChevronRight, Zap } from "lucide-react";
import { NeoButton } from "@/components/ui/NeoButton";

export interface AssignmentPanicResultProps {
  result: AssignmentPanicResultType;
  copied: boolean;
  onShare: () => void;
}

export const AssignmentPanicResult = React.memo(function AssignmentPanicResult({
  result,
  copied,
  onShare,
}: AssignmentPanicResultProps) {
  return (
    <div className="rounded-2xl p-6 sm:p-8 border-2 border-black transition-all relative overflow-hidden shadow-neo-lg bg-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black pb-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-black font-black">
            DEADLINE FEASIBILITY AUDIT
          </span>
          <div className="mt-2">
            <span className="text-xs sm:text-sm font-mono font-black uppercase px-3 py-1 rounded bg-flunked-yellow text-black border-2 border-black shadow-neo-sm">
              STATUS: {result.status.toUpperCase().replace("_", " ")}
            </span>
          </div>
        </div>

        <NeoButton
          variant="secondary"
          size="sm"
          onClick={onShare}
          className="self-start sm:self-center"
          icon={
            copied ? (
              <Check className="w-3.5 h-3.5 text-black" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-black" />
            )
          }
        >
          {copied ? "Copied!" : "Share Panic Verdict"}
        </NeoButton>
      </div>

      {/* Big Feasibility Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6 pt-1 items-center">
        <div>
          <div className="text-xs font-mono uppercase text-black font-black">Feasibility Score</div>
          <div className="flex items-baseline gap-1 font-mono mt-1">
            <span className="text-5xl sm:text-6xl font-black tracking-tight text-black">
              {result.feasibilityPercentage}%
            </span>
          </div>
          <div className="text-xs font-mono text-black font-bold mt-1">
            Required:{" "}
            <strong className="text-black bg-flunked-yellow px-1 rounded border border-black">
              {result.pagesPerHourNeeded} pgs/hr
            </strong>
          </div>
        </div>

        <div className="md:col-span-2 space-y-2">
          <h4 className="text-xl sm:text-2xl font-black text-black leading-tight">
            {result.headline}
          </h4>
          <p className="text-sm text-black/80 leading-relaxed font-sans font-medium">
            {result.tacticalVerdict}
          </p>

          {/* Feasibility Bar */}
          <div className="pt-2">
            <div className="w-full h-3.5 bg-white rounded-full overflow-hidden p-0.5 border-2 border-black">
              <div
                className="h-full rounded-full transition-all duration-500 bg-flunked-yellow border-r-2 border-black"
                style={{
                  width: `${result.feasibilityPercentage}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tactical Survival Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5">
        <div className="p-3.5 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm text-xs font-mono">
          <span className="text-black/70 font-bold block mb-1">Human Writing Limit:</span>
          <span className="text-black font-black text-sm">
            ~{result.humanCapacityPages} pages max
          </span>
          <div className="text-[10px] text-black/60 mt-0.5 font-sans font-medium">
            Based on hand cramps & format
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm text-xs font-mono">
          <span className="text-black/70 font-bold block mb-1">Speed Pressure:</span>
          <span className="font-black text-sm text-black">
            {result.pagesPerHourNeeded} pages / hour
          </span>
          <div className="text-[10px] text-black/60 mt-0.5 font-sans font-medium">
            {result.pagesPerHourNeeded > 6 ? "Robotic speed required" : "Pace yourself"}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm text-xs font-mono">
          <span className="text-black/70 font-bold block mb-1">Begging CR Probability:</span>
          <span className="font-black text-sm text-black bg-flunked-yellow px-1 rounded border border-black inline-block">
            {result.beggingCrProbability}%
          </span>
          <div className="text-[10px] text-black/60 mt-0.5 font-sans font-medium">
            Odds you need an extension
          </div>
        </div>
      </div>

      {/* Tactical Action Plan */}
      <div className="p-5 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm space-y-3">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-black" />
          <h5 className="text-xs font-mono uppercase tracking-wider text-black font-black">
            Hostel Tactical Battle Plan:
          </h5>
        </div>

        <div className="space-y-2">
          {result.tacticalPlan.map((step, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 text-xs sm:text-sm text-black font-medium"
            >
              <ChevronRight className="w-4 h-4 text-black shrink-0 mt-0.5" />
              <span className="leading-snug font-sans">{step}</span>
            </div>
          ))}
        </div>

        {/* Time Allocation */}
        <div className="pt-3 border-t-2 border-black/15">
          <span className="text-[11px] font-mono text-black uppercase tracking-wider block mb-2 font-black">
            Recommended Time Budget:
          </span>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-lg bg-white border-2 border-black text-black font-bold shadow-neo-sm">
              Writing:{" "}
              <strong className="text-black font-black">
                {result.timeBreakdown.writingHours}h
              </strong>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white border-2 border-black text-black font-bold shadow-neo-sm">
              Diagrams:{" "}
              <strong className="text-black font-black">
                {result.timeBreakdown.diagramHours}h
              </strong>
            </span>
            {result.timeBreakdown.distractionHours > 0 && (
              <span className="px-2.5 py-1 rounded-lg bg-white border-2 border-black text-black font-bold shadow-neo-sm">
                Chai &amp; Breaks:{" "}
                <strong className="text-rose-600 font-black">
                  {result.timeBreakdown.distractionHours}h
                </strong>
              </span>
            )}
            <span className="px-2.5 py-1 rounded-lg bg-white border-2 border-black text-black font-bold shadow-neo-sm">
              Buffer:{" "}
              <strong className="text-emerald-700 font-black">
                {result.timeBreakdown.emergencyBufferHours}h
              </strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});
