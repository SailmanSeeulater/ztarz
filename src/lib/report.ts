import type { Card, ModuleId } from "./content/schema";
import type { RatingName } from "./srs/scheduler";
import { appTimeZone, startOfDay } from "./srs/day";

/**
 * The weekly report, computed from plain rows so it can be tested without a database:
 * how much you practised, how much you kept, where you're weakest, and what's coming due.
 */

const HOUR = 3_600_000;
const DAY = 24 * HOUR;

export type ReportInput = {
  cards: Card[];
  /** Reviews from the last 7 local days (older rows are ignored). */
  reviews: { cardId: string; rating: RatingName; reviewedAt: Date }[];
  /** Every scheduled card's next due time. */
  due: { cardId: string; due: Date }[];
  now: Date;
  timeZone?: string;
};

export type DayCount = { start: Date; label: string; count: number };

export type WeeklyReport = {
  from: Date;
  /** Reviews per local day, oldest first, ending today. */
  days: DayCount[];
  reviews: number;
  daysPractised: number;
  /** Share of reviews not rated "again", 0..1; null with no reviews. */
  kept: number | null;
  /** Modules with at least MIN_REVIEWS reviews and a miss, worst first. */
  weakest: { module: ModuleId; reviews: number; missed: number }[];
  /** Cards rated "again" this week, most misses first. */
  missedMost: { card: Card; missed: number }[];
  /** Cards coming due per local day, starting tomorrow. */
  comingUp: DayCount[];
  /** Already due (today or overdue). */
  dueNow: number;
};

const MIN_REVIEWS = 3;

/** Local midnights for the day `offset` days from the one containing `now` (noon avoids DST edges). */
function dayStart(now: Date, offset: number, timeZone: string) {
  const today = startOfDay(now, timeZone);
  return startOfDay(new Date(today.getTime() + offset * DAY + 12 * HOUR), timeZone);
}

export function buildWeeklyReport({ cards, reviews, due, now, timeZone = appTimeZone() }: ReportInput): WeeklyReport {
  const byId = new Map(cards.map((c) => [c.id, c]));
  const weekday = new Intl.DateTimeFormat("en-US", { weekday: "narrow", timeZone });
  const bucket = (offsets: number[]) =>
    offsets.map((o) => {
      const start = dayStart(now, o, timeZone);
      return { start, end: dayStart(now, o + 1, timeZone), label: weekday.format(start), count: 0 };
    });

  const past = bucket([-6, -5, -4, -3, -2, -1, 0]);
  const from = past[0].start;
  const inWeek = reviews.filter((r) => r.reviewedAt >= from && r.reviewedAt < past[6].end && byId.has(r.cardId));
  for (const r of inWeek) past.find((d) => r.reviewedAt >= d.start && r.reviewedAt < d.end)!.count++;

  const missedBy = new Map<string, number>();
  const perModule = new Map<ModuleId, { reviews: number; missed: number }>();
  for (const r of inWeek) {
    const m = byId.get(r.cardId)!.module;
    const p = perModule.get(m) ?? { reviews: 0, missed: 0 };
    p.reviews++;
    if (r.rating === "again") {
      p.missed++;
      missedBy.set(r.cardId, (missedBy.get(r.cardId) ?? 0) + 1);
    }
    perModule.set(m, p);
  }

  const future = bucket([1, 2, 3, 4, 5, 6, 7]);
  const tomorrow = future[0].start;
  let dueNow = 0;
  for (const d of due) {
    if (!byId.has(d.cardId)) continue;
    if (d.due < tomorrow) {
      dueNow++;
      continue;
    }
    const day = future.find((f) => d.due >= f.start && d.due < f.end);
    if (day) day.count++;
  }

  const missedTotal = inWeek.filter((r) => r.rating === "again").length;
  const strip = (ds: typeof past): DayCount[] => ds.map(({ start, label, count }) => ({ start, label, count }));
  return {
    from,
    days: strip(past),
    reviews: inWeek.length,
    daysPractised: past.filter((d) => d.count > 0).length,
    kept: inWeek.length ? 1 - missedTotal / inWeek.length : null,
    weakest: [...perModule]
      .filter(([, p]) => p.reviews >= MIN_REVIEWS && p.missed > 0)
      .map(([module, p]) => ({ module, ...p }))
      .sort((a, b) => b.missed / b.reviews - a.missed / a.reviews || b.missed - a.missed)
      .slice(0, 3),
    missedMost: [...missedBy]
      .map(([id, missed]) => ({ card: byId.get(id)!, missed }))
      .sort((a, b) => b.missed - a.missed || a.card.title.localeCompare(b.card.title))
      .slice(0, 5),
    comingUp: strip(future),
    dueNow,
  };
}
