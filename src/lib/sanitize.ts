/**
 * Input validation, sanitization, and injection defense utility for Flunked.online.
 * - Google Sheets CSV formula injection defense (sanitizeForSheets)
 * - Strict student tool proposal validation (suggestSchema)
 */

import { z } from "zod";

/**
 * Strips HTML tags, control characters, and common script tags from a string.
 */
export function sanitizeString(input: unknown, maxLength = 500): string {
  if (typeof input !== "string") {
    return "";
  }

  // Trim and limit length
  let clean = input.trim().slice(0, maxLength);

  // Remove null bytes and invisible control characters
  clean = clean.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");

  // Strip script and style blocks completely
  clean = clean.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  clean = clean.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");

  // Strip HTML tags
  clean = clean.replace(/<[^>]*>/g, "");

  // Normalize excessive whitespace
  clean = clean.replace(/\s+/g, " ");

  return clean;
}

/**
 * Defends against CSV / Google Sheets formula injection.
 * Checks for characters (=, +, -, @, \t, \r) at start of string before trimming.
 * Prefixes matched values with a single quote (') so spreadsheet treats them as literal text.
 */
export function sanitizeForSheets(value: string): string {
  if (!value) return "";
  // Check the first character of the raw string BEFORE trimming whitespace so \t and \r are caught
  if (/^[=+\-@\t\r]/.test(value)) {
    return `'${value.trim()}`;
  }
  const trimmed = value.trim();
  if (/^[=+\-@\t\r]/.test(trimmed)) {
    return `'${trimmed}`;
  }
  return trimmed;
}

export const suggestSchema = z
  .object({
    category: z
      .enum([
        "academics",
        "placement",
        "placements",
        "fun",
        "daily",
        "attendance",
        "lifestyle",
        "other",
      ])
      .default("academics"),
    campus: z
      .string()
      .trim()
      .min(1, "College / University name is required")
      .max(100, "College name cannot exceed 100 characters"),
    name: z
      .string()
      .trim()
      .max(60, "Name cannot exceed 60 characters")
      .optional()
      .transform((val) => (val && val.length > 0 ? val : "Anonymous")),
    idea: z
      .string()
      .trim()
      .min(1, "Idea cannot be empty")
      .max(500, "Idea cannot exceed 500 characters"),
  })
  .strict();
