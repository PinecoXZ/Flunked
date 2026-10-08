import React from "react";
import { type DebtSettlement } from "@/lib/calculations";
import { formatCurrencyINR } from "@/lib/utils";
import { Sparkles, Copy, Check, ArrowRight } from "lucide-react";
import { NeoButton } from "@/components/ui/NeoButton";

export interface SettlementCardProps {
  settlements: DebtSettlement[];
  netBalances: Record<string, number>;
  people: string[];
  copied: boolean;
  onCopyWhatsApp: () => void;
}

export const SettlementCard = React.memo(function SettlementCard({
  settlements,
  netBalances,
  people,
  copied,
  onCopyWhatsApp,
}: SettlementCardProps) {
  return (
    <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8 shadow-neo-lg relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black pb-5">
        <div>
          <span className="text-xs font-mono font-black text-black uppercase tracking-wider flex items-center gap-1.5 bg-flunked-yellow border-2 border-black px-2.5 py-0.5 rounded shadow-neo-sm inline-flex">
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>MINIMAL UPI SETTLEMENT</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-black mt-2">Who Owes Who, Exactly</h3>
          <p className="text-xs text-black/70 mt-0.5 font-sans font-medium">
            Graph debt-minimization algorithm reduces multi-party chaos into fewest possible
            transactions.
          </p>
        </div>

        <NeoButton
          variant="secondary"
          size="sm"
          onClick={onCopyWhatsApp}
          className="self-start sm:self-center"
          icon={
            copied ? (
              <Check className="w-3.5 h-3.5 text-black" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-black" />
            )
          }
        >
          {copied ? "Copied WhatsApp Message!" : "Copy WhatsApp Summary"}
        </NeoButton>
      </div>

      {/* Transactions List */}
      <div className="my-6">
        {settlements.length === 0 ? (
          <div className="p-6 text-center rounded-xl bg-flunked-bg border-2 border-black text-black font-mono font-bold text-sm shadow-neo-sm">
            All settled up! Nobody owes anything.
          </div>
        ) : (
          <div className="space-y-3">
            {settlements.map((s: DebtSettlement, idx: number) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center font-mono text-xs text-black font-black shrink-0 shadow-neo-sm">
                    {idx + 1}
                  </div>

                  <div className="flex items-center gap-2 font-mono text-sm sm:text-base">
                    <span className="font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-300">
                      {s.from}
                    </span>
                    <span className="text-black/60 text-xs font-bold">pays</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                    <span className="font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
                      {s.to}
                    </span>
                  </div>
                </div>

                <div className="text-right sm:text-right font-mono pl-11 sm:pl-0">
                  <span className="text-xl sm:text-2xl font-black text-black bg-flunked-yellow px-2.5 py-0.5 rounded border border-black shadow-neo-sm">
                    {formatCurrencyINR(s.amount)}
                  </span>
                  <span className="block text-[10px] font-mono text-black/60 font-bold mt-1">
                    Clean UPI transfer
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Net Balance Matrix */}
      <div className="pt-4 border-t-2 border-black">
        <span className="text-xs font-mono uppercase tracking-wider text-black block mb-3 font-black">
          Individual Net Balances:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
          {people.map((p) => {
            const bal = netBalances[p] || 0;
            const isPositive = bal > 0.5;
            const isNegative = bal < -0.5;

            return (
              <div
                key={p}
                className="p-3.5 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm"
              >
                <div className="text-black truncate font-black">{p}</div>
                <div
                  className={`text-sm font-black mt-1 ${
                    isPositive ? "text-emerald-700" : isNegative ? "text-rose-600" : "text-black/60"
                  }`}
                >
                  {isPositive && "+"}
                  {formatCurrencyINR(Math.round(bal))}
                </div>
                <div className="text-[10px] font-mono text-black/60 mt-0.5 font-bold">
                  {isPositive ? "to receive" : isNegative ? "to pay" : "even"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
