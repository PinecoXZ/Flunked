import React from "react";
import { ResultCard } from "@/components/ui/ResultCard";

interface CgpaResultData {
  cgpa: number;
  percentage: number;
  totalCredits: number;
  totalGradePoints: number;
  verdict: string;
  status: "safe" | "warning" | "danger" | "critical";
  shareText: string;
}

interface CgpaResultProps {
  result: CgpaResultData;
}

export const CgpaResult = React.memo(function CgpaResult({ result }: CgpaResultProps) {
  return (
    <ResultCard
      title="CGPA & Academic Standing"
      toolName="CGPA Calculator"
      categoryLabel="Academics"
      toolSlug="cgpa-calculator"
      headline={`Your CGPA is ${result.cgpa.toFixed(2)}. That's ${result.percentage.toFixed(1)}%.`}
      metric={result.cgpa.toFixed(2)}
      metricLabel="/ 10.00"
      verdict={result.verdict}
      status={result.status}
      shareText={result.shareText}
      breakdown={[
        { label: "CGPA", value: result.cgpa.toFixed(2) },
        { label: "Percentage", value: `${result.percentage.toFixed(1)}%` },
        { label: "Credits", value: result.totalCredits },
      ]}
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-mono">
        <div className="p-3 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm">
          <div className="text-flunked-muted text-[10px] uppercase font-bold">Percentage</div>
          <div className="text-base font-black text-black mt-0.5">
            {result.percentage.toFixed(1)}%
          </div>
        </div>
        <div className="p-3 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm">
          <div className="text-flunked-muted text-[10px] uppercase font-bold">Total Credits</div>
          <div className="text-base font-black text-black mt-0.5">{result.totalCredits}</div>
        </div>
        <div className="p-3 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm">
          <div className="text-flunked-muted text-[10px] uppercase font-bold">Grade Points</div>
          <div className="text-base font-black text-black mt-0.5">{result.totalGradePoints}</div>
        </div>
        <div className="p-3 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm">
          <div className="text-flunked-muted text-[10px] uppercase font-bold">Placement Filter</div>
          <div
            className={`text-base font-black mt-0.5 ${
              result.cgpa >= 7.5
                ? "text-[#00A843]"
                : result.cgpa >= 6.5
                  ? "text-black"
                  : "text-[#FF3333]"
            }`}
          >
            {result.cgpa >= 8.0
              ? "Tier 1 Eligible"
              : result.cgpa >= 7.0
                ? "Most Companies"
                : result.cgpa >= 6.0
                  ? "Mass Recruiters"
                  : "Eligible for <5%"}
          </div>
        </div>
      </div>
    </ResultCard>
  );
});
