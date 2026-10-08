import React from "react";
import type { CgpaFormula } from "@/lib/calculations";
import { Plus, GraduationCap, RotateCcw } from "lucide-react";
import { SubjectRow, type SubjectState } from "./SubjectRow";

interface CgpaFormProps {
  subjects: SubjectState[];
  formula: CgpaFormula;
  onFormulaChange: (formula: CgpaFormula) => void;
  onUpdateSubject: (id: string, field: keyof SubjectState, value: string | number) => void;
  onRemoveSubject: (id: string) => void;
  onAddSubject: () => void;
  onReset: () => void;
}

const FORMULA_OPTIONS: Array<{
  id: CgpaFormula;
  title: string;
  subtitle: string;
}> = [
  { id: "standard", title: "Direct 10×", subtitle: "Anna Univ / IITs" },
  { id: "aicte", title: "AICTE Official", subtitle: "(CGPA − 0.75) × 10" },
  { id: "standard95", title: "Standard 9.5×", subtitle: "CBSE / Boards" },
  { id: "mumbai", title: "Mumbai Univ", subtitle: "7.1 × CGPA + 12" },
];

export const CgpaForm = React.memo(function CgpaForm({
  subjects,
  formula,
  onFormulaChange,
  onUpdateSubject,
  onRemoveSubject,
  onAddSubject,
  onReset,
}: CgpaFormProps) {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-black shadow-neo space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-black pb-4">
        <div>
          <h2 className="text-xl font-black text-black flex items-center gap-2.5">
            <GraduationCap className="w-5 h-5 stroke-[2.5]" />
            <span>Grades &amp; Credits</span>
          </h2>
          <p className="text-xs text-flunked-muted mt-0.5 font-mono font-bold">
            Calculate semester SGPA or cumulative CGPA with credit weighting.
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white hover:bg-flunked-yellow border-2 border-black text-xs font-mono font-black text-black shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] transition cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Reset Demo</span>
        </button>
      </div>

      {/* Formula Toggle */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-mono font-black text-black uppercase tracking-wider">
            University Percentage Conversion Formula
          </label>
          <span className="text-[10px] font-mono text-flunked-muted font-bold">
            Official University Formulas
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {FORMULA_OPTIONS.map((opt) => {
            const isSelected = formula === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onFormulaChange(opt.id)}
                className={`p-2.5 rounded-xl text-xs font-mono text-left border-2 border-black transition cursor-pointer ${
                  isSelected
                    ? "bg-flunked-yellow text-black font-black shadow-neo-sm translate-x-[-1px] translate-y-[-1px]"
                    : "bg-white text-black font-bold shadow-none hover:bg-flunked-bg"
                }`}
              >
                <div className="font-black text-black text-xs">{opt.title}</div>
                <div className="text-[10px] text-flunked-muted font-bold truncate">
                  {opt.subtitle}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subjects List */}
      <div className="space-y-3">
        <div className="hidden sm:grid sm:grid-cols-12 gap-3 text-[11px] font-mono text-black uppercase px-1 font-black">
          <div className="col-span-6">Subject / Course Name</div>
          <div className="col-span-2 text-center">Credits</div>
          <div className="col-span-3">Grade Secured</div>
          <div className="col-span-1 text-right">Del</div>
        </div>

        <div className="space-y-2.5">
          {subjects.map((sub, idx) => (
            <SubjectRow
              key={sub.id}
              subject={sub}
              index={idx}
              totalSubjects={subjects.length}
              onUpdate={onUpdateSubject}
              onRemove={onRemoveSubject}
            />
          ))}
        </div>

        {/* Add Subject CTA */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onAddSubject}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-flunked-yellow border-2 border-black text-black font-black text-xs font-mono shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>+ Add subject</span>
          </button>
        </div>
      </div>
    </div>
  );
});
