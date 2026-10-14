"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export type MascotMood = "chill" | "panic" | "smug" | "thinking";
export type MascotAction =
  | "none"
  | "waddle"
  | "celebrate"
  | "snooze"
  | "wave"
  | "shades_drop"
  | "hop";
export type MascotSize = "xs" | "sm" | "md" | "lg" | "xl";
export type BubblePlacement = "top" | "bottom" | "inflow";

export interface ProxyMascotProps {
  mood?: MascotMood;
  action?: MascotAction;
  size?: MascotSize;
  className?: string;
  speechText?: string;
  customQuip?: string;
  showSpeechBubble?: boolean;
  showSpeech?: boolean;
  bubblePlacement?: BubblePlacement;
  interactive?: boolean;
  onClick?: () => void;
}

export const MASCOT_MOODS: MascotMood[] = ["chill", "panic", "smug", "thinking"];
export const MASCOT_ACTIONS: MascotAction[] = [
  "none",
  "waddle",
  "celebrate",
  "snooze",
  "wave",
  "shades_drop",
  "hop",
];

const DEFAULT_QUIPS: Record<MascotMood, string[]> = {
  chill: [
    "75.1% attendance. Mathematically untouchable.",
    "Bunking Friday 8 AM is clinically justified.",
    "Proxy marked. You owe me cutting chai.",
    "Chai peelo, end-sem toh pass ho hi jayega.",
  ],
  panic: [
    "ATTENDANCE ALERT! 74.9% IS DANGER ZONE!",
    "Bhai debar ho jaayega, kal subah 8 AM class jaa!",
    "HOD ne attendance sheet sign kar di!",
    "Medical certificate banwa jaldi!",
  ],
  smug: [
    "12 classes bunk margin left. We chilling.",
    "Attendance locked. Professor didn't even notice.",
    "Cleared backlogs with grace marks. Absolute cinema.",
    "Highest package in the tier-3 college!",
  ],
  thinking: [
    "Calculating exact bunk-to-grade ratio...",
    "If I miss 3 labs and attend 1 tutorial...",
    "Cross-referencing university ordinance 14(b)...",
    "Running proxy probability matrix...",
  ],
};

const SIZE_MAP: Record<MascotSize, { width: number; height: number; containerClass: string }> = {
  xs: { width: 24, height: 24, containerClass: "w-6 h-6" },
  sm: { width: 36, height: 36, containerClass: "w-9 h-9" },
  md: { width: 64, height: 64, containerClass: "w-16 h-16" },
  lg: { width: 100, height: 100, containerClass: "w-[100px] h-[100px]" },
  xl: { width: 140, height: 140, containerClass: "w-[140px] h-[140px]" },
};

