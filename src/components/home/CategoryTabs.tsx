"use client";

import { CATEGORIES, type ToolCategory } from "@/data/tools";
import { Sparkles, BookOpen, TrendingUp, Flame, Home, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  all: Sparkles,
  academics: BookOpen,
  placement: TrendingUp,
  fun: Flame,
  daily: Home,
};

interface CategoryTabsProps {
  selectedCategory: ToolCategory;
  onSelectCategory: (category: ToolCategory) => void;
  counts?: Record<ToolCategory, number>;
  className?: string;
}

const CATEGORY_ACTIVE_STYLES: Record<string, string> = {
  all: "bg-flunked-yellow text-black",
  academics: "bg-flunked-yellow text-black",
  placement: "bg-flunked-cyan text-black",
  fun: "bg-flunked-pink text-black",
  daily: "bg-flunked-mint text-black",
};

export function CategoryTabs({
  selectedCategory,
  onSelectCategory,
  counts,
  className,
}: CategoryTabsProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none select-none w-full max-w-full min-w-0",
        className
      )}
    >
      {CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        const count = counts ? counts[cat.id] : undefined;
        const Icon = CATEGORY_ICON_MAP[cat.id] || Sparkles;
        const activeColor = CATEGORY_ACTIVE_STYLES[cat.id] || "bg-flunked-yellow text-black";

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all duration-150 border-2 border-black cursor-pointer",
              isSelected
                ? `${activeColor} font-black shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px]`
                : "bg-white text-black font-bold shadow-neo-sm hover:bg-flunked-bg"
            )}
          >
            <Icon className="w-3.5 h-3.5 stroke-[2.5] text-black" />
            <span>{cat.label}</span>
            {count !== undefined && (
              <span
                className={cn(
                  "px-1.5 py-0.2 rounded text-[10px] font-mono border border-black font-black",
                  isSelected ? "bg-white text-black" : "bg-flunked-bg text-black"
                )}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
