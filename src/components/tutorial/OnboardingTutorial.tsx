"use client";

import React, { useState, useEffect, useCallback } from "react";
import { TUTORIAL_STEPS, TutorialStep } from "@/data/tutorialSteps";
import {
  Sparkles,
  ShieldCheck,
  Sliders,
  Share2,
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Compass,
} from "lucide-react";

export function OnboardingTutorial() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Auto-launch on first visit
  useEffect(() => {
    setIsMounted(true);
    const hasSeenTutorial = localStorage.getItem("flunked_tutorial_completed");
    if (!hasSeenTutorial) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen for custom trigger from Header/Footer
  useEffect(() => {
    const handleOpenTrigger = () => {
      setCurrentStepIndex(0);
      setIsOpen(true);
    };

    window.addEventListener("open-flunked-tutorial", handleOpenTrigger);
    return () => window.removeEventListener("open-flunked-tutorial", handleOpenTrigger);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    localStorage.setItem("flunked_tutorial_completed", "true");
  }, []);

  const handleNext = () => {
    if (currentStepIndex < TUTORIAL_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowRight") {
        if (currentStepIndex < TUTORIAL_STEPS.length - 1) {
          setCurrentStepIndex((prev) => prev + 1);
        }
      } else if (e.key === "ArrowLeft") {
        if (currentStepIndex > 0) {
          setCurrentStepIndex((prev) => prev - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentStepIndex, handleClose]);

  if (!isMounted || !isOpen) return null;

  const currentStep: TutorialStep = TUTORIAL_STEPS[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === TUTORIAL_STEPS.length - 1;

  const renderIcon = (key: TutorialStep["iconKey"]) => {
    switch (key) {
      case "sparkles":
        return <Sparkles className="w-6 h-6 stroke-[2.5] text-black" />;
      case "shield":
        return <ShieldCheck className="w-6 h-6 stroke-[2.5] text-black" />;
      case "sliders":
        return <Sliders className="w-6 h-6 stroke-[2.5] text-black" />;
      case "share":
        return <Share2 className="w-6 h-6 stroke-[2.5] text-black" />;
      default:
        return <Compass className="w-6 h-6 stroke-[2.5] text-black" />;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tutorial-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      {/* Click outside backdrop to dismiss */}
      <div className="fixed inset-0" onClick={handleClose} />

      {/* Main Neo-Brutalist Modal Card */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl border-2 border-black shadow-neo-xl overflow-hidden flex flex-col transform transition-all">
        {/* Top Accent Ribbon */}
        <div className="h-2 w-full bg-flunked-yellow border-b-2 border-black" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 pb-4 flex items-center justify-between border-b-2 border-black bg-flunked-bg">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 rounded bg-flunked-yellow border-2 border-black text-[11px] font-mono font-black text-black shadow-neo-sm uppercase">
              {currentStep.badge}
            </span>
            <span className="text-xs font-mono font-bold text-black">
              {currentStepIndex + 1} / {TUTORIAL_STEPS.length}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="text-xs font-mono font-black text-black hover:bg-flunked-yellow px-2 py-0.5 rounded border border-black transition-colors cursor-pointer"
            >
              Skip
            </button>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close tutorial"
              className="p-1 rounded-md border-2 border-black bg-white hover:bg-flunked-yellow text-black transition-colors shadow-neo-sm cursor-pointer"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 flex-1">
          {/* Visual Icon Badge & Title */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-flunked-yellow border-2 border-black flex items-center justify-center shrink-0 shadow-neo-sm">
              {renderIcon(currentStep.iconKey)}
            </div>
            <div className="space-y-1">
              <h2
                id="tutorial-title"
                className="text-xl sm:text-2xl font-black text-black tracking-tight leading-snug"
              >
                {currentStep.title}
              </h2>
              <p className="text-xs sm:text-sm font-bold text-flunked-muted font-sans">
                {currentStep.tagline}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-black font-medium leading-relaxed font-sans">
            {currentStep.description}
          </p>

          {/* Highlights Box */}
          <div className="p-4 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm space-y-2.5">
            {currentStep.highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-black font-bold"
              >
                <CheckCircle2 className="w-4 h-4 text-[#00C853] shrink-0 mt-0.5 stroke-[3]" />
                <span className="font-sans leading-snug">{highlight}</span>
              </div>
            ))}
          </div>

          {/* Step Progress Indicators */}
          <div className="flex items-center justify-center gap-2 pt-1">
            {TUTORIAL_STEPS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentStepIndex(idx)}
                aria-label={`Jump to step ${idx + 1}`}
                className={`h-2.5 rounded-sm border-2 border-black transition-all duration-150 ${
                  currentStepIndex === idx ? "w-8 bg-flunked-yellow shadow-neo-sm" : "w-3 bg-white"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-5 pt-4 bg-flunked-bg border-t-2 border-black flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={isFirstStep}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border-2 border-black text-xs font-mono font-black transition-all ${
              isFirstStep
                ? "opacity-0 pointer-events-none"
                : "bg-white text-black shadow-neo-sm hover:bg-flunked-bgSubtle"
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-flunked-yellow hover:bg-[#FFD000] text-black font-black text-xs sm:text-sm border-2 border-black shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo-lg active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
            >
              <span>{isLastStep ? "Start Exploring" : "Next Step"}</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Global utility helper to trigger tutorial from anywhere
export function launchOnboardingTutorial() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-flunked-tutorial"));
  }
}
