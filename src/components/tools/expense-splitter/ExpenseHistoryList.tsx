import React from "react";
import { type ExpenseItem } from "@/lib/calculations";
import { formatCurrencyINR } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { NeoCard } from "@/components/ui/NeoCard";

export interface ExpenseHistoryListProps {
  expenses: ExpenseItem[];
  onRemoveExpense: (id: string) => void;
}

export const ExpenseHistoryList = React.memo(function ExpenseHistoryList({
  expenses,
  onRemoveExpense,
}: ExpenseHistoryListProps) {
  if (expenses.length === 0) return null;

  return (
    <NeoCard className="p-6">
      <h4 className="text-xs font-mono uppercase tracking-wider text-black mb-4 font-black">
        Logged Expenses List ({expenses.length})
      </h4>

      <div className="space-y-2">
        {expenses.map((e) => (
          <div
            key={e.id}
            className="p-3.5 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm flex items-center justify-between gap-3 text-xs font-mono"
          >
            <div className="flex-1 min-w-0">
              <div className="text-black font-black truncate">{e.description}</div>
              <div className="text-black/70 text-[11px] mt-0.5 font-bold">
                Paid by{" "}
                <strong className="text-black bg-flunked-yellow px-1 rounded border border-black">
                  {e.paidBy}
                </strong>{" "}
                · Split among {e.splitAmong.join(", ")}
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="font-black text-black text-sm">{formatCurrencyINR(e.amount)}</span>
              <button
                onClick={() => onRemoveExpense(e.id)}
                className="text-black/50 hover:text-rose-600 transition-colors p-1 cursor-pointer font-black"
                title="Delete expense"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </NeoCard>
  );
});
