"use client";

import { useState } from "react";
import { ResultCard, type ResultStatus } from "@/components/ui/ResultCard";
import { formatCurrencyINR } from "@/lib/utils";
import { Banknote, Building2, Home } from "lucide-react";

interface CityCost {
  name: string;
  tier: string;
  rentSolo: number;
  foodMonthly: number;
  transitMonthly: number;
  miscMonthly: number;
}

const CITY_COSTS: Record<string, CityCost> = {
  Mumbai: {
    name: "Mumbai",
    tier: "Tier 1+",
    rentSolo: 14000,
    foodMonthly: 6500,
    transitMonthly: 2500,
    miscMonthly: 3000,
  },
  Bangalore: {
    name: "Bangalore",
    tier: "Tier 1",
    rentSolo: 12000,
    foodMonthly: 6000,
    transitMonthly: 2500,
    miscMonthly: 2500,
  },
  Gurgaon: {
    name: "Gurgaon",
    tier: "Tier 1",
    rentSolo: 12500,
    foodMonthly: 6000,
    transitMonthly: 2000,
    miscMonthly: 2500,
  },
  Delhi: {
    name: "Delhi",
    tier: "Tier 1",
    rentSolo: 10000,
    foodMonthly: 5500,
    transitMonthly: 2200,
    miscMonthly: 2500,
  },
  Noida: {
    name: "Noida",
    tier: "Tier 1",
    rentSolo: 9000,
    foodMonthly: 5500,
    transitMonthly: 1800,
    miscMonthly: 2200,
  },
  Hyderabad: {
    name: "Hyderabad",
    tier: "Tier 1",
    rentSolo: 9500,
    foodMonthly: 5000,
    transitMonthly: 2000,
    miscMonthly: 2000,
  },
  Pune: {
    name: "Pune",
    tier: "Tier 1",
    rentSolo: 9500,
    foodMonthly: 5500,
    transitMonthly: 2000,
    miscMonthly: 2200,
  },
  Chennai: {
    name: "Chennai",
    tier: "Tier 1",
    rentSolo: 8500,
    foodMonthly: 5000,
    transitMonthly: 1800,
    miscMonthly: 2000,
  },
  Kolkata: {
    name: "Kolkata",
    tier: "Tier 2",
    rentSolo: 7000,
    foodMonthly: 4500,
    transitMonthly: 1500,
    miscMonthly: 1800,
  },
  Chandigarh: {
    name: "Chandigarh",
    tier: "Tier 2",
    rentSolo: 7500,
    foodMonthly: 4500,
    transitMonthly: 1500,
    miscMonthly: 1800,
  },
  Jaipur: {
    name: "Jaipur",
    tier: "Tier 2",
    rentSolo: 6500,
    foodMonthly: 4000,
    transitMonthly: 1200,
    miscMonthly: 1500,
  },
  Ahmedabad: {
    name: "Ahmedabad",
    tier: "Tier 2",
    rentSolo: 7000,
    foodMonthly: 4500,
    transitMonthly: 1500,
    miscMonthly: 1800,
  },
  Bhubaneswar: {
    name: "Bhubaneswar",
    tier: "Tier 2",
    rentSolo: 6000,
    foodMonthly: 3800,
    transitMonthly: 1200,
    miscMonthly: 1500,
  },
};

