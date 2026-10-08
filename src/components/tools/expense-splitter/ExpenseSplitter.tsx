"use client";

import React, { useState, useMemo, useCallback } from "react";
import { useClipboard } from "@/hooks/useClipboard";
import { solveExpenseSplit, type ExpenseItem } from "@/lib/calculations";
import { formatCurrencyINR } from "@/lib/utils";
import { Users } from "lucide-react";
import { RoommatesChipBar } from "./RoommatesChipBar";
import { ExpenseForm } from "./ExpenseForm";
import { SettlementCard } from "./SettlementCard";
import { ExpenseHistoryList } from "./ExpenseHistoryList";
import { NeoButton } from "@/components/ui/NeoButton";
import { NeoCard } from "@/components/ui/NeoCard";

const SAMPLE_ROOMMATES = ["Ayush", "Rahul", "Priya", "Chirag"];

const SAMPLE_EXPENSES: ExpenseItem[] = [
  {
    id: "exp-1",
    description: "2 AM Dominos Pizza & Garlic Bread",
    amount: 1280,
    paidBy: "Ayush",
    splitAmong: ["Ayush", "Rahul", "Priya", "Chirag"],
  },
  {
    id: "exp-2",
    description: "Hostel 20L Water Cans (x4)",
    amount: 320,
    paidBy: "Rahul",
    splitAmong: ["Ayush", "Rahul", "Priya", "Chirag"],
  },
  {
    id: "exp-3",
    description: "Late Night Auto Fare from Station",
    amount: 240,
    paidBy: "Priya",
    splitAmong: ["Ayush", "Rahul", "Priya"],
  },
  {
    id: "exp-4",
    description: "Semester Exam Xerox & Spiral Binding",
    amount: 195,
    paidBy: "Ayush",
    splitAmong: ["Ayush", "Rahul", "Chirag"],
  },
];

export function ExpenseSplitter() {
  const [people, setPeople] = useState<string[]>(SAMPLE_ROOMMATES);
  const [newPersonName, setNewPersonName] = useState<string>("");
  const [expenses, setExpenses] = useState<ExpenseItem[]>(SAMPLE_EXPENSES);

  // New Expense form state
  const [desc, setDesc] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [paidBy, setPaidBy] = useState<string>(SAMPLE_ROOMMATES[0] || "");
  const [splitAmong, setSplitAmong] = useState<string[]>(SAMPLE_ROOMMATES);
  const { copied, copy } = useClipboard({ duration: 2200 });

  // Calculation output using debt-minimization algorithm
  const result = useMemo(() => {
    return solveExpenseSplit(people, expenses);
  }, [people, expenses]);

  // Manage people
  const handleAddPerson = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = newPersonName.trim();
      if (!trimmed || people.includes(trimmed)) return;

      const updated = [...people, trimmed];
      setPeople(updated);
      setSplitAmong(updated);
      if (!paidBy) setPaidBy(trimmed);
      setNewPersonName("");
    },
    [newPersonName, people, paidBy]
  );

  const handleRemovePerson = useCallback(
    (name: string) => {
      if (people.length <= 2) return; // Keep at least 2 people
      const updated = people.filter((p) => p !== name);
      setPeople(updated);
      setSplitAmong((prev) => prev.filter((p) => p !== name));
      if (paidBy === name) {
        setPaidBy(updated[0] || "");
      }
    },
    [people, paidBy]
  );

  // Toggle split participant
  const toggleSplitPerson = useCallback((name: string) => {
    setSplitAmong((prev) => {
      if (prev.includes(name)) {
        return prev.length > 1 ? prev.filter((p) => p !== name) : prev;
      }
      return [...prev, name];
    });
  }, []);

  const handleSelectAllSplit = useCallback(() => {
    setSplitAmong([...people]);
  }, [people]);

  // Add Expense
  const handleAddExpense = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const parsedAmount = parseFloat(amount);
      if (!desc.trim() || isNaN(parsedAmount) || parsedAmount <= 0) return;
      if (!paidBy || splitAmong.length === 0) return;

      const newExpense: ExpenseItem = {
        id: `exp-${Date.now()}`,
        description: desc.trim(),
        amount: parsedAmount,
        paidBy,
        splitAmong: [...splitAmong],
      };

      setExpenses((prev) => [newExpense, ...prev]);
      setDesc("");
      setAmount("");
      setSplitAmong([...people]);
    },
    [amount, desc, paidBy, splitAmong, people]
  );

  const handleRemoveExpense = useCallback((id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const handleClearAll = useCallback(() => {
    setExpenses([]);
  }, []);

  const handleLoadSample = useCallback(() => {
    setPeople(SAMPLE_ROOMMATES);
    setExpenses(SAMPLE_EXPENSES);
    setPaidBy(SAMPLE_ROOMMATES[0]);
    setSplitAmong(SAMPLE_ROOMMATES);
  }, []);

  const handleCopyWhatsApp = useCallback(() => {
    copy(result.whatsAppSummary);
  }, [copy, result.whatsAppSummary]);

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Actions */}
      <NeoCard className="flex flex-wrap items-center justify-between gap-3 p-5">
        <div className="flex items-center gap-2 font-mono text-xs text-black">
          <Users className="w-4 h-4 text-black" />
          <span>
            Roommates:{" "}
            <strong className="bg-flunked-yellow px-1.5 py-0.5 rounded border border-black">
              {people.length}
            </strong>
          </span>
          <span className="mx-1">•</span>
          <span>
            Expenses:{" "}
            <strong className="bg-flunked-yellow px-1.5 py-0.5 rounded border border-black">
              {expenses.length}
            </strong>
          </span>
          <span className="mx-1">•</span>
          <span>
            Total:{" "}
            <strong className="bg-flunked-yellow px-1.5 py-0.5 rounded border border-black">
              {formatCurrencyINR(result.totalSpent)}
            </strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <NeoButton variant="secondary" size="sm" onClick={handleLoadSample}>
            Load Sample Room
          </NeoButton>
          {expenses.length > 0 && (
            <NeoButton variant="danger" size="sm" onClick={handleClearAll}>
              Clear All
            </NeoButton>
          )}
        </div>
      </NeoCard>

      {/* Roommates Chip Bar */}
      <RoommatesChipBar
        people={people}
        newPersonName={newPersonName}
        onNewPersonNameChange={setNewPersonName}
        onAddPerson={handleAddPerson}
        onRemovePerson={handleRemovePerson}
      />

      {/* Add New Expense Form */}
      <ExpenseForm
        desc={desc}
        amount={amount}
        paidBy={paidBy}
        splitAmong={splitAmong}
        people={people}
        onDescChange={setDesc}
        onAmountChange={setAmount}
        onPaidByChange={setPaidBy}
        onToggleSplitPerson={toggleSplitPerson}
        onSelectAllSplit={handleSelectAllSplit}
        onAddExpense={handleAddExpense}
      />

      {/* Settlements Result Card (The Core Deliverable) */}
      <SettlementCard
        settlements={result.settlements}
        netBalances={result.netBalances}
        people={people}
        copied={copied}
        onCopyWhatsApp={handleCopyWhatsApp}
      />

      {/* Logged Expenses History */}
      <ExpenseHistoryList expenses={expenses} onRemoveExpense={handleRemoveExpense} />
    </div>
  );
}
