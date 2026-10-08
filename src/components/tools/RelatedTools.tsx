"use client";

import React from "react";
import { getRelatedTools } from "@/data/tools";
import { ToolCard } from "@/components/home/ToolCard";
import { Sparkles } from "lucide-react";

interface RelatedToolsProps {
  currentSlug: string;
}

export function RelatedTools({ currentSlug }: RelatedToolsProps) {
  const related = getRelatedTools(currentSlug, 3);

  if (!related || related.length === 0) return null;

  return (
    <section className="pt-10 mt-12 border-t-2 border-black">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-flunked-yellow border-2 border-black text-[11px] font-mono text-black mb-2 font-black shadow-neo-sm">
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>MORE TOOLS</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-black tracking-tight">
            Try These Next
          </h3>
          <p className="text-xs sm:text-sm text-black/70 font-sans mt-0.5 font-medium">
            Handpicked tools to help you survive this semester without crying.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {related.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
}
