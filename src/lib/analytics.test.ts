import { describe, expect, it } from "vitest";
import { buildAnalytics } from "./analytics";
import type { Card, CardType, ModuleId } from "./content/schema";

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
const cards = [card("f1/a", "f1"), card("f1/b", "f1", "concept"), card("go/a", "go")];
// Wednesday 25 Nov 2026, 10:00 UTC
const now = new Date("2026-11-25T10:00:00Z");
const rev = (cardId: string, iso: string, rating: "again" | "good" = "good", durationMs: number | null = 10_000) => ({
  cardId,
  rating,
  reviewedAt: new Date(iso),
  durationMs,
});
const base = { cards, now, timeZone: "UTC", states: [] };

describe("buildAnalytics", () => {
  it("lays the heatmap out in weeks from Sunday, ending this week, with the future marked", () => {
    const a = buildAnalytics({ ...base, reviews: [rev("f1/a", "2026-11-25T09:00:00Z"), rev("f1/a", "2026-11-25T09:01:00Z"), rev("f1/a", "2026-11-16T09:00:00Z")], heatmapWeeks: 3 });
    expect(a.heatmap).toHaveLength(3);
    expect(a.heatmap[2].map((d) => d.day)[0]).toBe("2026-11-22"); // this week's Sunday
    expect(a.heatmap[2][3]).toEqual({ day: "2026-11-25", count: 2, future: false });
    expect(a.heatmap[2][4].future).toBe(true);
    expect(a.heatmap[1][1]).toMatchObject({ day: "2026-11-16", count: 1 });
    expect(a.busiest).toBe(2);
    expect(a.totals.daysPractised).toBe(2);
  });

  it("totals reviews, retention and time, capping an answer left open", () => {
    const a = buildAnalytics({
      ...base,
      reviews: [rev("f1/a", "2026-11-25T09:00:00Z", "again"), rev("f1/a", "2026-11-24T09:00:00Z", "good", 3_600_000), rev("gone/x", "2026-11-24T09:00:00Z", "good", null)],
    });
    expect(a.totals).toMatchObject({ reviews: 3, kept: 2, timeMs: 10_000 + 300_000 });
    expect(a.retention.at(-1)).toEqual({ start: "2026-11-22", reviews: 3, kept: 2 });
    expect(a.retention).toHaveLength(12);
  });

  it("ranks modules weakest first once they have enough reviews, and splits by type", () => {
    const five = (id: string, misses: number) =>
      Array.from({ length: 5 }, (_, i) => rev(id, "2026-11-24T09:00:00Z", i < misses ? "again" : "good"));
    const a = buildAnalytics({ ...base, reviews: [...five("f1/a", 1), ...five("go/a", 3), rev("f1/b", "2026-11-24T09:00:00Z")] });
    expect(a.byModule).toEqual([
      { module: "go", reviews: 5, kept: 2 },
      { module: "f1", reviews: 6, kept: 5 },
    ]);
    expect(a.byType.find((t) => t.type === "concept")).toEqual({ type: "concept", reviews: 1, kept: 1 });
  });

  it("forecasts what's coming due and counts what's already due", () => {
    const a = buildAnalytics({
      ...base,
      reviews: [],
      states: [
        { cardId: "f1/a", due: new Date("2026-11-20T00:00:00Z"), mature: false },
        { cardId: "f1/b", due: new Date("2026-11-26T12:00:00Z"), mature: true },
        { cardId: "go/a", due: new Date("2027-03-01T00:00:00Z"), mature: true },
        { cardId: "gone/x", due: new Date("2026-11-26T12:00:00Z"), mature: true },
      ],
    });
    expect(a.overdue).toBe(1);
    expect(a.forecast[0]).toEqual({ day: "2026-11-26", count: 1 });
    expect(a.forecast).toHaveLength(14);
    expect(a.totals).toMatchObject({ started: 3, mature: 2, cards: 3 });
  });
});
