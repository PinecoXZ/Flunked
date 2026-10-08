"use client";

import { useState } from "react";
import { ShareButton } from "@/components/ui/ShareButton";
import { Terminal, ArrowRight, RotateCcw, Sparkles } from "lucide-react";

interface Question {
  id: number;
  prompt: string;
  options: { label: string; points: number }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    prompt: "What is your current college CGPA?",
    options: [
      { label: "9.0+ (Dean's list scholar)", points: 5 },
      { label: "8.0 – 8.9 (Safe placement zone)", points: 4 },
      { label: "7.0 – 7.9 (Walking on thin ice)", points: 2 },
      { label: "< 7.0 or current backlog warrior", points: 0 },
    ],
  },
  {
    id: 2,
    prompt: "How many LeetCode / DSA problems have you solved?",
    options: [
      { label: "300+ problems (Mediums & Hards on lock)", points: 5 },
      { label: "100 – 300 problems (Decent Striver A2Z progress)", points: 3 },
      { label: "20 – 50 problems (Two Sum & Palindrome on repeat)", points: 1 },
      { label: "0 (I code straight in prod / chatgpt)", points: 0 },
    ],
  },
  {
    id: 3,
    prompt: "What does your personal GitHub look like?",
    options: [
      { label: "Solid green contribution grid + real deployed users", points: 5 },
      { label: "3–4 decent full-stack repos with neat READMEs", points: 3 },
      { label: "Forked repos & college lab assignments only", points: 1 },
      { label: "Account created for hackathon T-shirt, inactive since", points: 0 },
    ],
  },
  {
    id: 4,
    prompt: "Have you completed an engineering internship?",
    options: [
      { label: "Yes, at high-growth funded startup / Tier-1 MNC", points: 5 },
      { label: "Yes, campus research project or boutique agency", points: 3 },
      { label: "Paid ₹3,000 to an institute for a 'certificate'", points: 1 },
      { label: "No internships yet (vibe coding only)", points: 0 },
    ],
  },
  {
    id: 5,
    prompt: "Can you explain what you built in your major project?",
    options: [
      { label: "Can whiteboard complete system architecture & database schema", points: 5 },
      { label: "Can walk through frontend components & REST endpoints", points: 3 },
      { label: "Followed a YouTube tutorial step-by-step", points: 1 },
      { label: "My team partner wrote everything, I made the PPT", points: 0 },
    ],
  },
  {
    id: 6,
    prompt: "What happens when an assignment deadline is tonight?",
    options: [
      { label: "Submitted 48 hours ago, linted & tested", points: 5 },
      { label: "Ship an 80% working MVP right at 11:58 PM", points: 3 },
      { label: "Beg the Class Representative for an extension", points: 1 },
      { label: "Accept the 0 marks and go back to sleep", points: 0 },
    ],
  },
];

export function TierEngineer() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleSelectOption = (points: number) => {
    const updated = [...answers, points];
    setAnswers(updated);

    if (currentStep + 1 < QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setAnswers([]);
    setCurrentStep(0);
    setIsCompleted(false);
  };

  // Compute total points (0 to 30)
  const totalScore = answers.reduce((acc, p) => acc + p, 0);

  // Determine Tier according to PRD
  let tier = "C";
  let tierHeadline = "";
  let tierColor = "bg-white text-black";

  if (totalScore >= 27) {
    tier = "S";
    tierColor = "bg-amber-400 text-black";
    tierHeadline = "S Tier. You're either lying or terrifying. Respect.";
  } else if (totalScore >= 22) {
    tier = "A";
    tierColor = "bg-flunked-yellow text-black";
    tierHeadline = "A Tier. Placement-ready. Don't fumble the interviews.";
  } else if (totalScore >= 16) {
    tier = "B";
    tierColor = "bg-emerald-400 text-black";
    tierHeadline = "B Tier. You'll be fine. Stop coasting though.";
  } else if (totalScore >= 10) {
    tier = "C";
    tierColor = "bg-blue-400 text-black";
    tierHeadline = "C Tier. Survivable. Barely. Start grinding.";
  } else if (totalScore >= 5) {
    tier = "D";
    tierColor = "bg-orange-400 text-black";
    tierHeadline = "D Tier. What have you been doing for 3 years?";
  } else {
    tier = "F";
    tierColor = "bg-rose-500 text-white";
    tierHeadline = "F Tier. Iconic. The college experience fully unlocked.";
  }

  const q = QUESTIONS[currentStep];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {!isCompleted ? (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-black shadow-neo space-y-6">
          {/* Header & Progress */}
          <div className="border-b-2 border-black pb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-black shadow-neo-sm">
                <Terminal className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h2 className="text-xl font-black text-black">What Tier Engineer Are You?</h2>
                <p className="text-xs text-flunked-muted font-bold font-sans">
                  Answer honestly. We&apos;ll rank you S to F, no in-between.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono font-black text-black bg-flunked-yellow px-2 py-0.5 rounded border border-black shadow-neo-sm">
              {currentStep + 1} / {QUESTIONS.length}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-flunked-bg border-2 border-black rounded-full h-3 overflow-hidden">
            <div
              className="bg-flunked-yellow h-full border-r-2 border-black transition-all duration-300"
              style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Question Prompt */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-black">{q.prompt}</h3>
            <div className="grid grid-cols-1 gap-3">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(opt.points)}
                  className="w-full text-left p-4 rounded-xl border-2 border-black bg-white hover:bg-flunked-yellow text-black font-mono font-bold text-xs sm:text-sm shadow-neo-sm hover:shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer flex items-center justify-between group"
                >
                  <span>{opt.label}</span>
                  <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Result Tier Card */
        <div className="bg-white p-8 sm:p-10 rounded-2xl border-2 border-black shadow-neo-xl text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-flunked-yellow border-2 border-black text-xs font-mono text-black font-black uppercase shadow-neo-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Engineer Tier Verification</span>
          </div>

          {/* Huge Dominant Tier Letter */}
          <div className="py-2">
            <div
              className={`w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-3xl border-4 border-black flex flex-col items-center justify-center shadow-neo-lg ${tierColor}`}
            >
              <span className="text-6xl sm:text-8xl font-black tracking-tighter leading-none">
                {tier}
              </span>
              <span className="text-xs font-mono font-black uppercase tracking-widest mt-1">
                TIER
              </span>
            </div>
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h3 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
              {tierHeadline}
            </h3>
            <p className="text-xs sm:text-sm text-flunked-muted font-sans font-medium">
              Calculated across DSA volume, real GitHub projects, internship credibility, and
              deadline survival instincts.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-flunked-bg border-2 border-black max-w-md mx-auto flex items-center justify-between text-xs font-mono font-bold text-black">
            <span>Aggregated Score:</span>
            <span className="text-sm font-black">{totalScore} / 30 Points</span>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <ShareButton
              title="Share Your Tier"
              shareText={`I just got ranked ${tier} Tier on the Engineer Tier Benchmark at flunked.fun!`}
              className="w-full sm:w-auto"
            />
            <button
              type="button"
              onClick={handleRestart}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-black bg-white hover:bg-flunked-bgSubtle text-xs font-mono font-black text-black shadow-neo-sm cursor-pointer transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Diagnostic</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
