import React from "react";
import {
  Crosshair,
  GraduationCap,
  ShieldAlert,
  CalendarClock,
  IndianRupee,
  Briefcase,
  Compass,
  Flame,
  Receipt,
  AlarmClock,
  Sparkles,
  Target,
  Banknote,
  FileSearch,
  Utensils,
  Moon,
  Terminal,
  Rocket,
  Coffee,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolIconStyle {
  icon: LucideIcon;
  bg: string;
}

const TOOL_ICON_MAP: Record<string, ToolIconStyle> = {
  "bunk-calculator": {
    icon: Crosshair,
    bg: "bg-flunked-yellow",
  },
  "cgpa-calculator": {
    icon: GraduationCap,
    bg: "bg-flunked-purple",
  },
  "semester-survival": {
    icon: ShieldAlert,
    bg: "bg-flunked-yellow",
  },
  "backlog-planner": {
    icon: CalendarClock,
    bg: "bg-flunked-purple",
  },
  "ctc-calculator": {
    icon: IndianRupee,
    bg: "bg-flunked-cyan",
  },
  "placement-quiz": {
    icon: Briefcase,
    bg: "bg-flunked-cyan",
  },
  "attend-or-skip": {
    icon: Compass,
    bg: "bg-flunked-yellow",
  },
  "am-i-cooked": {
    icon: Flame,
    bg: "bg-flunked-pink",
  },
  "expense-splitter": {
    icon: Receipt,
    bg: "bg-flunked-mint",
  },
  "assignment-panic": {
    icon: AlarmClock,
    bg: "bg-flunked-purple",
  },
  "grade-to-pass": {
    icon: Target,
    bg: "bg-flunked-purple",
  },
  "stipend-checker": {
    icon: Banknote,
    bg: "bg-flunked-cyan",
  },
  "linkedin-auditor": {
    icon: FileSearch,
    bg: "bg-flunked-cyan",
  },
  "mess-calories": {
    icon: Utensils,
    bg: "bg-flunked-pink",
  },
  "sleep-debt": {
    icon: Moon,
    bg: "bg-flunked-pink",
  },
  "tier-engineer": {
    icon: Terminal,
    bg: "bg-flunked-mint",
  },
  "startup-match": {
    icon: Rocket,
    bg: "bg-flunked-mint",
  },
  "how-indian-are-you": {
    icon: Coffee,
    bg: "bg-flunked-pink",
  },
  "cgpa-marriage": {
    icon: HeartHandshake,
    bg: "bg-flunked-pink",
  },
};

interface ToolIconProps {
  toolSlug: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function ToolIcon({ toolSlug, size = "md", className }: ToolIconProps) {
  const config = TOOL_ICON_MAP[toolSlug] || {
    icon: Sparkles,
    bg: "bg-flunked-yellow",
  };

  const IconComponent = config.icon;

  const sizeClasses = {
    sm: "w-8 h-8 rounded-md p-1.5",
    md: "w-11 h-11 rounded-lg p-2",
    lg: "w-13 h-13 rounded-xl p-3",
    xl: "w-16 h-16 rounded-xl p-3.5",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8",
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center border-2 border-black text-black shadow-neo-sm transition-all duration-150 group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] group-hover:shadow-neo",
        config.bg,
        sizeClasses[size],
        className
      )}
    >
      <IconComponent
        className={cn(
          "stroke-[2.25] transition-transform duration-150 group-hover:scale-105",
          iconSizes[size]
        )}
      />
    </div>
  );
}
