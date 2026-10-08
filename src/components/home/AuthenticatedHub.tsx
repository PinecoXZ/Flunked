"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { TOOLS, ToolCategory } from "@/data/tools";
import { CategoryTabs } from "./CategoryTabs";
import { SearchBar } from "./SearchBar";
import { ToolCard } from "./ToolCard";
import { GraduationCap, HelpCircle, Plus } from "lucide-react";

export function AuthenticatedHub() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Category tool counts
  const counts = useMemo(() => {
    const acc: Record<ToolCategory, number> = {
      all: TOOLS.length,
      academics: 0,
      placement: 0,
      fun: 0,
      daily: 0,
    };
    TOOLS.forEach((t) => {
      acc[t.category] = (acc[t.category] || 0) + 1;
    });
    return acc;
  }, []);

  // Filtered tools based on category and search query
  const filteredTools = useMemo(() => {
    let list = TOOLS;

    if (selectedCategory !== "all") {
      list = list.filter((t) => t.category === selectedCategory);
    }

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tagline.toLowerCase().includes(q) ||
          t.categoryLabel.toLowerCase().includes(q)
      );
    }

    return list;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 w-full max-w-full min-w-0">
      {/* Welcome Banner */}
      <div className="relative rounded-2xl bg-white border-2 border-black p-6 sm:p-8 shadow-neo-lg overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-flunked-yellow border-2 border-black text-black text-xs font-mono font-black shadow-neo-sm uppercase">
              <GraduationCap className="w-4 h-4 stroke-[2.5]" />
              <span>Campus Hub · {user?.campusName || "Student"}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-black flex items-center gap-2.5">
              <span>Welcome, {user?.name || "Student"}</span>
              <span className="text-xl">🎓</span>
            </h1>

            <p className="text-xs sm:text-sm text-flunked-muted max-w-xl font-sans font-medium">
              All {TOOLS.length} student tools unlocked. Instant calculations, zero recruiters, and
              real survival math.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Link
              href="/suggest"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-flunked-yellow hover:bg-[#FFD000] text-xs font-mono font-black text-black border-2 border-black shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all select-none"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Suggest Tool</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Controls Bar: Search & Category Tabs */}
      <div className="space-y-4 w-full max-w-full min-w-0">
        <SearchBar
          query={searchQuery}
          onQueryChange={setSearchQuery}
          totalResults={filteredTools.length}
          isFiltered={Boolean(searchQuery || selectedCategory !== "all")}
        />

        <CategoryTabs
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          counts={counts}
        />
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-10 text-center rounded-2xl bg-white border-2 border-black space-y-4 max-w-lg mx-auto my-12 shadow-neo">
          <div className="w-12 h-12 mx-auto rounded-xl bg-flunked-yellow border-2 border-black flex items-center justify-center text-black shadow-neo-sm">
            <HelpCircle className="w-6 h-6 stroke-[2.5]" />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-black text-black">No tools found</h3>
            <p className="text-xs text-flunked-muted font-sans font-medium">
              We couldn’t find any tools matching &ldquo;{searchQuery}&rdquo;.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="px-4 py-2 rounded-lg bg-flunked-yellow text-xs font-mono font-black text-black border-2 border-black shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
