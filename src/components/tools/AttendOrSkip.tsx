"use client";

import { useState, useMemo } from "react";
import { useClipboard } from "@/hooks/useClipboard";
import {
  attendOrSkipDecider,
  type TeacherStrictness,
  type TirednessLevel,
} from "@/lib/calculations";
import {
  Copy,
  Check,
  Sparkles,
  Bed,
  CheckCircle2,
  XCircle,
  Coffee,
  Skull,
  Zap,
} from "lucide-react";

export function AttendOrSkip() {
  const [attendance, setAttendance] = useState<number>(78);
  const [proxy, setProxy] = useState<boolean>(true);
  const [strictness, setStrictness] = useState<TeacherStrictness>("strict");
  const [important, setImportant] = useState<boolean>(true);
  const [tiredness, setTiredness] = useState<TirednessLevel>("tired");
  const { copied, copy } = useClipboard({ duration: 2000 });

  const result = useMemo(() => {
    return attendOrSkipDecider(attendance, proxy, strictness, important, tiredness);
  }, [attendance, proxy, strictness, important, tiredness]);

  const handleShare = () => {
    const text = `*Should I Attend This Lecture?* [Flunked.online]\nDecision: ${result.headline}\nAttendance: ${attendance}% → If skipped: ${result.projectedAttendanceAfterSkip}%\nReasoning: ${result.reasoning}\nAction: ${result.actionText}\n\nCalculated on Flunked.online · flunked.online/tools/attend-or-skip`;
    copy(text);
  };

  return (
    <div className="space-y-8">
      {/* Input Form Section */}
      <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8 space-y-6 shadow-neo">
        {/* Attendance Slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-mono uppercase tracking-wider text-black font-black">
              Current Attendance Percentage
            </label>
            <div className="flex items-baseline gap-1 font-mono">
              <span className="text-xl sm:text-2xl font-black text-black bg-flunked-yellow px-2.5 py-0.5 rounded border border-black shadow-neo-sm">
                {attendance}%
              </span>
              <span className="text-xs font-mono font-bold text-black/70 ml-1">
                {attendance >= 75 ? "(Above 75% Safe)" : "(Debar Warning)"}
              </span>
            </div>
          </div>
          <input
            type="range"
            min={30}
            max={100}
            value={attendance}
            onChange={(e) => setAttendance(Number(e.target.value))}
            className="w-full h-3 bg-white border-2 border-black rounded-lg appearance-none cursor-pointer accent-[#FFE600]"
          />
          <div className="flex justify-between text-[11px] font-mono font-bold text-black/70 mt-1">
            <span>30% (Cooked)</span>
            <span>75% (Danger Line)</span>
            <span>100% (First Bench)</span>
          </div>
        </div>

        {/* 2x2 Grid of Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          {/* Proxy Status */}
          <div>
            <label className="block text-xs font-mono text-black font-black mb-2">
              Is a reliable proxy available?
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setProxy(true)}
                className={`p-3 rounded-xl border-2 border-black text-xs font-mono font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  proxy
                    ? "bg-flunked-yellow text-black shadow-neo translate-x-[-1px] translate-y-[-1px]"
                    : "bg-white text-black shadow-neo-sm hover:bg-flunked-yellow/20 hover:shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-none"
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-black" />
                <span>Yes (Friend promised)</span>
              </button>
              <button
                type="button"
                onClick={() => setProxy(false)}
                className={`p-3 rounded-xl border-2 border-black text-xs font-mono font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  !proxy
                    ? "bg-flunked-yellow text-black shadow-neo translate-x-[-1px] translate-y-[-1px]"
                    : "bg-white text-black shadow-neo-sm hover:bg-flunked-yellow/20 hover:shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-none"
                }`}
              >
                <XCircle className="w-4 h-4 text-black" />
                <span>No (Lone wolf today)</span>
              </button>
            </div>
          </div>

          {/* Teacher Strictness */}
          <div>
            <label className="block text-xs font-mono text-black font-black mb-2">
              Teacher's Attendance Routine
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "chill", label: "Chill", desc: "Passes sheet" },
                { id: "strict", label: "Strict", desc: "Eyes on roll call" },
                { id: "biometric", label: "Biometric", desc: "Digital eyes" },
              ].map((item) => {
                const isSelected = strictness === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setStrictness(item.id as TeacherStrictness)}
                    className={`p-2.5 rounded-xl border-2 border-black text-center transition-all cursor-pointer ${
                      isSelected
                        ? "bg-flunked-yellow text-black font-black shadow-neo translate-x-[-1px] translate-y-[-1px]"
                        : "bg-white text-black font-bold shadow-neo-sm hover:bg-flunked-yellow/20 hover:shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-none"
                    }`}
                  >
                    <div className="text-xs font-mono">{item.label}</div>
                    <div className="text-[10px] text-black/70 mt-0.5 truncate font-sans font-medium">
                      {item.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Important for Exams */}
          <div>
            <label className="block text-xs font-mono text-black font-black mb-2">
              Is this subject actually important for exams?
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setImportant(true)}
                className={`p-3 rounded-xl border-2 border-black text-xs font-mono font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  important
                    ? "bg-flunked-yellow text-black shadow-neo translate-x-[-1px] translate-y-[-1px]"
                    : "bg-white text-black shadow-neo-sm hover:bg-flunked-yellow/20 hover:shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-none"
                }`}
              >
                <span>Important (High Credits)</span>
              </button>
              <button
                type="button"
                onClick={() => setImportant(false)}
                className={`p-3 rounded-xl border-2 border-black text-xs font-mono font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  !important
                    ? "bg-flunked-yellow text-black shadow-neo translate-x-[-1px] translate-y-[-1px]"
                    : "bg-white text-black shadow-neo-sm hover:bg-flunked-yellow/20 hover:shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-none"
                }`}
              >
                <span>Useless Elective</span>
              </button>
            </div>
          </div>

          {/* Tiredness Level */}
          <div>
            <label className="block text-xs font-mono text-black font-black mb-2">
              Your Current Physical State
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "alive", label: "Alive", Icon: Zap },
                { id: "tired", label: "Tired", Icon: Coffee },
                { id: "zombie", label: "Zombie", Icon: Skull },
              ].map((item) => {
                const isSelected = tiredness === item.id;
                const IconComponent = item.Icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTiredness(item.id as TirednessLevel)}
                    className={`p-2.5 rounded-xl border-2 border-black text-center transition-all cursor-pointer ${
                      isSelected
                        ? "bg-flunked-yellow text-black font-black shadow-neo translate-x-[-1px] translate-y-[-1px]"
                        : "bg-white text-black font-bold shadow-neo-sm hover:bg-flunked-yellow/20 hover:shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-none"
                    }`}
                  >
                    <IconComponent className="w-4 h-4 mx-auto mb-1 text-black" />
                    <div className="text-xs font-mono mt-0.5">{item.label}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Immediate Result Card */}
      <div className="rounded-2xl p-6 sm:p-8 border-2 border-black transition-all relative overflow-hidden shadow-neo-lg bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-black pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-flunked-yellow border-2 border-black flex items-center justify-center shrink-0 shadow-neo-sm">
              {result.decision === "attend" && <CheckCircle2 className="w-5 h-5 text-black" />}
              {result.decision === "skip" && <Bed className="w-5 h-5 text-black" />}
              {result.decision === "proxy" && <Sparkles className="w-5 h-5 text-black" />}
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-black font-black">
                THE ALGORITHM'S VERDICT
              </span>
              <div className="text-xs font-mono font-black uppercase text-black bg-flunked-yellow px-2 py-0.5 rounded border border-black inline-block mt-0.5 shadow-neo-sm">
                Recommendation: {result.decision.toUpperCase()}
              </div>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="self-start sm:self-center flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-flunked-yellow border-2 border-black text-xs font-mono text-black font-black transition-all shadow-neo-sm hover:shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-black" />
                <span className="text-black">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-black" />
                <span>Copy Verdict</span>
              </>
            )}
          </button>
        </div>

        {/* Big Verdict Headline */}
        <div className="my-6">
          <h3 className="text-2xl sm:text-3xl font-black text-black tracking-tight leading-tight">
            {result.headline}
          </h3>
          <p className="text-sm text-black/80 mt-2 leading-relaxed font-sans font-medium">
            {result.subtext}
          </p>
        </div>

        {/* Impact Breakdown Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          <div className="p-4 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm">
            <span className="text-[11px] font-mono uppercase text-black font-black">
              Attendance Math After Skip:
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-mono font-black text-black">
                {result.projectedAttendanceAfterSkip}%
              </span>
              <span
                className={`text-xs font-mono font-black ${
                  result.projectedAttendanceAfterSkip < 75
                    ? "text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-400"
                    : "text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-400"
                }`}
              >
                {result.projectedAttendanceAfterSkip < 75
                  ? "(DROPS BELOW 75% - WARNING)"
                  : "(Safe Buffer Remaining)"}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm">
            <span className="text-[11px] font-mono uppercase text-black font-black">
              Academic Danger Level:
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-mono font-black text-black">{result.riskScore}%</span>
              <span className="text-xs font-mono font-bold text-black/70">
                {result.riskScore > 70
                  ? "Extreme Hazard"
                  : result.riskScore > 35
                    ? "Moderate Hazard"
                    : "Zero Threat"}
              </span>
            </div>
          </div>
        </div>

        {/* Tactical Recommendation Bar */}
        <div className="p-5 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm space-y-2">
          <div className="text-xs font-mono text-black font-black uppercase tracking-wider">
            Hostel Logic Rationale:
          </div>
          <p className="text-xs sm:text-sm text-black/80 leading-relaxed font-sans font-medium">
            {result.reasoning}
          </p>
          <div className="pt-2 border-t-2 border-black/15 flex items-center gap-2 text-xs font-mono text-black">
            <span className="bg-flunked-yellow border border-black px-1.5 py-0.5 rounded font-black">
              Action:
            </span>
            <span className="font-bold">{result.actionText}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
