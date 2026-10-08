"use client";

import { useState } from "react";
import { ResultCard, type ResultStatus } from "@/components/ui/ResultCard";
import { Moon } from "lucide-react";
import { clamp } from "@/lib/utils";

export function SleepDebt() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [sleepHours, setSleepHours] = useState<number[]>([6, 5.5, 6, 7, 4, 8, 7]);
  const [targetPerNight, setTargetPerNight] = useState<number>(8);

  const updateDay = (idx: number, val: number) => {
    const clamped = clamp(val, 0, 16);
    const next = [...sleepHours];
    next[idx] = clamped;
    setSleepHours(next);
  };

  const totalSleep = sleepHours.reduce((acc, h) => acc + h, 0);
  const targetTotal = targetPerNight * 7;
  const debt = Math.max(0, targetTotal - totalSleep);
  const recoveryNights = debt > 0 ? Math.ceil(debt / 1.75) : 0;

  // PRD result states
  let status: ResultStatus = "safe";
  let headline = "";
  let verdict = "";

  if (debt <= 4) {
    status = "safe";
    headline = "Well Rested";
    verdict = `${debt.toFixed(1)} hours short. Sleep in this weekend and you'll be fine.`;
  } else if (debt <= 12) {
    status = "warning";
    headline = "Accumulating Brain Fog";
    verdict = `${debt.toFixed(1)} hours short. That's affecting your focus right now whether you feel it or not.`;
  } else {
    status = "danger";
    headline = "Zombie Mode Active";
    verdict = `${debt.toFixed(1)} hours short. Your brain is running on fumes. This is serious.`;
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Parameter Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-black shadow-neo space-y-6">
        <div className="border-b-2 border-black pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-black shadow-neo-sm">
              <Moon className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-xl font-black text-black">Sleep Debt Calculator</h2>
              <p className="text-xs text-flunked-muted font-bold font-sans">
                How much sleep have you stolen from yourself this week?
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-black uppercase bg-flunked-yellow px-2 py-0.5 rounded border border-black text-black shadow-neo-sm">
            Recovery Math
          </span>
        </div>

        {/* 7-Day Sleep Inputs */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-black uppercase text-black">
              Hours Slept Per Night (Mon – Sun)
            </label>
            <span className="text-xs font-mono font-black text-flunked-muted">
              Total: {totalSleep.toFixed(1)} hrs
            </span>
          </div>

          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {days.map((day, idx) => (
              <div key={day} className="flex flex-col items-center gap-1">
                <span className="text-[11px] font-mono font-black text-black uppercase">{day}</span>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="16"
                  value={sleepHours[idx]}
                  onChange={(e) => updateDay(idx, parseFloat(e.target.value) || 0)}
                  className="w-full px-1 sm:px-2 py-2 text-center rounded-xl border-2 border-black bg-white font-mono font-bold text-xs sm:text-sm text-black shadow-neo-sm focus:outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Target Sleep Slider */}
        <div className="space-y-1.5 pt-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-black uppercase text-black">
              Target Sleep Per Night
            </label>
            <span className="text-xs font-mono font-black text-black">
              {targetPerNight} hours / night
            </span>
          </div>
          <input
            type="range"
            min="6"
            max="10"
            step="0.5"
            value={targetPerNight}
            onChange={(e) => setTargetPerNight(Number(e.target.value))}
            className="w-full accent-black cursor-pointer"
          />
        </div>
      </div>

      {/* Result Card */}
      <ResultCard
        headline={headline}
        metric={`${debt.toFixed(1)} hrs`}
        metricLabel="Weekly Sleep Debt"
        verdict={verdict}
        status={status}
        shareText={`I'm ${debt.toFixed(1)} hours in sleep debt this week! Checked on flunked.fun`}
      >
        <div className="mt-4 pt-4 border-t-2 border-black/10 grid grid-cols-3 gap-2 text-center text-xs font-mono font-bold text-black">
          <div className="p-2.5 rounded-lg bg-flunked-bg border border-black/20">
            <span className="block text-[10px] text-flunked-muted">Slept This Week</span>
            <span className="text-sm font-black">
              {totalSleep.toFixed(1)}h / {targetTotal}h
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-flunked-bg border border-black/20">
            <span className="block text-[10px] text-flunked-muted">Average / Night</span>
            <span className="text-sm font-black">{(totalSleep / 7).toFixed(1)}h</span>
          </div>
          <div className="p-2.5 rounded-lg bg-flunked-bg border border-black/20">
            <span className="block text-[10px] text-flunked-muted">Recovery Protocol</span>
            <span className="text-sm font-black">~{recoveryNights} full nights</span>
          </div>
        </div>
      </ResultCard>
    </div>
  );
}
