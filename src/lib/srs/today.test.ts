import { describe, expect, it } from "vitest";
import type { Card, CardType, ModuleId } from "@/lib/content/schema";
import { planToday } from "./today";

const card = (id: string, type: CardType, module: ModuleId = "frontend"): Card => ({
  id,
  title: id,
  module,
  type,
  source: "https://example.com",
  tags: [],
  stack: [],
  sections: [],
});
const now = new Date("2026-11-23T10:00:00Z");
const ago = (h: number) => new Date(now.getTime() - h * 3_600_000);
const ahead = (h: number) => new Date(now.getTime() + h * 3_600_000);

const cards = [
  card("frontend/a-concept", "concept"),
  card("frontend/b-mcq", "mcq"),
  card("frontend/c-prints", "what-prints"),
  card("frontend/d-bug", "bug-hunt"),
  card("frontend/e-loud", "out-loud"),
  card("f1/dns", "concept", "f1"),
  card("stack/x-vs-y", "comparison", "stack"),
];

describe("planToday", () => {
  it("starts a fresh user on new cards in curriculum order, plus one drill and one out-loud", () => {
    const plan = planToday({ cards, states: new Map(), now, introducedToday: 0, newPerDay: 3 });
    expect(plan).toEqual([
      { cardId: "f1/dns", slot: "new" }, // foundations before branches
      { cardId: "frontend/a-concept", slot: "new" },
      { cardId: "frontend/b-mcq", slot: "new" },
      { cardId: "frontend/c-prints", slot: "drill" },
      { cardId: "frontend/e-loud", slot: "out-loud" },
    ]);
  });

  it("puts due reviews first, oldest due first, and skips cards not yet due", () => {
    const states = new Map([
      ["frontend/b-mcq", { due: ago(1) }],
      ["f1/dns", { due: ago(5) }],
      ["frontend/a-concept", { due: ahead(24) }],
    ]);
    const plan = planToday({ cards, states, now, introducedToday: 0, newPerDay: 0 });
    expect(plan.filter((p) => p.slot === "review").map((p) => p.cardId)).toEqual(["f1/dns", "frontend/b-mcq"]);
    expect(plan.some((p) => p.cardId === "frontend/a-concept")).toBe(false);
  });

  it("respects the daily new-card budget already spent", () => {
    const plan = planToday({ cards, states: new Map(), now, introducedToday: 5, newPerDay: 5 });
    expect(plan.filter((p) => p.slot === "new")).toEqual([]);
  });

  it("never queues a card twice: a due drill counts as the review, and the drill slot picks another", () => {
    const states = new Map([["frontend/c-prints", { due: ago(1) }]]);
    const plan = planToday({ cards, states, now, introducedToday: 0, newPerDay: 0 });
    const ids = plan.map((p) => p.cardId);
    expect(new Set(ids).size).toBe(ids.length);
    expect(plan).toContainEqual({ cardId: "frontend/c-prints", slot: "review" });
    expect(plan).toContainEqual({ cardId: "frontend/d-bug", slot: "drill" });
  });

  it("falls back to the soonest-due seen drill when every drill has been seen", () => {
    const states = new Map([
      ["frontend/c-prints", { due: ahead(48) }],
      ["frontend/d-bug", { due: ahead(2) }],
    ]);
    const plan = planToday({ cards, states, now, introducedToday: 0, newPerDay: 0 });
    expect(plan).toContainEqual({ cardId: "frontend/d-bug", slot: "drill" });
  });

  it("counts review cards due later today, but learning cards only once their step is up", () => {
    const states = new Map([
      ["frontend/a-concept", { due: ahead(3) }],
      ["frontend/b-mcq", { due: ahead(0.1), learning: true }],
    ]);
    const plan = planToday({ cards, states, now, dueBy: ahead(10), introducedToday: 0, newPerDay: 0 });
    expect(plan.filter((p) => p.slot === "review").map((p) => p.cardId)).toEqual(["frontend/a-concept"]);
  });

  it("fills the drill and out-loud slots once a day, so reloading after a session adds nothing", () => {
    const states = new Map([
      ["frontend/c-prints", { due: ahead(48) }],
      ["frontend/e-loud", { due: ahead(72) }],
    ]);
    const plan = planToday({
      cards,
      states,
      now,
      introducedToday: 5,
      reviewedToday: new Set(["frontend/c-prints", "frontend/e-loud"]),
    });
    expect(plan).toEqual([]);
  });
});
