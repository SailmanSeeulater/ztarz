import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ProgressTabs } from "@/components/progress-tabs";
import type { ActivityKind, LogEntry } from "@/lib/activity";
import { appTimeZone } from "@/lib/srs/day";
import { getCurrentUser } from "@/lib/session";
import { getCaller } from "@/trpc/server";

export const metadata: Metadata = { title: "Activity log" };

export default function LogPage() {
  return (
    <div>
      <h1 className="text-[2.125rem] leading-tight font-bold tracking-[-0.02em]">Progress</h1>
      <ProgressTabs active="log" />
      <p className="mt-4 max-w-[60ch] text-[0.9375rem] text-label-2">
        Everything you&apos;ve done here, newest first: study sittings, drills, exams, labs, notes, focus changes and
        sign-ins.
      </p>
      <Suspense fallback={<div className="mt-6 h-72 animate-pulse rounded-2xl bg-group" />}>
        <Log />
      </Suspense>
    </div>
  );
}

const LABEL: Record<ActivityKind, string> = {
  review: "Study",
  lab: "Lab",
  signin: "Account",
  "note.created": "Note",
  "note.deleted": "Note",
  "focus.changed": "Focus",
  "drill.finished": "Drill",
  "exam.finished": "Exam",
};

async function Log() {
  await getCurrentUser();
  const days = await (await getCaller()).activity.log();
  const tz = appTimeZone();
  const dayFmt = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "short", day: "numeric", timeZone: tz });
  const time = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: tz });

  if (days.length === 0) {
    return <p className="mt-6 rounded-2xl bg-group px-4 py-3.5 text-[0.9375rem] text-label-2">Nothing yet. It fills in as you go.</p>;
  }
  return (
    <div className="mt-6 space-y-7">
      {days.map((d) => (
        <section key={d.day} aria-label={dayFmt.format(d.date)}>
          <h2 className="px-1 text-[0.8125rem] font-semibold tracking-wide text-label-2">{dayFmt.format(d.date)}</h2>
          <ul className="mt-2 overflow-hidden rounded-2xl bg-group">
            {d.entries.map((e, i) => (
              <li key={i} className="border-b border-sep last:border-b-0">
                <Entry e={e} time={(at) => time.format(at)} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function Row({ at, label, children }: { at: string; label: string; children: React.ReactNode }) {
  return (
    <span className="flex items-baseline gap-3 px-4 py-2.5">
      <span className="w-[4.5rem] shrink-0 text-[0.8125rem] text-label-2 tabular-nums">{at}</span>
      <span className="w-14 shrink-0 text-[0.75rem] font-semibold text-label-2">{label}</span>
      <span className="min-w-0 flex-1 text-[0.9375rem]">{children}</span>
    </span>
  );
}

function Entry({ e, time }: { e: LogEntry; time: (at: Date) => string }) {
  if (e.type === "event") {
    const row = (
      <Row at={time(e.at)} label={LABEL[e.kind]}>
        {e.summary}
      </Row>
    );
    return e.href ? (
      <Link href={e.href} prefetch={false} className="block transition-colors hover:bg-group-2">
        {row}
      </Link>
    ) : (
      row
    );
  }
  const mins = Math.max(1, Math.round((e.until.getTime() - e.at.getTime()) / 60_000));
  return (
    <details className="group/sit">
      <summary className="cursor-pointer list-none transition-colors hover:bg-group-2 [&::-webkit-details-marker]:hidden">
        <Row at={time(e.at)} label="Study">
          Reviewed {e.count} {e.count === 1 ? "card" : "cards"}
          <span className="text-label-2">
            {e.count > 1 && ` in ${mins} min`}
            {e.missed > 0 && ` · ${e.missed} missed`}
          </span>
          <span className="ml-2 text-[0.8125rem] text-tint group-open/sit:hidden">Show</span>
        </Row>
      </summary>
      {/* Stored newest first; read a sitting top to bottom in the order you answered. */}
      <ol className="border-t border-sep bg-group-2/40 py-1.5 pr-4 pl-[10.25rem] text-[0.875rem]">
        {e.cards.toReversed().map((c, i) => (
          <li key={i} className={`py-0.5 ${c.missed ? "text-bad" : ""}`}>
            {c.href ? (
              <Link href={c.href} prefetch={false} className="hover:underline">
                {c.summary}
              </Link>
            ) : (
              c.summary
            )}
          </li>
        ))}
      </ol>
    </details>
  );
}
