"use client";

import React, { useState, useId } from "react";
import { calculateBacklogRecovery } from "@/lib/calculations";
import { ResultCard } from "@/components/ui/ResultCard";
import {
  AlertTriangle,
  Clock,
  BookOpen,
  CheckCircle,
  CalendarClock,
  AlertCircle,
} from "lucide-react";

export function BacklogPlanner() {
  const backlogsId = useId();
  const maxPerSemId = useId();
  const weeksToExamId = useId();

  // State
  const [backlogs, setBacklogs] = useState<number>(3);
  const [currentSem, setCurrentSem] = useState<number>(4);
  const [maxPerSem, setMaxPerSem] = useState<number>(2);
  const [weeksToExam, setWeeksToExam] = useState<number>(6);

  // Live calculation
  const plan = calculateBacklogRecovery(backlogs, currentSem, maxPerSem, weeksToExam);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Configuration Panel */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-black shadow-neo space-y-6">
        <div className="border-b-2 border-black pb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-black flex items-center gap-2.5">
              <CalendarClock className="w-5 h-5 stroke-[2.5]" />
              <span>Backlog Recovery Setup</span>
            </h2>
            <span className="text-xs font-mono text-black bg-flunked-yellow px-2.5 py-0.5 rounded border border-black font-black shadow-neo-sm uppercase">
              Crisis Management
            </span>
          </div>
          <p className="text-xs text-flunked-muted mt-1 font-mono font-bold">
            Map out a realistic recovery path without triggering university year-back rules.
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-6">
          {/* Number of Backlogs (1-10) */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <label
                htmlFor={backlogsId}
                className="text-black font-black uppercase tracking-wider"
              >
                Active Backlogs (Arrears)
              </label>
              <span className="text-base font-black font-mono text-black bg-flunked-yellow border border-black px-2 py-0.5 rounded shadow-neo-sm">
                {backlogs} subject{backlogs !== 1 ? "s" : ""}
              </span>
            </div>
            <input
              id={backlogsId}
              type="range"
              min="0"
              max="10"
              step="1"
              value={backlogs}
              onChange={(e) => setBacklogs(parseInt(e.target.value, 10))}
              className="w-full cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-black font-bold">
              {[0, 1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setBacklogs(num)}
                  className={`px-2.5 py-1 rounded border-2 border-black transition cursor-pointer font-black shadow-neo-sm ${
                    backlogs === num
                      ? "bg-flunked-yellow text-black"
                      : "bg-white hover:bg-flunked-bg text-black"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Current Semester Selection (1-8) */}
          <div className="space-y-2">
            <label className="block text-xs font-mono font-black text-black uppercase tracking-wider">
              Current Semester
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <button
                  key={sem}
                  type="button"
                  onClick={() => setCurrentSem(sem)}
                  className={`py-2 rounded-xl text-xs font-mono text-center border-2 border-black transition cursor-pointer font-black shadow-neo-sm ${
                    currentSem === sem
                      ? "bg-flunked-yellow text-black shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px]"
                      : "bg-white text-black hover:bg-flunked-bg"
                  }`}
                >
                  Sem {sem}
                </button>
              ))}
            </div>
          </div>

          {/* Max Backlogs per Session & Weeks until Exam */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            {/* Max Allowed per sem */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <label htmlFor={maxPerSemId} className="text-black font-black">
                  Max Supplementary Papers Allowed / Sem
                </label>
                <span className="text-black font-black bg-flunked-yellow border border-black px-1.5 py-0.2 rounded shadow-neo-sm">
                  {maxPerSem} papers
                </span>
              </div>
              <input
                id={maxPerSemId}
                type="range"
                min="1"
                max="5"
                step="1"
                value={maxPerSem}
                onChange={(e) => setMaxPerSem(parseInt(e.target.value, 10))}
                className="w-full cursor-pointer"
              />
              <div className="text-[10px] text-flunked-muted font-mono font-bold">
                Most universities cap supplementary registration at 2-3 subjects per session.
              </div>
            </div>

            {/* Weeks until Exam */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <label htmlFor={weeksToExamId} className="text-black font-black">
                  Weeks Left to Exam Session
                </label>
                <span className="text-black font-black bg-flunked-yellow border border-black px-1.5 py-0.2 rounded shadow-neo-sm">
                  {weeksToExam} weeks
                </span>
              </div>
              <input
                id={weeksToExamId}
                type="range"
                min="1"
                max="16"
                step="1"
                value={weeksToExam}
                onChange={(e) => setWeeksToExam(parseInt(e.target.value, 10))}
                className="w-full cursor-pointer"
              />
              <div className="text-[10px] text-flunked-muted font-mono font-bold">
                Time available to prepare prior to supplementary exam week.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Year-Back Alert Warning Banner */}
      {plan.yearBackRisk === "critical" ? (
        <div className="p-5 rounded-2xl bg-white border-2 border-black text-black flex items-start gap-3.5 shadow-neo">
          <AlertCircle className="w-6 h-6 text-[#FF3333] shrink-0 mt-0.5 stroke-[2.5]" />
          <div className="space-y-1">
            <h4 className="font-black text-base text-black flex items-center gap-2">
              <span>{plan.yearBackHeadline}</span>
            </h4>
            <p className="text-xs text-flunked-muted leading-relaxed font-mono font-bold">
              You have {backlogs} backlogs with only {plan.semsAvailable} semesters remaining
              (capacity: {plan.semsAvailable * maxPerSem} papers). In Indian universities, carrying
              over 4 backlogs into higher years often triggers a Year Back (Y.B.) or debarment from
              placements.
            </p>
          </div>
        </div>
      ) : plan.yearBackRisk === "high" ? (
        <div className="p-4 rounded-2xl bg-flunked-yellow border-2 border-black text-black flex items-start gap-3 shadow-neo">
          <AlertTriangle className="w-5 h-5 text-black shrink-0 mt-0.5 stroke-[2.5]" />
          <div className="space-y-0.5">
            <h4 className="font-black text-sm text-black">{plan.yearBackHeadline}</h4>
            <p className="text-xs text-black font-mono font-bold">
              Do not accumulate more backlogs. Clear at least {maxPerSem} this upcoming exam
              session.
            </p>
          </div>
        </div>
      ) : null}

      {/* Result Card */}
      <ResultCard
        title="Recovery Assessment"
        headline={
          backlogs === 0
            ? "Clean Record! Zero Backlogs."
            : `${backlogs} Backlog${backlogs > 1 ? "s" : ""} to Clear Across ${plan.roadmap.length} Semester${
                plan.roadmap.length > 1 ? "s" : ""
              }`
        }
        metric={backlogs === 0 ? "CLEAR" : `${plan.recommendedWeeklyHours} hrs`}
        metricLabel={backlogs === 0 ? "Clean Slate" : "Total Study / Week"}
        verdict={plan.advice}
        status={
          plan.yearBackRisk === "critical"
            ? "critical"
            : plan.yearBackRisk === "high"
              ? "danger"
              : plan.yearBackRisk === "moderate"
                ? "warning"
                : "safe"
        }
        shareText={plan.shareText}
      >
        {/* Weekly Time Breakdown */}
        {backlogs > 0 && (
          <div className="space-y-3 pt-1">
            <div className="text-xs font-mono uppercase tracking-wider text-black font-black">
              Weekly Time Allocation ({weeksToExam} weeks out):
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm">
                <div className="flex items-center gap-1.5 text-black text-[11px] font-black">
                  <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Backlogs Revision</span>
                </div>
                <div className="text-lg font-black text-black mt-1">
                  {plan.hoursBreakdown.backlogsStudy} hrs/wk
                </div>
                <div className="text-[10px] text-flunked-muted font-bold mt-0.5">
                  Core concepts + derivations
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm">
                <div className="flex items-center gap-1.5 text-black text-[11px] font-black">
                  <BookOpen className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Regular Subjects</span>
                </div>
                <div className="text-lg font-black text-black mt-1">
                  {plan.hoursBreakdown.regularSubjects} hrs/wk
                </div>
                <div className="text-[10px] text-flunked-muted font-bold mt-0.5">
                  Don't create new backlogs!
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm">
                <div className="flex items-center gap-1.5 text-black text-[11px] font-black">
                  <CheckCircle className="w-3.5 h-3.5 stroke-[2.5] text-[#00A843]" />
                  <span>PYQ Mock Papers</span>
                </div>
                <div className="text-lg font-black text-black mt-1">
                  {plan.hoursBreakdown.mockPapers} hrs/wk
                </div>
                <div className="text-[10px] text-flunked-muted font-bold mt-0.5">
                  Last 5 years question papers
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Visual Semester Timeline */}
        {backlogs > 0 && plan.roadmap.length > 0 && (
          <div className="space-y-3 pt-4 border-t-2 border-black">
            <div className="text-xs font-mono uppercase tracking-wider text-black font-black flex items-center justify-between">
              <span>Semester Clearance Timeline</span>
              <span className="text-[10px] text-black font-black bg-flunked-yellow border border-black px-1.5 py-0.2 rounded">
                Max {maxPerSem} papers / sem
              </span>
            </div>

            <div className="space-y-2">
              {plan.roadmap.map((item) => (
                <div
                  key={item.semesterNumber}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm gap-2 text-xs font-mono"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-flunked-yellow border-2 border-black shadow-neo-sm flex items-center justify-center font-black text-black text-[11px]">
                      {item.semesterNumber}
                    </div>
                    <div>
                      <div className="font-black text-black">{item.label}</div>
                      <div className="text-[10px] text-flunked-muted font-bold">
                        Regular load: ~{item.regularSubjects} courses
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pl-10 sm:pl-0">
                    <div className="text-right sm:text-center">
                      <div className="text-black font-black">
                        Clear {item.backlogsToClear} paper{item.backlogsToClear !== 1 ? "s" : ""}
                      </div>
                      <div className="text-[10px] text-flunked-muted font-bold">
                        Remaining after: {item.backlogsRemainingAfter}
                      </div>
                    </div>

                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded border-2 border-black uppercase font-black shadow-neo-sm ${
                        item.strainLevel === "overload"
                          ? "bg-[#FFF0F0] text-[#FF3333]"
                          : item.strainLevel === "heavy"
                            ? "bg-flunked-yellow text-black"
                            : "bg-white text-[#00A843]"
                      }`}
                    >
                      {item.strainLevel}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ResultCard>
    </div>
  );
}
