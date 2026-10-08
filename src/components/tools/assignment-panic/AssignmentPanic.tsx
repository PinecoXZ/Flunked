"use client";

import React, { useState, useMemo, useCallback } from "react";
import { useClipboard } from "@/hooks/useClipboard";
import {
  calculateAssignmentPanic,
  type AssignmentType,
  type CaffeineType,
} from "@/lib/calculations";
import { AssignmentPanicForm } from "./AssignmentPanicForm";
import { AssignmentPanicResult } from "./AssignmentPanicResult";

export function AssignmentPanic() {
  const [pages, setPages] = useState<number>(14);
  const [hoursLeft, setHoursLeft] = useState<number>(3.5);
  const [type, setType] = useState<AssignmentType>("handwritten");
  const [caffeine, setCaffeine] = useState<CaffeineType>("chai");
  const [withFriends, setWithFriends] = useState<boolean>(true);
  const { copied, copy } = useClipboard({ duration: 2000 });

  const result = useMemo(() => {
    return calculateAssignmentPanic(pages, hoursLeft, type, caffeine, withFriends);
  }, [pages, hoursLeft, type, caffeine, withFriends]);

  const handleShare = useCallback(() => {
    const text = `*Assignment Panic Assessment* [Flunked.online]\nAssignment: ${pages} pages in ${hoursLeft} hours (${type})\nStatus: ${result.feasibilityPercentage}% Feasible (${result.headline})\n\nTactical Verdict: ${result.tacticalVerdict}\nBegging the CR Probability: ${result.beggingCrProbability}%\n\nCalculated on Flunked.online · flunked.online/tools/assignment-panic`;
    copy(text);
  }, [
    copy,
    pages,
    hoursLeft,
    type,
    result.feasibilityPercentage,
    result.headline,
    result.tacticalVerdict,
    result.beggingCrProbability,
  ]);

  return (
    <div className="space-y-8">
      {/* Inputs Card */}
      <AssignmentPanicForm
        pages={pages}
        hoursLeft={hoursLeft}
        type={type}
        caffeine={caffeine}
        withFriends={withFriends}
        onPagesChange={setPages}
        onHoursLeftChange={setHoursLeft}
        onTypeChange={setType}
        onCaffeineChange={setCaffeine}
        onWithFriendsChange={setWithFriends}
      />

      {/* Main Panic Assessment Card */}
      <AssignmentPanicResult result={result} copied={copied} onShare={handleShare} />
    </div>
  );
}
