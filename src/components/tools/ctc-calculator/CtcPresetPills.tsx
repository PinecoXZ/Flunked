import React from "react";

export interface CtcPreset {
  label: string;
  value: number;
  tag: string;
  bonus: number;
  esop: number;
}

export const CTC_PRESETS: CtcPreset[] = [
  { label: "4 LPA", value: 400000, tag: "Mass Recruiter", bonus: 0, esop: 0 },
  { label: "7 LPA", value: 700000, tag: "DSE / Prime", bonus: 50000, esop: 0 },
  { label: "12 LPA", value: 1200000, tag: "Mid-Product", bonus: 100000, esop: 100000 },
  { label: "20 LPA", value: 2000000, tag: "Tier 1 Fintech", bonus: 200000, esop: 400000 },
  { label: "45 LPA", value: 4500000, tag: "FAANG / Unicorn", bonus: 500000, esop: 1500000 },
];

export interface CtcPresetPillsProps {
  ctc: number;
  onApplyPreset: (preset: CtcPreset) => void;
}

export const CtcPresetPills = React.memo(function CtcPresetPills({
  ctc,
  onApplyPreset,
}: CtcPresetPillsProps) {
  return (
    <div>
      <label className="block text-xs font-mono uppercase tracking-wider text-black font-black mb-2.5">
        Quick Presets (Common Offer Letters):
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {CTC_PRESETS.map((p) => {
          const isSelected = ctc === p.value;
          return (
            <button
              key={p.label}
              type="button"
              onClick={() => onApplyPreset(p)}
              className={`p-3 rounded-xl border-2 border-black text-left transition-all cursor-pointer ${
                isSelected
                  ? "bg-flunked-yellow text-black font-black shadow-neo translate-x-[-1px] translate-y-[-1px]"
                  : "bg-white text-black font-bold shadow-neo-sm hover:bg-flunked-yellow/20 hover:shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-black text-sm text-black">{p.label}</span>
                {isSelected && <span className="w-2 h-2 rounded-full bg-black" />}
              </div>
              <div className="text-[11px] font-mono text-black/75 truncate mt-0.5">{p.tag}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
});
