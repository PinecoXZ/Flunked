export interface TutorialStep {
  id: number;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  iconKey: "sparkles" | "shield" | "sliders" | "share";
}

export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 1,
    badge: "WELCOME TO FLUNKED",
    title: "Tools Built for College Chaos",
    tagline: "Free. No ads. No corporate fluff.",
    description:
      "Flunked is an anti-corporate suite of 19 hyper-specific calculators designed for Indian college life — from saving your attendance before end-sems to finding out what an in-hand offer actually pays.",
    highlights: [
      "19 dedicated calculators, deciders, and viral diagnostics",
      "Instant university-specific thresholds (75% cutoff, 50/50 splits)",
      "Zero paywalls or intrusive advertisements",
    ],
    iconKey: "sparkles",
  },
  {
    id: 2,
    badge: "ZERO FRICTION ENTRY",
    title: "Instant Campus Access",
    tagline: "No passwords. No waiting for OTPs. Zero spam.",
    description:
      "Just type your name or nickname and your college to immediately unlock all 19 calculators. No sign-up roadblocks, no corporate spam, and no personal data harvesting.",
    highlights: [
      "Auto-suggests VIT, SRM, BITS, IIT, NIT, and 100+ campuses",
      "Instant 5-second entry with campus personalization",
      "Calculations and results stay 100% private in your browser",
    ],
    iconKey: "shield",
  },
  {
    id: 3,
    badge: "INTERACTIVE PRECISION",
    title: "Live Math, Zero Submit Buttons",
    tagline: "Move sliders, pick presets, watch numbers react instantly.",
    description:
      "Every tool updates as you slide or type. Toggle university presets for AKTU, Anna, Mumbai, or Autonomous colleges to instantly know how many marks or skips you have left.",
    highlights: [
      "Live 75% attendance threshold progress bar",
      "New Tax Regime (FY 2024–26) in-hand CTC salary breakdown",
      "Automatic multi-semester backlog recovery roadmaps",
    ],
    iconKey: "sliders",
  },
  {
    id: 4,
    badge: "VIRAL SPREAD",
    title: "Group-Chat Ready Verdicts",
    tagline: "Formatted proof for your hostel WhatsApp groups.",
    description:
      "Whether you're settling hostel debts, finding out who pays for biryani, or sharing an 'Am I Cooked' diagnostic, copy clean verdicts formatted for instant WhatsApp sharing with one tap.",
    highlights: [
      "Minimal-transaction debt splitting algorithms",
      "One-click clipboard copy for WhatsApp group chats",
      "Diagnostic verdicts designed for screenshots",
    ],
    iconKey: "share",
  },
];
