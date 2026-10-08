"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AttendanceProgressBarProps {
  currentPercentage: number;
  targetPercentage?: number;
  className?: string;
  showLabels?: boolean;
}

export function AttendanceProgressBar({
  currentPercentage,
  targetPercentage = 75,
  className,
  showLabels = true,
}: AttendanceProgressBarProps) {
  const clampedPercentage = Math.min(100, Math.max(0, currentPercentage));
  const clampedTarget = Math.min(100, Math.max(0, targetPercentage));

  // Determine color based on threshold:
  // green if >= 75%, yellow if 70-75%, red if < 70%
  let fillColor = "bg-[#FF3333]";
  let textStatusColor = "text-[#FF3333]";

  if (currentPercentage >= 75) {
    fillColor = "bg-[#00C853]";
    textStatusColor = "text-[#00A843]";
  } else if (currentPercentage >= 70) {
    fillColor = "bg-flunked-yellow";
    textStatusColor = "text-black";
  }

  return (
    <div className={cn("w-full space-y-2", className)}>
      {showLabels && (
        <div className="flex justify-between items-baseline text-xs font-mono">
          <span className="text-flunked-muted font-bold">Current Attendance</span>
          <span className={cn("font-black text-sm", textStatusColor)}>
            {currentPercentage.toFixed(1)}%
          </span>
        </div>
      )}

      {/* Progress Track */}
      <div className="relative h-4 w-full rounded-md bg-white border-2 border-black shadow-neo-sm overflow-visible">
        {/* Fill Bar */}
        <div
          className={cn(
            "h-full transition-all duration-300 ease-out border-r-2 border-black",
            fillColor
          )}
          style={{ width: `${clampedPercentage}%` }}
        />

        {/* Target Threshold Indicator Pin */}
        <div
          className="absolute top-[-3px] bottom-[-3px] w-[3px] bg-black z-10 transition-all duration-300 pointer-events-none"
          style={{ left: `${clampedTarget}%` }}
          title={`Target cutoff: ${clampedTarget}%`}
        >
          <div className="absolute -top-6 -translate-x-1/2 bg-flunked-yellow border border-black text-[9px] font-mono text-black font-black px-1.5 py-0.5 rounded shadow-neo-sm whitespace-nowrap">
            {clampedTarget}% Cutoff
          </div>
        </div>
      </div>

      {/* Threshold Guide */}
      <div className="flex justify-between text-[10px] font-mono font-bold text-flunked-muted pt-1">
        <span>0%</span>
        <span className="text-[#FF3333]">Critical (&lt;70%)</span>
        <span className="text-black bg-flunked-yellow px-1 rounded">Danger (70-75%)</span>
        <span className="text-[#00A843]">Safe (&ge;75%)</span>
        <span>100%</span>
      </div>
    </div>
  );
}
