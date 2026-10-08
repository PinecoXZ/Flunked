/**
 * Academic Utilities for Flunked.fun
 * Covering CGPA calculations, Semester Survival, Backlog Planner, and Grade to Pass.
 */

export type CgpaFormula = "standard" | "aicte" | "standard95" | "mumbai" | "anna" | "vtu";

export interface CgpaSubject {
  id?: string;
  name: string;
  gradePoint: number;
  credits: number;
}

export const GRADE_OPTIONS = [
  { label: "O (Outstanding)", gradePoint: 10 },
  { label: "A+ (Excellent)", gradePoint: 9 },
  { label: "A (Very Good)", gradePoint: 8 },
  { label: "B+ (Good)", gradePoint: 7 },
  { label: "B (Above Average)", gradePoint: 6 },
  { label: "C (Average)", gradePoint: 5 },
  { label: "P (Pass)", gradePoint: 4 },
  { label: "F (Fail / Backlog)", gradePoint: 0 },
];

export function calculateCgpa(
  subjects: CgpaSubject[],
  formula: CgpaFormula = "standard"
): {
  cgpa: number;
  percentage: number;
  totalCredits: number;
  totalGradePoints: number;
  verdict: string;
  status: "safe" | "warning" | "danger" | "critical";
  shareText: string;
} {
  let totalCredits = 0;
  let totalGradePoints = 0;

  subjects.forEach((s) => {
    const cred = Math.max(0, s.credits);
    const gp = Math.max(0, Math.min(10, s.gradePoint));
    totalCredits += cred;
    totalGradePoints += cred * gp;
  });

  const cgpa = totalCredits > 0 ? parseFloat((totalGradePoints / totalCredits).toFixed(2)) : 0;

  let percentage = 0;
  if (formula === "aicte" || formula === "vtu") {
    percentage = parseFloat(Math.max(0, (cgpa - 0.75) * 10).toFixed(1));
  } else if (formula === "standard95") {
    percentage = parseFloat((cgpa * 9.5).toFixed(1));
  } else if (formula === "mumbai") {
    percentage = parseFloat((cgpa >= 7 ? 7.1 * cgpa + 12 : 7.2 * cgpa + 12).toFixed(1));
  } else {
    // standard is cgpa * 10
    percentage = parseFloat((cgpa * 10).toFixed(1));
  }

  let status: "safe" | "warning" | "danger" | "critical" = "safe";
  let verdict = "Solid. Placement-safe. Keep it there.";

  if (cgpa >= 9.0) {
    status = "safe";
    verdict = "Topper energy. You probably color-code your notes.";
  } else if (cgpa >= 7.0) {
    status = "safe";
    verdict = "Solid. Placement-safe. Keep it there.";
  } else if (cgpa >= 6.0) {
    status = "warning";
    verdict = "Survivable. Don't let it slip further.";
  } else {
    status = "danger";
    verdict = "We need to talk.";
  }

  return {
    cgpa,
    percentage,
    totalCredits,
    totalGradePoints,
    verdict,
    status,
    shareText: `My CGPA is ${cgpa.toFixed(2)} (${percentage.toFixed(1)}%). Verdict: ${verdict} · Calculated on Flunked.fun`,
  };
}

