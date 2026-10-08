import React from "react";
import { GRADE_OPTIONS } from "@/lib/calculations";
import { Trash2 } from "lucide-react";

export interface SubjectState {
  id: string;
  name: string;
  gradePoint: number;
  credits: number;
}

interface SubjectRowProps {
  subject: SubjectState;
  index: number;
  totalSubjects: number;
  onUpdate: (id: string, field: keyof SubjectState, value: string | number) => void;
  onRemove: (id: string) => void;
}

export const SubjectRow = React.memo(function SubjectRow({
  subject,
  index,
  totalSubjects,
  onUpdate,
  onRemove,
}: SubjectRowProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-3 items-center bg-flunked-bg p-3 sm:p-2.5 rounded-xl border-2 border-black shadow-neo-sm">
      {/* Subject Name */}
      <div className="col-span-1 sm:col-span-6">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-black select-none w-5 font-black">
            #{index + 1}
          </span>
          <input
            type="text"
            value={subject.name}
            onChange={(e) => onUpdate(subject.id, "name", e.target.value)}
            placeholder="e.g. Operating Systems"
            className="w-full bg-white border-2 border-black text-black text-sm rounded-lg px-3 py-2 outline-none font-sans font-bold shadow-neo-sm focus:ring-2 focus:ring-flunked-yellow"
          />
        </div>
      </div>

      {/* Credits */}
      <div className="col-span-1 sm:col-span-2">
        <div className="flex items-center sm:justify-center gap-2">
          <span className="text-xs font-mono text-black font-bold sm:hidden">Credits:</span>
          <input
            type="number"
            min="1"
            max="12"
            value={subject.credits}
            onChange={(e) =>
              onUpdate(subject.id, "credits", Math.max(1, parseInt(e.target.value, 10) || 1))
            }
            className="w-full sm:w-20 bg-white border-2 border-black text-black text-sm font-mono font-black text-center rounded-lg px-2.5 py-2 outline-none shadow-neo-sm"
          />
        </div>
      </div>

      {/* Grade Dropdown */}
      <div className="col-span-1 sm:col-span-3">
        <select
          value={subject.gradePoint}
          onChange={(e) => onUpdate(subject.id, "gradePoint", parseInt(e.target.value, 10))}
          className="w-full bg-white border-2 border-black text-black text-xs font-mono font-black rounded-lg px-3 py-2 outline-none cursor-pointer shadow-neo-sm"
        >
          {GRADE_OPTIONS.map((opt) => (
            <option
              key={opt.label}
              value={opt.gradePoint}
              className="bg-white text-black font-bold"
            >
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Delete button */}
      <div className="col-span-1 sm:col-span-1 flex justify-end">
        <button
          type="button"
          onClick={() => onRemove(subject.id)}
          disabled={totalSubjects <= 1}
          aria-label={`Delete ${subject.name}`}
          className={`p-2 rounded-lg border-2 border-black transition cursor-pointer ${
            totalSubjects <= 1
              ? "opacity-30 cursor-not-allowed bg-white"
              : "bg-white hover:bg-flunked-yellow text-black shadow-neo-sm"
          }`}
        >
          <Trash2 className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
});
