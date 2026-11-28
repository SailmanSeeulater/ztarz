import { describe, expect, it } from "vitest";
import type { Card, ModuleId } from "./content/schema";
import { gradeExam, pickExam, resolveScope } from "./exam";

const mcq = (id: string, module: ModuleId, type: Card["type"] = "mcq"): Card => ({
  id,
  title: id,
  module,
  type,
  source: "https://example.com",
  tags: [],
  stack: [],
  sections: [],
  ...(type === "mcq" || type === "bug-hunt"
    ? { choices: [{ html: "a", correct: false, whyHtml: "" }, { html: "b", correct: true, whyHtml: "" }] }
    : {}),
});
const cards = [
  ...Array.from({ length: 6 }, (_, i) => mcq(`f1/q${i}`, "f1")),
  ...Array.from({ length: 6 }, (_, i) => mcq(`go/q${i}`, "go")),
  mcq("go/concept", "go", "concept"),
];

describe("pickExam", () => {
  it("only takes auto-marked cards, without repeats, spread across modules", () => {
    const paper = pickExam(cards, null, 6, 42);
    expect(paper).toHaveLength(6);
    expect(new Set(paper.map((c) => c.id)).size).toBe(6);
    expect(paper.every((c) => c.type === "mcq")).toBe(true);
    expect(paper.filter((c) => c.module === "go")).toHaveLength(3);
  });

  it("respects the scope and stops when the pool runs out", () => {
    const paper = pickExam(cards, new Set<ModuleId>(["go"]), 20, 7);
    expect(paper).toHaveLength(6);
    expect(paper.every((c) => c.module === "go")).toBe(true);
  });

  it("is repeatable for a seed and varies between seeds", () => {
    const ids = (seed: number) => pickExam(cards, null, 8, seed).map((c) => c.id).join();
    expect(ids(1)).toBe(ids(1));
    expect(ids(1)).not.toBe(ids(2));
  });
});

describe("gradeExam", () => {
  const byId = new Map(cards.map((c) => [c.id, c]));
  it("marks answers, counts blanks as wrong and breaks the score down by module", () => {
    const g = gradeExam((id) => byId.get(id), [
      { cardId: "f1/q0", picked: 1 },
      { cardId: "f1/q1", picked: 0 },
      { cardId: "go/q0", picked: null },
      { cardId: "go/q1", picked: 9 }, // out of range
      { cardId: "gone/x", picked: 1 }, // card deleted since
    ]);
    expect(g).toMatchObject({ total: 4, correct: 1, score: 0.25, passed: false });
    expect(g.perModule).toEqual([
      { module: "go", total: 2, correct: 0 },
      { module: "f1", total: 2, correct: 1 },
    ]);
  });
});

describe("resolveScope", () => {
  it("names each kind of scope", () => {
    expect(resolveScope("all", [])).toEqual({ label: "Everything", modules: null });
    expect(resolveScope("focus", [])).toBeNull();
    expect(resolveScope("focus", ["go"])!.modules).toEqual(new Set(["go"]));
    expect(resolveScope("g:languages", [])!.modules!.has("rust")).toBe(true);
    expect(resolveScope("f6", [])!.label).toBe("Databases");
    expect(resolveScope("nope", [])).toBeNull();
  });
});
