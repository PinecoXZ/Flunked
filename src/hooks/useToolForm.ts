"use client";

import { useState, useCallback } from "react";

export interface UseToolFormOptions<TInput, TResult> {
  defaultInput: TInput;
  calculator: (input: TInput) => TResult;
}

export function useToolForm<TInput, TResult>({
  defaultInput,
  calculator,
}: UseToolFormOptions<TInput, TResult>) {
  const [input, setInput] = useState<TInput>(defaultInput);
  const [result, setResult] = useState<TResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const updateField = useCallback(<K extends keyof TInput>(field: K, value: TInput[K]) => {
    setInput((prev) => ({ ...prev, [field]: value }));
  }, []);

  const calculate = useCallback(() => {
    const res = calculator(input);
    setResult(res);
    setShowResult(true);
  }, [input, calculator]);

  const reset = useCallback(() => {
    setInput(defaultInput);
    setResult(null);
    setShowResult(false);
  }, [defaultInput]);

  return {
    input,
    setInput,
    updateField,
    result,
    showResult,
    calculate,
    reset,
  };
}
