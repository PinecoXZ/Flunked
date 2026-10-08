import { GraduationCap } from "lucide-react";
import { TICKER_CAMPUSES as CAMPUSES } from "@/data/campuses";

export function CampusTicker() {
  return (
    <div className="w-full border-y-2 border-black bg-flunked-yellow py-3 overflow-hidden relative select-none shadow-neo-sm">
      <div className="max-w-7xl mx-auto px-4 mb-1.5 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase text-black font-black">
          <GraduationCap className="w-4 h-4 stroke-[2.5]" />
          <span>POPULAR CAMPUSES ACROSS INDIA:</span>
        </span>
        <span className="text-[11px] font-mono text-black font-black hidden sm:inline bg-white px-2 py-0.5 rounded border border-black shadow-neo-sm">
          IITs · NITs · BITS · State &amp; Private Colleges
        </span>
      </div>

      <div className="relative flex overflow-x-hidden pt-1">
        <div className="animate-ticker flex items-center gap-6 sm:gap-8">
          {CAMPUSES.concat(CAMPUSES).map((campus, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 text-xs sm:text-sm font-mono font-black text-black uppercase tracking-wider whitespace-nowrap"
            >
              <span className="text-black font-black">★</span>
              <span>{campus}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
