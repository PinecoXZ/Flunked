"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, CheckCircle2, Lightbulb, AlertCircle } from "lucide-react";
import { CATEGORIES, ToolCategory } from "@/data/tools";
import { cn } from "@/lib/utils";
import { useLoading } from "@/context/LoadingContext";

export function SuggestForm() {
  const { showLoading } = useLoading();
  const [idea, setIdea] = useState("");
  const [category, setCategory] = useState<ToolCategory>("academics");
  const [name, setName] = useState("");
  const [campus, setCampus] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim() || !campus.trim()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const loadingPromise = showLoading({
      title: "flunked-suggest.sys // dispatch",
      statusTitle: "Submitting Tool Proposal...",
      badgeText: "[DISPATCH: ACTIVE]",
      state: "weaving",
      steps: [
        "Sanitizing student proposal...",
        "Dispatching idea to developer queue...",
        "Recording campus contribution...",
      ],
      duration: 1100,
    });

    try {
      const [res] = await Promise.all([
        fetch("/api/suggest", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idea: idea.trim(),
            category,
            campus: campus.trim(),
            name: name.trim() || "Anonymous",
            _honeypot: honeypot,
          }),
        }),
        loadingPromise,
      ]);

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Failed to submit suggestion. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setSubmitted(true);
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-flunked-yellow border-2 border-black text-xs font-mono text-black font-black shadow-neo-sm">
          <Lightbulb className="w-3.5 h-3.5 text-black" />
          <span>COMMUNITY ROADMAP</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-black">
          Suggest a tool
        </h1>
        <p className="text-sm text-black/70 font-sans font-medium">
          If it solves a real Indian student struggle, it will be built.
        </p>
      </div>

      {/* Suggestion Form or Success Card */}
      {submitted ? (
        <div className="p-8 sm:p-10 rounded-2xl bg-white border-2 border-black text-center space-y-5 shadow-neo animate-in fade-in zoom-in-95 duration-200">
          <div className="w-14 h-14 mx-auto rounded-xl bg-flunked-yellow border-2 border-black flex items-center justify-center text-black shadow-neo-sm">
            <CheckCircle2 className="w-8 h-8 text-black" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-2xl font-black text-black">Got it.</h2>
            <p className="text-base text-black font-mono font-bold">
              If it&apos;s good, it&apos;ll be live soon.
            </p>
            <p className="text-xs text-black/70 leading-relaxed font-sans font-medium">
              We read every submission. No corporate backlog. No product roadmaps that take 6
              months. If other students face the same issue, we code it.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setSubmitted(false);
                setIdea("");
                setName("");
                setCampus("");
                setHoneypot("");
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-flunked-bg border-2 border-black text-xs font-mono font-black text-black transition-all shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
            >
              Suggest another tool
            </button>
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-flunked-yellow hover:bg-[#FFD000] border-2 border-black text-xs font-mono font-black text-black transition-all shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo-lg active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            >
              Back to Tools Hub
            </Link>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 rounded-2xl bg-white border-2 border-black shadow-neo space-y-6"
        >
          {/* Honeypot field for bot mitigation - hidden from real users */}
          <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
            <label htmlFor="website-field">Leave this empty</label>
            <input
              id="website-field"
              type="text"
              name="_honeypot"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-[#FFF0F0] border-2 border-flunked-danger flex items-center gap-2.5 text-xs font-bold text-flunked-danger">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Idea Textarea */}
          <div className="space-y-2">
            <label
              htmlFor="tool-idea"
              className="block text-xs font-mono uppercase tracking-wider text-black font-black"
            >
              What tool do you need? <span className="text-flunked-danger">*</span>
            </label>
            <textarea
              id="tool-idea"
              required
              rows={4}
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="e.g. A calculator that tells me if I can skip morning labs and still maintain 75%..."
              className="w-full px-4 py-3 rounded-xl bg-flunked-bg border-2 border-black text-black placeholder:text-black/40 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-flunked-yellow transition-all resize-none font-medium"
            />
          </div>

          {/* Category Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-black font-black">
              Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={cn(
                    "px-3 py-2 rounded-xl text-xs font-mono font-bold border-2 border-black transition-all text-center select-none cursor-pointer",
                    category === cat.id
                      ? "bg-flunked-yellow text-black shadow-neo-sm font-black"
                      : "bg-white text-black/70 hover:text-black hover:bg-flunked-bg"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submitter Name & College / University */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Student Name (Optional, defaults to Anonymous) */}
            <div className="space-y-2">
              <label
                htmlFor="student-name"
                className="block text-xs font-mono uppercase tracking-wider text-black font-black"
              >
                Your Name{" "}
                <span className="text-black/40 font-normal font-sans">(optional)</span>
              </label>
              <input
                type="text"
                id="student-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={60}
                placeholder="Anonymous"
                className="w-full px-4 py-3 rounded-xl bg-flunked-bg border-2 border-black text-black placeholder:text-black/40 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-flunked-yellow transition-all font-medium"
              />
            </div>

            {/* Campus / University (Required) */}
            <div className="space-y-2">
              <label
                htmlFor="campus-name"
                className="block text-xs font-mono uppercase tracking-wider text-black font-black"
              >
                Your College / University <span className="text-flunked-danger">*</span>
              </label>
              <input
                type="text"
                id="campus-name"
                required
                value={campus}
                onChange={(e) => setCampus(e.target.value)}
                maxLength={100}
                placeholder="e.g. VIT, IIT Bombay, DU, etc."
                className="w-full px-4 py-3 rounded-xl bg-flunked-bg border-2 border-black text-black placeholder:text-black/40 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-flunked-yellow transition-all font-medium"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || !idea.trim() || !campus.trim()}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-flunked-yellow hover:bg-[#FFD000] disabled:opacity-50 disabled:cursor-not-allowed border-2 border-black font-black text-sm text-black shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo-lg active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer select-none"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                  <span>Submitting to builders...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-black stroke-[2.5]" />
                  <span>Submit Suggestion</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
