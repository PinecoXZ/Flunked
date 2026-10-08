"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TOOLS } from "@/data/tools";
import { ToolIcon } from "@/components/ui/ToolIcon";
import { Search, X, ArrowRight, CornerDownLeft, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Auto-focus input and reset query on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Filter tools based on query
  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // Return popular tools first if query is empty
      return TOOLS.filter((t) => t.isPopular)
        .concat(TOOLS.filter((t) => !t.isPopular))
        .slice(0, 8);
    }
    return TOOLS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.categoryLabel.toLowerCase().includes(q) ||
        t.slug.toLowerCase().includes(q)
    );
  }, [query]);

  // Keep selected index within bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredTools.length]);

  const handleSelectTool = (slug: string) => {
    onClose();
    router.push(`/tools/${slug}`);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredTools.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredTools.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredTools[selectedIndex]) {
        handleSelectTool(filteredTools[selectedIndex].slug);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search Tools"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl border-2 border-black shadow-neo-lg overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="relative flex items-center border-b-2 border-black bg-flunked-bg px-4 py-3 sm:py-4">
          <Search className="w-5 h-5 text-black stroke-[2.5] shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search tools (e.g., bunk, ctc, cgpa, attendance)..."
            className="w-full bg-transparent text-sm sm:text-base font-mono font-bold text-black placeholder:text-flunked-muted focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="p-1 rounded hover:bg-black/10 text-black transition-colors mr-2 cursor-pointer"
              title="Clear input"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          ) : null}
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] font-mono font-black bg-flunked-yellow border border-black rounded shadow-neo-sm text-black">
            ESC
          </kbd>
        </div>

        {/* Section Label */}
        <div className="px-4 py-2 bg-zinc-100 border-b border-black/10 flex items-center justify-between text-[11px] font-mono text-flunked-muted font-bold">
          <span>
            {query.trim() ? `Search Results (${filteredTools.length})` : "Popular Student Tools"}
          </span>
          <span className="hidden sm:inline">Use ↑↓ to navigate · ↵ to open</span>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 sm:p-3 space-y-1.5 divide-y divide-transparent">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={tool.id}
                  onClick={() => handleSelectTool(tool.slug)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={cn(
                    "flex items-center justify-between gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer select-none",
                    isSelected
                      ? "bg-flunked-yellow border-black shadow-neo-sm translate-x-1"
                      : "bg-white border-transparent hover:border-black/20 hover:bg-zinc-50"
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <ToolIcon toolSlug={tool.slug} size="sm" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-black text-black truncate">
                          {tool.name}
                        </span>
                        <span
                          className={cn(
                            "text-[10px] font-mono px-1.5 py-0.5 rounded border border-black font-black uppercase shrink-0",
                            isSelected ? "bg-white text-black" : "bg-zinc-100 text-flunked-muted"
                          )}
                        >
                          {tool.categoryLabel}
                        </span>
                        {tool.isPopular && (
                          <span className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono text-black font-bold">
                            <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
                          </span>
                        )}
                      </div>
                      <p
                        className={cn(
                          "text-xs truncate font-sans font-medium mt-0.5",
                          isSelected ? "text-black/80" : "text-flunked-muted"
                        )}
                      >
                        {tool.tagline || tool.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1.5 pl-2">
                    {isSelected && (
                      <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-black text-white text-[10px] font-mono font-bold">
                        Open <CornerDownLeft className="w-2.5 h-2.5" />
                      </span>
                    )}
                    <ArrowRight
                      className={cn(
                        "w-4 h-4 stroke-[2.5]",
                        isSelected ? "text-black" : "text-black/30"
                      )}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 px-4 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-xl bg-flunked-bg border-2 border-black flex items-center justify-center text-flunked-muted shadow-neo-sm">
                <Search className="w-6 h-6 stroke-[2]" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-black text-black">
                  No tools matching &quot;{query}&quot;
                </p>
                <p className="text-xs text-flunked-muted font-sans">
                  Think we should build this calculator? Submit a request!
                </p>
              </div>
              <Link
                href="/suggest"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-flunked-yellow hover:bg-[#FFD000] text-xs font-mono font-black text-black border-2 border-black shadow-neo-sm transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Suggest this tool →</span>
              </Link>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-flunked-bg border-t-2 border-black flex items-center justify-between text-[11px] font-mono text-black font-bold">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00C853] border border-black" />
            <span>All 19 tools searchable</span>
          </div>
          <Link
            href="/tools"
            onClick={onClose}
            className="hover:underline text-flunked-muted hover:text-black"
          >
            Browse all tools directory →
          </Link>
        </div>
      </div>
    </div>
  );
}
