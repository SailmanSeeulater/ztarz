import type { Card, CardType, ModuleId } from "./content/schema";
import { dayKey } from "./streak";

/**
 * Long-run numbers for the Progress page, computed from plain rows so it's testable:
 * a daily heatmap (the tracker), retention by week, accuracy by module and by card type,
 * time spent, and what's coming due.
 */

const DAY = 86_400_000;
const toTime = (key: string) => Date.parse(`${key}T00:00:00Z`);
const toKey = (t: number) => new Date(t).toISOString().slice(0, 10);
export const addDays = (key: string, n: number) => toKey(toTime(key) + n * DAY);
/** 0 = Sunday. Calendar-day keys carry no timezone, so UTC is the right way to read one. */
const weekdayOf = (key: string) => new Date(toTime(key)).getUTCDay();

export type AnalyticsInput = {
  cards: Card[];
  reviews: { cardId: string; rating: "again" | "hard" | "good" | "easy"; reviewedAt: Date; durationMs: number | null }[];
  states: { cardId: string; due: Date; mature: boolean }[];
  now: Date;
  timeZone: string;
  heatmapWeeks?: number;
  retentionWeeks?: number;
  forecastDays?: number;
};

export type Tally = { reviews: number; kept: number };
export type HeatDay = { day: string; count: number; future: boolean };

export type Analytics = {
  totals: { reviews: number; kept: number; timeMs: number; daysPractised: number; started: number; mature: number; cards: number };
  /** Columns are weeks (oldest first), rows Sunday to Saturday; the last column is this week. */
  heatmap: HeatDay[][];
  busiest: number;
  /** Oldest first; `start` is the week's Sunday. */
  retention: ({ start: string } & Tally)[];
  /** Weakest first, modules with at least MIN_REVIEWS reviews. */
  byModule: ({ module: ModuleId } & Tally)[];
  byType: ({ type: CardType } & Tally)[];
  forecast: { day: string; count: number }[];
  overdue: number;
};

const MIN_REVIEWS = 5;

export function buildAnalytics({
  cards,
  reviews,
  states,
  now,
  timeZone,
  heatmapWeeks = 26,
  retentionWeeks = 12,
  forecastDays = 14,
}: AnalyticsInput): Analytics {
  const byId = new Map(cards.map((c) => [c.id, c]));
  const today = dayKey(now, timeZone);
  const thisSunday = addDays(today, -weekdayOf(today));

  const perDay = new Map<string, number>();
  const perWeek = new Map<string, Tally>();
  const perModule = new Map<ModuleId, Tally>();
  const perType = new Map<CardType, Tally>();
  let kept = 0;
  let timeMs = 0;
  const bump = <K,>(m: Map<K, Tally>, k: K, ok: boolean) => {
    const t = m.get(k) ?? { reviews: 0, kept: 0 };
    t.reviews++;
    if (ok) t.kept++;
    m.set(k, t);
  };

  for (const r of reviews) {
    const ok = r.rating !== "again";
    const day = dayKey(r.reviewedAt, timeZone);
    perDay.set(day, (perDay.get(day) ?? 0) + 1);
    bump(perWeek, addDays(day, -weekdayOf(day)), ok);
    if (ok) kept++;
    // A tab left open isn't study time: cap each answer at five minutes.
    timeMs += Math.min(r.durationMs ?? 0, 5 * 60_000);
    const card = byId.get(r.cardId);
    if (card) {
      bump(perModule, card.module, ok);
      bump(perType, card.type, ok);
    }
  }

  const heatmap: HeatDay[][] = [];
  for (let w = heatmapWeeks - 1; w >= 0; w--) {
    const sunday = addDays(thisSunday, -7 * w);
    heatmap.push(
      Array.from({ length: 7 }, (_, d) => {
        const day = addDays(sunday, d);
        return { day, count: perDay.get(day) ?? 0, future: day > today };
      }),
    );
  }

  const retention = Array.from({ length: retentionWeeks }, (_, i) => {
    const start = addDays(thisSunday, -7 * (retentionWeeks - 1 - i));
    return { start, ...(perWeek.get(start) ?? { reviews: 0, kept: 0 }) };
  });

  const forecast = Array.from({ length: forecastDays }, (_, i) => ({ day: addDays(today, i + 1), count: 0 }));
  let overdue = 0;
  let started = 0;
  let mature = 0;
  for (const s of states) {
    if (!byId.has(s.cardId)) continue;
    started++;
    if (s.mature) mature++;
    const day = dayKey(s.due, timeZone);
    if (day <= today) overdue++;
    else {
      const slot = forecast.find((f) => f.day === day);
      if (slot) slot.count++;
    }
  }

  const rate = (t: Tally) => t.kept / t.reviews;
  return {
    totals: { reviews: reviews.length, kept, timeMs, daysPractised: perDay.size, started, mature, cards: cards.length },
    heatmap,
    busiest: Math.max(0, ...heatmap.flat().map((d) => d.count)),
    retention,
    byModule: [...perModule]
      .filter(([, t]) => t.reviews >= MIN_REVIEWS)
      .map(([module, t]) => ({ module, ...t }))
      .sort((a, b) => rate(a) - rate(b) || b.reviews - a.reviews),
    byType: [...perType].map(([type, t]) => ({ type, ...t })).sort((a, b) => rate(a) - rate(b)),
    forecast,
    overdue,
  };
}
