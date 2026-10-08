import React from "react";
import { formatCurrencyINR } from "@/lib/utils";
import { NeoCard } from "@/components/ui/NeoCard";

export interface CtcFormProps {
  ctc: number;
  bonus: number;
  esop: number;
  isMetro: boolean;
  onCtcChange: (val: number) => void;
  onBonusChange: (val: number) => void;
  onEsopChange: (val: number) => void;
  onIsMetroChange: (val: boolean) => void;
}

export const CtcForm = React.memo(function CtcForm({
  ctc,
  bonus,
  esop,
  isMetro,
  onCtcChange,
  onBonusChange,
  onEsopChange,
  onIsMetroChange,
}: CtcFormProps) {
  return (
    <NeoCard className="p-6 sm:p-8 space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-mono uppercase tracking-wider text-black font-black">
            Annual CTC (Cost to Company)
          </label>
          <span className="font-mono text-base sm:text-lg font-black text-black bg-flunked-yellow px-2.5 py-0.5 rounded border border-black shadow-neo-sm">
            {formatCurrencyINR(ctc)}
          </span>
        </div>
        <input
          type="range"
          min={200000}
          max={6000000}
          step={50000}
          value={ctc}
          onChange={(e) => onCtcChange(Number(e.target.value))}
          className="w-full h-3 bg-white border-2 border-black rounded-lg appearance-none cursor-pointer accent-[#FFE600]"
        />
        <div className="flex justify-between text-[11px] font-mono font-bold text-black/70 mt-1.5">
          <span>₹2 LPA</span>
          <span>₹20 LPA</span>
          <span>₹60 LPA</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        {/* Annual Variable Bonus */}
        <div>
          <label className="block text-xs font-mono text-black font-black mb-1.5">
            Annual Variable / Bonus (₹)
          </label>
          <input
            type="number"
            step={10000}
            min={0}
            value={bonus}
            onChange={(e) => onBonusChange(Math.max(0, Number(e.target.value)))}
            className="w-full px-3.5 py-2.5 bg-white border-2 border-black rounded-xl text-black font-mono font-black text-sm shadow-neo-sm focus:ring-2 focus:ring-flunked-yellow focus:outline-none"
            placeholder="e.g. 50000"
          />
          <p className="text-[10px] font-mono text-black/70 mt-1">
            Usually paid once a year, not monthly.
          </p>
        </div>

        {/* ESOPs / Paper Stocks */}
        <div>
          <label className="block text-xs font-mono text-black font-black mb-1.5">
            ESOPs / Stocks per year (₹)
          </label>
          <input
            type="number"
            step={25000}
            min={0}
            value={esop}
            onChange={(e) => onEsopChange(Math.max(0, Number(e.target.value)))}
            className="w-full px-3.5 py-2.5 bg-white border-2 border-black rounded-xl text-black font-mono font-black text-sm shadow-neo-sm focus:ring-2 focus:ring-flunked-yellow focus:outline-none"
            placeholder="e.g. 100000"
          />
          <p className="text-[10px] font-mono text-black/70 mt-1">
            Vests over 4 years. Cannot buy samosas with paper wealth.
          </p>
        </div>

        {/* Metro Location Toggle */}
        <div>
          <label className="block text-xs font-mono text-black font-black mb-1.5">
            Work Location
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onIsMetroChange(true)}
              className={`py-2 px-3 rounded-xl border-2 border-black text-xs font-mono font-black transition-all cursor-pointer ${
                isMetro
                  ? "bg-flunked-yellow text-black shadow-neo-sm"
                  : "bg-white text-black hover:bg-flunked-yellow/20"
              }`}
            >
              Metro (BLR/DEL)
            </button>
            <button
              type="button"
              onClick={() => onIsMetroChange(false)}
              className={`py-2 px-3 rounded-xl border-2 border-black text-xs font-mono font-black transition-all cursor-pointer ${
                !isMetro
                  ? "bg-flunked-yellow text-black shadow-neo-sm"
                  : "bg-white text-black hover:bg-flunked-yellow/20"
              }`}
            >
              Non-Metro
            </button>
          </div>
          <p className="text-[10px] font-mono text-black/70 mt-1">Affects HRA base computation.</p>
        </div>
      </div>
    </NeoCard>
  );
});
