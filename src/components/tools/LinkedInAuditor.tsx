"use client";

import { useState } from "react";
import { ResultCard, type ResultStatus } from "@/components/ui/ResultCard";
import { FileSearch, Check } from "lucide-react";

export function LinkedInAuditor() {
  const [bio, setBio] = useState<string>(
    "I am an aspiring software engineer passionate about creating scalable solutions. Seeking opportunities to leverage my hardworking mindset in full-stack development."
  );

  const sampleBios = [
    {
      label: "Cringe Buzzword Bio",
      text: "Passionate and hardworking engineer seeking opportunities. Guru of synergy and perfectionist in Python.",
    },
    {
      label: "Third Person Bio",
      text: "Rahul is a dynamic computer science student who thrives in fast-paced environments and loves solving complex algorithmic challenges.",
    },
    {
      label: "High-Impact Recruiter Bio",
      text: "Final-year CS student @ VIT. Built an open-source campus food delivery app used by 3,400+ students. Core stack: Next.js, Node, PostgreSQL. Incoming intern @ Zepto. DM me or mail at rahul@vit.ac.in.",
    },
  ];

  // Heuristic Auditor
  const trimmed = bio.trim();
  const charCount = trimmed.length;
  const wordCount = trimmed ? trimmed.split(/\s+/).length : 0;
  const lower = trimmed.toLowerCase();

  const buzzwords = [
    "passionate",
    "guru",
    "hardworking",
    "enthusiast",
    "aspiring",
    "seeking opportunities",
    "perfectionist",
    "synergy",
    "dynamic",
    "results-driven",
    "team player",
  ];

  const foundBuzzwords = buzzwords.filter((b) => lower.includes(b));
  const hasNumbers = /\b\d+(\.\d+)?%?k?x?\b/i.test(trimmed);
  const isThirdPerson = /\b(he|she|his|her)\b/i.test(lower) && !/\b(i|my|we|our)\b/i.test(lower);
  const hasEmailOrContact =
    /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/.test(trimmed) ||
    /github\.com|linkedin\.com|reach out|contact me/i.test(lower);
  const hasTechStack =
    /python|javascript|typescript|react|node|java|c\+\+|aws|docker|sql|figma|next\.?js/i.test(
      lower
    );

  // Score Calculation out of 10
  let score = 5;
  const fixes: string[] = [];

  // Length check
  if (charCount < 100) {
    score -= 2;
    fixes.push(
      "Too short. Recruiters skim in 5 seconds—give them at least 2–3 concrete sentences about what you build."
    );
  } else if (charCount > 1200) {
    score -= 1;
    fixes.push("Wall of text. Break it into short 1-line paragraphs and bullet points.");
  } else {
    score += 1;
  }

  // Buzzwords penalty
  if (foundBuzzwords.length > 0) {
    score -= Math.min(3, foundBuzzwords.length);
    fixes.push(
      `Purge generic filler buzzwords: "${foundBuzzwords.join('", "')}". Replace them with tangible proof.`
    );
  } else {
    score += 1;
  }

  // Metrics check
  if (!hasNumbers) {
    score -= 2;
    fixes.push(
      "Zero metrics or quantifiable proof. Add numbers: lines of code, users, latency dropped, projects built, or contest ratings."
    );
  } else {
    score += 2;
  }

  // Third person penalty
  if (isThirdPerson) {
    score -= 2;
    fixes.push(
      "Writing in third-person sounds pretentious on a student profile. Switch to direct first-person ('I build...', 'I study...')."
    );
  }

  // Tech stack check
  if (!hasTechStack) {
    score -= 1;
    fixes.push(
      "No explicit tech stack keywords found. Recruiters search for 'React', 'Python', 'AWS'—name your actual tools."
    );
  } else {
    score += 1;
  }

  // Contact / CTA check
  if (!hasEmailOrContact) {
    fixes.push(
      "Missing clear Call to Action (CTA). Add an email or portfolio link so campus recruiters don't have to guess."
    );
  } else {
    score += 1;
  }

  // Clamp score 1 to 10
  const finalScore = Math.max(1, Math.min(10, score));

  let status: ResultStatus = "safe";
  let headline = "";
  let verdict = "";

  if (finalScore >= 8) {
    status = "safe";
    headline = "Recruiter Magnet";
    verdict = `Solid. Recruiters will actually read this. Score: ${finalScore}/10.`;
  } else if (finalScore >= 5) {
    status = "warning";
    headline = "Forgettable & Generic";
    verdict = `It's there but forgettable. Score: ${finalScore}/10.`;
  } else {
    status = "danger";
    headline = "Resume Summary Vibes";
    verdict = `This reads like a boring 2014 resume objective. Score: ${finalScore}/10.`;
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Input Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-black shadow-neo space-y-5">
        <div className="border-b-2 border-black pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-flunked-yellow border-2 border-black flex items-center justify-center text-black shadow-neo-sm">
              <FileSearch className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-xl font-black text-black">LinkedIn Bio Auditor</h2>
              <p className="text-xs text-flunked-muted font-bold font-sans">
                Paste your LinkedIn About section. We&apos;ll tell you what&apos;s wrong with it.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-black uppercase bg-flunked-yellow px-2 py-0.5 rounded border border-black text-black shadow-neo-sm">
            Bio Teardown
          </span>
        </div>

        {/* Sample Bio Buttons */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-mono font-black uppercase text-flunked-muted block">
            Test with common archetypes:
          </span>
          <div className="flex flex-wrap gap-2">
            {sampleBios.map((sb, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setBio(sb.text)}
                className="px-2.5 py-1 rounded-lg border-2 border-black text-[11px] font-mono font-bold bg-white text-black hover:bg-flunked-yellow hover:text-black shadow-neo-sm transition-all cursor-pointer"
              >
                {sb.label}
              </button>
            ))}
          </div>
        </div>

        {/* Textarea */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-black uppercase text-black">
              Your LinkedIn About Section
            </label>
            <span className="text-xs font-mono font-black text-flunked-muted">
              {charCount} chars · {wordCount} words
            </span>
          </div>
          <textarea
            rows={5}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Paste your LinkedIn About section here..."
            className="w-full p-4 rounded-xl border-2 border-black bg-white font-sans text-sm text-black shadow-neo-sm focus:outline-none leading-relaxed"
          />
        </div>
      </div>

      {/* Audit Result Card */}
      <ResultCard
        headline={headline}
        metric={`${finalScore}/10`}
        metricLabel="Bio Impact Score"
        verdict={verdict}
        status={status}
        shareText={`My LinkedIn About section scored ${finalScore}/10 on flunked.online's Bio Auditor!`}
      >
        <div className="mt-4 pt-4 border-t-2 border-black/10 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono font-black uppercase text-black">What to fix:</h4>
            <span className="text-[10px] font-mono text-flunked-muted">
              {fixes.length === 0 ? "Zero critical flaws detected" : `${fixes.length} fixes needed`}
            </span>
          </div>

          {fixes.length === 0 ? (
            <div className="p-3 rounded-xl bg-[#00C853]/10 border-2 border-[#00C853] text-xs font-mono font-bold text-black flex items-center gap-2">
              <Check className="w-4 h-4 text-[#00C853]" />
              <span>Clean copy! Specific metrics, strong stack, zero filler buzzwords.</span>
            </div>
          ) : (
            <ul className="space-y-2 text-xs font-sans font-medium text-black">
              {fixes.map((fix, idx) => (
                <li
                  key={idx}
                  className="p-2.5 rounded-lg bg-flunked-bg border border-black/20 flex items-start gap-2"
                >
                  <span className="text-xs font-mono font-black text-[#FF3333] shrink-0">
                    #{idx + 1}
                  </span>
                  <span className="leading-snug">{fix}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </ResultCard>
    </div>
  );
}
