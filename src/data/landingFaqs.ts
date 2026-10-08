export interface LandingFaqItem {
  question: string;
  answer: string;
  category: "basics" | "academics" | "placement" | "privacy";
}

export const LANDING_FAQS: LandingFaqItem[] = [
  {
    question: "Is Flunked.online really 100% free with zero ads?",
    answer:
      "Yes, 100% free forever. No banner ads, no video popups, no paid subscriptions, and no paywalls. We built Flunked because typical education portals are bloated with spam, paid courses, and recruiter trackers. Every single calculator—from the 75% attendance engine to the CTC salary breakdown—is freely accessible to every student.",
    category: "basics",
  },
  {
    question: "How does the 75% Attendance & Bunk Calculator work?",
    answer:
      "The algorithm models official UGC, AICTE, and Indian university attendance regulations. By inputting your classes held and attended, it determines the exact number of consecutive lectures you can safely bunk while staying at or above 75%. If you are currently in the detention zone, it calculates the exact streak of classes you must attend back-to-back to recover, including the 65% medical discretion band.",
    category: "academics",
  },
  {
    question: "How accurate is the CTC to In-Hand Salary Calculator?",
    answer:
      "Unlike generic calculators that simply divide annual CTC by 12, our algorithm models real Indian corporate offer structures. It factors in Employer EPF (12% of basic), Employee EPF (12%), Gratuity (4.81%), Professional Tax (₹2,400/year), the ₹75,000 standard deduction, and the New Tax Regime (FY 2024–26) slabs with Section 87A rebate. It strips out paper bonuses and ESOPs to reveal what actually hits your bank account each month.",
    category: "placement",
  },
  {
    question: "Does Flunked support my specific university's CGPA formula?",
    answer:
      "Yes. We support official formula presets for AICTE ((CGPA - 0.75) × 10), Mumbai University (tiered quadratic scale), Anna University, VTU, standard 9.5x (CBSE/State boards), and direct 10x conversions. If your college follows a custom grading policy, you can also enter custom thresholds or suggest your university for inclusion in our official presets.",
    category: "academics",
  },
  {
    question: "Is my academic data or personal details shared with recruiters?",
    answer:
      "Never. All calculations run strictly client-side in your own browser. We do not store, log, or track your internal marks, attendance figures, or salary numbers on our servers. We never collect, sell, or share personal student data with recruiters, corporate sponsors, or advertisers.",
    category: "privacy",
  },
  {
    question: "What is the Campus Hub and how do I sign in?",
    answer:
      "The Campus Hub is your student cockpit giving you instant access to all 19+ calculators, university presets, recent calculation logs, and campus tools. You can get started within seconds simply by choosing an alias and selecting your campus—zero passwords or sensitive credentials required.",
    category: "basics",
  },
  {
    question: "Can I suggest a new calculator or report an updated university rule?",
    answer:
      "Absolutely! We build tools based on real student requests. Head to our Suggest a Tool page to pitch an idea or notify us if your university recently updated its grading or attendance ordinances. We review submissions weekly and ship updates quickly.",
    category: "basics",
  },
];
