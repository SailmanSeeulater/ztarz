import { describe, expect, it } from "vitest";
import { CardError, parseCard, splitSections } from "./parse";

const concept = `---
title: Effect cleanup
module: frontend
type: concept
source: https://react.dev/reference/react/useEffect
---

## Prompt

What does cleanup do?

## Answer

Undoes setup.
`;

describe("splitSections", () => {
  it("ignores ## inside fenced code", () => {
    const s = splitSections("## Prompt\n\n```md\n## not a heading\n```\n\n## Answer\n\nyes");
    expect(s.map((x) => x.key)).toEqual(["prompt", "answer"]);
    expect(s[0].markdown).toContain("## not a heading");
  });
});

describe("parseCard", () => {
  it("parses a valid concept card", () => {
    const card = parseCard("frontend/effect-cleanup", concept);
    expect(card.type).toBe("concept");
    expect(card.sections.map((s) => s.key)).toEqual(["prompt", "answer"]);
    expect(card.sections[1].html).toContain("Undoes setup.");
  });

  it("rejects a card missing a required section", () => {
    const raw = concept.replace(/## Answer[\s\S]*/, "");
    expect(() => parseCard("x", raw)).toThrow(/missing sections: ## answer/);
  });

  it("rejects a card without a source", () => {
    const raw = concept.replace(/source: .*\n/, "");
    expect(() => parseCard("x", raw)).toThrow(CardError);
  });

  it("requires exactly one correct choice", () => {
    const mcq = `---
title: Q
module: frontend
type: mcq
source: https://example.com
choices:
  - { text: A, correct: true, why: a }
  - { text: B, correct: true, why: b }
---

## Prompt

Pick one.
`;
    expect(() => parseCard("x", mcq)).toThrow(/exactly one choice/);
  });
});
