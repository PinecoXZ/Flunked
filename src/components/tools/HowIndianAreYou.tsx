"use client";

import { useState } from "react";
import { ShareButton } from "@/components/ui/ShareButton";
import { Coffee, CheckCircle2 } from "lucide-react";

interface CultureQuestion {
  id: number;
  prompt: string;
  points: number; // Max total = 100
}

const CULTURE_QUESTIONS: CultureQuestion[] = [
  { id: 1, prompt: "Have you ever asked someone to mark a proxy for you in class?", points: 15 },
  {
    id: 2,
    prompt: "Do you honestly have NO IDEA what your professor's actual full name is?",
    points: 10,
  },
  {
    id: 3,
    prompt: "Have you submitted an assignment/project literally 5 minutes before midnight?",
    points: 15,
  },
  {
    id: 4,
    prompt: "Do you have a dedicated 'notes wala' topper friend who saves your semester?",
    points: 10,
  },
  {
    id: 5,
    prompt: "Have you ever started studying a 5-unit syllabus the night before the midsem?",
    points: 15,
  },
  {
    id: 6,
    prompt: "Have you eaten Maggi or canteen samosas as a replacement for real lunch/dinner?",
    points: 10,
  },
  {
    id: 7,
    prompt: "Do you have a placement prep or LeetCode roadmap file you haven't opened in 2 months?",
    points: 10,
  },
  {
    id: 8,
    prompt: "Have you sat through a boring 9 AM lecture purely because of the 75% attendance rule?",
    points: 15,
  },
];

export function HowIndianAreYou() {
  const [checkedIds, setCheckedIds] = useState<number[]>([1, 3, 5, 8]);

  const toggleQuestion = (id: number) => {
    setCheckedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const selectAll = () => setCheckedIds(CULTURE_QUESTIONS.map((q) => q.id));
  const clearAll = () => setCheckedIds([]);

  // Score calculation
  const totalScore = CULTURE_QUESTIONS.reduce((sum, q) => {
    return checkedIds.includes(q.id) ? sum + q.points : sum;
  }, 0);

  // PRD result tiers
  let archetype = "";
  let verdict = "";
  let badgeColor = "";

  if (totalScore >= 90) {
    archetype = "Cultural Artifact";
    verdict =
      "100% Indian College Student. A true cultural artifact. You don't just study here; you embody the ecosystem.";
    badgeColor = "bg-flunked-yellow text-black";
  } else if (totalScore >= 70) {
    archetype = "Certified College Survivor";
    verdict = "Certified. You've lived the authentic Indian engineering/college experience.";
    badgeColor = "bg-emerald-400 text-black";
  } else if (totalScore >= 50) {
    archetype = "Partially Corrupted";
    verdict = "Partially corrupted. Some academic innocence still remains. You'll get there.";
    badgeColor = "bg-blue-400 text-black";
  } else {
    archetype = "Suspicious Alien";
    verdict = "Are you even in college? This level of discipline is deeply suspicious.";
    badgeColor = "bg-rose-400 text-black";
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Checklist Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-black shadow-neo space-y-6">
        <div className="border-b-2 border-black pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-black shadow-neo-sm">
              <Coffee className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-xl font-black text-black">How Indian College Student Are You?</h2>
              <p className="text-xs text-flunked-muted font-bold font-sans">
                A checklist diagnostic. For science and posterity.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={selectAll}
              className="text-[11px] font-mono font-bold text-black underline cursor-pointer"
            >
              All True
            </button>
            <span className="text-black/30">|</span>
            <button
              type="button"
              onClick={clearAll}
              className="text-[11px] font-mono font-bold text-black underline cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>

        {/* 8 Questions Toggle Checklist */}
        <div className="space-y-2.5">
          {CULTURE_QUESTIONS.map((q) => {
            const isChecked = checkedIds.includes(q.id);
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => toggleQuestion(q.id)}
                className={`w-full text-left p-3.5 sm:p-4 rounded-xl border-2 border-black transition-all flex items-center justify-between shadow-neo-sm cursor-pointer ${
                  isChecked
                    ? "bg-flunked-yellow/20 border-black font-black text-black"
                    : "bg-white text-black/90 hover:bg-flunked-bgSubtle font-medium"
                }`}
              >
                <div className="flex items-center gap-3 pr-2">
                  <div
                    className={`w-5 h-5 rounded border-2 border-black flex items-center justify-center shrink-0 transition-colors ${
                      isChecked ? "bg-flunked-yellow" : "bg-white"
                    }`}
                  >
                    {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-black stroke-[3]" />}
                  </div>
                  <span className="text-xs sm:text-sm font-sans">{q.prompt}</span>
                </div>
                <span className="text-[11px] font-mono font-black shrink-0 text-black">
                  +{q.points}%
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Result Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-black shadow-neo-lg space-y-6 text-center">
        <div className="flex items-center justify-center gap-2">
          <span
            className={`text-xs font-mono font-black px-3 py-1 rounded border-2 border-black uppercase shadow-neo-sm ${badgeColor}`}
          >
            {archetype}
          </span>
        </div>

        <div>
          <div className="text-5xl sm:text-6xl font-black text-black font-mono tracking-tight">
            {totalScore}%
          </div>
          <span className="text-xs font-mono font-black uppercase text-flunked-muted tracking-widest block mt-1">
            Indian Student DNA Index
          </span>
        </div>

        <p className="text-sm font-sans font-medium text-black max-w-md mx-auto leading-relaxed">
          {verdict}
        </p>

        <div className="pt-2">
          <ShareButton
            title="Share Your Score"
            shareText={`I scored ${totalScore}% on the Indian College Student DNA Index on flunked.online! Archetype: ${archetype}`}
            className="w-full sm:w-auto"
          />
        </div>
      </div>
    </div>
  );
}
