export interface ToolFaq {
  question: string;
  answer: string;
}

const TOOL_FAQS: Record<string, ToolFaq[]> = {
  "bunk-calculator": [
    {
      question: "How many classes can I bunk and still keep 75% attendance?",
      answer:
        "To maintain 75% attendance, your total attended classes divided by total classes held must remain at or above 0.75. For example, if 40 classes are held, you must attend at least 30. If you have attended 35 out of 40, you can safely bunk 6 consecutive upcoming classes before dropping to 75%.",
    },
    {
      question: "What happens if my college attendance falls below 75%?",
      answer:
        "Under UGC and university statutory ordinances across India (including VTU, Anna University, and State Universities), students falling below 75% face exam debarment. Some universities allow medical condonation down to 65% with official hospital documentation and penalty fees.",
    },
    {
      question: "Does BITS Pilani have a 75% attendance rule?",
      answer:
        "No, BITS Pilani (Pilani, Goa, and Hyderabad campuses) famously has a 0% mandatory attendance policy for lectures. However, certain lab sessions, tutorial tests, and surprise in-class quizzes require physical presence for grades.",
    },
    {
      question: "How do I calculate how many classes I need to attend to recover 75%?",
      answer:
        "If you are below 75%, use the formula: Required Classes = (0.75 × Total Held − Attended) / (1 − 0.75). That means for every single class you missed beyond the limit, you generally need to attend 3 consecutive classes without missing any.",
    },
  ],
  "cgpa-calculator": [
    {
      question: "How do I convert 10-point CGPA to percentage?",
      answer:
        "It depends on your university. Under the AICTE official gazette, the formula is (CGPA − 0.75) × 10. For CBSE and older state universities, CGPA × 9.5 is standard. Anna University, WBUT, and IITs commonly use direct CGPA × 10, whereas Mumbai University uses 7.1 × CGPA + 12 (for CGPA ≥ 7.0).",
    },
    {
      question: "What is a safe CGPA for campus placements in India?",
      answer:
        "A CGPA of 7.5+ clears over 85% of initial campus recruitment shortlists. A CGPA of 8.0+ opens virtually all Day-1 product, fintech, and consulting firms. Mass recruiters (TCS, Infosys, Wipro, Cognizant) typically set their cutoff at 6.0 or 6.5 CGPA with zero active backlogs.",
    },
    {
      question: "What is the difference between SGPA and CGPA?",
      answer:
        "SGPA (Semester Grade Point Average) measures your academic performance in a single semester weighted by subject credits. CGPA (Cumulative Grade Point Average) is the credit-weighted average of all your SGPAs across all semesters completed so far.",
    },
  ],
  "ctc-calculator": [
    {
      question: "Why is in-hand salary so much lower than campus CTC?",
      answer:
        "CTC (Cost to Company) includes non-cash and statutory employer expenses such as Employer Provident Fund (12%), Gratuity (4.81%), multi-year vesting ESOPs, and retention bonuses that are only paid out after completing 12-24 months. Only basic salary and taxable cash allowances reach your bank account.",
    },
    {
      question: "How much is in-hand monthly salary for a 12 LPA CTC in India?",
      answer:
        "For a standard 12 LPA CTC package with ₹1L joining bonus and ₹1L stock/gratuity components, the actual monthly take-home under the New Tax Regime is approximately ₹78,000 to ₹82,000 per month after deducting income tax, Employee PF (₹4,000 - ₹5,000), and Professional Tax (₹200).",
    },
    {
      question: "Is the New Tax Regime better for fresh college graduates?",
      answer:
        "Yes, for almost all fresh engineering and college graduates earning up to ₹10-15 LPA, the New Tax Regime offers lower slab rates, zero documentation hassle, and a standard deduction of ₹75,000, which usually yields higher in-hand cash than claiming 80C exemptions.",
    },
  ],
  "am-i-cooked": [
    {
      question: "What does 'Am I Cooked' measure?",
      answer:
        "The diagnostic aggregates your current attendance percentage, internal examination scores, remaining semester weeks, and backlog assignment count to mathematically benchmark your probability of debarment or semester failure.",
    },
    {
      question: "How do I avoid getting debarred with 2 weeks left?",
      answer:
        "Prioritize meeting the course instructor or HOD immediately before attendance records lock to submit assignment compensations, produce medical slips for genuine absences, and secure full attendance in all remaining revision classes.",
    },
  ],
  "semester-survival": [
    {
      question: "How many marks do I need in end-sem to pass?",
      answer:
        "Most universities require a minimum aggregate of 40% to 50% combined across internals and end-semesters, plus an independent cutoff (usually 35% to 40%) in the end-sem written paper alone. Enter your internal marks to compute the exact deficit.",
    },
  ],
  "backlog-planner": [
    {
      question: "How do year-back and credit rules work?",
      answer:
        "Most autonomous colleges and state universities (like VTU and AKTU) stipulate that you cannot enter the 3rd year (5th semester) if you have more than 4 backlogs from the 1st year. The backlog planner schedules which subjects to prioritize clearing first.",
    },
  ],
};

export function getToolFaqs(slug: string): ToolFaq[] {
  return (
    TOOL_FAQS[slug] || [
      {
        question: `How does the ${slug.replace(/-/g, " ")} work?`,
        answer:
          "All formulas are calculated client-side according to standard Indian university regulations and UGC academic guidelines. Your personal numbers never leave your browser.",
      },
      {
        question: "Is this tool free to use for students?",
        answer:
          "Yes. Flunked is 100% free, requires no paid subscription, and contains zero intrusive corporate advertisements.",
      },
    ]
  );
}
