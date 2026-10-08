"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  GraduationCap,
  ArrowRight,
  Sparkles,
  User as UserIcon,
  School,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { POPULAR_CAMPUSES } from "@/data/campuses";

interface LoginFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
  className?: string;
}

export function LoginForm({ onSuccess, redirectTo, className }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryRedirect = searchParams.get("redirect");
  const targetRedirect = redirectTo || queryRedirect || "/";

  const { login, user } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [campusName, setCampusName] = useState(user?.campusName || "");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedCampus = campusName.trim();

    if (!trimmedName) {
      setError("Please enter your name or a nickname.");
      return;
    }

    if (!trimmedCampus) {
      setError("Please enter your college or university name.");
      return;
    }

    setIsSubmitting(true);
    login(trimmedName, trimmedCampus);

    if (onSuccess) {
      onSuccess();
    } else {
      router.push(targetRedirect);
    }
  };

  return (
    <div
      className={cn(
        "w-full max-w-md mx-auto p-6 sm:p-8 pt-8 sm:pt-10 rounded-2xl bg-white border-2 border-black shadow-neo-lg relative overflow-hidden",
        className
      )}
    >
      {/* Decorative top accent line spanning 100% edge-to-edge */}
      <div className="absolute top-0 left-0 right-0 h-2.5 bg-flunked-yellow border-b-2 border-black" />

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-flunked-yellow border-2 border-black text-black shadow-neo-sm mb-1">
            <GraduationCap className="w-6 h-6 stroke-[2.5]" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-black">
            {user ? "Update Campus Profile" : "Enter Flunked.online"}
          </h1>
          <p className="text-xs sm:text-sm text-flunked-muted font-medium">
            Zero friction. No email, passwords, or OTPs required. Just tell us what to call you and
            where you study.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-[#FFF0F0] border-2 border-flunked-danger text-flunked-danger text-xs font-sans font-bold leading-relaxed animate-in fade-in duration-150">
            {error}
          </div>
        )}

        {/* Input 1: User Name / Alias */}
        <div className="space-y-1.5">
          <label
            htmlFor="student-name"
            className="block text-xs font-mono uppercase tracking-wider text-black font-black"
          >
            Your Name / Nickname
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-black">
              <UserIcon className="w-4 h-4 stroke-[2.5]" />
            </div>
            <input
              id="student-name"
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(null);
              }}
              placeholder="e.g. Aman, Priya, Backbencher..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border-2 border-black text-sm font-mono font-bold text-black placeholder:text-flunked-muted shadow-neo-sm transition-all focus:outline-none focus:ring-2 focus:ring-flunked-yellow"
            />
          </div>
        </div>

        {/* Input 2: College / University Name */}
        <div className="space-y-1.5">
          <label
            htmlFor="college-name"
            className="block text-xs font-mono uppercase tracking-wider text-black font-black"
          >
            Your College / University
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-black">
              <School className="w-4 h-4 stroke-[2.5]" />
            </div>
            <input
              id="college-name"
              type="text"
              required
              value={campusName}
              onChange={(e) => {
                setCampusName(e.target.value);
                setError(null);
              }}
              placeholder="e.g. VIT Vellore, BITS Pilani, SRM..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border-2 border-black text-sm font-mono font-bold text-black placeholder:text-flunked-muted shadow-neo-sm transition-all focus:outline-none focus:ring-2 focus:ring-flunked-yellow"
            />
          </div>

          {/* Quick-pick campus tags */}
          <div className="pt-2">
            <div className="text-[10px] font-mono uppercase tracking-wider text-flunked-muted font-bold mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-black" />
              <span>Quick pick:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_CAMPUSES.map((campus) => (
                <button
                  key={campus}
                  type="button"
                  onClick={() => {
                    setCampusName(campus);
                    setError(null);
                  }}
                  className={cn(
                    "text-[11px] font-mono px-2.5 py-1 rounded-md border-2 border-black font-bold transition-all shadow-neo-sm cursor-pointer",
                    campusName.toLowerCase() === campus.toLowerCase()
                      ? "bg-flunked-yellow text-black font-black"
                      : "bg-white hover:bg-flunked-yellow text-black"
                  )}
                >
                  {campus}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting || !name.trim() || !campusName.trim()}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-flunked-yellow hover:bg-[#FFD000] text-black font-black text-sm border-2 border-black shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo-lg active:translate-x-[1px] active:translate-y-[1px] active:shadow-none disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <span>{user ? "Save & Enter Campus Hub" : "Enter Campus Hub"}</span>
          <ArrowRight className="w-4 h-4 text-black stroke-[3]" />
        </button>

        {/* Trust & Privacy Pill */}
        <div className="pt-3 border-t-2 border-black flex items-center justify-center gap-2 text-xs font-mono font-bold text-black">
          <CheckCircle2 className="w-4 h-4 text-[#00C853] stroke-[3]" />
          <span>Instant 5-second entry · 100% Free &amp; Private</span>
        </div>

        <p className="text-[11px] font-mono text-center text-black/60 pt-1 leading-relaxed">
          By continuing, you agree to our{" "}
          <Link
            href="/terms"
            target="_blank"
            className="underline font-bold text-black hover:bg-flunked-yellow px-0.5 rounded"
          >
            Terms of Service
          </Link>{" "}
          and acknowledge our{" "}
          <Link
            href="/privacy"
            target="_blank"
            className="underline font-bold text-black hover:bg-flunked-yellow px-0.5 rounded"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </div>
  );
}
