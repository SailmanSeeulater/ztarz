import type { LabCheck } from "./content/schema";

export type CheckResult = { label: string; passed: boolean };

/** Longest evidence we keep or scan; terminal output past this is almost certainly noise. */
export const MAX_EVIDENCE = 50_000;

/** Runs a lab's checks against the output the learner pasted. Patterns are case-insensitive and multiline. */
export function runChecks(checks: LabCheck[], evidence: string): CheckResult[] {
  // Windows line endings and pasted tabs shouldn't fail an otherwise correct answer.
  const text = evidence.slice(0, MAX_EVIDENCE).replace(/\r\n?/g, "\n");
  return checks.map((c) => {
    const matches = text.match(new RegExp(c.pattern, "gim"))?.length ?? 0;
    return { label: c.label, passed: c.times === undefined ? matches > 0 : matches === c.times };
  });
}
