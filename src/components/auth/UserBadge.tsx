"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLoading } from "@/context/LoadingContext";
import Link from "next/link";
import {
  LogOut,
  GraduationCap,
  ChevronDown,
  CheckCircle2,
  Edit3,
  User as UserIcon,
  Coffee,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UserBadgeProps {
  className?: string;
}

export function UserBadge({ className }: UserBadgeProps) {
  const { user, logout } = useAuth();
  const { showLoading } = useLoading();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName = user?.name || "Student";
  const displayCampus = user?.campusName ? user.campusName.replace(" Student", "") : "Campus";

  return (
    <div className={cn("relative shrink-0", className)} ref={dropdownRef}>
      {/* Badge Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label={`Student profile menu for ${displayName}`}
        className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 rounded-lg bg-white hover:bg-flunked-yellow border-2 border-black transition-all text-xs font-mono font-black text-black select-none group cursor-pointer shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo active:translate-x-[1px] active:translate-y-[1px] active:shadow-none shrink-0"
      >
        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#00C853] border border-black shrink-0" />
        <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5] shrink-0" />
        <span className="font-black max-w-[75px] xs:max-w-[95px] sm:max-w-[160px] truncate leading-none">
          <span className="sm:hidden">{displayName}</span>
          <span className="hidden sm:inline">
            {displayName} · {displayCampus}
          </span>
        </span>
        <ChevronDown
          className={cn(
            "w-3 h-3 text-black stroke-[3] transition-transform duration-150 shrink-0",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-[calc(100vw-1.75rem)] max-w-[270px] sm:w-64 rounded-xl bg-white border-2 border-black shadow-neo-lg p-3.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-start gap-2.5 pb-3 border-b-2 border-black">
            <div className="p-2 rounded-lg bg-flunked-yellow border-2 border-black text-black shadow-neo-sm">
              <GraduationCap className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-black text-black truncate flex items-center gap-1">
                <UserIcon className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{displayName}</span>
              </div>
              <div className="text-[11px] font-mono text-flunked-muted font-bold truncate">
                {displayCampus} Student
              </div>
            </div>
          </div>

          <div className="py-2.5 space-y-1.5 text-xs font-mono">
            <div className="flex items-center gap-1.5 px-2 py-1 text-black font-black">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00C853] stroke-[3]" />
              <span>All 19 Tools Unlocked</span>
            </div>

            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-black hover:bg-flunked-yellow border border-black/20 font-bold transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Change Name or Campus</span>
            </Link>

            <a
              href="https://buymeacoffee.com/fayezahmad"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-black hover:bg-flunked-yellow border border-black/20 font-bold transition-colors cursor-pointer"
            >
              <Coffee className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Buy creator a coffee ☕</span>
            </a>
          </div>

          <div className="pt-2 border-t-2 border-black">
            <button
              type="button"
              onClick={async () => {
                setIsOpen(false);
                await showLoading({
                  title: "flunked-session.exe // terminate",
                  statusTitle: "Resetting Campus Profile...",
                  badgeText: "[LOGOUT: ACTIVE]",
                  state: "working",
                  steps: [
                    "Clearing local student session...",
                    "Flushing cached tool state...",
                    "Returning to guest mode...",
                  ],
                  duration: 5500,
                });
                logout();
              }}
              className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-mono font-black text-flunked-danger hover:bg-[#FFF0F0] border border-flunked-danger transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Reset Profile</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
