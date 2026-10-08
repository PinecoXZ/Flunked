"use client";

import { useState, useId, useEffect } from "react";
import { calculateBunk } from "@/lib/calculations";
import { ResultCard } from "@/components/ui/ResultCard";
import { AttendanceProgressBar } from "@/components/ui/ProgressBar";
import { ATTENDANCE_PRESETS } from "@/data/universityPresets";
import { useUrlSync } from "@/hooks/useUrlSync";
import { AlertTriangle, CheckCircle2, ShieldAlert, Target, Building2 } from "lucide-react";

export function BunkCalculator() {
  const totalHeldId = useId();
  const attendedId = useId();
  const targetId = useId();

  // State
  const [totalHeld, setTotalHeld] = useState<number | "">(45);
  const [attended, setAttended] = useState<number | "">(38);
  const [targetPercent, setTargetPercent] = useState<number>(75);
  const [selectedPresetId, setSelectedPresetId] = useState<string>("ugc-standard");

  // Read initial query params
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const h = params.get("held");
    const a = params.get("attended");
    const t = params.get("target");
    const p = params.get("preset");

    if (h && !isNaN(parseInt(h, 10))) setTotalHeld(parseInt(h, 10));
    if (a && !isNaN(parseInt(a, 10))) setAttended(parseInt(a, 10));
    if (t && !isNaN(parseInt(t, 10))) setTargetPercent(parseInt(t, 10));
    if (p && ATTENDANCE_PRESETS.some((preset) => preset.id === p)) {
      setSelectedPresetId(p);
      const matched = ATTENDANCE_PRESETS.find((pr) => pr.id === p);
      if (matched && !t) setTargetPercent(matched.targetPercent);
    }
  }, []);

  // Sync state to URL for 1-click sharing
  useUrlSync({
    held: totalHeld !== "" ? totalHeld : undefined,
    attended: attended !== "" ? attended : undefined,
    target: targetPercent,
    preset: selectedPresetId,
  });

  const handlePresetChange = (presetId: string) => {
    setSelectedPresetId(presetId);
    const preset = ATTENDANCE_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setTargetPercent(preset.targetPercent);
    }
  };

  const currentPreset = ATTENDANCE_PRESETS.find((p) => p.id === selectedPresetId);

  const numHeld = typeof totalHeld === "number" ? totalHeld : 0;
  const numAttended = typeof attended === "number" ? attended : 0;

  // Validation error state
  const isAttendedGreaterThanHeld = numAttended > numHeld && numHeld > 0;

  // Live calculation
  const safeAttended = isAttendedGreaterThanHeld ? numHeld : numAttended;
  const result = calculateBunk(numHeld, safeAttended, targetPercent);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Input Form Panel */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-black shadow-neo space-y-6">
        <div className="border-b-2 border-black pb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-black flex items-center gap-2.5">
              <Target className="w-5 h-5 stroke-[2.5]" />
              <span>Attendance Parameters</span>
            </h2>
            <span className="text-xs font-mono text-black bg-flunked-yellow px-2.5 py-0.5 rounded border border-black font-black shadow-neo-sm uppercase">
              Live Calculation
            </span>
          </div>
          <p className="text-xs text-flunked-muted mt-1 font-mono font-bold">
            Values update instantly. No submit button required.
          </p>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Total Classes Held */}
          <div className="space-y-2">
            <label
              htmlFor={totalHeldId}
              className="block text-xs font-mono font-black text-black uppercase tracking-wider"
            >
              Total Classes Held
            </label>
            <div className="relative">
              <input
                id={totalHeldId}
                type="number"
                min="0"
                max="500"
                value={totalHeld}
                onChange={(e) => {
                  const val = e.target.value;
                  setTotalHeld(val === "" ? "" : Math.max(0, parseInt(val, 10) || 0));
                }}
                placeholder="e.g. 45"
                className="w-full bg-white border-2 border-black text-black text-lg font-mono font-black rounded-xl px-4 py-3 outline-none shadow-neo-sm focus:ring-2 focus:ring-flunked-yellow transition"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-flunked-muted font-bold">
                lectures
              </span>
            </div>
            <div className="flex gap-1.5 pt-1">
              {[30, 45, 60].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setTotalHeld(preset)}
                  className="text-[10px] font-mono px-2.5 py-1 rounded bg-white hover:bg-flunked-yellow border-2 border-black text-black font-black shadow-neo-sm transition cursor-pointer"
                >
                  +{preset}
                </button>
              ))}
            </div>
          </div>

          {/* Classes Attended */}
          <div className="space-y-2">
            <label
              htmlFor={attendedId}
              className="block text-xs font-mono font-black text-black uppercase tracking-wider"
            >
              Classes Attended
            </label>
            <div className="relative">
              <input
                id={attendedId}
                type="number"
                min="0"
                max="500"
                value={attended}
                onChange={(e) => {
                  const val = e.target.value;
                  setAttended(val === "" ? "" : Math.max(0, parseInt(val, 10) || 0));
                }}
                placeholder="e.g. 38"
                className="w-full bg-white border-2 border-black text-black text-lg font-mono font-black rounded-xl px-4 py-3 outline-none shadow-neo-sm focus:ring-2 focus:ring-flunked-yellow transition"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-flunked-muted font-bold">
                attended
              </span>
            </div>
            <div className="flex gap-1.5 pt-1">
              {[numHeld > 0 ? numHeld : 40, Math.floor((numHeld || 45) * 0.75)].map(
                (preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAttended(preset)}
                    className="text-[10px] font-mono px-2.5 py-1 rounded bg-white hover:bg-flunked-yellow border-2 border-black text-black font-black shadow-neo-sm transition cursor-pointer"
                  >
                    {idx === 0 ? "100%" : "75% Target"}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Error if attended > held */}
        {isAttendedGreaterThanHeld && (
          <div className="p-3.5 bg-[#FFF0F0] border-2 border-flunked-danger rounded-xl text-xs text-flunked-danger font-mono font-bold flex items-start gap-2 shadow-neo-sm">
            <AlertTriangle className="w-4 h-4 text-flunked-danger shrink-0 mt-0.5 stroke-[2.5]" />
            <span>
              Attended classes cannot exceed total classes held, bro. Unless you attended your own
              proxy, check your numbers.
            </span>
          </div>
        )}

        {/* University Policy Preset Selector */}
        <div className="space-y-2.5 pt-2 border-t-2 border-black/10">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-mono font-black text-black uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>University Rule Preset</span>
            </label>
            <span className="text-[10px] font-mono font-bold text-flunked-muted">
              Auto-sets target %
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {ATTENDANCE_PRESETS.map((preset) => {
              const isSelected = selectedPresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handlePresetChange(preset.id)}
                  className={`p-2.5 rounded-xl border-2 border-black text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-flunked-yellow text-black font-black shadow-neo-sm translate-x-[-1px] translate-y-[-1px]"
                      : "bg-white hover:bg-flunked-bg text-black shadow-none font-bold"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-xs font-mono font-black truncate">
                      {preset.shortName}
                    </span>
                    <span
                      className={`text-[9px] font-mono px-1 py-0.2 rounded border border-black ${
                        isSelected ? "bg-black text-white" : "bg-flunked-bg text-black"
                      }`}
                    >
                      {preset.targetPercent}%
                    </span>
                  </div>
                  <div className="text-[10px] text-black/70 font-mono font-medium truncate">
                    {preset.badge}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Preset Rule Note */}
          {currentPreset && (
            <div className="p-3 bg-flunked-bg border-2 border-black/15 rounded-xl text-xs font-mono text-black/80 flex items-start gap-2">
              <span className="font-black text-black shrink-0">Official Policy:</span>
              <span>
                {currentPreset.ruleSummary}{" "}
                {currentPreset.popularColleges && (
                  <span className="text-flunked-muted font-medium block sm:inline">
                    ({currentPreset.popularColleges})
                  </span>
                )}
              </span>
            </div>
          )}
        </div>

        {/* Target Attendance % Slider (60-90) */}
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <label htmlFor={targetId} className="text-black font-black uppercase tracking-wider">
              Target Minimum Attendance
            </label>
            <span className="font-black text-base text-black bg-flunked-yellow border border-black px-2 py-0.5 rounded shadow-neo-sm">
              {targetPercent}%
            </span>
          </div>

          <input
            id={targetId}
            type="range"
            min="50"
            max="95"
            step="1"
            value={targetPercent}
            onChange={(e) => setTargetPercent(parseInt(e.target.value, 10))}
            className="w-full cursor-pointer transition"
          />

          <div className="flex justify-between items-center text-[11px] font-mono text-black font-bold">
            <button
              type="button"
              onClick={() => setTargetPercent(65)}
              className="hover:bg-flunked-yellow px-1 py-0.5 rounded transition cursor-pointer"
              title="Medical / Condonation quota"
            >
              65% (Medical)
            </button>
            <button
              type="button"
              onClick={() => setTargetPercent(75)}
              className="bg-flunked-yellow px-1.5 py-0.5 rounded border border-black shadow-neo-sm font-black transition cursor-pointer"
              title="Standard UGC / University Rule"
            >
              75% (Standard)
            </button>
            <button
              type="button"
              onClick={() => setTargetPercent(80)}
              className="hover:bg-flunked-yellow px-1 py-0.5 rounded transition cursor-pointer"
              title="Strict Colleges / Autonomous"
            >
              80% (Strict)
            </button>
            <button
              type="button"
              onClick={() => setTargetPercent(85)}
              className="hover:bg-flunked-yellow px-1 py-0.5 rounded transition cursor-pointer"
            >
              85% (Medical)
            </button>
          </div>
        </div>

        {/* Visual Attendance Progress Bar */}
        <div className="pt-2">
          <AttendanceProgressBar
            currentPercentage={result.currentPercentage}
            targetPercentage={targetPercent}
          />
        </div>
      </div>

      {/* Result Card */}
      <ResultCard
        title="Attendance Status"
        toolName="Bunk Calculator"
        categoryLabel="Academics"
        toolSlug="bunk-calculator"
        headline={result.headline}
        metric={`${result.currentPercentage}%`}
        metricLabel={`Current (Target: ${result.targetPercentage}%)`}
        verdict={result.verdict}
        status={result.status}
        shareText={result.shareText}
        breakdown={[
          { label: "Held", value: numHeld },
          { label: "Attended", value: safeAttended },
          {
            label: result.canBunk
              ? "Safe Skips"
              : result.isReachable === false
              ? "Status"
              : "Needed",
            value: result.isReachable === false ? "Not reachable" : result.classesCount,
          },
        ]}
      >
        {/* Additional contextual breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
          <div className="p-3 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm">
            <div className="text-flunked-muted text-[10px] uppercase font-bold">Classes Held</div>
            <div className="text-base font-black text-black mt-0.5">{numHeld}</div>
          </div>
          <div className="p-3 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm">
            <div className="text-flunked-muted text-[10px] uppercase font-bold">Attended</div>
            <div className="text-base font-black text-black mt-0.5">{safeAttended}</div>
          </div>
          <div className="p-3 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm col-span-2 sm:col-span-1">
            <div className="text-flunked-muted text-[10px] uppercase font-bold">
              {result.canBunk ? "Margin to Bunk" : "Back-to-back Needed"}
            </div>
            <div
              className={`text-base font-black mt-0.5 ${
                result.canBunk ? "text-[#00A843]" : "text-[#FF3333]"
              }`}
            >
              {result.isReachable === false
                ? "Not reachable"
                : `${result.classesCount} lecture${result.classesCount !== 1 ? "s" : ""}`}
            </div>
          </div>
        </div>

        {/* Practical tip */}
        <div className="mt-3 text-xs text-black font-mono font-bold flex items-center gap-2">
          {result.canBunk ? (
            <CheckCircle2 className="w-4 h-4 text-[#00C853] shrink-0 stroke-[3]" />
          ) : (
            <ShieldAlert className="w-4 h-4 text-[#FF3333] shrink-0 stroke-[2.5]" />
          )}
          <span>
            {result.canBunk
              ? "Tip: Save skips for rainy mornings, project crunches, or festival weeks."
              : "Tip: Beg your professor for assignment compensation before attendance locks."}
          </span>
        </div>
      </ResultCard>
    </div>
  );
}
