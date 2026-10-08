import React from "react";
import { Receipt, Plus } from "lucide-react";
import { NeoButton } from "@/components/ui/NeoButton";
import { NeoCard } from "@/components/ui/NeoCard";

export interface ExpenseFormProps {
  desc: string;
  amount: string;
  paidBy: string;
  splitAmong: string[];
  people: string[];
  onDescChange: (val: string) => void;
  onAmountChange: (val: string) => void;
  onPaidByChange: (val: string) => void;
  onToggleSplitPerson: (name: string) => void;
  onSelectAllSplit: () => void;
  onAddExpense: (e: React.FormEvent) => void;
}

export const ExpenseForm = React.memo(function ExpenseForm({
  desc,
  amount,
  paidBy,
  splitAmong,
  people,
  onDescChange,
  onAmountChange,
  onPaidByChange,
  onToggleSplitPerson,
  onSelectAllSplit,
  onAddExpense,
}: ExpenseFormProps) {
  return (
    <NeoCard className="p-6 sm:p-8 space-y-6">
      <h3 className="text-sm font-mono uppercase tracking-wider text-black font-black flex items-center gap-2">
        <Receipt className="w-4 h-4 text-black" />
        <span>Add Expense</span>
      </h3>

      <form onSubmit={onAddExpense} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Description */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-mono text-black font-black mb-1">
              Description
            </label>
            <input
              type="text"
              value={desc}
              onChange={(e) => onDescChange(e.target.value)}
              placeholder="e.g. Swiggy 2am Biryani, Water Cans, Maggi"
              required
              className="w-full px-3.5 py-2.5 bg-white border-2 border-black rounded-xl text-black text-sm font-mono font-bold placeholder:text-black/40 shadow-neo-sm focus:ring-2 focus:ring-flunked-yellow focus:outline-none transition-all"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-xs font-mono text-black font-black mb-1">Amount (₹)</label>
            <input
              type="number"
              step="any"
              min="1"
              value={amount}
              onChange={(e) => onAmountChange(e.target.value)}
              placeholder="₹ 650"
              required
              className="w-full px-3.5 py-2.5 bg-white border-2 border-black rounded-xl text-black text-sm font-mono font-black placeholder:text-black/40 shadow-neo-sm focus:ring-2 focus:ring-flunked-yellow focus:outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
          {/* Paid By */}
          <div>
            <label className="block text-xs font-mono text-black font-black mb-1.5">
              Who Paid?
            </label>
            <select
              value={paidBy}
              onChange={(e) => onPaidByChange(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border-2 border-black rounded-xl text-black text-sm font-mono font-bold shadow-neo-sm focus:ring-2 focus:ring-flunked-yellow focus:outline-none transition-all cursor-pointer"
            >
              {people.map((p) => (
                <option key={p} value={p}>
                  {p} paid full bill
                </option>
              ))}
            </select>
          </div>

          {/* Split Among */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-mono text-black font-black">Split Between:</label>
              <button
                type="button"
                onClick={onSelectAllSplit}
                className="text-[11px] font-mono text-black hover:underline font-black cursor-pointer"
              >
                Select All
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {people.map((p) => {
                const isChecked = splitAmong.includes(p);
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => onToggleSplitPerson(p)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono border-2 border-black transition-all cursor-pointer ${
                      isChecked
                        ? "bg-flunked-yellow text-black font-black shadow-neo-sm translate-x-[-1px] translate-y-[-1px]"
                        : "bg-white text-black font-bold shadow-neo-sm hover:bg-flunked-yellow/20"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <NeoButton
          type="submit"
          size="lg"
          className="w-full"
          icon={<Plus className="w-4 h-4 text-black" />}
        >
          Add to Hostel Tab
        </NeoButton>
      </form>
    </NeoCard>
  );
});
