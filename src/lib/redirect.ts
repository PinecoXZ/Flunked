/**
 * URL Redirect and Routing Sanitization Utilities for Flunked.online.
 * Protects against open redirect attacks, protocol-relative bypasses, and control character injection.
 */

/**
 * Validates and sanitizes a redirect target to prevent open redirect vulnerabilities.
 * Strictly permits only internal relative paths starting with a single '/' followed by a non-slash character.
 * Rejects protocol-relative URLs (//evil.com), backslashes (/\\evil.com), javascript:, control characters, and CRLF encodings (%0d%0a).
 */
export function safeRedirect(target: string | null | undefined): string {
  if (!target) return "/";
  const trimmed = target.trim();
  if (/[\x00-\x1F\x7F]/.test(trimmed)) {
    return "/";
  }
  if (
    /^\/(?!\/)[^\s]*$/.test(trimmed) &&
    !trimmed.includes("\\") &&
    !trimmed.toLowerCase().includes("%0d") &&
    !trimmed.toLowerCase().includes("%0a")
  ) {
    return trimmed;
  }
  return "/";
}

/**
 * Constructs a preserved full relative path with query parameters.
 */
export function buildRedirectPath(pathname: string, searchParamsString?: string): string {
  const cleanPath = pathname || "/";
  if (!searchParamsString || searchParamsString.trim() === "") {
    return cleanPath;
  }
  const cleanQuery = searchParamsString.startsWith("?") ? searchParamsString : `?${searchParamsString}`;
  return `${cleanPath}${cleanQuery}`;
}
