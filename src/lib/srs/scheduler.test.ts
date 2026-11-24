import { beforeAll, describe, expect, it } from "vitest";
import {
  createScheduler,
  formatInterval,
  fromStored,
  previewIntervals,
  review,
  toStored,
  type Scheduler,
} from "./scheduler";

let s: Scheduler;
beforeAll(async () => {
  s = await createScheduler({ enableFuzz: false });
});
const now = new Date("2026-11-23T10:00:00Z");

describe("review", () => {
  it("schedules a first-seen card and keeps the card id", () => {
    const { card, revlog } = review(s, { cardId: "f1/dns", prev: null, rating: "good", now });
    expect(card.reps).toBe(1);
    expect(card.dueAt.getTime()).toBeGreaterThan(now.getTime());
    expect(card.cardId).toBe("f1/dns");
    expect(revlog.reviewTime).toEqual(now);
  });

  it("brings an 'again' card back within minutes and counts the lapse on a review card", () => {
    const first = review(s, { cardId: "x", prev: null, rating: "good", now }).card;
    const later = first.dueAt;
    const missed = review(s, { cardId: "x", prev: first, rating: "again", now: later }).card;
    expect(missed.lapses).toBe(1);
    expect(missed.dueAt.getTime() - later.getTime()).toBeLessThan(2 * 60 * 60 * 1000);
  });

  it("orders intervals again < hard < good < easy", () => {
    const due = (r: "again" | "hard" | "good" | "easy") =>
      review(s, { cardId: "x", prev: null, rating: r, now }).card.dueAt.getTime();
    expect(due("again")).toBeLessThan(due("hard"));
    expect(due("hard")).toBeLessThan(due("good"));
    expect(due("good")).toBeLessThan(due("easy"));
  });
});

describe("stored round-trip", () => {
  it("survives JSON (as jsonb) and reviews identically", () => {
    const card = review(s, { cardId: "x", prev: null, rating: "good", now }).card;
    const stored = toStored(card);
    const fromDb = { ...stored, memory: JSON.parse(JSON.stringify(stored.memory)) };
    const restored = fromStored(fromDb);
    const at = card.dueAt;
    expect(review(s, { cardId: "x", prev: restored, rating: "good", now: at }).card).toEqual(
      review(s, { cardId: "x", prev: card, rating: "good", now: at }).card,
    );
    expect(stored.state).toBe("review");
  });
});

describe("previewIntervals", () => {
  it("labels all four ratings", () => {
    const p = previewIntervals(s, { cardId: "x", prev: null, now });
    expect(Object.keys(p).sort()).toEqual(["again", "easy", "good", "hard"]);
    expect(p.again).toBe("1m");
  });
});

describe("formatInterval", () => {
  it.each([
    [30_000, "1m"],
    [10 * 60_000, "10m"],
    [5 * 3_600_000, "5h"],
    [4 * 86_400_000, "4d"],
    [60 * 86_400_000, "2mo"],
    [548 * 86_400_000, "1.5y"],
  ])("%d ms → %s", (ms, label) => expect(formatInterval(ms)).toBe(label));
});
