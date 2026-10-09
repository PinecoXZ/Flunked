"use client";

import { useState, useMemo, useEffect } from "react";
import { useClipboard } from "@/hooks/useClipboard";
import {
  QUIZ_QUESTIONS,
  getRandomQuizQuestions,
  evaluateQuiz,
  DEFAULT_QUIZ_QUESTION_COUNT,
  type QuizQuestion,
  type TriageItem,
} from "@/data/quizQuestions";
import { useLoading } from "@/context/LoadingContext";
import {
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  AlertTriangle,
  Sparkles,
  Copy,
  Check,
  ChevronRight,
  Target,
  Shuffle,
} from "lucide-react";

export function PlacementQuiz() {
  const { showLoading } = useLoading();
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>(() =>
    QUIZ_QUESTIONS.slice(0, DEFAULT_QUIZ_QUESTION_COUNT)
  );
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const { copied, copy } = useClipboard({ duration: 2000 });

  // Always randomize questions on initial client mount so each session gets a fresh random set
  useEffect(() => {
    setActiveQuestions(getRandomQuizQuestions(DEFAULT_QUIZ_QUESTION_COUNT));
  }, []);

  const totalQuestions = activeQuestions.length;
  const currentQuestion = activeQuestions[currentStep] || activeQuestions[0];

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      showLoading({
        title: "flunked-placement.eval",
        statusTitle: "Calculating Placement Readiness...",
        state: "solving",
        badgeText: "[ASSESSING]",
        steps: [
          "Cross-referencing DSA & system design answers...",
          "Benchmarking against tier-1 campus averages...",
          "Synthesizing customized triage prescriptions...",
        ],
        duration: 2200,
      }).then(() => {
        setShowResults(true);
        // Trigger confetti if high score
        try {
          const result = evaluateQuiz(answers, activeQuestions);
          if (result.percentage >= 80 && typeof window !== "undefined") {
            import("canvas-confetti").then((confettiModule) => {
              const confetti = confettiModule.default;
              confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
              });
            });
          }
        } catch {
          // Confetti fallback
        }
      });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleRetake = () => {
    showLoading({
      title: "flunked-deck.shuffle",
      statusTitle: "Drawing Fresh Placement Questions...",
      state: "weaving",
      badgeText: "[SHUFFLE]",
      steps: [
        "Clearing previous evaluation matrix...",
        "Sampling random questions across 6 categories...",
        "Resetting triage timer...",
      ],
      duration: 1600,
    }).then(() => {
      setActiveQuestions(getRandomQuizQuestions(DEFAULT_QUIZ_QUESTION_COUNT));
      setAnswers({});
      setCurrentStep(0);
      setShowResults(false);
    });
  };

  const results = useMemo(() => {
    return evaluateQuiz(answers, activeQuestions);
  }, [answers, activeQuestions]);

  const progressPercent = Math.round((Object.keys(answers).length / totalQuestions) * 100);

  const handleShare = () => {
    const text = `*Placement Readiness Assessment* [Flunked.online]\nScore: ${results.percentage}/100 (${results.tier.badge})\n\nVerdict: ${results.tier.verdict}\n\nTop Action Items:\n1. ${results.weakestCategories[0]?.headline || "Grind DSA"}\n2. ${results.weakestCategories[1]?.headline || "Fix projects"}\n\nCheck your readiness at flunked.online/tools/placement-quiz`;
    copy(text);
  };

  // ================= RESULTS VIEW =================
  if (showResults) {
    return (
      <div className="space-y-8 animate-fadeIn">
        {/* Tier Result Hero Banner */}
        <div className="relative rounded-2xl p-6 sm:p-9 border-2 border-black overflow-hidden shadow-neo-lg bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black pb-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-flunked-bg border-2 border-black text-xs font-mono font-black text-black shadow-neo-sm">
                <span>QUIZ RESULT</span>
              </span>
              <div className="mt-3">
                <span className="text-sm sm:text-base font-mono font-black tracking-wider uppercase px-3 py-1 rounded-md bg-flunked-yellow text-black border-2 border-black shadow-neo-sm">
                  {results.tier.badge}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-flunked-yellow border-2 border-black text-xs font-mono text-black font-black transition-all shadow-neo-sm hover:shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-black" />
                    <span className="text-black font-black">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-black" />
                    <span>Copy Result</span>
                  </>
                )}
              </button>

              <button
                onClick={handleRetake}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-flunked-yellow border-2 border-black text-xs font-mono text-black font-black transition-all shadow-neo-sm hover:shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-black" />
                <span>Retake</span>
              </button>
            </div>
          </div>

          {/* Score Counter & Verdict */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6 pt-2 items-center">
            <div className="text-center md:text-left">
              <div className="text-xs font-mono uppercase text-black font-black">
                Readiness Score
              </div>
              <div className="flex items-baseline justify-center md:justify-start gap-2 mt-1">
                <span className="text-6xl sm:text-7xl font-black font-mono tracking-tighter text-black">
                  {results.percentage}
                </span>
                <span className="text-xl font-mono text-black/50 font-black">/ 100</span>
              </div>
              <div className="text-xs font-mono text-black/70 font-bold mt-1">
                Tier Range: {results.tier.range}
              </div>
            </div>

            <div className="md:col-span-2 space-y-2.5">
              <h4 className="text-lg sm:text-xl font-black text-black leading-snug">
                {results.tier.verdict}
              </h4>
              <p className="text-sm text-black/80 leading-relaxed font-sans font-medium">
                {results.tier.description}
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded bg-flunked-yellow border-2 border-black text-black font-black shadow-neo-sm">
                  Target: {results.tier.salaryExpectation}
                </span>
              </div>
            </div>
          </div>

          {/* Reality Check box */}
          <div className="p-4 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm mt-4">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-black shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-black font-black">
                  No-BS Reality Check:
                </span>
                <p className="text-xs sm:text-sm text-black/80 mt-1 leading-relaxed font-sans font-medium">
                  {results.tier.realityCheck}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Top 3 Triage Action Items */}
        <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-7 space-y-5 shadow-neo">
          <div className="border-b-2 border-black pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-black text-black flex items-center gap-2">
                <Target className="w-5 h-5 text-black" />
                <span>Top 3 Triage Action Items (Fix These First)</span>
              </h3>
              <p className="text-xs text-black/70 mt-0.5 font-sans font-medium">
                Calculated automatically from your lowest scoring sections. Address these in order.
              </p>
            </div>
            <span className="hidden sm:inline-block text-xs font-mono px-2.5 py-1 rounded bg-flunked-yellow border-2 border-black text-black font-black shadow-neo-sm">
              Priority Ordered
            </span>
          </div>

          <div className="space-y-4">
            {results.weakestCategories.map((item: TriageItem, idx: number) => {
              const priorityBg =
                item.priority === "Emergency"
                  ? "bg-[#FFE0E0] text-black border-2 border-black"
                  : item.priority === "Critical"
                    ? "bg-flunked-yellow text-black border-2 border-black"
                    : "bg-white text-black border-2 border-black";

              return (
                <div
                  key={item.category}
                  className="p-4 sm:p-5 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-flunked-yellow border-2 border-black flex items-center justify-center font-mono text-xs text-black font-black shadow-neo-sm">
                        {idx + 1}
                      </span>
                      <span className="font-black text-black text-sm sm:text-base">
                        {item.headline}
                      </span>
                    </div>
                    <span
                      className={`text-[11px] font-mono px-2 py-0.5 rounded uppercase font-black shadow-neo-sm ${priorityBg}`}
                    >
                      {item.priority}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-black/80 leading-relaxed pl-8 font-sans font-medium">
                    {item.prescription}
                  </p>

                  <div className="mt-3 pl-8 flex items-center gap-2 text-xs font-mono text-black font-black">
                    <ChevronRight className="w-3.5 h-3.5 text-black" />
                    <span>
                      <strong>Tactical Tip:</strong> {item.resourceTip}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Retake CTA Footer */}
        <div className="text-center pt-2">
          <button
            onClick={handleRetake}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-flunked-yellow hover:bg-amber-300 border-2 border-black text-black font-black text-sm font-mono shadow-neo hover:shadow-neo-lg hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-black" />
            <span>Retake With New Random Questions</span>
          </button>
        </div>
      </div>
    );
  }

  // ================= QUIZ WIZARD VIEW =================
  if (!currentQuestion) {
    return null;
  }

  const isOptionSelected = answers[currentQuestion.id] !== undefined;

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="bg-white border-2 border-black rounded-2xl p-5 shadow-neo-sm">
        <div className="flex items-center justify-between text-xs font-mono mb-2">
          <span className="text-black font-black bg-flunked-yellow px-2 py-0.5 rounded border border-black shadow-neo-sm">
            Question {currentStep + 1} of {totalQuestions}
          </span>
          <span className="text-black font-mono font-bold">
            {Object.keys(answers).length} answered ({progressPercent}%)
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-white rounded-full overflow-hidden border-2 border-black">
          <div
            className="h-full bg-flunked-yellow border-r-2 border-black transition-all duration-300"
            style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
          />
        </div>

        {/* Category Badge & Randomized Deck tag */}
        <div className="flex flex-wrap items-center justify-between gap-2 mt-3 text-xs text-black font-mono">
          <div className="flex items-center gap-2">
            <Target className="w-3.5 h-3.5 text-black" />
            <span className="text-black/70">Category:</span>
            <span className="text-black font-black">{currentQuestion.categoryLabel}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-flunked-bg border border-black text-[11px] font-mono font-black text-black shadow-neo-sm">
            <Shuffle className="w-3 h-3 text-black" />
            <span>Randomized Pool</span>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8 space-y-6 shadow-neo">
        <div>
          <h3 className="text-lg sm:text-xl font-black text-black leading-snug">
            {currentQuestion.question}
          </h3>
          <p className="text-xs sm:text-sm text-black/70 mt-1.5 font-sans font-medium">
            {currentQuestion.subtext}
          </p>
        </div>

        {/* 4 Options Grid */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = answers[currentQuestion.id] === idx;

            return (
              <button
                key={option.label}
                type="button"
                onClick={() => handleSelectOption(currentQuestion.id, idx)}
                className={`w-full p-4 rounded-xl border-2 border-black text-left transition-all relative cursor-pointer ${
                  isSelected
                    ? "bg-flunked-yellow text-black font-black shadow-neo translate-x-[-1px] translate-y-[-1px]"
                    : "bg-white text-black font-bold shadow-neo-sm hover:shadow-neo hover:bg-flunked-yellow/15 hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 font-mono text-xs font-black border-2 border-black transition-colors ${
                      isSelected ? "bg-black text-white" : "bg-white text-black shadow-neo-sm"
                    }`}
                  >
                    {option.label}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-bold leading-relaxed">{option.text}</p>

                    {isSelected && option.snarkComment && (
                      <p className="mt-2 text-xs font-mono text-black bg-white px-2.5 py-1 rounded-md border-2 border-black inline-flex items-center gap-1.5 font-black shadow-neo-sm">
                        <Sparkles className="w-3 h-3 text-black shrink-0" />
                        <span>{option.snarkComment}</span>
                      </p>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Wizard Controls */}
        <div className="flex items-center justify-between pt-4 border-t-2 border-black">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono border-2 border-black transition-all ${
              currentStep === 0
                ? "opacity-30 cursor-not-allowed border-black/30 text-black/40"
                : "bg-white text-black font-black shadow-neo-sm hover:shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={!isOptionSelected}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-black transition-all ${
              isOptionSelected
                ? "bg-flunked-yellow hover:bg-amber-300 text-black border-2 border-black shadow-neo hover:shadow-neo-lg hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
                : "bg-slate-100 border-2 border-slate-300 text-slate-400 opacity-60 cursor-not-allowed"
            }`}
          >
            <span>
              {currentStep === totalQuestions - 1 ? "Calculate Readiness" : "Next Question"}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
