import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const ToolLoading = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-black border-t-flunked-yellow rounded-full animate-spin" />
  </div>
);

export const TOOL_COMPONENTS: Record<string, ComponentType> = {
  "bunk-calculator": dynamic(
    () => import("./BunkCalculator").then((m) => ({ default: m.BunkCalculator })),
    { loading: ToolLoading }
  ),
  "cgpa-calculator": dynamic(
    () => import("./CgpaCalculator").then((m) => ({ default: m.CgpaCalculator })),
    { loading: ToolLoading }
  ),
  "semester-survival": dynamic(
    () => import("./SemesterSurvival").then((m) => ({ default: m.SemesterSurvival })),
    { loading: ToolLoading }
  ),
  "backlog-planner": dynamic(
    () => import("./BacklogPlanner").then((m) => ({ default: m.BacklogPlanner })),
    { loading: ToolLoading }
  ),
  "grade-to-pass": dynamic(
    () => import("./GradeToPass").then((m) => ({ default: m.GradeToPass })),
    { loading: ToolLoading }
  ),
  "ctc-calculator": dynamic(
    () => import("./CtcCalculator").then((m) => ({ default: m.CtcCalculator })),
    { loading: ToolLoading }
  ),
  "placement-quiz": dynamic(
    () => import("./PlacementQuiz").then((m) => ({ default: m.PlacementQuiz })),
    { loading: ToolLoading }
  ),
  "stipend-checker": dynamic(
    () => import("./StipendChecker").then((m) => ({ default: m.StipendChecker })),
    { loading: ToolLoading }
  ),
  "linkedin-auditor": dynamic(
    () => import("./LinkedInAuditor").then((m) => ({ default: m.LinkedInAuditor })),
    { loading: ToolLoading }
  ),
  "attend-or-skip": dynamic(
    () => import("./AttendOrSkip").then((m) => ({ default: m.AttendOrSkip })),
    { loading: ToolLoading }
  ),
  "am-i-cooked": dynamic(() => import("./AmICooked").then((m) => ({ default: m.AmICooked })), {
    loading: ToolLoading,
  }),
  "tier-engineer": dynamic(
    () => import("./TierEngineer").then((m) => ({ default: m.TierEngineer })),
    { loading: ToolLoading }
  ),
  "startup-match": dynamic(
    () => import("./StartupMatch").then((m) => ({ default: m.StartupMatch })),
    { loading: ToolLoading }
  ),
  "how-indian-are-you": dynamic(
    () => import("./HowIndianAreYou").then((m) => ({ default: m.HowIndianAreYou })),
    { loading: ToolLoading }
  ),
  "cgpa-marriage": dynamic(
    () => import("./CgpaMarriage").then((m) => ({ default: m.CgpaMarriage })),
    { loading: ToolLoading }
  ),
  "expense-splitter": dynamic(
    () => import("./ExpenseSplitter").then((m) => ({ default: m.ExpenseSplitter })),
    { loading: ToolLoading }
  ),
  "assignment-panic": dynamic(
    () => import("./AssignmentPanic").then((m) => ({ default: m.AssignmentPanic })),
    { loading: ToolLoading }
  ),
  "mess-calories": dynamic(
    () => import("./MessCalories").then((m) => ({ default: m.MessCalories })),
    { loading: ToolLoading }
  ),
  "sleep-debt": dynamic(() => import("./SleepDebt").then((m) => ({ default: m.SleepDebt })), {
    loading: ToolLoading,
  }),
};
