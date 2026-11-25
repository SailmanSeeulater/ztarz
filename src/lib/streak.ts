/**
 * The daily streak: consecutive local days with at least one review. Today counts once you've
 * practised; until then a streak that reached yesterday is still alive ("practise to keep it").
 * Works on calendar-day keys ("2026-11-25"), so DST never makes a day 23 or 25 hours long.
 */

export type Streak = {
  /** Consecutive days up to today (or yesterday, if today isn't done yet). */
  current: number;
  longest: number;
  practisedToday: boolean;
};

const DAY = 86_400_000;
const toTime = (key: string) => Date.parse(`${key}T00:00:00Z`);
const toKey = (t: number) => new Date(t).toISOString().slice(0, 10);

/** The local calendar day of an instant, as "YYYY-MM-DD". */
export const dayKey = (at: Date, timeZone: string) =>
  new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(at);

export function buildStreak(days: Iterable<string>, today: string): Streak {
  const set = new Set(days);
  const practisedToday = set.has(today);

  let current = 0;
  for (let t = toTime(today) - (practisedToday ? 0 : DAY); set.has(toKey(t)); t -= DAY) current++;

  let longest = 0;
  let run = 0;
  let prev = NaN;
  for (const t of [...set].map(toTime).sort((a, b) => a - b)) {
    run = t - prev === DAY ? run + 1 : 1;
    longest = Math.max(longest, run);
    prev = t;
  }
  return { current, longest, practisedToday };
}
