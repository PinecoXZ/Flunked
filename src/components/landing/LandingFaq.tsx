"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, Sparkles, ArrowRight, MessageCircleQuestion } from "lucide-react";

import { LANDING_FAQS } from "@/data/landingFaqs";

export function LandingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleIndex = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-flunked-yellow border-2 border-black text-xs font-mono text-black font-black uppercase tracking-wider shadow-neo-sm">
          <HelpCircle className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black">
          Everything You Need to Know
        </h2>
        <p className="text-sm sm:text-base font-sans font-medium text-flunked-muted leading-relaxed">
          Zero corporate jargon. Clear, honest answers about attendance formulas, in-hand placement
          math, privacy, and how Flunked works.
        </p>
      </div>

      {/* Accordion FAQ List */}
      <div className="space-y-4 mb-14">
        {LANDING_FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className={`rounded-2xl border-2 border-black bg-white transition-all duration-150 overflow-hidden ${
                isOpen ? "shadow-neo" : "shadow-neo-sm hover:shadow-neo"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleIndex(idx)}
                className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left font-mono font-black text-sm sm:text-base text-black hover:bg-flunked-bg transition-colors cursor-pointer select-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-md bg-flunked-yellow border border-black text-xs font-black shrink-0 text-black">
                    Q{idx + 1}
                  </span>
                  <span>{faq.question}</span>
                </div>
                <div
                  className={`w-7 h-7 rounded-lg border-2 border-black flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? "bg-flunked-yellow rotate-180" : "bg-white rotate-0"
                  }`}
                >
                  <ChevronDown className="w-4 h-4 stroke-[3] text-black" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-xs sm:text-sm text-black/85 font-sans font-medium leading-relaxed border-t-2 border-black/10 bg-flunked-bg/40 animate-in fade-in duration-150">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Help & Suggest Banner */}
      <div className="rounded-2xl bg-white border-2 border-black p-6 sm:p-8 shadow-neo-lg flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-flunked-yellow border-2 border-black flex items-center justify-center text-black shrink-0 shadow-neo-sm">
            <MessageCircleQuestion className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-black text-black">
              Have a question or formula we missed?
            </h3>
            <p className="text-xs sm:text-sm font-sans font-medium text-flunked-muted leading-relaxed">
              Tell us your university&apos;s custom rules or suggest a new college tool. We ship
              student requests weekly.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto shrink-0">
          <Link
            href="/suggest"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-flunked-yellow hover:bg-[#FFD000] text-black text-xs font-mono font-black border-2 border-black shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Suggest a Tool</span>
          </Link>
          <Link
            href="/tools"
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-white hover:bg-flunked-bg text-black text-xs font-mono font-bold border-2 border-black shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
          >
            <span>Explore All 19 Tools</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
