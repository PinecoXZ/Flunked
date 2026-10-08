"use client";

import { useState } from "react";
import { ShareButton } from "@/components/ui/ShareButton";
import { Rocket, Lightbulb } from "lucide-react";

interface StartupArchetype {
  type: string;
  idea: string;
  tagline: string;
  whyFits: string;
  firstStep: string;
  badgeColor: string;
}

export function StartupMatch() {
  const [branch, setBranch] = useState<string>("CSE/IT");
  const [cgpa, setCgpa] = useState<string>("7.5 – 8.5");
  const [uncertainty, setUncertainty] = useState<string>("YOLO chaos pilot");
  const [skill, setSkill] = useState<string>("Fast coder");

  // Dynamic Matching Logic
  const getStartupRecommendation = (): StartupArchetype => {
    if (branch === "CSE/IT" && skill === "Fast coder") {
      return {
        type: "Micro-SaaS / Dev Tool",
        tagline: "High margin, automated cashflow, zero human support.",
        idea: "An automated GitHub Action that auto-formats student assignment PDFs to bypass professor plagiarism checkers.",
        whyFits:
          "You code fast, understand developer friction, and don't want to talk to enterprise sales reps.",
        firstStep:
          "Ship a CLI or single Next.js page this weekend and drop it into your college Reddit/Discord.",
        badgeColor: "bg-flunked-yellow text-black",
      };
    }

    if (skill === "Smooth talker / sales") {
      return {
        type: "B2B Campus Agency / Marketplace",
        tagline: "Connect talent with off-campus cash.",
        idea: "A stealth boutique placement agency connecting tier-2 college open-source contributors with YC startups in Bangalore.",
        whyFits:
          "You know how to talk your way into founder DMs and connect hungry students with real tech jobs.",
        firstStep:
          "DM 10 YC founders on X offering them 2 pre-vetted student React interns for zero upfront fee.",
        badgeColor: "bg-emerald-400 text-black",
      };
    }

    if (branch === "ECE/EEE" || branch === "Mechanical") {
      return {
        type: "Hardware-IoT / DeepTech Micro-Play",
        tagline: "Physical tech that software nerds are too scared to build.",
        idea: "Affordable smart energy sub-metering plugs for hostel rooms and student PGs to detect landlord electricity bill fraud.",
        whyFits:
          "You understand circuits, microcontrollers, and the real physical problems Indian students face daily.",
        firstStep: "Prototype with an ESP32 board and post a 30-second teardown video on LinkedIn.",
        badgeColor: "bg-blue-400 text-black",
      };
    }

    if (cgpa === "< 6.5" || uncertainty === "YOLO chaos pilot") {
      return {
        type: "Viral Consumer / Media App",
        tagline: "Pure chaos, maximum virality, monetization later.",
        idea: "An anonymous roast platform for campus professors and placement cell announcements with AI-generated responses.",
        whyFits:
          "You have zero corporate risk aversion, understand student outrage, and thrive in academic chaos.",
        firstStep:
          "Create an Instagram/X meme page to build the audience before writing a single line of code.",
        badgeColor: "bg-rose-400 text-black",
      };
    }

    return {
      type: "EdTech Micro-Tool",
      tagline: "Fix the broken university curriculum yourself.",
      idea: "A 10-minute quiz engine that generates customized 1-night cram sheets from your specific professor's past 5-year exam papers.",
      whyFits:
        "You know the exact pain of syllabus panic and how college students actually study 6 hours before exams.",
      firstStep:
        "Collect past exam papers from 3 branches and build a simple Google Drive search tool.",
      badgeColor: "bg-amber-400 text-black",
    };
  };

  const startup = getStartupRecommendation();

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-black shadow-neo space-y-6">
        <div className="border-b-2 border-black pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-black shadow-neo-sm">
              <Rocket className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-xl font-black text-black">Which Startup Should You Build?</h2>
              <p className="text-xs text-flunked-muted font-bold font-sans">
                Based on your branch, energy, and chaos tolerance.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-black uppercase bg-flunked-yellow px-2 py-0.5 rounded border border-black text-black shadow-neo-sm">
            Founder Fit
          </span>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          {/* Branch */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-black uppercase text-black">
              1. Your Engineering / College Branch
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {["CSE/IT", "ECE/EEE", "Mechanical", "Civil/Chem", "Biotech", "Commerce/BBA"].map(
                (b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBranch(b)}
                    className={`p-2 rounded-xl border-2 border-black text-xs font-mono font-bold transition-all shadow-neo-sm cursor-pointer ${
                      branch === b
                        ? "bg-flunked-yellow text-black font-black"
                        : "bg-white text-black hover:bg-flunked-bgSubtle"
                    }`}
                  >
                    {b}
                  </button>
                )
              )}
            </div>
          </div>

          {/* CGPA */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-black uppercase text-black">
              2. Your CGPA Range
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {["> 8.5", "7.5 – 8.5", "6.5 – 7.5", "< 6.5"].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCgpa(c)}
                  className={`p-2 rounded-xl border-2 border-black text-xs font-mono font-bold transition-all shadow-neo-sm cursor-pointer ${
                    cgpa === c
                      ? "bg-flunked-yellow text-black font-black"
                      : "bg-white text-black hover:bg-flunked-bgSubtle"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Uncertainty */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-black uppercase text-black">
              3. How do you handle uncertainty & pressure?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                "Methodical planner",
                "YOLO chaos pilot",
                "Need 4 cups of coffee first",
                "Panic for 2 hours then deliver",
              ].map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setUncertainty(u)}
                  className={`p-2.5 text-left rounded-xl border-2 border-black text-xs font-mono font-bold transition-all shadow-neo-sm cursor-pointer ${
                    uncertainty === u
                      ? "bg-flunked-yellow text-black font-black"
                      : "bg-white text-black hover:bg-flunked-bgSubtle"
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          {/* Superpower */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-black uppercase text-black">
              4. What is your primary superpower?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                "Fast coder",
                "Smooth talker / sales",
                "Figma wizard",
                "Notion architect",
                "Academic hustler",
                "Meme creator",
              ].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSkill(s)}
                  className={`p-2 rounded-xl border-2 border-black text-xs font-mono font-bold transition-all shadow-neo-sm cursor-pointer ${
                    skill === s
                      ? "bg-flunked-yellow text-black font-black"
                      : "bg-white text-black hover:bg-flunked-bgSubtle"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Startup Recommendation Result */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-black shadow-neo-lg space-y-5">
        <div className="flex items-center justify-between">
          <span
            className={`text-xs font-mono font-black px-3 py-1 rounded border-2 border-black uppercase shadow-neo-sm ${startup.badgeColor}`}
          >
            {startup.type}
          </span>
          <span className="text-[11px] font-mono text-flunked-muted font-bold">
            Tailored Startup Match
          </span>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-black text-black">&quot;{startup.idea}&quot;</h3>
          <p className="text-xs sm:text-sm font-sans text-flunked-muted font-medium">
            {startup.tagline}
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <div className="p-3.5 rounded-xl bg-flunked-bg border border-black/20 space-y-1 text-xs font-sans">
            <span className="font-mono font-black text-black uppercase block text-[11px]">
              Why this fits you:
            </span>
            <p className="text-black/80 font-medium leading-relaxed">{startup.whyFits}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-flunked-yellow/15 border-2 border-black space-y-1 text-xs font-sans">
            <span className="font-mono font-black text-black uppercase block text-[11px] flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>First 48-Hour Execution Step:</span>
            </span>
            <p className="text-black font-bold leading-relaxed">{startup.firstStep}</p>
          </div>
        </div>

        <div className="pt-2">
          <ShareButton
            title="Share Your Match"
            shareText={`My college startup archetype is "${startup.type}" on flunked.online! Idea: ${startup.idea}`}
            className="w-full sm:w-auto"
          />
        </div>
      </div>
    </div>
  );
}
