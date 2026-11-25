import { describe, expect, it } from "vitest";
import type { Card, CardType, ModuleId } from "./content/schema";
import { buildWeeklyReport } from "./report";

const card = (id: string, module: ModuleId, type: CardType = "mcq"): Card => ({
  id,
  title: id,
  module,
  type,
  source: "https://example.com",
  tags: [],
  stack: [],
  sections: [],
});
const cards = [card("f1/a", "f1"), card("f1/b", "f1"), card("f6/c", "f6"), card("f6/d", "f6")];
const tz = "America/Los_Angeles";
// Wednesday 25 Nov 2026, 10:00 in Los Angeles
const now = new Date("2026-11-25T18:00:00Z");
const at = (iso: string) => new Date(iso);

describe("buildWeeklyReport", () => {
  it("counts reviews per local day and the share kept", () => {
    const r = buildWeeklyReport({
      cards,
      now,
      timeZone: tz,
      due: [],
      reviews: [
        { cardId: "f1/a", rating: "good", reviewedAt: at("2026-11-25T17:00:00Z") }, // today 09:00
        { cardId: "f1/b", rating: "again", reviewedAt: at("2026-11-25T07:30:00Z") }, // yesterday 23:30 local
        { cardId: "f6/c", rating: "easy", reviewedAt: at("2026-11-19T09:00:00Z") }, // Thu 19th 01:00, first day
        { cardId: "f6/c", rating: "good", reviewedAt: at("2026-11-18T09:00:00Z") }, // before the window
      ],
    });
    expect(r.days.map((d) => d.count)).toEqual([1, 0, 0, 0, 0, 1, 1]);
    expect(r.days.at(-1)!.label).toBe("W");
    expect(r.reviews).toBe(3);
    expect(r.daysPractised).toBe(3);
    expect(r.kept).toBeCloseTo(2 / 3);
  });

  it("ranks weak modules by miss rate and lists the cards missed most", () => {
    const review = (cardId: string, rating: "again" | "good") => ({ cardId, rating, reviewedAt: at("2026-11-24T20:00:00Z") });
    const r = buildWeeklyReport({
      cards,
      now,
      timeZone: tz,
      due: [],
      reviews: [
        review("f1/a", "again"),
        review("f1/a", "again"),
        review("f1/b", "good"),
        review("f6/c", "again"),
        review("f6/c", "good"),
        review("f6/d", "good"),
        review("f6/d", "good"),
      ],
    });
    expect(r.weakest).toEqual([
      { module: "f1", reviews: 3, missed: 2 },
      { module: "f6", reviews: 4, missed: 1 },
    ]);
    expect(r.missedMost.map((m) => [m.card.id, m.missed])).toEqual([
      ["f1/a", 2],
      ["f6/c", 1],
    ]);
  });

  it("buckets upcoming due cards from tomorrow, and counts what's due now", () => {
    const r = buildWeeklyReport({
      cards,
      now,
      timeZone: tz,
      reviews: [],
      due: [
        { cardId: "f1/a", due: at("2026-11-20T00:00:00Z") }, // overdue
        { cardId: "f1/b", due: at("2026-11-26T07:00:00Z") }, // today 23:00 local
        { cardId: "f6/c", due: at("2026-11-26T09:00:00Z") }, // tomorrow
        { cardId: "f6/d", due: at("2026-12-30T00:00:00Z") }, // beyond the week
        { cardId: "gone/x", due: at("2026-11-26T09:00:00Z") }, // card file deleted
      ],
    });
    expect(r.dueNow).toBe(2);
    expect(r.comingUp.map((d) => d.count)).toEqual([1, 0, 0, 0, 0, 0, 0]);
    expect(r.kept).toBeNull();
  });
});