export function calculateSemesterSurvival(
  secured: number,
  totalInternal: number,
  minPassPercent: number,
  endSemWeightage: number,
  minEndSemPercent: number
): {
  isImpossible: boolean;
  isAlreadyPassed: boolean;
  marksNeededInEndSem: number;
  endSemWeightage: number;
  percentageNeededInEndSem: number;
  minEndSemPercent: number;
  aggregateMarksNeeded: number;
  totalCourseMarks: number;
  verdict: string;
  subDescription: string;
  status: "safe" | "warning" | "danger" | "critical";
  shareText: string;
} {
  const totalCourseMarks = totalInternal + endSemWeightage;
  const aggregateMarksNeeded = (totalCourseMarks * minPassPercent) / 100;
  const paperCutoffMarks = (endSemWeightage * minEndSemPercent) / 100;

  const neededForAggregate = Math.max(0, aggregateMarksNeeded - secured);
  const marksNeededInEndSem = Math.max(neededForAggregate, paperCutoffMarks);

  const isImpossible = marksNeededInEndSem > endSemWeightage;
  const isAlreadyPassed = neededForAggregate === 0 && paperCutoffMarks === 0;

  const percentageNeededInEndSem =
    endSemWeightage > 0
      ? parseFloat(((marksNeededInEndSem / endSemWeightage) * 100).toFixed(1))
      : 0;

  let status: "safe" | "warning" | "danger" | "critical" = "safe";
  let verdict = "Doable with 2 days study";
  let subDescription = `Secure ${marksNeededInEndSem} marks in the final exam to pass.`;

  if (isImpossible) {
    status = "critical";
    verdict = "RIP. Impossible";
    subDescription = "Even 100% in end sem cannot salvage your internal deficit.";
  } else if (isAlreadyPassed) {
    status = "safe";
    verdict = "Already passed. Just write your roll number.";
    subDescription = "You have mathematically cleared the aggregate requirement.";
  } else if (percentageNeededInEndSem > 55) {
    status = "danger";
    verdict = "You're living dangerously";
    subDescription = `Target: ${marksNeededInEndSem} / ${endSemWeightage} marks. Study hard.`;
  } else {
    status = "safe";
    verdict = "Doable with 2 days study";
    subDescription = `Target: ${marksNeededInEndSem} marks (${percentageNeededInEndSem}%).`;
  }

  return {
    isImpossible,
    isAlreadyPassed,
    marksNeededInEndSem,
    endSemWeightage,
    percentageNeededInEndSem,
    minEndSemPercent,
    aggregateMarksNeeded,
    totalCourseMarks,
    verdict,
    subDescription,
    status,
    shareText: `Semester Survival: I need ${marksNeededInEndSem}/${endSemWeightage} in End-Sems to pass! Calculated on Flunked.fun`,
  };
}

export interface GradeToPassResult {
  requiredFinalsPct: number;
  internalContribution: number;
  neededFromFinals: number;
  status: "safe" | "warning" | "critical";
  headline: string;
  verdict: string;
  metricDisplay: string;
  metricLabel: string;
}

export function calculateGradeToPass(
  internalScored: number,
  internalMax: number,
  internalWeightage: number,
  passThreshold: number
): GradeToPassResult {
  const safeScored = Math.max(0, Math.min(internalScored, internalMax));
  const safeMax = Math.max(1, internalMax);
  const safeWeight = Math.max(1, Math.min(99, internalWeightage));
  const finalsWeight = 100 - safeWeight;

  const internalContribution = (safeScored / safeMax) * safeWeight;
  const neededFromFinals = passThreshold - internalContribution;
  const requiredFinalsPct = (neededFromFinals / finalsWeight) * 100;

  let status: "safe" | "warning" | "critical" = "safe";
  let headline = "";
  let verdict = "";
  let metricDisplay = "";
  let metricLabel = "";

  if (internalContribution >= passThreshold) {
    status = "safe";
    metricDisplay = "0%";
    metricLabel = "Finals Required";
    headline = "Already Passed";
    verdict = "You've already passed regardless of finals. Relax.";
  } else if (requiredFinalsPct <= 60) {
    status = "safe";
    metricDisplay = `${Math.ceil(requiredFinalsPct)}%`;
    metricLabel = "Finals Needed";
    headline = "Clear Path Ahead";
    verdict = `You need ${Math.ceil(requiredFinalsPct)}% in finals. Doable. Stop panicking.`;
  } else if (requiredFinalsPct <= 100) {
    status = "warning";
    metricDisplay = `${Math.ceil(requiredFinalsPct)}%`;
    metricLabel = "Finals Needed";
    headline = "High Pressure Grind";
    verdict = `You need ${Math.ceil(requiredFinalsPct)}% in finals. That's rough but not impossible.`;
  } else {
    status = "critical";
    metricDisplay = "> 100%";
    metricLabel = "Mathematically Impossible";
    headline = "Critical Deficit";
    verdict = `You need ${Math.ceil(requiredFinalsPct)}% in finals. That's more than 100. It's over.`;
  }

  return {
    requiredFinalsPct,
    internalContribution,
    neededFromFinals,
    status,
    headline,
    verdict,
    metricDisplay,
    metricLabel,
  };
}