export function ProxyMascot({
  mood = "chill",
  action = "none",
  size = "md",
  className,
  speechText,
  customQuip,
  showSpeechBubble = false,
  showSpeech,
  bubblePlacement = "top",
  interactive = false,
  onClick,
}: ProxyMascotProps) {
  const effectiveShowBubble = showSpeech !== undefined ? showSpeech : showSpeechBubble;
  const effectiveSpeechText = customQuip !== undefined ? customQuip : speechText;

  const [quipIndex, setQuipIndex] = useState(0);
  const [isBouncing, setIsBouncing] = useState(false);
  const [bubbleOpen, setBubbleOpen] = useState(effectiveShowBubble);

  React.useEffect(() => {
    setBubbleOpen(effectiveShowBubble);
  }, [effectiveShowBubble]);

  const rawId = React.useId();
  const clipId = rawId.replace(/[^a-zA-Z0-9]/g, "");
  const leftLensClip = `proxy-left-${clipId}`;
  const rightLensClip = `proxy-right-${clipId}`;

  const quipList = DEFAULT_QUIPS[mood];
  const activeQuip = effectiveSpeechText || quipList[quipIndex % quipList.length];

  const handleClick = () => {
    if (interactive) {
      setIsBouncing(true);
      setBubbleOpen(true);
      setQuipIndex((prev) => (prev + 1) % quipList.length);
      setTimeout(() => setIsBouncing(false), 450);
    }
    if (onClick) onClick();
  };

  const { containerClass } = SIZE_MAP[size];

  const moodAnimationClass = {
    chill: "animate-proxy-chill",
    panic: "animate-proxy-panic",
    smug: "animate-proxy-smug",
    thinking: "animate-proxy-thinking",
  }[mood];

  const actionAnimationClass: Record<MascotAction, string> = {
    none: "",
    waddle: "animate-proxy-waddle",
    celebrate: "animate-proxy-celebrate",
    snooze: "animate-proxy-snooze",
    wave: "",
    shades_drop: "",
    hop: "animate-proxy-hop",
  };

  const characterAnimationClass =
    action !== "none" && actionAnimationClass[action]
      ? actionAnimationClass[action]
      : moodAnimationClass;

  const bubbleNode = bubbleOpen && activeQuip && (
    <div
      className={cn(
        "px-3 py-1.5 bg-white border-2 border-black rounded-xl text-black font-mono font-black text-[11px] shadow-neo-sm text-center leading-tight transition-all duration-200 select-none z-30 max-w-[210px] animate-in fade-in zoom-in-95",
        bubblePlacement === "top" && "absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 min-w-[170px]",
        bubblePlacement === "bottom" && "absolute top-full mt-2.5 left-1/2 -translate-x-1/2 min-w-[170px]",
        bubblePlacement === "inflow" && "mb-2 relative",
        interactive && "cursor-pointer hover:bg-flunked-yellow/30 active:scale-95"
      )}
      onClick={(e) => {
        if (interactive) {
          e.stopPropagation();
          handleClick();
        }
      }}
      title={interactive ? "Click for next campus quote" : undefined}
    >
      <span>{activeQuip}</span>
      {/* Arrow */}
      {bubblePlacement === "top" && (
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-b-2 border-r-2 border-black rotate-45" />
      )}
      {bubblePlacement === "bottom" && (
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-t-2 border-l-2 border-black rotate-45" />
      )}
      {bubblePlacement === "inflow" && (
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-b-2 border-r-2 border-black rotate-45" />
      )}
    </div>
  );

  return (
    <div className={cn("relative inline-flex flex-col items-center select-none", className)}>
      {/* Speech Bubble when placed top or inflow */}
      {(bubblePlacement === "top" || bubblePlacement === "inflow") && bubbleNode}

      {/* Mascot Graphic */}
      <div
        className={cn(
          "relative flex items-center justify-center transition-all duration-200",
          containerClass,
          interactive && "cursor-pointer hover:scale-105 active:scale-95 group",
          isBouncing && "animate-proxy-hop"
        )}
        onClick={handleClick}
        role={interactive ? "button" : "img"}
        tabIndex={interactive ? 0 : undefined}
        onKeyDown={(e) => {
          if (interactive && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            handleClick();
          }
        }}
        aria-label={`Proxy the Bunk Duck Mascot (${mood} mood)`}
        title={interactive ? "Click Proxy for campus survival wisdom!" : undefined}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-sm overflow-visible"
        >
          <defs>
            {/* Sunglasses lens sheen clipping paths */}
            <clipPath id={leftLensClip}>
              <rect x="68" y="46" width="28" height="20" rx="4" />
            </clipPath>
            <clipPath id={rightLensClip}>
              <rect x="104" y="46" width="28" height="20" rx="4" />
            </clipPath>
          </defs>

          {/* Living Floor Shadow (breathes in sync with duck bobbing) */}
          <ellipse
            cx="100"
            cy="184"
            rx="55"
            ry="10"
            fill="#000000"
            className="animate-proxy-shadow"
          />

          {/* Living Duck Character Group (Idle Bobbing / Panic Tremor / Smug Sway / Waddle / Celebrate / Snooze) */}
          <g className={cn("origin-center transition-transform", characterAnimationClass)}>
            {/* Duck Feet */}
            <path
              d="M 72 170 L 60 182 L 80 182 Z"
              fill="#FF8A00"
              stroke="#000000"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <path
              d="M 128 170 L 120 182 L 140 182 Z"
              fill="#FF8A00"
              stroke="#000000"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* Duck Body */}
            <path
              d="M 55 125 C 45 155 70 176 100 176 C 135 176 155 155 150 125 C 145 105 138 98 130 92 C 122 86 112 85 100 85 C 80 85 62 100 55 125 Z"
              fill="#FFE600"
              stroke="#000000"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* Celebration Confetti & Bursting Stars */}
            {action === "celebrate" && (
              <g id="celebrate-burst">
                <path
                  d="M 32 40 L 35 44 L 40 44 L 36 47 L 38 52 L 32 49 L 26 52 L 28 47 L 24 44 L 29 44 Z"
                  fill="#FFE600"
                  stroke="#000000"
                  strokeWidth="1.5"
                  className="animate-proxy-star"
                />
                <path
                  d="M 166 36 L 169 40 L 174 40 L 170 43 L 172 48 L 166 45 L 160 48 L 162 43 L 158 40 L 163 40 Z"
                  fill="#00E599"
                  stroke="#000000"
                  strokeWidth="1.5"
                  className="animate-proxy-star"
                />
                <circle cx="42" cy="75" r="3.5" fill="#FF8A00" stroke="#000000" strokeWidth="1.5" className="animate-ping" />
                <circle cx="158" cy="80" r="3.5" fill="#00E599" stroke="#000000" strokeWidth="1.5" className="animate-ping" />
              </g>
            )}

            {/* 8 AM Class Snooze Floating Zzz */}
            {action === "snooze" && (
              <g id="proxy-zzz">
                <text x="125" y="44" fontFamily="monospace" fontSize="11" fontWeight="900" fill="#000000" className="animate-proxy-zzz-1">z</text>
                <text x="136" y="32" fontFamily="monospace" fontSize="14" fontWeight="900" fill="#000000" className="animate-proxy-zzz-2">Z</text>
                <text x="148" y="18" fontFamily="monospace" fontSize="18" fontWeight="900" fill="#000000" className="animate-proxy-zzz-3">Z</text>
              </g>
            )}

            {/* Wings with Mood-specific Kinetic Animations */}
            {action === "wave" ? (
              <>
                {/* Left wing relaxed */}
                <path
                  d="M 50 120 C 35 130 40 152 64 146"
                  fill="#FFD000"
                  stroke="#000000"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
                {/* Right wing waving high */}
                <path
                  d="M 145 120 C 172 92 184 112 152 135"
                  fill="#FFD000"
                  stroke="#000000"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                  className="animate-proxy-wave"
                />
              </>
            ) : mood === "smug" ? (
              <>
                {/* Left wing on hip */}
                <path
                  d="M 50 120 C 35 130 40 152 64 146"
                  fill="#FFD000"
                  stroke="#000000"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
                {/* Right wing thumbs up with proud swagger */}
                <path
                  d="M 145 120 C 165 110 172 130 155 145"
                  fill="#FFD000"
                  stroke="#000000"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
                <circle cx="166" cy="120" r="6" fill="#FF8A00" stroke="#000000" strokeWidth="2.5" />
              </>
            ) : mood === "panic" ? (
              <>
                {/* Rapid Fluttering Wings in panic */}
                <path
                  d="M 52 110 C 25 95 30 135 55 130"
                  fill="#FFD000"
                  stroke="#000000"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                  className="animate-proxy-wing-left"
                />
                <path
                  d="M 148 110 C 175 95 170 135 145 130"
                  fill="#FFD000"
                  stroke="#000000"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                  className="animate-proxy-wing-right"
                />
              </>
            ) : (
              <>
                {/* Left Wing (holding tea) */}
                <path
                  d="M 52 118 C 38 128 42 152 64 146 C 68 135 60 122 52 118 Z"
                  fill="#FFD000"
                  stroke="#000000"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                {/* Right Wing */}
                <path
                  d="M 148 118 C 162 128 158 152 136 146 C 132 135 140 122 148 118 Z"
                  fill="#FFD000"
                  stroke="#000000"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
              </>
            )}

            {/* Duck Head */}
            <circle cx="100" cy="68" r="42" fill="#FFE600" stroke="#000000" strokeWidth="3.5" />

            {/* Mood specific head features */}
            {mood === "panic" ? (
              <>
                {/* Spiky fear feathers */}
                <path
                  d="M 95 26 L 100 12 L 105 26 L 112 16 L 112 28"
                  fill="#FFE600"
                  stroke="#000000"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                {/* Sweat drop dripping down */}
                <path
                  d="M 140 50 C 145 42 150 48 145 58 C 140 60 135 55 140 50 Z"
                  fill="#00F0FF"
                  stroke="#000000"
                  strokeWidth="2"
                  className="animate-proxy-sweat"
                />
                {/* Wide Panic Eyes */}
                <circle cx="82" cy="56" r="14" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
                <circle cx="82" cy="56" r="4" fill="#000000" />
                <circle cx="118" cy="56" r="14" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
                <circle cx="118" cy="56" r="4" fill="#000000" />
                {/* Fallen black sunglasses on chest */}
                <g transform="translate(0, 42) rotate(12 100 80)">
                  <rect
                    x="72"
                    y="46"
                    width="24"
                    height="16"
                    rx="3"
                    fill="#151515"
                    stroke="#000000"
                    strokeWidth="3"
                  />
                  <rect x="94" y="50" width="12" height="4" fill="#000000" />
                  <rect
                    x="104"
                    y="46"
                    width="24"
                    height="16"
                    rx="3"
                    fill="#151515"
                    stroke="#000000"
                    strokeWidth="3"
                  />
                </g>
              </>
            ) : mood === "thinking" ? (
              <>
                {/* Pencil behind ear */}
                <g transform="translate(34, 18) rotate(35 100 68)">
                  <rect
                    x="120"
                    y="40"
                    width="36"
                    height="8"
                    rx="2"
                    fill="#FF3333"
                    stroke="#000000"
                    strokeWidth="2"
                  />
                  <polygon points="156,40 164,44 156,48" fill="#F4B084" stroke="#000000" strokeWidth="2" />
                  <polygon points="162,43 164,44 162,45" fill="#000000" />
                </g>
                {/* Thoughtful Eyes looking up */}
                <circle cx="82" cy="56" r="11" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
                <circle cx="85" cy="52" r="5" fill="#000000" />
                <circle cx="118" cy="56" r="11" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
                <circle cx="121" cy="52" r="5" fill="#000000" />
                {/* Black sunglasses resting on forehead */}
                <g transform="translate(0, -18)">
                  <rect
                    x="68"
                    y="46"
                    width="28"
                    height="16"
                    rx="4"
                    fill="#151515"
                    stroke="#000000"
                    strokeWidth="3.5"
                  />
                  <rect x="94" y="52" width="12" height="4" fill="#000000" />
                  <rect
                    x="104"
                    y="46"
                    width="28"
                    height="16"
                    rx="4"
                    fill="#151515"
                    stroke="#000000"
                    strokeWidth="3.5"
                  />
                </g>
              </>
            ) : (
              /* Chill & Smug: Jet Black Retro Sunglasses with Animated Sheen */
              <g
                id="black-sunglasses"
                className={action === "shades_drop" ? "animate-proxy-shades-drop origin-center" : undefined}
              >
                <rect
                  x="68"
                  y="46"
                  width="28"
                  height="20"
                  rx="4"
                  fill="#151515"
                  stroke="#000000"
                  strokeWidth="3.5"
                />
                {/* Animated sheen wipe across left lens */}
                <g clipPath={`url(#${leftLensClip})`}>
                  <line
                    x1="62"
                    y1="40"
                    x2="88"
                    y2="72"
                    stroke="#FFFFFF"
                    strokeWidth="8"
                    opacity="0.8"
                    className="animate-proxy-glint"
                  />
                </g>
                <path
                  d="M 72 50 L 76 50 L 72 62"
                  stroke="#FFFFFF"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  opacity="0.9"
                />

                <rect x="94" y="52" width="12" height="4.5" fill="#000000" />

                <rect
                  x="104"
                  y="46"
                  width="28"
                  height="20"
                  rx="4"
                  fill="#151515"
                  stroke="#000000"
                  strokeWidth="3.5"
                />
                {/* Animated sheen wipe across right lens */}
                <g clipPath={`url(#${rightLensClip})`}>
                  <line
                    x1="98"
                    y1="40"
                    x2="124"
                    y2="72"
                    stroke="#FFFFFF"
                    strokeWidth="8"
                    opacity="0.8"
                    className="animate-proxy-glint"
                  />
                </g>
                <path
                  d="M 108 50 L 112 50 L 108 62"
                  stroke="#FFFFFF"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  opacity="0.9"
                />

                <line
                  x1="68"
                  y1="52"
                  x2="56"
                  y2="56"
                  stroke="#000000"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <line
                  x1="132"
                  y1="52"
                  x2="144"
                  y2="56"
                  stroke="#000000"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {mood === "smug" && (
                  /* Animated Spinning & Pulsing Gold Star */
                  <path
                    d="M 126 42 L 130 36 L 134 42 L 140 46 L 134 50 L 130 56 L 126 50 L 120 46 Z"
                    fill="#FFE600"
                    stroke="#000000"
                    strokeWidth="1.8"
                    className="animate-proxy-star"
                  />
                )}
              </g>
            )}

            {/* Duck Beak */}
            <path
              d="M 80 72 C 80 62 120 62 120 72 C 120 84 80 84 80 72 Z"
              fill="#FF8A00"
              stroke="#000000"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {mood === "panic" ? (
              /* Open O beak in panic */
              <ellipse cx="100" cy="74" rx="7" ry="5" fill="#660000" />
            ) : (
              <line
                x1="84"
                y1="73"
                x2="116"
                y2="73"
                stroke="#000000"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            )}

            {/* Cutting Chai Glass with Animated Steam Wisps (when chill) */}
            {mood === "chill" && (
              <g id="chai-glass">
                <path
                  d="M 40 128 L 54 128 L 51 152 L 43 152 Z"
                  fill="#C89D7C"
                  stroke="#000000"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <path d="M 42 133 L 52 133 L 50 150 L 44 150 Z" fill="#9C5B28" />
                <line
                  x1="39"
                  y1="128"
                  x2="55"
                  y2="128"
                  stroke="#000000"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {/* Wafting steam wisp 1 */}
                <path
                  d="M 44 123 Q 46 118 43 114"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  className="animate-proxy-steam-1"
                />
                {/* Wafting steam wisp 2 */}
                <path
                  d="M 49 122 Q 52 117 48 112"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  className="animate-proxy-steam-2"
                />
              </g>
            )}

            {/* Badge on Chest */}
            <rect
              x="82"
              y="122"
              width="36"
              height="18"
              rx="4"
              fill={mood === "panic" ? "#FF3333" : mood === "smug" ? "#00E599" : "#FFFFFF"}
              stroke="#000000"
              strokeWidth="2"
            />
            <text
              x="100"
              y="135"
              fontFamily="monospace"
              fontSize="10"
              fontWeight="900"
              textAnchor="middle"
              fill={mood === "panic" ? "#FFFFFF" : "#000000"}
            >
              {mood === "panic" ? "! 74.9%" : mood === "smug" ? "★ SAFE" : "75%"}
            </text>
          </g>
        </svg>
      </div>

      {/* Speech Bubble when placed at bottom */}
      {bubblePlacement === "bottom" && bubbleNode}
    </div>
  );
}
