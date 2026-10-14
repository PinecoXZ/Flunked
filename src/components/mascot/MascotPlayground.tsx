"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ProxyMascot,
  type MascotMood,
  type MascotAction,
  type MascotSize,
  type BubblePlacement,
  MASCOT_MOODS,
} from "@/components/mascot/ProxyMascot";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
  ArrowLeft,
  Sparkles,
  RotateCcw,
  Copy,
  Check,
  Volume2,
  Code2,
  Smile,
  Zap,
} from "lucide-react";

interface ActionPreset {
  id: MascotAction;
  label: string;
  emoji: string;
  tagline: string;
  defaultMood: MascotMood;
}

const ACTION_PRESETS: ActionPreset[] = [
  {
    id: "waddle",
    label: "Campus Waddle",
    emoji: "🚶",
    tagline: "The effortless Friday 8 AM lecture bunk strut",
    defaultMood: "chill",
  },
  {
    id: "celebrate",
    label: "Victory Dance",
    emoji: "🎉",
    tagline: "Hit exactly 75.1% attendance and cleared end-sems",
    defaultMood: "smug",
  },
  {
    id: "snooze",
    label: "8 AM Snooze",
    emoji: "😴",
    tagline: "Sleeping peacefully in the 4th row while attendance runs",
    defaultMood: "chill",
  },
  {
    id: "wave",
    label: "High-Five Wave",
    emoji: "👋",
    tagline: "Signaling your wingmate from across the lecture hall",
    defaultMood: "chill",
  },
  {
    id: "shades_drop",
    label: "Shades Drop",
    emoji: "🕶️",
    tagline: "Flexing Day 1 placement offer with retro dark shades",
    defaultMood: "smug",
  },
  {
    id: "hop",
    label: "Squash & Hop",
    emoji: "🦘",
    tagline: "Physics-based kinetic bounce on passing viva",
    defaultMood: "smug",
  },
];

const PRESET_QUIPS = [
  "75.1% attendance. Mathematically untouchable.",
  "Bunking Friday 8 AM is clinically justified.",
  "Proxy marked in 3 subjects. You owe me cutting chai.",
  "ATTENDANCE ALERT! 74.9% IS CRITICAL DANGER ZONE!",
  "HOD saw me near the canteen. Time to bolt!",
  "12 LPA CTC package, but in-hand is 45k. HR played us.",
  "Cleared backlogs with 1 grace mark. Absolute cinema.",
  "End-sem tomorrow morning. 5 units remaining. We chilling.",
];

