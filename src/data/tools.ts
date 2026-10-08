export type ToolCategory = "all" | "academics" | "placement" | "fun" | "daily";

export interface ToolItem {
  id: string;
  slug: string;
  name: string;
  category: ToolCategory;
  categoryLabel: string;
  description: string;
  tagline: string;
  isPopular?: boolean;
  accentColor?: string;
}

export const CATEGORIES: { id: ToolCategory; label: string; icon: string }[] = [
  { id: "all", label: "All Tools", icon: "sparkles" },
  { id: "academics", label: "Academics", icon: "book-open" },
  { id: "placement", label: "Placement", icon: "trending-up" },
  { id: "fun", label: "Fun & Chaos", icon: "flame" },
  { id: "daily", label: "Daily Life", icon: "home" },
];

export const TOOLS: ToolItem[] = [
  {
    id: "bunk-calculator",
    slug: "bunk-calculator",
    name: "Bunk Calculator",
    category: "academics",
    categoryLabel: "Academics",
    description: "Know exactly how many classes you can skip without falling below the 75% cutoff.",
    tagline: "How many classes can I skip without getting debarred?",
    isPopular: true,
    accentColor: "cyan",
  },
  {
    id: "cgpa-calculator",
    slug: "cgpa-calculator",
    name: "CGPA Calculator",
    category: "academics",
    categoryLabel: "Academics",
    description:
      "Enter grades per subject. Calculate weighted CGPA, percentage, and placement eligibility.",
    tagline: "Enter grades per subject, get CGPA + percentage equivalent",
    isPopular: true,
    accentColor: "amber",
  },
  {
    id: "semester-survival",
    slug: "semester-survival",
    name: "Semester Survival Check",
    category: "academics",
    categoryLabel: "Academics",
    description:
      "Can I still pass this semester? Enter internal scores to calculate required end-sem target.",
    tagline: "Enter internal marks to find your required end-sem exam score",
    accentColor: "violet",
  },
  {
    id: "backlog-planner",
    slug: "backlog-planner",
    name: "Backlog Planner",
    category: "academics",
    categoryLabel: "Academics",
    description:
      "Multi-semester supplementary clearance roadmap without breaching university year-back rules.",
    tagline: "Build a safe exam plan without breaching university rules",
    accentColor: "orange",
  },
  {
    id: "ctc-calculator",
    slug: "ctc-calculator",
    name: "CTC → In-Hand Calculator",
    category: "placement",
    categoryLabel: "Placement",
    description:
      "What that campus offer letter actually deposits into your bank account after tax, EPF & PT.",
    tagline: "Paste CTC, get real monthly in-hand after tax + PF",
    isPopular: true,
    accentColor: "emerald",
  },
  {
    id: "placement-quiz",
    slug: "placement-quiz",
    name: "Placement Readiness Quiz",
    category: "placement",
    categoryLabel: "Placement",
    description:
      "10-question randomized placement evaluation across DSA, projects, and interviews, with immediate triage steps.",
    tagline: "10 rapid randomized questions to benchmark Day 1 placement readiness",
    accentColor: "indigo",
  },
  {
    id: "attend-or-skip",
    slug: "attend-or-skip",
    name: "Should I Attend This Lecture?",
    category: "fun",
    categoryLabel: "Fun",
    description:
      "Attendance percentage, proxy availability, and teacher strictness combined into one clear verdict.",
    tagline: "Objective guidance on whether to sleep or show up",
    isPopular: true,
    accentColor: "yellow",
  },
  {
    id: "am-i-cooked",
    slug: "am-i-cooked",
    name: "Am I Cooked This Semester?",
    category: "fun",
    categoryLabel: "Fun",
    description:
      "An honest, data-backed assessment of your academic situation right now. No sugarcoating.",
    tagline: "Honest diagnostic on your academic situation",
    isPopular: true,
    accentColor: "rose",
  },
  {
    id: "expense-splitter",
    slug: "expense-splitter",
    name: "Hostel Expense Splitter",
    category: "daily",
    categoryLabel: "Daily Life",
    description:
      "Log room expenses and settle debts in minimal UPI transactions without the awkward group chat text.",
    tagline: "Who paid what. Who owes who. Clean UPI settlements.",
    accentColor: "teal",
  },
  {
    id: "assignment-panic",
    slug: "assignment-panic",
    name: "Assignment Panic Calculator",
    category: "daily",
    categoryLabel: "Daily Life",
    description:
      "Deadline + hours left + pages required: compute your completion feasibility and panic index.",
    tagline: "Find out if you should write, pull an all-nighter, or beg the CR",
    accentColor: "fuchsia",
  },
  {
    id: "grade-to-pass",
    slug: "grade-to-pass",
    name: "Grade Required to Pass",
    category: "academics",
    categoryLabel: "Academics",
    description:
      "Enter current score + weightage breakdown to calculate the minimum finals score needed to pass.",
    tagline: "What do you actually need in finals to not fail? Let's find out.",
    isPopular: true,
    accentColor: "cyan",
  },
  {
    id: "stipend-checker",
    slug: "stipend-checker",
    name: "Is This Stipend Good?",
    category: "placement",
    categoryLabel: "Placement",
    description: "Stipend amount + city cost of living breakdown. Real economic data, not vibes.",
    tagline: "That number in the offer email — what does it actually mean in that city?",
    isPopular: true,
    accentColor: "emerald",
  },
  {
    id: "linkedin-auditor",
    slug: "linkedin-auditor",
    name: "LinkedIn Bio Auditor",
    category: "placement",
    categoryLabel: "Placement",
    description:
      "Paste your LinkedIn About section. Get a score out of 10 plus specific, actionable fixes.",
    tagline: "We'll tell you what's wrong with your bio before recruiters do.",
    accentColor: "indigo",
  },
  {
    id: "mess-calories",
    slug: "mess-calories",
    name: "Mess Food Calorie Estimator",
    category: "daily",
    categoryLabel: "Daily Life",
    description: "Pick dishes from common Indian mess menus and get a rough daily calorie total.",
    tagline: "Emphasis on rough. Mess food hits different.",
    accentColor: "amber",
  },
  {
    id: "sleep-debt",
    slug: "sleep-debt",
    name: "Sleep Debt Calculator",
    category: "daily",
    categoryLabel: "Daily Life",
    description:
      "Enter your sleep hours for this week to calculate accumulated debt and recovery nights.",
    tagline: "How much sleep have you stolen from yourself this week?",
    accentColor: "violet",
  },
  {
    id: "tier-engineer",
    slug: "tier-engineer",
    name: "What Tier Engineer Are You?",
    category: "fun",
    categoryLabel: "Fun",
    description: "Answer honestly. Get ranked S to F tier with shareable credentials.",
    tagline: "S to F tier with zero sugarcoating. Where do you stand?",
    isPopular: true,
    accentColor: "yellow",
  },
  {
    id: "startup-match",
    slug: "startup-match",
    name: "Which Startup Should You Build?",
    category: "fun",
    categoryLabel: "Fun",
    description:
      "Branch + CGPA + chaos tolerance mapped to a personalized college startup concept.",
    tagline: "Tailored startup ideas based on your branch, skills, and caffeine levels.",
    accentColor: "orange",
  },
  {
    id: "how-indian-are-you",
    slug: "how-indian-are-you",
    name: "How Indian College Student Are You?",
    category: "fun",
    categoryLabel: "Fun",
    description:
      "8-question cultural diagnostic to calculate your true Indian college student percentage.",
    tagline: "Proxies, 1-day exam grinds, and Maggi dinners: benchmark your student DNA.",
    isPopular: true,
    accentColor: "rose",
  },
  {
    id: "cgpa-marriage",
    slug: "cgpa-marriage",
    name: "CGPA → Marriage Prospects",
    category: "fun",
    categoryLabel: "Fun",
    description:
      "Pure satire. CGPA + branch + college tier mapped to an arranged marriage readiness score.",
    tagline: "Pure satire. What your relatives secretly calculate behind your back.",
    isPopular: true,
    accentColor: "pink",
  },
];

export function getToolBySlug(slug: string): ToolItem | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getRelatedTools(currentSlug: string, count = 3): ToolItem[] {
  const current = getToolBySlug(currentSlug);
  const others = TOOLS.filter((t) => t.slug !== currentSlug);
  if (!current) return others.slice(0, count);

  const sameCategory = others.filter((t) => t.category === current.category);
  const diffCategory = others.filter((t) => t.category !== current.category);
  return [...sameCategory, ...diffCategory].slice(0, count);
}
