"use client";

import React, { useState, useCallback } from "react";
import { calculateCgpa, type CgpaFormula } from "@/lib/calculations";
import { CgpaForm } from "./CgpaForm";
import { CgpaResult } from "./CgpaResult";
import type { SubjectState } from "./SubjectRow";

const DEFAULT_SUBJECTS: SubjectState[] = [
  { id: "sub-1", name: "Data Structures & Algorithms", gradePoint: 9, credits: 4 },
  { id: "sub-2", name: "Computer Architecture", gradePoint: 8, credits: 4 },
  { id: "sub-3", name: "Discrete Mathematics", gradePoint: 7, credits: 3 },
  { id: "sub-4", name: "Object Oriented Programming", gradePoint: 8, credits: 3 },
  { id: "sub-5", name: "Operating Systems Lab", gradePoint: 10, credits: 2 },
];

export function CgpaCalculator() {
  const [subjects, setSubjects] = useState<SubjectState[]>(DEFAULT_SUBJECTS);
  const [formula, setFormula] = useState<CgpaFormula>("standard");

  const addSubject = useCallback(() => {
    setSubjects((prev) => [
      ...prev,
      {
        id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        name: `Subject ${prev.length + 1}`,
        gradePoint: 8,
        credits: 3,
      },
    ]);
  }, []);

  const removeSubject = useCallback((id: string) => {
    setSubjects((prev) => (prev.length <= 1 ? prev : prev.filter((s) => s.id !== id)));
  }, []);

  const updateSubject = useCallback(
    (id: string, field: keyof SubjectState, value: string | number) => {
      setSubjects((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
    },
    []
  );

  const resetToDefault = useCallback(() => {
    setSubjects(DEFAULT_SUBJECTS);
  }, []);

  // Live calculation
  const result = calculateCgpa(subjects, formula);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <CgpaForm
        subjects={subjects}
        formula={formula}
        onFormulaChange={setFormula}
        onUpdateSubject={updateSubject}
        onRemoveSubject={removeSubject}
        onAddSubject={addSubject}
        onReset={resetToDefault}
      />
      <CgpaResult result={result} />
    </div>
  );
}