export function MascotPlayground() {
  const [mood, setMood] = useState<MascotMood>("chill");
  const [action, setAction] = useState<MascotAction>("waddle");
  const [size, setSize] = useState<MascotSize>("xl");
  const [bubblePlacement, setBubblePlacement] = useState<BubblePlacement>("top");
  const [showSpeech, setShowSpeech] = useState<boolean>(true);
  const [customQuip, setCustomQuip] = useState<string>("Bunking Friday 8 AM is clinically justified.");
  const [copied, setCopied] = useState<boolean>(false);
  const [tapCount, setTapCount] = useState<number>(0);
  const [quackActive, setQuackActive] = useState<boolean>(false);

  const handleActionSelect = (preset: ActionPreset) => {
    setAction(preset.id);
    setMood(preset.defaultMood);
  };

  const handleProxyClick = () => {
    setTapCount((prev) => prev + 1);
    setQuackActive(true);
    setTimeout(() => setQuackActive(false), 900);
  };

  const generatedCode = `<ProxyMascot
  size="${size}"
  mood="${mood}"
  action="${action}"
  showSpeech={${showSpeech}}
  speechText="${customQuip}"
  bubblePlacement="${bubblePlacement}"
  interactive
/>`;

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Breadcrumb & Back Navigation */}
      <div className="flex items-center justify-between flex-wrap gap-3 relative z-20">
        <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Proxy Mascot Lab" }]} />
        <div className="flex items-center gap-2">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white hover:bg-flunked-yellow border-2 border-black text-xs font-mono font-black text-black transition-all shadow-neo-sm hover:shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-black group-hover:-translate-x-0.5 transition-transform stroke-[2.5]" />
            <span>Back to Tools</span>
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b-2 border-black pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-flunked-yellow border-2 border-black text-xs font-mono font-black text-black uppercase tracking-wider shadow-neo-sm">
          <Sparkles className="w-3.5 h-3.5 text-black" />
          <span>Interactive Animation Lab</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight">
          Proxy the Bunk Duck Mascot
        </h1>
        <p className="text-sm sm:text-base text-black/80 font-sans font-medium max-w-2xl leading-relaxed">
          Test and preview real-time kinetic animations for Flunked’s brand companion.
          Click Proxy on the stage to trigger interactive hops and quips, or select an animation below.
        </p>
      </div>

      {/* Interactive Main Stage & Control Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: The Mascot Animation Stage (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative rounded-3xl bg-white border-2 border-black shadow-neo-lg p-8 sm:p-12 overflow-hidden flex flex-col items-center justify-center min-h-[420px] bg-dot-matrix">
            {/* Top Stage Bar */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 border border-black animate-pulse" />
                <span className="font-mono text-xs font-black uppercase text-black">
                  Stage Live: {action !== "none" ? action : mood}
                </span>
              </div>
              <div className="font-mono text-xs font-bold text-flunked-muted">
                Taps: <span className="font-black text-black">{tapCount}</span>
              </div>
            </div>

            {/* Quack Sound Bubble FX */}
            {quackActive && (
              <div className="absolute top-12 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-flunked-yellow border-2 border-black font-mono font-black text-xs text-black shadow-neo-sm animate-bounce z-40 flex items-center gap-1.5 select-none">
                <Volume2 className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>QUACK! (75.1% SAFE)</span>
              </div>
            )}

            {/* The Live Rendered Mascot */}
            <div className="my-8 flex flex-col items-center justify-center cursor-pointer select-none">
              <ProxyMascot
                size={size}
                mood={mood}
                action={action}
                showSpeech={showSpeech}
                speechText={customQuip}
                bubblePlacement={bubblePlacement}
                interactive
                onClick={handleProxyClick}
              />
            </div>

            {/* Bottom Stage Instructions */}
            <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
              <p className="font-mono text-[11px] font-bold text-black/60">
                💡 Click Proxy to trigger interactive bounce & cycle campus quips
              </p>
            </div>
          </div>

          {/* Quick Animation Preset Buttons */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-mono font-black uppercase text-black flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                Expressive Animation Presets
              </h3>
              <button
                type="button"
                onClick={() => {
                  setAction("none");
                  setMood("chill");
                }}
                className="text-xs font-mono font-bold text-flunked-muted hover:text-black flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {ACTION_PRESETS.map((preset) => {
                const isActive = action === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleActionSelect(preset)}
                    className={`p-3.5 rounded-2xl border-2 border-black text-left transition-all cursor-pointer flex flex-col gap-1 ${
                      isActive
                        ? "bg-flunked-yellow shadow-neo translate-x-[-1px] translate-y-[-1px]"
                        : "bg-white hover:bg-slate-50 shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{preset.emoji}</span>
                      {isActive && (
                        <span className="text-[10px] font-mono font-black px-1.5 py-0.5 rounded bg-black text-white uppercase">
                          Active
                        </span>
                      )}
                    </div>
                    <span className="font-mono font-black text-xs text-black">{preset.label}</span>
                    <span className="text-[11px] font-sans text-black/70 leading-tight">
                      {preset.tagline}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Controller Deck & Code Inspector (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Controls Card */}
          <div className="p-6 rounded-3xl bg-white border-2 border-black shadow-neo space-y-6">
            <h3 className="text-base font-black text-black font-sans flex items-center gap-2 border-b-2 border-black pb-3">
              <Smile className="w-4 h-4" />
              Mascot Appearance & Controls
            </h3>

            {/* Mood Controller */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-black uppercase text-black">
                Emotional State (Mood)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {MASCOT_MOODS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setMood(m);
                      if (action === "none") setAction("none");
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-mono font-black uppercase border-2 border-black transition-all cursor-pointer ${
                      mood === m
                        ? "bg-flunked-yellow shadow-neo-sm text-black"
                        : "bg-white text-black hover:bg-slate-100"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Controller */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-black uppercase text-black">
                Scale Size
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {(["xs", "sm", "md", "lg", "xl"] as MascotSize[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`py-2 rounded-xl text-xs font-mono font-black uppercase border-2 border-black transition-all cursor-pointer text-center ${
                      size === s
                        ? "bg-flunked-yellow shadow-neo-sm text-black"
                        : "bg-white text-black hover:bg-slate-100"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Speech Bubble Settings */}
            <div className="space-y-3 pt-2 border-t-2 border-black/10">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-black uppercase text-black">
                  Speech Bubble
                </label>
                <button
                  type="button"
                  onClick={() => setShowSpeech(!showSpeech)}
                  className={`text-[11px] font-mono font-black px-2.5 py-1 rounded-lg border-2 border-black transition-all cursor-pointer ${
                    showSpeech ? "bg-emerald-300 text-black shadow-neo-sm" : "bg-slate-200 text-black/60"
                  }`}
                >
                  {showSpeech ? "Visible" : "Hidden"}
                </button>
              </div>

              {showSpeech && (
                <>
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-mono text-flunked-muted">Placement:</span>
                    <div className="grid grid-cols-3 gap-2">
                      {(["top", "bottom", "inflow"] as BubblePlacement[]).map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setBubblePlacement(p)}
                          className={`py-1.5 rounded-lg text-xs font-mono font-bold border-2 border-black transition-all cursor-pointer capitalize ${
                            bubblePlacement === p
                              ? "bg-flunked-yellow shadow-neo-sm"
                              : "bg-white hover:bg-slate-100"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-mono text-flunked-muted">Custom Quote Text:</span>
                    <input
                      type="text"
                      value={customQuip}
                      onChange={(e) => setCustomQuip(e.target.value)}
                      placeholder="Type custom quip here..."
                      className="w-full px-3 py-2 rounded-xl bg-white border-2 border-black text-xs font-mono font-bold text-black focus:outline-none focus:ring-2 focus:ring-flunked-yellow shadow-neo-sm"
                    />
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono uppercase font-black text-black/60">
                      Quick Campus Presets:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {PRESET_QUIPS.slice(0, 4).map((quip, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setCustomQuip(quip)}
                          className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-slate-100 hover:bg-flunked-yellow border border-black transition-colors cursor-pointer text-left truncate max-w-[200px]"
                          title={quip}
                        >
                          &ldquo;{quip.slice(0, 24)}...&rdquo;
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Generated Code Box */}
          <div className="p-6 rounded-3xl bg-white border-2 border-black shadow-neo space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-black uppercase text-black flex items-center gap-1.5">
                <Code2 className="w-4 h-4" />
                React Component Snippet
              </span>
              <button
                type="button"
                onClick={copyCodeToClipboard}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-flunked-yellow hover:bg-amber-300 border-2 border-black font-mono font-black text-xs text-black shadow-neo-sm hover:shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-none transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-4 rounded-2xl bg-zinc-900 border-2 border-black text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed shadow-neo-sm">
              <code>{generatedCode}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Gallery: Proxy Across Campus Situations */}
      <div className="pt-8 border-t-2 border-black space-y-6">
        <div>
          <h2 className="text-2xl font-black text-black tracking-tight">
            Proxy In Real Campus Scenarios
          </h2>
          <p className="text-xs sm:text-sm text-black/70 font-sans font-medium mt-1">
            How Proxy reacts dynamically across attendance crises, placement flexes, and 8 AM lectures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Scenario 1: Attendance Emergency */}
          <div className="p-6 rounded-2xl bg-white border-2 border-black shadow-neo space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black pb-3">
              <span className="text-[10px] font-mono uppercase font-black px-2 py-0.5 rounded bg-red-100 text-red-700 border border-black">
                Attendance Emergency
              </span>
              <span className="font-mono font-bold text-xs text-black">74.9% Bunk</span>
            </div>
            <div className="h-32 flex items-center justify-center bg-[#FFF5F5] rounded-xl border border-black">
              <ProxyMascot size="md" mood="panic" showSpeech={false} />
            </div>
            <p className="text-xs font-mono font-bold text-black leading-snug">
              &ldquo;HOD ne attendance sheet sign kar di! Kal subah 8 AM class mandatory hai.&rdquo;
            </p>
          </div>

          {/* Scenario 2: Placement Day 1 */}
          <div className="p-6 rounded-2xl bg-white border-2 border-black shadow-neo space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black pb-3">
              <span className="text-[10px] font-mono uppercase font-black px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-black">
                Placement Flex
              </span>
              <span className="font-mono font-bold text-xs text-black">Day 1 Offer</span>
            </div>
            <div className="h-32 flex items-center justify-center bg-[#F0FFF4] rounded-xl border border-black">
              <ProxyMascot size="md" mood="smug" action="celebrate" showSpeech={false} />
            </div>
            <p className="text-xs font-mono font-bold text-black leading-snug">
              &ldquo;12 classes bunk margin left and offer letter locked. Absolute cinema.&rdquo;
            </p>
          </div>

          {/* Scenario 3: Canteen Cutting Chai */}
          <div className="p-6 rounded-2xl bg-white border-2 border-black shadow-neo space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black pb-3">
              <span className="text-[10px] font-mono uppercase font-black px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-black">
                Canteen Session
              </span>
              <span className="font-mono font-bold text-xs text-black">Post-Viva</span>
            </div>
            <div className="h-32 flex items-center justify-center bg-[#FFFDF0] rounded-xl border border-black">
              <ProxyMascot size="md" mood="chill" showSpeech={false} />
            </div>
            <p className="text-xs font-mono font-bold text-black leading-snug">
              &ldquo;Chai peelo, end-sem toh pass ho hi jayega. Proxy already marked.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="pt-6 pb-8 flex items-center justify-between flex-wrap gap-4 border-t-2 border-black">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-flunked-yellow hover:bg-amber-300 border-2 border-black text-black font-black text-xs font-mono shadow-neo hover:shadow-neo-lg hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-none transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-black stroke-[2.5]" />
          <span>Back to All 19 Campus Tools</span>
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-flunked-muted hover:text-black underline underline-offset-4"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
