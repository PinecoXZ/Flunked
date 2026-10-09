"use client";

import React, { useEffect, useState, useRef } from "react";
import { ThinkingOrb } from "thinking-orbs";
import { cn } from "@/lib/utils";
import { Sparkles, Terminal } from "lucide-react";

export type OrbState =
  | "connecting"
  | "working"
  | "solving"
  | "weaving"
  | "searching"
  | "composing"
  | "breathing"
  | "shaping"
  | "listening";

export interface LoadingWindowProps {
  isOpen?: boolean;
  inline?: boolean;
  title?: string;
  statusTitle: string;
  steps?: string[];
  state?: OrbState;
  badgeText?: string;
  duration?: number;
  onComplete?: () => void;
  className?: string;
}

export function LoadingWindow({
  isOpen = true,
  inline = false,
  title = "flunked-loader.sys",
  statusTitle,
  steps = [
    "Initializing campus environment...",
    "Verifying student permissions...",
    "Syncing academic calculators...",
  ],
  state = "connecting",
  badgeText = "[ACTIVE]",
  duration = 5500,
  onComplete,
  className,
}: LoadingWindowProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(10);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Animate progress and step changes smoothly over the duration
  useEffect(() => {
    if (!isOpen) {
      setProgress(10);
      setCurrentStepIndex(0);
      return;
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;

      if (elapsed >= duration) {
        if (onCompleteRef.current) {
          setProgress(100);
          if (steps.length > 0) {
            setCurrentStepIndex(steps.length - 1);
          }
          clearInterval(interval);
          onCompleteRef.current();
          return;
        }

        // If continuous inline loader without onComplete callback, keep cycling steps nicely
        const loopElapsed = elapsed - duration;
        const loopProgress = 75 + Math.round((Math.sin(loopElapsed / 400) + 1) * 11);
        setProgress(Math.min(98, loopProgress));

        if (steps.length > 0) {
          const stepIndex = Math.floor(elapsed / (duration / steps.length)) % steps.length;
          setCurrentStepIndex(stepIndex);
        }
        return;
      }

      // Smooth progression up to 98% during active duration
      const pct = Math.min(98, Math.max(10, Math.round((elapsed / duration) * 98)));
      setProgress(pct);

      if (steps.length > 0) {
        const stepIndex = Math.min(
          steps.length - 1,
          Math.floor((elapsed / duration) * steps.length)
        );
        setCurrentStepIndex(stepIndex);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [isOpen, duration, steps.length, steps]);

  if (!isOpen && !inline) return null;

  const windowContent = (
    <div
      className={cn(
        "w-full max-w-md bg-white border-2 border-black rounded-2xl shadow-neo-xl overflow-hidden relative",
        inline ? "mx-auto my-6" : "animate-in zoom-in-95 fade-in duration-150",
        className
      )}
      role="dialog"
      aria-modal={!inline}
      aria-label={statusTitle}
    >
      {/* Neo-Brutalist Retro Title Bar */}
      <div className="bg-flunked-yellow border-b-2 border-black px-4 py-2.5 flex items-center justify-between select-none">
        <div className="flex items-center gap-2.5">
          {/* Traffic light control dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF4444] border border-black shadow-neo-sm inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#FFD000] border border-black shadow-neo-sm inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#00C853] border border-black shadow-neo-sm inline-block" />
          </div>
          <span className="text-xs font-mono font-black text-black tracking-tight flex items-center gap-1.5 ml-1">
            <Terminal className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>{title}</span>
          </span>
        </div>

        <div className="px-2 py-0.5 rounded bg-white border border-black text-[10px] font-mono font-black text-black uppercase shadow-neo-sm">
          {badgeText}
        </div>
      </div>

      {/* Main Body */}
      <div className="p-6 sm:p-7 space-y-5 bg-white relative">
        {/* Subtle dot-matrix watermark */}
        <div className="absolute inset-0 bg-dot-matrix opacity-25 pointer-events-none" />

        {/* Center: Thinking-Orbs Indicator */}
        <div className="relative z-10 flex flex-col items-center justify-center pt-2">
          <div className="p-4 rounded-2xl bg-flunked-bg border-2 border-black shadow-neo-sm flex items-center justify-center relative">
            <ThinkingOrb size={64} state={state} theme="light" />
            <div className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded bg-flunked-yellow border border-black text-[9px] font-mono font-black text-black shadow-neo-sm uppercase">
              {state}
            </div>
          </div>

          <h2 className="text-lg sm:text-xl font-black text-black text-center tracking-tight mt-4">
            {statusTitle}
          </h2>

          <p className="text-xs font-mono font-bold text-flunked-muted text-center mt-1 min-h-[1.5rem] flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-black shrink-0 animate-pulse" />
            <span>{steps[currentStepIndex] || steps[0]}</span>
          </p>
        </div>

        {/* Neo-Brutalist Progress Bar */}
        <div className="relative z-10 space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-mono font-black text-black uppercase">
            <span>Executing Subroutine</span>
            <span>{progress}%</span>
          </div>
          <div className="h-3.5 w-full bg-flunked-bg border-2 border-black rounded-lg overflow-hidden p-0.5 shadow-neo-sm relative">
            <div
              className="h-full bg-flunked-yellow rounded-md border-r border-black transition-all ease-out duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Terminal Micro-Log Box */}
        <div className="relative z-10 p-3 rounded-xl bg-flunked-bg border-2 border-black text-[11px] font-mono space-y-1 shadow-neo-sm">
          <div className="text-black/60 font-bold flex items-center justify-between">
            <span>&gt; status: runtime_ok</span>
            <span className="text-[10px] text-black bg-white px-1.5 py-0.2 rounded border border-black">
              200 OK
            </span>
          </div>
          <div className="text-black font-black truncate">
            &gt; {steps[currentStepIndex] || "Processing student data..."}
          </div>
        </div>
      </div>
    </div>
  );

  if (inline) {
    return windowContent;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
      {windowContent}
    </div>
  );
}
