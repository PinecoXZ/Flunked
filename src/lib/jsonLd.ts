/**
 * JSON-LD serialization utility with XSS script breakout defense.
 * Escapes '<' to '\\u003c' to prevent attackers from breaking out of enclosing
 * <script type="application/ld+json"> tags into HTML/JS execution context.
 */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
