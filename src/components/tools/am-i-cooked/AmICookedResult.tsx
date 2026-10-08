import React from "react";
import { type AmICookedResult as AmICookedResultType } from "@/lib/calculations";
import { Flame, Copy, Check, LifeBuoy, ChevronRight, Camera } from "lucide-react";
import { NeoButton } from "@/components/ui/NeoButton";

export interface AmICookedResultProps {
  result: AmICookedResultType;
  attendance: number;
  internalsAvg: number;
  pendingAssignments: number;
  copied: boolean;
  onShare: () => void;
  onOpenStory: () => void;
}

export const AmICookedResult = React.memo(function AmICookedResult({
  result,
  attendance,
  internalsAvg,
  pendingAssignments,
  copied,
  onShare,
  onOpenStory,
}: AmICookedResultProps) {
  return (
    <div className="rounded-2xl p-6 sm:p-9 border-2 border-black transition-all relative overflow-hidden shadow-neo-lg bg-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-black font-black">
              SEMESTER SURVIVAL METER
            </span>
          </div>
          <div className="mt-2">
            <span className="text-xs sm:text-sm font-mono font-black uppercase px-3 py-1 rounded bg-flunked-yellow text-black border-2 border-black shadow-neo-sm">
              {result.badge}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <NeoButton
            type="button"
            size="sm"
            onClick={onOpenStory}
            icon={<Camera className="w-3.5 h-3.5 stroke-[2.5]" />}
            title="Generate Instagram / WhatsApp Story Card"
          >
            Story Card
          </NeoButton>

          <NeoButton
            variant="secondary"
            size="sm"
            onClick={onShare}
            icon={
              copied ? (
                <Check className="w-3.5 h-3.5 text-black" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-black" />
              )
            }
          >
            {copied ? "Copied!" : "Share Status"}
          </NeoButton>
        </div>
      </div>

      {/* Cooked Meter Gauge & Flames */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6 pt-2 items-center">
        {/* Flame Visual Indicator */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Flame
                key={idx}
                className={`w-7 h-7 transition-all duration-300 ${
                  idx < result.flameLevel ? "scale-110 text-black" : "opacity-20 text-black/30"
                }`}
              />
            ))}
          </div>

          <div className="flex items-baseline justify-center md:justify-start gap-1 font-mono">
            <span className="text-6xl sm:text-7xl font-black tracking-tighter text-black">
              {result.cookedPercentage}%
            </span>
            <span className="text-xl text-black/50 font-black">COOKED</span>
          </div>

          <div className="text-xs font-mono text-black font-bold mt-1">
            Survival Odds:{" "}
            <strong className="text-black bg-flunked-yellow px-1.5 py-0.5 rounded border border-black">
              {result.survivalProbability}%
            </strong>
          </div>
        </div>

        {/* Verdict Text & Description */}
        <div className="md:col-span-2 space-y-2.5">
          <h4 className="text-xl sm:text-2xl font-black text-black leading-tight">
            {result.verdict}
          </h4>
          <p className="text-sm text-black/80 leading-relaxed font-sans font-medium">
            {result.subtext}
          </p>

          {/* Linear Flame Meter Bar */}
          <div className="pt-2">
            <div className="w-full h-4 bg-white rounded-full overflow-hidden p-0.5 border-2 border-black">
              <div
                className="h-full rounded-full transition-all duration-500 bg-flunked-yellow border-r-2 border-black"
                style={{
                  width: `${result.cookedPercentage}%`,
                }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-black/70 font-bold mt-1">
              <span>Ice Cold (Safe)</span>
              <span>Room Temp</span>
              <span>Boiling</span>
              <span>Nuclear Ash</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hazard Diagnostics Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
        <div className="p-3.5 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm text-xs font-mono">
          <span className="text-black/70 font-bold block mb-1">Attendance Risk:</span>
          <span className={attendance < 75 ? "text-rose-600 font-black" : "text-black font-black"}>
            {result.diagnosis.attendanceHazard}
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm text-xs font-mono">
          <span className="text-black/70 font-bold block mb-1">Internals Threat:</span>
          <span
            className={internalsAvg < 50 ? "text-rose-600 font-black" : "text-black font-black"}
          >
            {result.diagnosis.internalsHazard}
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm text-xs font-mono">
          <span className="text-black/70 font-bold block mb-1">Semester Runway:</span>
          <span className="text-black font-black">{result.diagnosis.timelineHazard}</span>
        </div>

        <div className="p-3.5 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm text-xs font-mono">
          <span className="text-black/70 font-bold block mb-1">Backlog Pile:</span>
          <span
            className={
              pendingAssignments > 5
                ? "text-black bg-flunked-yellow px-1 rounded font-black"
                : "text-black font-black"
            }
          >
            {result.diagnosis.assignmentsHazard}
          </span>
        </div>
      </div>

      {/* Emergency Tactical Action Plan */}
      <div className="mt-5 p-5 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm">
        <div className="flex items-center gap-2 mb-3">
          <LifeBuoy className="w-4 h-4 text-black" />
          <h5 className="text-xs font-mono uppercase tracking-wider text-black font-black">
            Emergency Damage Control Prescription:
          </h5>
        </div>

        <ul className="space-y-2">
          {result.adviceList.map((adv, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-xs sm:text-sm text-black font-medium"
            >
              <ChevronRight className="w-4 h-4 text-black shrink-0 mt-0.5" />
              <span className="leading-snug">{adv}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
