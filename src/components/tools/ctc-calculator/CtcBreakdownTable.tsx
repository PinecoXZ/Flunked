import React from "react";
import { type CtcBreakdown } from "@/lib/calculations";
import { formatCurrencyINR } from "@/lib/utils";
import { Copy, Check, TrendingDown, Info, Sparkles, Camera } from "lucide-react";
import { NeoButton } from "@/components/ui/NeoButton";
import { NeoCard } from "@/components/ui/NeoCard";

export interface CtcBreakdownTableProps {
  breakdown: CtcBreakdown;
  ctc: number;
  copied: boolean;
  onShare: () => void;
  onOpenStory: () => void;
}

export const CtcBreakdownTable = React.memo(function CtcBreakdownTable({
  breakdown,
  ctc,
  copied,
  onShare,
  onOpenStory,
}: CtcBreakdownTableProps) {
  return (
    <>
      {/* Main Result Card */}
      <div className="bg-white border-2 border-black rounded-2xl p-7 sm:p-9 relative overflow-hidden shadow-neo-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black pb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-flunked-yellow border-2 border-black text-xs font-mono text-black font-black shadow-neo-sm">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>THE REALITY CHECK</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-black mt-2 tracking-tight">
              What Actually Hits Your Bank Account
            </h3>
            <p className="text-xs sm:text-sm text-black/70 font-medium mt-0.5">
              Calculated under the New Tax Regime (FY 2024-25/2025-26) with ₹75,000 Standard
              Deduction.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <NeoButton
              type="button"
              size="sm"
              onClick={onOpenStory}
              icon={<Camera className="w-3.5 h-3.5 stroke-[2.5]" />}
              title="Generate Story Card"
            >
              Story Card
            </NeoButton>

            <NeoButton
              variant="secondary"
              size="sm"
              onClick={onShare}
              icon={
                copied ? (
                  <Check className="w-3.5 h-3.5 text-black" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-black" />
                )
              }
            >
              {copied ? "Copied Link!" : "Share Link"}
            </NeoButton>
          </div>
        </div>

        {/* Big Numbers Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 pt-2">
          {/* Monthly In-Hand */}
          <div className="p-6 rounded-2xl bg-[#E8F8F0] border-2 border-black shadow-neo">
            <div className="text-xs font-mono uppercase text-black font-black flex items-center gap-1.5">
              <span>Real Monthly Take-Home:</span>
            </div>
            <div className="text-3xl sm:text-5xl font-black font-mono text-black mt-2 tracking-tight">
              {formatCurrencyINR(breakdown.monthlyTakeHome)}
              <span className="text-sm sm:text-base font-bold text-black/70 ml-1">/ month</span>
            </div>
            <div className="mt-2 text-xs font-mono text-black font-bold">
              Annual In-Hand Cash:{" "}
              <strong className="text-black bg-flunked-yellow px-2 py-0.5 rounded border border-black">
                {formatCurrencyINR(breakdown.netTakeHomeAnnual)}
              </strong>
            </div>
          </div>

          {/* The Illusion Comparison */}
          <div className="p-6 rounded-2xl bg-[#FEECEC] border-2 border-black shadow-neo">
            <div className="text-xs font-mono uppercase text-black font-black flex items-center gap-1.5">
              <TrendingDown className="w-4 h-4 text-black" />
              <span>The "CTC Divided by 12" Illusion:</span>
            </div>
            <div className="text-3xl sm:text-5xl font-black font-mono text-slate-500 mt-2 line-through">
              {formatCurrencyINR(breakdown.monthlyCtcIllusion)}
              <span className="text-sm sm:text-base font-bold no-underline text-black/60 ml-1">
                / month
              </span>
            </div>
            <div className="mt-2 text-xs text-rose-700 font-mono font-black">
              Missing gap: -
              {formatCurrencyINR(breakdown.monthlyCtcIllusion - breakdown.monthlyTakeHome)} / mo (
              {breakdown.deductionPercentage}% wiped out)
            </div>
          </div>
        </div>

        {/* Snarky Verdict Callout */}
        <div className="p-4 rounded-2xl bg-flunked-bg border-2 border-black shadow-neo-sm flex items-start gap-3">
          <Info className="w-5 h-5 text-black shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-black leading-relaxed font-sans font-medium">
            {ctc <= 450000 && (
              <span>
                <strong>Mass Recruiter Special:</strong> At ₹4 LPA, zero income tax applies thanks
                to the ₹7L rebate! But PF and company gratuity deductions still trim your monthly
                salary to roughly ~₹28k.
              </span>
            )}
            {ctc > 450000 && ctc <= 1200000 && (
              <span>
                <strong>The 10-12 LPA Trap:</strong> HR marketed a fancy double-digit package, but
                your take-home hovers around ₹70k-₹76k. Taxes kick in, Employee PF eats 12%, and
                company-paid gratuity was never yours to spend today.
              </span>
            )}
            {ctc > 1200000 && (
              <span>
                <strong>High Tax Bracket Reality:</strong> You are now a proud sponsor of public
                infrastructure! Over 20-30% of your upper marginal income goes directly to tax. Hope
                those startup ESOPs turn into actual liquid gold.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Detailed Salary Anatomy Breakdown */}
      <NeoCard className="p-7 sm:p-8">
        <div className="flex items-center justify-between mb-4 border-b-2 border-black pb-4">
          <h4 className="text-sm font-mono uppercase tracking-wider text-black font-black">
            Where Did The Rest of Your CTC Go?
          </h4>
          <span className="text-xs font-mono text-black font-black bg-flunked-yellow px-2 py-0.5 rounded border border-black">
            Annual Breakdown
          </span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {/* Row: Basic Pay */}
          <div className="flex items-center justify-between py-2 border-b border-black/10">
            <div>
              <span className="text-black font-black">Basic Salary (45% of CTC)</span>
              <p className="text-[11px] text-black/70 font-sans">
                Forms the baseline for PF and gratuity math.
              </p>
            </div>
            <span className="text-black font-black">
              {formatCurrencyINR(breakdown.basicSalary)}
            </span>
          </div>

          {/* Row: Employee PF */}
          <div className="flex items-center justify-between py-2 border-b border-black/10">
            <div>
              <span className="text-black font-black">Employee PF Contribution (12%)</span>
              <p className="text-[11px] text-black/70 font-sans">
                Deducted from your monthly salary into EPFO account (8.25% interest).
              </p>
            </div>
            <span className="text-rose-600 font-black">
              -{formatCurrencyINR(breakdown.employeePf)}
            </span>
          </div>

          {/* Row: Employer PF & Gratuity */}
          <div className="flex items-center justify-between py-2 border-b border-black/10">
            <div>
              <span className="text-black font-black">Employer PF (12%) + Gratuity (4.81%)</span>
              <p className="text-[11px] text-black/70 font-sans">
                Counted inside your CTC by the company, but not in your monthly salary slip.
              </p>
            </div>
            <span className="text-rose-600 font-black">
              -{formatCurrencyINR(breakdown.employerPf + breakdown.gratuity)}
            </span>
          </div>

          {/* Row: Income Tax (New Regime) */}
          <div className="flex items-center justify-between py-2 border-b border-black/10">
            <div>
              <span className="text-black font-black">Income Tax (FY 2024-25/25-26)</span>
              <p className="text-[11px] text-black/70 font-sans">
                After ₹75,000 Standard Deduction & 4% Health/Edu Cess.
                {breakdown.section87aRebate > 0 && (
                  <span className="text-emerald-700 ml-1 font-black">
                    (Section 87A rebate ₹{breakdown.section87aRebate.toLocaleString("en-IN")}{" "}
                    applied!)
                  </span>
                )}
              </p>
            </div>
            <span className="text-rose-600 font-black">
              {breakdown.totalTaxAnnual === 0
                ? "₹0 (Tax Free!)"
                : `-${formatCurrencyINR(breakdown.totalTaxAnnual)}`}
            </span>
          </div>

          {/* Row: Professional Tax */}
          <div className="flex items-center justify-between py-2 border-b border-black/10">
            <div>
              <span className="text-black font-black">Professional Tax (State Govt)</span>
              <p className="text-[11px] text-black/70 font-sans">
                Standard ₹200/month flat deduction.
              </p>
            </div>
            <span className="text-rose-600 font-black">
              -{formatCurrencyINR(breakdown.professionalTax)}
            </span>
          </div>

          {/* Row: ESOPs / Paper stock */}
          {breakdown.esop > 0 && (
            <div className="flex items-center justify-between py-2 border-b border-black/10">
              <div>
                <span className="text-black font-black">ESOPs / Stock Grant (Paper Money)</span>
                <p className="text-[11px] text-black/70 font-sans">
                  Vests over multiple years; cannot be withdrawn immediately.
                </p>
              </div>
              <span className="text-amber-700 font-black">
                -{formatCurrencyINR(breakdown.esop)}
              </span>
            </div>
          )}

          {/* Total Net Take Home */}
          <div className="flex items-center justify-between pt-3 text-sm">
            <span className="text-black font-black uppercase">Actual Annual Take-Home Cash</span>
            <span className="text-black font-black text-base bg-flunked-yellow px-3 py-1 rounded border-2 border-black shadow-neo-sm">
              {formatCurrencyINR(breakdown.netTakeHomeAnnual)}
            </span>
          </div>
        </div>
      </NeoCard>
    </>
  );
});
