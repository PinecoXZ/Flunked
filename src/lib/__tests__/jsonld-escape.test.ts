import { describe, it, expect } from "vitest";
import { safeJsonLd } from "../jsonLd";

describe("safeJsonLd structured data escaping", () => {
  it("escapes </script> tag breakout vectors", () => {
    const malicious = {
      name: "</script><script>alert('pwned')</script>",
      description: "Normal description with <tags>",
    };

    const output = safeJsonLd(malicious);

    // Must not contain any literal opening angle bracket
    expect(output).not.toContain("<");
    // Must contain escaped unicode sequence
    expect(output).toContain("\\u003c/script");
    expect(output).toContain("\\u003cscript");
  });

  it("produces valid parsable JSON equivalent", () => {
    const data = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Flunked.online",
    };

    const output = safeJsonLd(data);
    expect(JSON.parse(output)).toEqual(data);
  });
});
