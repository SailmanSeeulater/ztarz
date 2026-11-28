import { dayKey } from "./streak";

export type ActivityKind =
  | "review"
  | "lab"
  | "signin"
  | "note.created"
  | "note.deleted"
  | "focus.changed"
  | "drill.finished"
  | "exam.finished";

export type ActivityEvent = { at: Date; kind: ActivityKind; summary: string; href?: string | null; missed?: boolean };

export type LogEntry =
  | { type: "event"; at: Date; kind: ActivityKind; summary: string; href?: string | null }
  /** A run of reviews with no long gap, folded into one line. */
  | { type: "study"; at: Date; until: Date; count: number; missed: number; cards: { summary: string; href?: string | null; missed: boolean }[] };

export type LogDay = { day: string; date: Date; entries: LogEntry[] };

/** Reviews closer together than this belong to the same sitting. */
const SITTING_GAP_MS = 20 * 60_000;

/** Newest first, grouped by local day, with each sitting's reviews folded together. */
export function buildLog(events: readonly ActivityEvent[], timeZone: string): LogDay[] {
  const sorted = [...events].sort((a, b) => b.at.getTime() - a.at.getTime());
  const days: LogDay[] = [];
  for (const e of sorted) {
    const key = dayKey(e.at, timeZone);
    let day = days.at(-1);
    if (!day || day.day !== key) {
      day = { day: key, date: e.at, entries: [] };
      days.push(day);
    }
    if (e.kind !== "review") {
      day.entries.push({ type: "event", at: e.at, kind: e.kind, summary: e.summary, href: e.href });
      continue;
    }
    const last = day.entries.at(-1);
    const card = { summary: e.summary, href: e.href, missed: !!e.missed };
    // Walking backwards in time: `at` is the sitting's start so far, so compare against that.
    if (last?.type === "study" && last.at.getTime() - e.at.getTime() <= SITTING_GAP_MS) {
      last.at = e.at;
      last.count++;
      last.missed += card.missed ? 1 : 0;
      last.cards.push(card);
    } else {
      day.entries.push({ type: "study", at: e.at, until: e.at, count: 1, missed: card.missed ? 1 : 0, cards: [card] });
    }
  }
  return days;
}