export function calculateBacklogRecovery(
  backlogs: number,
  currentSem: number,
  maxPerSem: number,
  _weeksToExam: number = 4
): {
  totalBacklogs: number;
  semsAvailable: number;
  canClearBeforeGrad: boolean;
  yearBackHeadline: string;
  recommendedWeeklyHours: number;
  advice: string;
  yearBackRisk: "safe" | "moderate" | "high" | "critical";
  shareText: string;
  hoursBreakdown: {
    backlogsStudy: number;
    regularSubjects: number;
    mockPapers: number;
  };
  roadmap: Array<{
    semesterNumber: number;
    label: string;
    regularSubjects: number;
    backlogsToClear: number;
    backlogsRemainingAfter: number;
    strainLevel: "normal" | "heavy" | "overload";
  }>;
} {
  const safeBacklogs = Math.max(0, backlogs);
  const safeMaxPerSem = Math.max(1, maxPerSem);
  const safeCurrentSem = Math.max(1, Math.min(8, currentSem));
  const semsAvailable = Math.max(1, 8 - safeCurrentSem + 1);

  const canClearBeforeGrad = safeBacklogs <= semsAvailable * safeMaxPerSem;

  let yearBackRisk: "safe" | "moderate" | "high" | "critical" = "safe";
  let yearBackHeadline = "Clean Record: No active backlogs";

  if (safeBacklogs === 0) {
    yearBackRisk = "safe";
    yearBackHeadline = "Clean Record: No active backlogs";
  } else if (!canClearBeforeGrad || safeBacklogs > 6) {
    yearBackRisk = "critical";
    yearBackHeadline = "Critical Danger: Exceeds graduation clearance capacity";
  } else if (safeBacklogs >= 3) {
    yearBackRisk = "high";
    yearBackHeadline = "High Risk: Heavy semester load ahead";
  } else {
    yearBackRisk = "moderate";
    yearBackHeadline = "Moderate Risk: Manageable with discipline";
  }

  const baseStudyPerBacklog = 6;
  const backlogsStudy = safeBacklogs * baseStudyPerBacklog;
  const regularSubjects = 12;
  const mockPapers = Math.min(10, safeBacklogs * 2 + 2);
  const recommendedWeeklyHours = backlogsStudy + regularSubjects + mockPapers;

  let advice = "You are on track. Maintain consistency and don't panic.";
  if (safeBacklogs > 4) {
    advice = "Emergency status. Clear at least 2 papers this cycle to avoid year-back debarment.";
  } else if (safeBacklogs > 2) {
    advice = "Heavy load. Prioritize subjects with prerequisite chains first.";
  } else if (safeBacklogs > 0) {
    advice = "Completely fixable. Clear these next semester and reset your slate.";
  }

  const roadmap: Array<{
    semesterNumber: number;
    label: string;
    regularSubjects: number;
    backlogsToClear: number;
    backlogsRemainingAfter: number;
    strainLevel: "normal" | "heavy" | "overload";
  }> = [];

  let remaining = safeBacklogs;
  let sem = safeCurrentSem;

  while (remaining > 0 && sem <= 8) {
    const toClear = Math.min(remaining, safeMaxPerSem);
    remaining -= toClear;
    const strainLevel: "normal" | "heavy" | "overload" =
      toClear >= 3 ? "overload" : toClear === 2 ? "heavy" : "normal";

    roadmap.push({
      semesterNumber: sem,
      label: `Semester ${sem} Exams`,
      regularSubjects: 5,
      backlogsToClear: toClear,
      backlogsRemainingAfter: remaining,
      strainLevel,
    });

    sem++;
  }

  return {
    totalBacklogs: safeBacklogs,
    semsAvailable,
    canClearBeforeGrad,
    yearBackHeadline,
    recommendedWeeklyHours,
    advice,
    yearBackRisk,
    shareText: `Backlog Recovery Plan: ${safeBacklogs} backlogs, ${recommendedWeeklyHours} hrs/week needed. Calculated on Flunked.fun`,
    hoursBreakdown: {
      backlogsStudy,
      regularSubjects,
      mockPapers,
    },
    roadmap,
  };
}
