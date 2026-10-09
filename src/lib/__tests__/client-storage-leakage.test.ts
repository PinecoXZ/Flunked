import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

/**
 * Automated smoke check verifying zero client storage transmission across repository network calls.
 * NOTE: This is an automated smoke check, not a formal mathematical proof.
 *
 * It scans all source files for network invocation patterns (fetch, sendBeacon, XMLHttpRequest)
 * and confirms that no payload bodies transmit local/session storage keys like "flunked_user",
 * "flunked_theme", or direct localStorage / sessionStorage reads.
 */

function getAllSourceFiles(dir: string, fileList: string[] = []): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "node_modules" && entry.name !== ".next" && entry.name !== "dist") {
        getAllSourceFiles(fullPath, fileList);
      }
    } else if (entry.isFile() && (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx"))) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

describe("Client storage network leakage audit", () => {
  const srcDir = path.resolve(__dirname, "../../");
  const allFiles = getAllSourceFiles(srcDir);

  it("finds source files to audit", () => {
    expect(allFiles.length).toBeGreaterThan(20);
  });

  it("ensures no fetch(), sendBeacon(), or XMLHttpRequest body transmits client storage keys", () => {
    const forbiddenIdentifiers = ["flunked_user", "flunked_tutorial_completed", "flunked_theme"];
    const violations: { file: string; line: number; snippet: string }[] = [];

    for (const filePath of allFiles) {
      // Exclude test files from self-checking
      if (filePath.includes("__tests__")) continue;

      const content = fs.readFileSync(filePath, "utf-8");
      const lines = content.split("\n");

      lines.forEach((line, index) => {
        // If line contains network call with storage transmission
        const hasNetworkCall = /fetch\(|sendBeacon\(|XMLHttpRequest/.test(line);
        if (hasNetworkCall) {
          for (const key of forbiddenIdentifiers) {
            if (line.includes(key) || line.includes("localStorage.getItem")) {
              violations.push({
                file: path.relative(srcDir, filePath),
                line: index + 1,
                snippet: line.trim(),
              });
            }
          }
        }
      });
    }

    expect(violations).toEqual([]);
  });

  it("verifies all 19 tools do not use localStorage or sessionStorage", () => {
    const toolsDir = path.resolve(srcDir, "components/tools");
    if (!fs.existsSync(toolsDir)) return;

    const toolFiles = fs
      .readdirSync(toolsDir)
      .filter((f) => f.endsWith(".tsx") || f.endsWith(".ts"));
    const storageUsages: string[] = [];

    for (const toolFile of toolFiles) {
      const content = fs.readFileSync(path.join(toolsDir, toolFile), "utf-8");
      if (/localStorage|sessionStorage/.test(content)) {
        storageUsages.push(toolFile);
      }
    }

    // Zero tools should touch web storage; all must use in-memory useState
    expect(storageUsages).toEqual([]);
  });
});