export function StipendChecker() {
  const [stipend, setStipend] = useState<number>(25000);
  const [selectedCity, setSelectedCity] = useState<string>("Bangalore");
  const [hasAccommodation, setHasAccommodation] = useState<boolean>(false);

  const city = CITY_COSTS[selectedCity] || CITY_COSTS["Bangalore"];
  const actualRent = hasAccommodation ? 0 : city.rentSolo;
  const totalExpenses = actualRent + city.foodMonthly + city.transitMonthly + city.miscMonthly;
  const netSavings = stipend - totalExpenses;

  // PRD result categorization
  let status: ResultStatus = "safe";
  let headline = "";
  let verdict = "";

  if (stipend < 8000) {
    status = "critical";
    headline = "Exploitation Energy";
    verdict = "That's below minimum wage energy. They're exploiting you.";
  } else if (netSavings < -2000) {
    status = "danger";
    headline = "Negative Cash Flow";
    verdict = `You'll be in deficit in ${selectedCity}. Negotiate or find housing support.`;
  } else if (netSavings >= -2000 && netSavings < 5000) {
    status = "warning";
    headline = "Barely Survivable";
    verdict = `Survivable in ${selectedCity}. Don't expect savings.`;
  } else {
    status = "safe";
    headline = "Solid Student Offer";
    verdict = `That's a solid stipend for ${selectedCity}. You'll save money.`;
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Configuration Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-black shadow-neo space-y-6">
        <div className="border-b-2 border-black pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-black shadow-neo-sm">
              <Banknote className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-xl font-black text-black">Is This Stipend Good?</h2>
              <p className="text-xs text-flunked-muted font-bold font-sans">
                That number in the offer email — what does it actually mean in that city?
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-black uppercase bg-flunked-yellow px-2 py-0.5 rounded border border-black text-black shadow-neo-sm">
            City Reality
          </span>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-black uppercase text-black">
                Monthly Stipend
              </label>
              <span className="text-xs font-mono font-black text-black">
                {formatCurrencyINR(stipend)}
              </span>
            </div>
            <input
              type="number"
              min="0"
              max="200000"
              step="1000"
              value={stipend}
              onChange={(e) => setStipend(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-white font-mono font-bold text-sm text-black shadow-neo-sm focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-black uppercase text-black flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>City of Internship</span>
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-white font-mono font-bold text-sm text-black shadow-neo-sm focus:outline-none cursor-pointer"
              >
                {Object.keys(CITY_COSTS).map((cityName) => (
                  <option key={cityName} value={cityName}>
                    {cityName} ({CITY_COSTS[cityName].tier})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-black uppercase text-black flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5" />
                <span>Company Housing</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setHasAccommodation(false)}
                  className={`px-3 py-2 rounded-xl border-2 border-black text-xs font-mono font-black transition-all shadow-neo-sm cursor-pointer ${
                    !hasAccommodation
                      ? "bg-flunked-yellow text-black"
                      : "bg-white text-black hover:bg-flunked-bgSubtle"
                  }`}
                >
                  Self / PG
                </button>
                <button
                  type="button"
                  onClick={() => setHasAccommodation(true)}
                  className={`px-3 py-2 rounded-xl border-2 border-black text-xs font-mono font-black transition-all shadow-neo-sm cursor-pointer ${
                    hasAccommodation
                      ? "bg-flunked-yellow text-black"
                      : "bg-white text-black hover:bg-flunked-bgSubtle"
                  }`}
                >
                  Provided
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Result Card */}
      <ResultCard
        headline={headline}
        metric={`${netSavings >= 0 ? "+" : ""}${formatCurrencyINR(netSavings)}`}
        metricLabel="Estimated Net Savings / Month"
        verdict={verdict}
        status={status}
        shareText={`My ${formatCurrencyINR(stipend)}/mo internship in ${selectedCity} gives ${netSavings >= 0 ? "+" : ""}${formatCurrencyINR(netSavings)}/mo savings! Checked on flunked.online`}
      >
        {/* Cost of Living Ledger */}
        <div className="mt-4 pt-4 border-t-2 border-black/10 space-y-2">
          <span className="text-[11px] font-mono font-black uppercase tracking-wider text-flunked-muted block mb-2">
            Monthly Cost Breakdown in {selectedCity}
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono font-bold text-black">
            <div className="p-2 rounded-lg bg-flunked-bg border border-black/20">
              <span className="block text-[10px] text-flunked-muted">PG / Rent</span>
              <span className="font-black">{formatCurrencyINR(actualRent)}</span>
            </div>
            <div className="p-2 rounded-lg bg-flunked-bg border border-black/20">
              <span className="block text-[10px] text-flunked-muted">Food & Mess</span>
              <span className="font-black">{formatCurrencyINR(city.foodMonthly)}</span>
            </div>
            <div className="p-2 rounded-lg bg-flunked-bg border border-black/20">
              <span className="block text-[10px] text-flunked-muted">Metro / Auto</span>
              <span className="font-black">{formatCurrencyINR(city.transitMonthly)}</span>
            </div>
            <div className="p-2 rounded-lg bg-flunked-bg border border-black/20">
              <span className="block text-[10px] text-flunked-muted">Wi-Fi & Misc</span>
              <span className="font-black">{formatCurrencyINR(city.miscMonthly)}</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 text-xs font-mono font-black text-black">
            <span>Total Monthly Burn:</span>
            <span>{formatCurrencyINR(totalExpenses)} / mo</span>
          </div>
        </div>
      </ResultCard>
    </div>
  );
}
