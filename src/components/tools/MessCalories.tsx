"use client";

import React, { useState } from "react";
import { ResultCard, type ResultStatus } from "@/components/ui/ResultCard";
import { Utensils, Plus, Minus, RotateCcw, AlertCircle } from "lucide-react";

interface MessItem {
  id: string;
  name: string;
  cals: number;
  unit: string;
  meal: "breakfast" | "lunch" | "snacks" | "dinner";
}

const MESS_ITEMS: MessItem[] = [
  // Breakfast
  { id: "poha", name: "Poha / Upma", cals: 220, unit: "plate", meal: "breakfast" },
  { id: "bread", name: "Bread + Butter/Jam", cals: 160, unit: "2 slices", meal: "breakfast" },
  { id: "egg", name: "Boiled Egg", cals: 75, unit: "egg", meal: "breakfast" },
  { id: "chai_am", name: "Mess Chai", cals: 80, unit: "cup", meal: "breakfast" },
  { id: "milk", name: "Glass of Milk", cals: 120, unit: "glass", meal: "breakfast" },

  // Lunch
  { id: "roti_lunch", name: "Mess Roti / Chapati", cals: 95, unit: "roti", meal: "lunch" },
  { id: "rice_lunch", name: "Steamed White Rice", cals: 180, unit: "katori", meal: "lunch" },
  { id: "dal_lunch", name: "Yellow Dal / Sambar", cals: 140, unit: "katori", meal: "lunch" },
  { id: "sabzi_lunch", name: "Aloo / Mixed Sabzi", cals: 170, unit: "katori", meal: "lunch" },
  { id: "rajma", name: "Rajma / Chole", cals: 240, unit: "katori", meal: "lunch" },
  { id: "paneer_lunch", name: "Mess Paneer Gravy", cals: 310, unit: "katori", meal: "lunch" },

  // Snacks
  { id: "samosa", name: "Canteen Samosa", cals: 260, unit: "piece", meal: "snacks" },
  { id: "maggi", name: "Hostel Maggi", cals: 310, unit: "packet", meal: "snacks" },
  { id: "chai_pm", name: "Evening Chai / Coffee", cals: 85, unit: "cup", meal: "snacks" },
  { id: "biscuits", name: "Parle-G / Biscuits", cals: 140, unit: "packet", meal: "snacks" },

  // Dinner
  { id: "roti_dinner", name: "Dinner Roti", cals: 95, unit: "roti", meal: "dinner" },
  {
    id: "rice_dinner",
    name: "Dinner Rice / Fried Rice",
    cals: 190,
    unit: "katori",
    meal: "dinner",
  },
  { id: "dal_dinner", name: "Dinner Dal / Tadka", cals: 150, unit: "katori", meal: "dinner" },
  {
    id: "chicken_dinner",
    name: "Special / Chicken Curry",
    cals: 330,
    unit: "katori",
    meal: "dinner",
  },
];

export function MessCalories() {
  const [quantities, setQuantities] = useState<Record<string, number>>({
    poha: 1,
    chai_am: 1,
    roti_lunch: 3,
    rice_lunch: 1,
    dal_lunch: 1,
    sabzi_lunch: 1,
    maggi: 1,
    roti_dinner: 3,
    dal_dinner: 1,
  });

  const [activeMealFilter, setActiveMealFilter] = useState<string>("all");

  const updateQty = (id: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const resetAll = () => setQuantities({});

  // Compute total calories
  const totalCalories = MESS_ITEMS.reduce((sum, item) => {
    const qty = quantities[item.id] || 0;
    return sum + qty * item.cals;
  }, 0);

  // Verdict according to PRD
  let status: ResultStatus = "safe";
  let headline = "";
  let verdict = "";

  if (totalCalories < 1500) {
    status = "warning";
    headline = "Undereating Mode";
    verdict = `${totalCalories} kcal. You barely ate today. Eat more.`;
  } else if (totalCalories <= 2200) {
    status = "safe";
    headline = "Balanced Fuel";
    verdict = `${totalCalories} kcal. That's a reasonable day.`;
  } else {
    status = "danger";
    headline = "Carb Heavy Mess Day";
    verdict = `${totalCalories} kcal. No judgment. Mess food hits different.`;
  }

  const filteredItems =
    activeMealFilter === "all" ? MESS_ITEMS : MESS_ITEMS.filter((i) => i.meal === activeMealFilter);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Selector Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-black shadow-neo space-y-6">
        <div className="border-b-2 border-black pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-black shadow-neo-sm">
              <Utensils className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-xl font-black text-black">Mess Calorie Counter</h2>
              <p className="text-xs text-flunked-muted font-bold font-sans">
                Pick what you ate today. Get a rough calorie count. Emphasis on rough.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={resetAll}
            className="flex items-center gap-1 text-[11px] font-mono font-black uppercase text-flunked-muted hover:text-black transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Meal Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {["all", "breakfast", "lunch", "snacks", "dinner"].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setActiveMealFilter(m)}
              className={`px-3 py-1.5 rounded-lg border-2 border-black text-xs font-mono font-black uppercase transition-all shadow-neo-sm cursor-pointer ${
                activeMealFilter === m
                  ? "bg-flunked-yellow text-black"
                  : "bg-white text-black hover:bg-flunked-bgSubtle"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredItems.map((item) => {
            const qty = quantities[item.id] || 0;
            const isSelected = qty > 0;
            return (
              <div
                key={item.id}
                className={`p-3 rounded-xl border-2 border-black transition-all flex items-center justify-between shadow-neo-sm ${
                  isSelected ? "bg-flunked-yellow/15 border-black" : "bg-white"
                }`}
              >
                <div>
                  <div className="text-xs font-mono font-black text-black">{item.name}</div>
                  <div className="text-[11px] font-mono text-flunked-muted">
                    {item.cals} kcal / {item.unit}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => updateQty(item.id, -1)}
                    disabled={qty === 0}
                    className="w-7 h-7 rounded-md border border-black bg-white flex items-center justify-center text-black disabled:opacity-30 cursor-pointer active:scale-95"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-6 text-center font-mono font-black text-xs text-black">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQty(item.id, 1)}
                    className="w-7 h-7 rounded-md border border-black bg-flunked-yellow flex items-center justify-center text-black cursor-pointer active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Satire / Health Disclaimer */}
        <div className="p-3 rounded-xl bg-flunked-bg border border-black/20 flex items-start gap-2 text-xs font-mono text-flunked-muted">
          <AlertCircle className="w-4 h-4 text-black shrink-0 mt-0.5" />
          <span>
            These are estimates based on standard Indian hostel menus. Don&apos;t make medical or
            dietary decisions from this.
          </span>
        </div>
      </div>

      {/* Result Card */}
      <ResultCard
        headline={headline}
        metric={`${totalCalories.toLocaleString()} kcal`}
        metricLabel="Estimated Daily Intake"
        verdict={verdict}
        status={status}
        shareText={`I consumed ~${totalCalories} kcal of Indian college mess food today! Tracked on flunked.fun`}
      />
    </div>
  );
}
