import React from "react";
import Link from "next/link";
import { type ToolItem } from "@/data/tools";
import { ArrowRight, Flame } from "lucide-react";
import { ToolIcon } from "@/components/ui/ToolIcon";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  tool: ToolItem;
  className?: string;
}

export function ToolCard({ tool, className }: ToolCardProps) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      prefetch={false}
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl bg-white border-2 border-black p-6 transition-all duration-150 shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg overflow-hidden",
        className
      )}
    >
      {/* Canary yellow corner decoration */}
      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-flunked-yellow rounded-full border-2 border-black pointer-events-none z-0 opacity-40 transition-transform duration-300 group-hover:scale-110" />

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
              <span className="text-[11px] font-mono uppercase tracking-wider text-black font-black">
                {tool.categoryLabel}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-black text-black mb-2">{tool.name}</h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-flunked-muted font-sans font-medium leading-relaxed">
            {tool.description}
          </p>
        </div>

        {/* Bottom Footer info + Launch link */}
        <div className="mt-6 pt-4 border-t-2 border-black flex items-center justify-between">
          <span className="text-[11px] font-mono text-black font-bold truncate max-w-[70%]">
            {tool.tagline}
          </span>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-flunked-yellow border-2 border-black text-xs font-mono font-black text-black shadow-neo-sm group-hover:translate-x-0.5 transition-transform">
            <span>Open</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </span>
        </div>
      </div>
    </Link>
  );
}
