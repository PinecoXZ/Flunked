"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { calculateAmICooked } from "@/lib/calculations";
import { ShareStoryModal } from "@/components/ui/ShareStoryModal";
import { useClipboard } from "@/hooks/useClipboard";
import { useUrlSync } from "@/hooks/useUrlSync";
import { AmICookedForm } from "./AmICookedForm";
import { AmICookedResult } from "./AmICookedResult";

export function AmICooked() {
  const [attendance, setAttendance] = useState<number>(68);
  const [internalsAvg, setInternalsAvg] = useState<number>(55);
  const [weeksLeft, setWeeksLeft] = useState<number>(3);
  const [pendingAssignments, setPendingAssignments] = useState<number>(4);
  const { copied, copy } = useClipboard({ duration: 2000 });
  const [isStoryOpen, setIsStoryOpen] = useState<boolean>(false);

  // Read initial query params
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const att = params.get("att");
    const int = params.get("int");
    const wk = params.get("weeks");
    const asg = params.get("asg");
    if (att && !isNaN(parseInt(att, 10))) setAttendance(parseInt(att, 10));
    if (int && !isNaN(parseInt(int, 10))) setInternalsAvg(parseInt(int, 10));
    if (wk && !isNaN(parseInt(wk, 10))) setWeeksLeft(parseInt(wk, 10));
    if (asg && !isNaN(parseInt(asg, 10))) setPendingAssignments(parseInt(asg, 10));
  }, []);

  // Sync state to URL
  useUrlSync({
    att: attendance,
    int: internalsAvg,
    weeks: weeksLeft,
    asg: pendingAssignments,
  });

  const result = useMemo(() => {
    return calculateAmICooked(attendance, internalsAvg, weeksLeft, pendingAssignments);
  }, [attendance, internalsAvg, weeksLeft, pendingAssignments]);

  const handleShare = useCallback(() => {
    const text = `💀 *Am I Cooked This Semester?*\nStatus: ${result.cookedPercentage}% Cooked (${result.badge})\nVerdict: ${result.verdict}\n\nSurvival Probability: ${result.survivalProbability}%\nDiagnosed on Flunked.online · Calculate yours at flunked.online/tools/am-i-cooked`;
    copy(text);
  }, [copy, result.cookedPercentage, result.badge, result.verdict, result.survivalProbability]);

  const handleOpenStory = useCallback(() => {
    setIsStoryOpen(true);
  }, []);

  const handleCloseStory = useCallback(() => {
    setIsStoryOpen(false);
  }, []);

  return (
    <div className="space-y-8">
      {/* Inputs Section */}
      <AmICookedForm
        attendance={attendance}
        internalsAvg={internalsAvg}
        weeksLeft={weeksLeft}
        pendingAssignments={pendingAssignments}
        onAttendanceChange={setAttendance}
        onInternalsAvgChange={setInternalsAvg}
        onWeeksLeftChange={setWeeksLeft}
        onPendingAssignmentsChange={setPendingAssignments}
      />

      {/* Main Animated Cook-o-meter Card */}
      <AmICookedResult
        result={result}
        attendance={attendance}
        internalsAvg={internalsAvg}
        pendingAssignments={pendingAssignments}
        copied={copied}
        onShare={handleShare}
        onOpenStory={handleOpenStory}
      />

      {/* Shareable Story Card Modal */}
      <ShareStoryModal
        isOpen={isStoryOpen}
        onClose={handleCloseStory}
        toolName="Am I Cooked?"
        categoryLabel="Fun & Chaos"
        toolSlug="am-i-cooked"
        metric={`${result.cookedPercentage}%`}
        metricLabel={`Cooked Meter · ${result.badge}`}
        headline={`Survival Probability: ${result.survivalProbability}%`}
        verdict={result.verdict}
        status={
          result.cookedPercentage > 75
            ? "critical"
            : result.cookedPercentage > 50
              ? "danger"
              : result.cookedPercentage > 25
                ? "warning"
                : "safe"
        }
        breakdown={[
          { label: "Attendance", value: `${attendance}%` },
          { label: "Internals", value: `${internalsAvg}%` },
          { label: "Weeks Left", value: weeksLeft },
        ]}
      />
    </div>
  );
}
