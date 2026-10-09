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

      {/* Bento Grid of 3 Spotlight Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Bento Hero 1: Bunk Calculator (Spans 2 columns) */}
        {spotlightTools[0] && (
          <div className="md:col-span-2 group relative rounded-2xl bg-white border-2 border-black p-6 sm:p-8 flex flex-col justify-between transition-all duration-150 shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg overflow-hidden">
            {/* Corner Memphis accent */}
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-flunked-yellow rounded-full border-2 border-black pointer-events-none z-0 opacity-30 transition-transform duration-300 group-hover:scale-110" />

            <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <ToolIcon toolSlug={spotlightTools[0].slug} size="lg" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-flunked-yellow border border-black text-[10px] font-mono uppercase tracking-wider text-black font-black shadow-neo-sm">
                          [ACADEMICS: #1 TOOL]
                        </span>
                        <span className="text-[10px] font-mono text-flunked-muted font-bold">
                          48,000+ calculations
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-black mt-1">
                        {spotlightTools[0].name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-flunked-yellow border-2 border-black text-black text-xs font-mono font-black shadow-neo-sm uppercase">
                    <Lock className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Locked</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-flunked-muted font-sans font-medium leading-relaxed max-w-xl">
                  {spotlightTools[0].description}
                </p>

                {/* Utilitarian Preview Ticker Block */}
                <div className="mt-4 grid grid-cols-3 gap-2 p-3 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-flunked-muted font-bold block">UGC Cutoff</span>
                    <span className="font-black text-black text-sm">75.0%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-flunked-muted font-bold block">Sample Classes</span>
                    <span className="font-black text-black text-sm">38 / 45</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-flunked-muted font-bold block">Calculated Margin</span>
                    <span className="font-black text-[#00A843] text-sm">+3 Bunks Safe</span>
                  </div>
                </div>
              </div>

              {/* Bottom Footer Info */}
              <div className="pt-4 border-t-2 border-black/15 flex items-center justify-between">
                <span className="text-xs font-mono text-black font-bold">
                  {spotlightTools[0].tagline}
                </span>
                <Link
                  href={`/login?redirect=/tools/${spotlightTools[0].slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-flunked-yellow hover:bg-[#FFD000] border-2 border-black text-xs font-mono font-black text-black shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                >
                  <span>Unlock Tool</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Bento Card 2: CTC Calculator (Cyan accent) */}
        {spotlightTools[1] && (
          <div className="group relative rounded-2xl bg-white border-2 border-black p-6 sm:p-7 flex flex-col justify-between transition-all duration-150 shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-flunked-cyan rounded-full border-2 border-black pointer-events-none z-0 opacity-35 transition-transform duration-300 group-hover:scale-110" />

            <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <ToolIcon toolSlug={spotlightTools[1].slug} size="md" />
                  <span className="px-2 py-0.5 rounded bg-flunked-cyan border border-black text-[10px] font-mono uppercase tracking-wider text-black font-black shadow-neo-sm">
                    [CAREER: CTC]
                  </span>
                </div>

                <h3 className="text-xl font-black text-black mb-1.5">{spotlightTools[1].name}</h3>
                <p className="text-xs text-flunked-muted font-sans font-medium leading-relaxed">
                  {spotlightTools[1].description}
                </p>

                <div className="mt-3 p-2.5 rounded-lg bg-flunked-bg border-2 border-black shadow-neo-sm text-xs font-mono">
                  <span className="text-[10px] text-flunked-muted font-bold block">Formula Truth:</span>
                  <span className="font-black text-black text-xs">CTC ≠ In-Hand Cash</span>
                </div>
              </div>

              <div className="pt-3 border-t-2 border-black/15 flex items-center justify-between">
                <span className="text-[11px] font-mono text-black font-bold truncate max-w-[60%]">
                  {spotlightTools[1].tagline}
                </span>
                <Link
                  href={`/login?redirect=/tools/${spotlightTools[1].slug}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-flunked-cyan hover:bg-[#00D8E6] border-2 border-black text-xs font-mono font-black text-black shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                >
                  <span>Unlock</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Bento Card 3: Am I Cooked? (Pink accent) */}
        {spotlightTools[2] && (
          <div className="md:col-span-3 group relative rounded-2xl bg-white border-2 border-black p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-150 shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-flunked-pink rounded-full border-2 border-black pointer-events-none z-0 opacity-30 transition-transform duration-300 group-hover:scale-110" />

            <div className="relative z-10 flex items-center gap-4">
              <ToolIcon toolSlug={spotlightTools[2].slug} size="lg" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-flunked-pink border border-black text-[10px] font-mono uppercase tracking-wider text-black font-black shadow-neo-sm">
                    [LIFESTYLE: CRISIS]
                  </span>
                  <span className="text-xs font-mono font-bold text-flunked-muted">
                    Instant Reality Check
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-black">{spotlightTools[2].name}</h3>
                <p className="text-xs sm:text-sm text-flunked-muted font-sans font-medium max-w-xl">
                  {spotlightTools[2].description}
                </p>
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-4 shrink-0">
              <Link
                href={`/login?redirect=/tools/${spotlightTools[2].slug}`}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-flunked-pink hover:bg-[#FF5595] border-2 border-black text-xs font-mono font-black text-black shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo-lg active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
              >
                <span>Check Crisis Level</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </div>
          </div>
        )}
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
              We keep Flunked.online 100% free, instantaneous, and completely ad-free.
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
