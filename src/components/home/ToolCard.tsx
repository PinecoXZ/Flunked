import React from "react";
import Link from "next/link";
import { type ToolItem } from "@/data/tools";
import { ArrowRight, Flame } from "lucide-react";
import { ToolIcon } from "@/components/ui/ToolIcon";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  tool: ToolItem;
  className?: string;
  isFeatured?: boolean;
  featuredSpan?: "first" | "last";
}

const CATEGORY_THEME: Record<string, { badgeBg: string; cornerBg: string; tag: string }> = {
  academics: {
    badgeBg: "bg-flunked-yellow",
    cornerBg: "bg-flunked-yellow",
    tag: "ACADEMICS",
  },
  placement: {
    badgeBg: "bg-flunked-cyan",
    cornerBg: "bg-flunked-cyan",
    tag: "PLACEMENT",
  },
  fun: {
    badgeBg: "bg-flunked-pink",
    cornerBg: "bg-flunked-pink",
    tag: "LIFESTYLE",
  },
  daily: {
    badgeBg: "bg-flunked-mint",
    cornerBg: "bg-flunked-mint",
    tag: "UTILITY",
  },
};

export function ToolCard({ tool, className, isFeatured = false, featuredSpan }: ToolCardProps) {
  const theme = CATEGORY_THEME[tool.category] || {
    badgeBg: "bg-flunked-yellow",
    cornerBg: "bg-flunked-yellow",
    tag: "TOOL",
  };

  const spanClasses = isFeatured
    ? featuredSpan === "first"
      ? "lg:col-span-2 bg-gradient-to-br from-white via-white to-flunked-bg"
      : "sm:col-span-2 lg:col-span-2 bg-gradient-to-br from-white via-white to-flunked-bg"
    : "";

  return (
    <Link
      href={`/tools/${tool.slug}`}
      prefetch={false}
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl bg-white border-2 border-black p-6 transition-all duration-150 shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg overflow-hidden",
        spanClasses,
        className
      )}
    >
      {/* Category-themed Memphis corner decoration */}
      <div
        className={cn(
          "absolute -right-8 -bottom-8 w-32 h-32 rounded-full border-2 border-black pointer-events-none z-0 opacity-35 transition-transform duration-300 group-hover:scale-125",
          theme.cornerBg
        )}
      />

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          {/* Top: Custom Graphic Icon Badge + Category Tag + Popular Badge */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <ToolIcon toolSlug={tool.slug} size="md" />

            <div className="flex items-center gap-2">
              {tool.isPopular && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-flunked-yellow border-2 border-black text-black text-[10px] font-mono uppercase tracking-wider font-black shadow-neo-sm">
                  <Flame className="w-3 h-3 stroke-[2.5]" />
                  <span>Popular</span>
                </span>
              )}
              <span
                className={cn(
                  "px-2 py-0.5 rounded border border-black text-[10px] font-mono uppercase tracking-wider text-black font-black shadow-neo-sm",
                  theme.badgeBg
                )}
              >
                [{theme.tag}]
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-black text-black mb-2 group-hover:text-black">
            {tool.name}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-flunked-muted font-sans font-medium leading-relaxed">
            {tool.description}
          </p>
        </div>

        {/* Bottom Footer info + Launch link */}
        <div className="mt-6 pt-4 border-t-2 border-black/15 flex items-center justify-between gap-3">
          <span
            className={cn(
              "text-[11px] font-mono text-black font-bold",
              isFeatured ? "max-w-[78%]" : "truncate max-w-[70%]"
            )}
          >
            {tool.tagline}
          </span>

          <span
            className={cn(
              "inline-flex items-center gap-1 px-3 py-1 rounded border-2 border-black text-xs font-mono font-black text-black shadow-neo-sm group-hover:translate-x-0.5 transition-transform shrink-0",
              theme.badgeBg
            )}
          >
            <span>Launch</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </span>
        </div>
      </div>
    </Link>
  );
}
