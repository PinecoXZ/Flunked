"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { type ToolFaq } from "@/data/toolFaqs";

interface ToolFaqSectionProps {
  toolName: string;
  faqs: ToolFaq[];
}

export function ToolFaqSection({ toolName, faqs }: ToolFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleIndex = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="w-full pt-6 border-t-2 border-black space-y-5">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-black shadow-neo-sm">
          <HelpCircle className="w-4 h-4 stroke-[2.5]" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-black text-black tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs font-mono font-bold text-flunked-muted">
            Important rules &amp; college advice regarding {toolName}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="rounded-2xl border-2 border-black bg-white overflow-hidden shadow-neo-sm transition-all"
            >
              <button
                type="button"
                onClick={() => toggleIndex(idx)}
                className="w-full flex items-center justify-between gap-4 p-4 text-left font-mono font-black text-xs sm:text-sm text-black hover:bg-flunked-bg transition-colors cursor-pointer select-none"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-black shrink-0 transition-transform duration-200 stroke-[2.5] ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-black/80 font-sans font-medium leading-relaxed border-t border-black/10 bg-flunked-bg/50 animate-in fade-in duration-150">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
