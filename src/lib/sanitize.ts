/**
 * Input validation, sanitization, and injection defense utility for Flunked.fun.
 * Guards against:
 * 1. SQL Injection (SQLi)
 * 2. Command Injection
 * 3. Cross-Site Scripting (XSS / Script Injection)
 * 4. Directory Traversal (LFI/RFI)
 * 5. Unsafe File Uploads
 */

// Regex patterns to detect malicious injection attempts
const EXPLICIT_SQLI_PATTERN =
  /(\b(UNION\s+SELECT|DROP\s+TABLE|ALTER\s+TABLE|DELETE\s+FROM|INSERT\s+INTO|CREATE\s+TABLE|EXEC\s*\(|--|\/\*)\b|'\s*OR\s+'?1'?\s*=\s*'?1)/i;
export const COMMAND_INJECTION_PATTERN = /[;&|`$><\\!]/;
const SCRIPT_INJECTION_PATTERN =
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>|javascript:|data:text\/html|onload=|onerror=|onclick=/i;
const PATH_TRAVERSAL_PATTERN = /(\.\.[\/\\]|%2e%2e[\/\\])/i;

export interface ValidationResult<T> {
  isValid: boolean;
  sanitized: T;
  error?: string;
}

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
 * Validates tool suggestion text.
 */
export function validateSuggestion(
  idea: unknown,
  category: unknown,
  campus?: unknown
): ValidationResult<{ idea: string; category: string; campus: string }> {
  const rawIdea = typeof idea === "string" ? idea : "";
  const rawCampus = typeof campus === "string" ? campus : "";

  const sanitizedIdea = sanitizeString(idea, 1000);
  const sanitizedCategory = sanitizeString(category, 30);
  const sanitizedCampus = sanitizeString(campus, 100);

  if (!sanitizedIdea || sanitizedIdea.length < 5) {
    return {
      isValid: false,
      sanitized: { idea: "", category: "", campus: "" },
      error: "Please describe your tool idea in at least 5 characters.",
    };
  }

  const validCategories = ["academics", "placement", "fun", "daily", "all"];
  if (!validCategories.includes(sanitizedCategory.toLowerCase())) {
    return {
      isValid: false,
      sanitized: { idea: sanitizedIdea, category: "academics", campus: sanitizedCampus },
      error: "Invalid category selected.",
    };
  }

  // Check for malicious code or SQL injection in suggestion body

  if (
    EXPLICIT_SQLI_PATTERN.test(rawIdea) ||
    SCRIPT_INJECTION_PATTERN.test(rawIdea) ||
    PATH_TRAVERSAL_PATTERN.test(rawIdea) ||
    EXPLICIT_SQLI_PATTERN.test(sanitizedIdea) ||
    SCRIPT_INJECTION_PATTERN.test(sanitizedIdea)
  ) {
    return {
      isValid: false,
      sanitized: { idea: "", category: "", campus: "" },
      error: "Malicious characters or injection patterns detected.",
    };
  }

  if (
    rawCampus &&
    (EXPLICIT_SQLI_PATTERN.test(rawCampus) ||
      SCRIPT_INJECTION_PATTERN.test(rawCampus) ||
      PATH_TRAVERSAL_PATTERN.test(rawCampus) ||
      EXPLICIT_SQLI_PATTERN.test(sanitizedCampus) ||
      SCRIPT_INJECTION_PATTERN.test(sanitizedCampus))
  ) {
    return {
      isValid: false,
      sanitized: { idea: "", category: "", campus: "" },
      error: "Invalid characters detected in campus name.",
    };
  }

  return {
    isValid: true,
    sanitized: {
      idea: sanitizedIdea,
      category: sanitizedCategory.toLowerCase(),
      campus: sanitizedCampus,
    },
  };
}
