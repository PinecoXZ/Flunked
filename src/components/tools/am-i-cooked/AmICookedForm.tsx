import React from "react";
import { NeoCard } from "@/components/ui/NeoCard";

export interface AmICookedFormProps {
  attendance: number;
  internalsAvg: number;
  weeksLeft: number;
  pendingAssignments: number;
  onAttendanceChange: (val: number) => void;
  onInternalsAvgChange: (val: number) => void;
  onWeeksLeftChange: (val: number) => void;
  onPendingAssignmentsChange: (val: number) => void;
}

export const AmICookedForm = React.memo(function AmICookedForm({
  attendance,
  internalsAvg,
  weeksLeft,
  pendingAssignments,
  onAttendanceChange,
  onInternalsAvgChange,
  onWeeksLeftChange,
  onPendingAssignmentsChange,
}: AmICookedFormProps) {
  return (
    <NeoCard className="p-6 sm:p-8 space-y-6">
      <div className="border-b-2 border-black pb-4">
        <h3 className="text-sm font-mono uppercase tracking-wider text-black font-black">
          Input Your Semester Diagnostics
        </h3>
        <p className="text-xs text-black/70 mt-1 font-sans font-medium">
          Slide the bars to your actual numbers. Don't lie to the algorithm; it already knows.
        </p>
      </div>

      {/* Input 1: Attendance */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-mono uppercase tracking-wider text-black font-black">
            Current Overall Attendance (%)
          </label>
          <span className="font-mono text-base font-black text-black bg-flunked-yellow px-2.5 py-0.5 rounded border border-black shadow-neo-sm">
            {attendance}%
          </span>
        </div>
        <input
          type="range"
          min={20}
          max={100}
          value={attendance}
          onChange={(e) => onAttendanceChange(Number(e.target.value))}
          className="w-full h-3 bg-white border-2 border-black rounded-lg appearance-none cursor-pointer accent-[#FFE600]"
        />
        <div className="flex justify-between text-[11px] font-mono font-bold text-black/70 mt-1">
          <span>20% (Ghost Student)</span>
          <span>75% (Cutoff)</span>
          <span>100% (First Bench)</span>
        </div>
      </div>

      {/* Input 2: Internals Avg */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-mono uppercase tracking-wider text-black font-black">
            Average Internal / Mid-term Score (%)
          </label>
          <span className="font-mono text-base font-black text-black bg-flunked-yellow px-2.5 py-0.5 rounded border border-black shadow-neo-sm">
            {internalsAvg}%
          </span>
        </div>
        <input
          type="range"
          min={10}
          max={100}
          value={internalsAvg}
          onChange={(e) => onInternalsAvgChange(Number(e.target.value))}
          className="w-full h-3 bg-white border-2 border-black rounded-lg appearance-none cursor-pointer accent-[#FFE600]"
        />
        <div className="flex justify-between text-[11px] font-mono font-bold text-black/70 mt-1">
          <span>10% (Grace Marks)</span>
          <span>50% (Average)</span>
          <span>100% (Topper)</span>
        </div>
      </div>

      {/* Input 3 & 4: Weeks Left & Assignments */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-mono uppercase tracking-wider text-black font-black">
              Weeks Left in Semester
            </label>
            <span className="font-mono text-base font-black text-black bg-flunked-yellow px-2.5 py-0.5 rounded border border-black shadow-neo-sm">
              {weeksLeft} {weeksLeft === 1 ? "week" : "weeks"}
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={16}
            value={weeksLeft}
            onChange={(e) => onWeeksLeftChange(Number(e.target.value))}
            className="w-full h-3 bg-white border-2 border-black rounded-lg appearance-none cursor-pointer accent-[#FFE600]"
          />
          <div className="flex justify-between text-[11px] font-mono font-bold text-black/70 mt-1">
            <span>1 week (Panic)</span>
            <span>8 weeks</span>
            <span>16 weeks</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-mono uppercase tracking-wider text-black font-black">
              Pending Assignments / Lab Records
            </label>
            <span className="font-mono text-base font-black text-black bg-flunked-yellow px-2.5 py-0.5 rounded border border-black shadow-neo-sm">
              {pendingAssignments}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={15}
            value={pendingAssignments}
            onChange={(e) => onPendingAssignmentsChange(Number(e.target.value))}
            className="w-full h-3 bg-white border-2 border-black rounded-lg appearance-none cursor-pointer accent-[#FFE600]"
          />
          <div className="flex justify-between text-[11px] font-mono font-bold text-black/70 mt-1">
            <span>0 (All caught up)</span>
            <span>7</span>
            <span>15 (Hostel Mountain)</span>
          </div>
        </div>
      </div>
    </NeoCard>
  );
});
