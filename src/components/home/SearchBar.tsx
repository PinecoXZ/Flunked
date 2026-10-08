"use client";

import React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  placeholder?: string;
  totalResults?: number;
  isFiltered?: boolean;
  className?: string;
}

export function SearchBar({
  query,
  onQueryChange,
  placeholder = "Search attendance, CGPA, CTC, backlogs, quiz...",
  totalResults,
  isFiltered,
  className,
}: SearchBarProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative flex items-center">
        {/* Search Icon */}
        <div className="absolute left-4 pointer-events-none text-black">
          <Search className="w-4 h-4 stroke-[2.5]" />
        </div>

        {/* Search Input */}
        <input
          id="hub-search-input"
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-11 pr-28 py-3 rounded-xl bg-white border-2 border-black text-sm font-mono font-bold text-black placeholder:text-flunked-muted shadow-neo-sm focus:outline-none focus:ring-2 focus:ring-flunked-yellow transition-all"
        />

        {/* Right tools: Result count badge & Clear button */}
        <div className="absolute right-3 flex items-center gap-2">
          {isFiltered && totalResults !== undefined && (
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-flunked-yellow text-black border border-black font-black shadow-neo-sm">
              {totalResults} {totalResults === 1 ? "tool" : "tools"}
            </span>
          )}

          {query && (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              aria-label="Clear search"
              className="p-1 rounded border border-black bg-white hover:bg-flunked-yellow text-black transition-colors"
            >
              <X className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
