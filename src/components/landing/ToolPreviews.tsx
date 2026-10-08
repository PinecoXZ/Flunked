import React from "react";
import Link from "next/link";
import { TOOLS, getToolBySlug } from "@/data/tools";
import { ToolIcon } from "@/components/ui/ToolIcon";
import { Lock, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export function ToolPreviews() {
  // Curate 3 high-impact spotlight tools for the public landing page teaser
  const spotlightSlugs = ["bunk-calculator", "ctc-calculator", "am-i-cooked"];
  const spotlightTools = spotlightSlugs.map((slug) => getToolBySlug(slug)).filter(Boolean);

  // Total locked tools count
  const totalLockedCount = TOOLS.length - spotlightSlugs.length;

  // Curate 6 high-impact, curiosity-driven teaser tools that entice students to click
  const vaultTeaserSlugs = [
    "cgpa-marriage",
    "placement-quiz",
    "semester-survival",
    "stipend-checker",
    "tier-engineer",
    "expense-splitter",
  ];
  const vaultTeasers = vaultTeaserSlugs.map((slug) => getToolBySlug(slug)).filter(Boolean);

  const remainingVaultCount = totalLockedCount - vaultTeasers.length;

  return (
    <section id="tool-previews" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-6 border-b-2 border-black">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-flunked-yellow border-2 border-black text-black text-xs font-mono font-black shadow-neo-sm uppercase">
            <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Featured Spotlight Tools</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-black">
            Sneak Peek: What Indian Students Use Daily
          </h2>
        </div>
        <div className="text-xs font-mono font-bold text-black/70">
          <span>{TOOLS.length} calculators &amp; survival tools</span>
        </div>
      </div>

      {/* Grid of 3 Spotlight Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {spotlightTools.map((tool) => {
          if (!tool) return null;
          return (
            <div
              key={tool.id}
              className="group relative rounded-2xl bg-white border-2 border-black p-6 sm:p-7 flex flex-col justify-between transition-all duration-150 shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg overflow-hidden"
            >
              {/* Canary yellow corner decoration */}
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-flunked-yellow rounded-full border-2 border-black pointer-events-none z-0 opacity-40 transition-transform duration-300 group-hover:scale-110" />

              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  {/* Header: Graphic ToolIcon & Locked Badge */}
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <ToolIcon toolSlug={tool.slug} size="lg" />
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-flunked-yellow border-2 border-black text-black text-[11px] font-mono font-black shadow-neo-sm uppercase">
                      <Lock className="w-3 h-3 stroke-[3]" />
                      <span>Locked</span>
                    </div>
                  </div>

                  {/* Category Tag */}
                  <div className="text-[11px] font-mono uppercase tracking-wider text-flunked-muted font-black mb-1.5">
                    {tool.categoryLabel}
                  </div>

                  {/* Tool Name */}
                  <h3 className="text-xl font-black text-black mb-2">{tool.name}</h3>

                  {/* Tool Description */}
                  <p className="text-xs sm:text-sm text-flunked-muted font-sans font-medium leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                {/* Bottom Teaser Link */}
                <div className="mt-6 pt-4 border-t-2 border-black flex items-center justify-between">
                  <span className="text-[11px] font-mono text-black font-bold truncate max-w-[65%]">
                    {tool.tagline}
                  </span>
                  <Link
                    href={`/login?redirect=/tools/${tool.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-flunked-yellow hover:bg-[#FFD000] border-2 border-black text-xs font-mono font-black text-black shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                  >
                    <span>Unlock</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* The Vault Teaser: Neo-Brutalist High-Contrast Light Vault Card */}
      <div className="relative rounded-2xl bg-white border-2 border-black p-8 sm:p-12 shadow-neo-xl overflow-hidden">
        {/* Canary yellow corner decoration */}
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-flunked-yellow rounded-full border-2 border-black pointer-events-none z-0 opacity-40" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-flunked-yellow border-2 border-black text-black text-xs font-mono font-black shadow-neo-sm uppercase">
              <Lock className="w-3.5 h-3.5 stroke-[3]" />
              <span>{totalLockedCount} More Student Tools Inside The Vault</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
              Unlock the complete {TOOLS.length}-tool student arsenal
            </h3>

            <p className="text-xs sm:text-sm text-flunked-muted font-sans font-medium leading-relaxed">
              We keep Flunked.fun 100% free, instantaneous, and completely ad-free.
            </p>

            {/* Curated high-CTR teaser tools that invite clicks */}
            <div className="pt-2 space-y-2.5">
              <div className="text-xs font-mono font-bold text-flunked-muted flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span>Trending inside the vault (click to unlock):</span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {vaultTeasers.map((t) => {
                  if (!t) return null;
                  return (
                    <Link
                      key={t.id}
                      href={`/login?redirect=/tools/${t.slug}`}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-flunked-bg hover:bg-flunked-yellow border-2 border-black text-xs font-mono font-black text-black shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all group cursor-pointer"
                      title={t.tagline}
                    >
                      <span className="w-2 h-2 rounded-full bg-flunked-yellow group-hover:bg-black border border-black transition-colors" />
                      <span>{t.name}</span>
                      <span className="text-[10px] font-mono uppercase text-flunked-muted group-hover:text-black bg-white group-hover:bg-white/80 px-1.5 py-0.5 rounded border border-black/20 font-bold transition-colors">
                        {t.categoryLabel}
                      </span>
                      <ArrowRight className="w-3 h-3 text-black opacity-0 group-hover:opacity-100 -ml-1 transition-all" />
                    </Link>
                  );
                })}

                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-flunked-yellow hover:bg-[#FFD000] border-2 border-black text-xs font-mono font-black text-black shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                >
                  <span>+{remainingVaultCount} more in vault</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center gap-3 shrink-0">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-flunked-yellow hover:bg-[#FFD000] text-black font-black text-base border-2 border-black shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-150 select-none text-center cursor-pointer"
            >
              <span>Unlock Everything Now</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </Link>

            <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-black font-bold">
              <ShieldCheck className="w-4 h-4 text-[#00C853] stroke-[3]" />
              <span>Instant 5-second entry · No passwords</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
