"use client";

import { useState } from "react";
import { ShareButton } from "@/components/ui/ShareButton";
import { HeartHandshake, AlertCircle } from "lucide-react";

export function CgpaMarriage() {
  const [cgpa, setCgpa] = useState<number>(8.2);
  const [branch, setBranch] = useState<string>("CSE/IT");
  const [collegeTier, setCollegeTier] = useState<string>("NIT / BITS");
  const [jobStatus, setJobStatus] = useState<string>("MNC Offer (8–18 LPA)");

  // Satirical Market Calculation
  let score = Math.round(cgpa * 6); // 30 - 60 base

  // Branch multipliers
  if (branch === "CSE/IT") score += 18;
  else if (branch === "ECE/EEE") score += 12;
  else if (branch === "Mechanical") score += 6;
  else score += 4;

  // College Tier multiplier
  if (collegeTier === "IIT") score += 20;
  else if (collegeTier === "NIT / BITS") score += 15;
  else if (collegeTier === "Private Tier-1 (VIT/SRM/Manipal)") score += 10;
  else score += 5;

  // Job Status multiplier
  if (jobStatus === "Tier-1 Product / 20+ LPA") score += 22;
  else if (jobStatus === "MNC Offer (8–18 LPA)") score += 15;
  else if (jobStatus === "Early Stage Startup") score += 6;
  else score -= 8;

  // Clamp 15 to 99
  const finalScore = Math.max(15, Math.min(99, score));

  // Verdict according to PRD
  let verdict = "";
  let badgeColor = "";

  if (finalScore >= 90) {
    verdict = "IIT/NIT CS with a package. You'll have a queue at the door. Godspeed.";
    badgeColor = "bg-flunked-yellow text-black";
  } else if (finalScore >= 70) {
    verdict =
      "Decent prospects. Aunties will ask about the in-hand package before your name, though.";
    badgeColor = "bg-emerald-400 text-black";
  } else if (finalScore >= 50) {
    verdict =
      "Your biodata needs work. Consider preparing for UPSC/government exams for immediate optical boost.";
    badgeColor = "bg-amber-400 text-black";
  } else {
    verdict =
      "Beta, focus on yourself first. Clear the backlogs; the arranged marriage market will wait.";
    badgeColor = "bg-rose-500 text-white";
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Satire Warning Banner */}
      <div className="p-4 rounded-2xl bg-flunked-yellow border-2 border-black shadow-neo flex items-start gap-3 text-black">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-mono font-black text-xs uppercase block">
            Statutory Satire Protocol:
          </span>
          <p className="text-xs font-sans font-bold leading-relaxed">
            This tool is 100% satire. Marriage prospects depend on character, mutual respect, and
            emotional maturity. CGPA is definitely not one of them. (Try explaining that to nosy
            relatives, though.)
          </p>
        </div>
      </div>

      {/* Input Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-black shadow-neo space-y-5">
        <div className="border-b-2 border-black pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-black shadow-neo-sm">
              <HeartHandshake className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-xl font-black text-black">CGPA → Arranged Marriage Prospects</h2>
              <p className="text-xs text-flunked-muted font-bold font-sans">
                Purely satirical. What your relatives secretly calculate behind your back.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-black uppercase bg-flunked-yellow px-2 py-0.5 rounded border border-black text-black shadow-neo-sm">
            Rishta Index
          </span>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          {/* CGPA */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-black uppercase text-black">
                1. Your Cumulative CGPA
              </label>
              <span className="text-xs font-mono font-black text-black">
                {cgpa.toFixed(2)} CGPA
              </span>
            </div>
            <input
              type="range"
              min="5.0"
              max="10.0"
              step="0.05"
              value={cgpa}
              onChange={(e) => setCgpa(parseFloat(e.target.value))}
              className="w-full accent-black cursor-pointer"
            />
          </div>

          {/* Branch */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-black uppercase text-black">
              2. Branch / Specialization
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {["CSE/IT", "ECE/EEE", "Mechanical", "Civil", "Biotech", "Other"].map((b) => (
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
              ))}
            </div>
          </div>

          {/* College Tier */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-black uppercase text-black">
              3. College Brand Pedigree
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                "IIT",
                "NIT / BITS",
                "Private Tier-1 (VIT/SRM/Manipal)",
                "State University / Other College",
              ].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setCollegeTier(t)}
                  className={`p-2.5 text-left rounded-xl border-2 border-black text-xs font-mono font-bold transition-all shadow-neo-sm cursor-pointer ${
                    collegeTier === t
                      ? "bg-flunked-yellow text-black font-black"
                      : "bg-white text-black hover:bg-flunked-bgSubtle"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Job Status */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-black uppercase text-black">
              4. Placement Status in Hand
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                "Tier-1 Product / 20+ LPA",
                "MNC Offer (8–18 LPA)",
                "Early Stage Startup",
                "No Job in Hand / 'Preparing'",
              ].map((j) => (
                <button
                  key={j}
                  type="button"
                  onClick={() => setJobStatus(j)}
                  className={`p-2.5 text-left rounded-xl border-2 border-black text-xs font-mono font-bold transition-all shadow-neo-sm cursor-pointer ${
                    jobStatus === j
                      ? "bg-flunked-yellow text-black font-black"
                      : "bg-white text-black hover:bg-flunked-bgSubtle"
                  }`}
                >
                  {j}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Result Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-black shadow-neo-xl text-center space-y-5">
        <div className="flex items-center justify-center gap-2">
          <span
            className={`text-xs font-mono font-black px-3 py-1 rounded border-2 border-black uppercase shadow-neo-sm ${badgeColor}`}
          >
            Arranged Marriage Index
          </span>
        </div>

        <div>
          <div className="text-6xl sm:text-7xl font-black text-black font-mono tracking-tight">
            {finalScore}
            <span className="text-3xl text-flunked-muted">/100</span>
          </div>
          <span className="text-xs font-mono font-black uppercase text-flunked-muted tracking-wider block mt-1">
            Rishta Market Score
          </span>
        </div>

        <p className="text-sm font-sans font-bold text-black max-w-md mx-auto leading-relaxed">
          &quot;{verdict}&quot;
        </p>

        {/* Satirical Biodata Breakdown */}
        <div className="mt-4 pt-4 border-t-2 border-black/10 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono font-bold text-black">
          <div className="p-2.5 rounded-lg bg-flunked-bg border border-black/20">
            <span className="block text-[10px] text-flunked-muted">Auntie Rating</span>
            <span className="text-sm font-black">
              {finalScore >= 75 ? "⭐⭐⭐⭐⭐" : finalScore >= 50 ? "⭐⭐⭐" : "⭐"}
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-flunked-bg border border-black/20">
            <span className="block text-[10px] text-flunked-muted">Branch Clout</span>
            <span className="text-sm font-black">{branch === "CSE/IT" ? "Maximum" : "Mid"}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-flunked-bg border border-black/20">
            <span className="block text-[10px] text-flunked-muted">Govt Job Need</span>
            <span className="text-sm font-black">{finalScore < 60 ? "High 🚨" : "Low"}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-flunked-bg border border-black/20">
            <span className="block text-[10px] text-flunked-muted">Queue Length</span>
            <span className="text-sm font-black">{finalScore >= 80 ? "Around block" : "TBD"}</span>
          </div>
        </div>

        <div className="pt-2">
          <ShareButton
            title="Send to Relatives"
            shareText={`My CGPA Arranged Marriage Prospect score is ${finalScore}/100 on flunked.fun! Verdict: "${verdict}"`}
            className="w-full sm:w-auto"
          />
        </div>
      </div>
    </div>
  );
}
