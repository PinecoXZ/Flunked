"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { calculateCtcInHand } from "@/lib/calculations";
import { formatCurrencyINR } from "@/lib/utils";
import { ShareStoryModal } from "@/components/ui/ShareStoryModal";
import { useClipboard } from "@/hooks/useClipboard";
import { useUrlSync } from "@/hooks/useUrlSync";
import { CtcPresetPills, type CtcPreset } from "./CtcPresetPills";
import { CtcForm } from "./CtcForm";
import { CtcBreakdownTable } from "./CtcBreakdownTable";

export function CtcCalculator() {
  const [ctc, setCtc] = useState<number>(1200000);
  const [bonus, setBonus] = useState<number>(100000);
  const [esop, setEsop] = useState<number>(100000);
  const [isMetro, setIsMetro] = useState<boolean>(true);
  const { copied, copy } = useClipboard({ duration: 2200 });
  const [isStoryOpen, setIsStoryOpen] = useState<boolean>(false);

  // Read initial query params
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const c = params.get("ctc");
    const b = params.get("bonus");
    const e = params.get("esop");
    if (c && !isNaN(parseInt(c, 10))) setCtc(parseInt(c, 10));
    if (b && !isNaN(parseInt(b, 10))) setBonus(parseInt(b, 10));
    if (e && !isNaN(parseInt(e, 10))) setEsop(parseInt(e, 10));
  }, []);

  // Sync state to URL
  useUrlSync({
    ctc,
    bonus: bonus > 0 ? bonus : undefined,
    esop: esop > 0 ? esop : undefined,
  });

  const breakdown = useMemo(() => {
    return calculateCtcInHand(ctc, bonus, esop, isMetro);
  }, [ctc, bonus, esop, isMetro]);

  const handleApplyPreset = useCallback((preset: CtcPreset) => {
    setCtc(preset.value);
    setBonus(preset.bonus);
    setEsop(preset.esop);
  }, []);

  const handleShare = useCallback(() => {
    const text = `💸 *CTC vs In-Hand Reality Check*\nOffered CTC: ${formatCurrencyINR(
      breakdown.ctc
    )}/yr\nActual Monthly In-Hand: ${formatCurrencyINR(
      breakdown.monthlyTakeHome
    )}/mo\nAnnual Take-Home: ${formatCurrencyINR(
      breakdown.netTakeHomeAnnual
    )}\nTotal Cut (Taxes + PF + Gratuity): ${breakdown.deductionPercentage}%\n\nCalculated on Flunked.fun`;

    copy(text);
  }, [
    copy,
    breakdown.ctc,
    breakdown.monthlyTakeHome,
    breakdown.netTakeHomeAnnual,
    breakdown.deductionPercentage,
  ]);

  const handleOpenStory = useCallback(() => {
    setIsStoryOpen(true);
  }, []);

  const handleCloseStory = useCallback(() => {
    setIsStoryOpen(false);
  }, []);

  return (
    <div className="space-y-8">
      {/* Preset Pills */}
      <CtcPresetPills ctc={ctc} onApplyPreset={handleApplyPreset} />

      {/* Input Section */}
      <CtcForm
        ctc={ctc}
        bonus={bonus}
        esop={esop}
        isMetro={isMetro}
        onCtcChange={setCtc}
        onBonusChange={setBonus}
        onEsopChange={setEsop}
        onIsMetroChange={setIsMetro}
      />

      {/* Main Result & Detailed Salary Anatomy Breakdown */}
      <CtcBreakdownTable
        breakdown={breakdown}
        ctc={ctc}
        copied={copied}
        onShare={handleShare}
        onOpenStory={handleOpenStory}
      />

      {/* Shareable Story Card Modal */}
      <ShareStoryModal
        isOpen={isStoryOpen}
        onClose={handleCloseStory}
        toolName="CTC → In-Hand Calculator"
        categoryLabel="Placement"
        toolSlug="ctc-calculator"
        metric={`${formatCurrencyINR(breakdown.monthlyTakeHome)}/mo`}
        metricLabel={`Actual Monthly Bank Deposit from ${formatCurrencyINR(breakdown.ctc)} CTC`}
        headline={`${breakdown.deductionPercentage}% Lost to Taxes & Cuts`}
        verdict={`What looks like ${formatCurrencyINR(breakdown.monthlyCtcIllusion)}/mo on paper becomes ${formatCurrencyINR(breakdown.monthlyTakeHome)}/mo in your bank account.`}
        status={breakdown.deductionPercentage > 25 ? "critical" : "warning"}
        breakdown={[
          { label: "Offered CTC", value: formatCurrencyINR(breakdown.ctc) },
          { label: "Annual Cash", value: formatCurrencyINR(breakdown.netTakeHomeAnnual) },
          { label: "Cut %", value: `${breakdown.deductionPercentage}%` },
        ]}
      />
    </div>
  );
}
