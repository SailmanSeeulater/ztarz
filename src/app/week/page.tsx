import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ChevronRightIcon } from "@/components/icons";
import { ModuleArt } from "@/components/module-art";
import { Field, hueFor, moduleParts } from "@/components/pass";
import { isPrivate } from "@/lib/content";
import type { DayCount, WeeklyReport } from "@/lib/report";
import { appTimeZone } from "@/lib/srs/day";
import { getCurrentUser } from "@/lib/session";
import { getCaller } from "@/trpc/server";

export const metadata: Metadata = { title: "This week" };

export default function WeekPage() {
  return (
    <div>
      <Link
        href="/"
        className="-ml-1.5 inline-flex items-center gap-0.5 text-[0.9375rem] text-tint hover:opacity-80"
      >
        <ChevronRightIcon className="size-5 rotate-180" />
        Today
      </Link>
      <h1 className="mt-2 text-[2.125rem] leading-tight font-bold tracking-[-0.02em]">This week</h1>
      <Suspense fallback={<div className="pass mt-6 h-64 animate-pulse opacity-60" />}>
        <Report />
      </Suspense>
    </div>
  );
}

async function Report() {
  await getCurrentUser();
  const caller = await getCaller();
  const [r, streak] = await Promise.all([caller.session.week(), caller.session.streak()]);
  const fmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: appTimeZone() });
  const range = `${fmt.format(r.from)} – ${fmt.format(r.days.at(-1)!.start)}`;

  return (
    <div className="mt-6 space-y-9">
      <section className="pass px-5 pt-4 pb-5" data-hue="1">
        <p className="text-[0.9375rem] font-semibold">Weekly report</p>
        <h2 className="mt-6 text-[1.625rem] leading-tight font-semibold tracking-[-0.015em]">{range}</h2>
        <dl className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
          <Field label="Reviews">{r.reviews}</Field>
          <Field label="Days practised">{r.daysPractised} of 7</Field>
          <Field label="Kept">{r.kept === null ? "–" : `${Math.round(r.kept * 100)}%`}</Field>
          <Field label="Streak">
            {streak.current} {streak.current === 1 ? "day" : "days"}
            {streak.longest > streak.current && <span className="text-[var(--ink-2)]"> · best {streak.longest}</span>}
          </Field>
        </dl>
        <div className="mt-5 border-t border-[var(--well-strong)] pt-4">
          <DayBars days={r.days} label="Reviews each day" highlightLast />
        </div>
      </section>

      <Weakest report={r} />
      <MissedMost report={r} />

      <section>
        <SectionHead title="Coming up">
          {r.dueNow > 0 ? `${r.dueNow} due today` : "Nothing else due today"}
        </SectionHead>
        <div className="mt-3 rounded-2xl bg-group px-4 pt-4 pb-3">
          <DayBars days={r.comingUp} label="Cards coming due over the next seven days" tone="group" />
        </div>
      </section>
    </div>
  );
}

function SectionHead({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 px-1">
      <h2 className="text-[1.25rem] font-bold tracking-[-0.01em]">{title}</h2>
      {children && <p className="text-[0.8125rem] text-label-2">{children}</p>}
    </div>
  );
}

/** Seven columns, one per day, scaled to the busiest day; the count sits above each bar. */
function DayBars({
  days,
  label,
  tone = "pass",
  highlightLast = false,
}: {
  days: DayCount[];
  label: string;
  tone?: "pass" | "group";
  highlightLast?: boolean;
}) {
  const max = Math.max(1, ...days.map((d) => d.count));
  const bar = tone === "pass" ? "bg-[var(--ink)]" : "bg-tint";
  const empty = tone === "pass" ? "bg-[var(--well-strong)]" : "bg-sep";
  const muted = tone === "pass" ? "text-[var(--ink-2)]" : "text-label-2";
  return (
    <ol
      aria-label={`${label}: ${days.map((d) => d.count).join(", ")}`}
      className="grid grid-cols-7 items-end gap-2"
    >
      {days.map((d, i) => (
        <li key={d.start.toISOString()} className="flex flex-col items-center gap-1.5" aria-hidden>
          <span className={`text-[0.6875rem] font-semibold tabular-nums ${d.count ? "" : muted}`}>{d.count || ""}</span>
          <span className="flex h-16 w-full items-end">
            <span
              className={`w-full rounded-[0.3rem] ${d.count ? bar : empty}`}
              style={{ height: d.count ? `${Math.max(10, (d.count / max) * 100)}%` : "3px" }}
            />
          </span>
          <span
            className={`text-[0.6875rem] font-semibold ${highlightLast && i === days.length - 1 ? "" : muted}`}
          >
            {d.label}
          </span>
        </li>
      ))}
    </ol>
  );
}

function Weakest({ report }: { report: WeeklyReport }) {
  return (
    <section>
      <SectionHead title="Weakest topics">Most misses per review</SectionHead>
      {report.weakest.length === 0 ? (
        <p className="mt-3 rounded-2xl bg-group px-4 py-3.5 text-[0.9375rem] text-label-2">
          {report.reviews < 3
            ? "Do a few sessions and your weak spots show up here."
            : "Nothing stands out: you kept everything you reviewed."}
        </p>
      ) : (
        <ul className="mt-3 overflow-hidden rounded-2xl bg-group">
          {report.weakest.map((w) => {
            const { code, name } = moduleParts(w.module);
            const rate = w.missed / w.reviews;
            return (
              <li key={w.module} className="flex items-center gap-3 border-b border-sep px-4 py-3 last:border-b-0">
                <span className="pass grid size-10 shrink-0 place-items-center rounded-xl" data-hue={hueFor(w.module)}>
                  <ModuleArt id={w.module} strokeWidth={2.75} className="size-7" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[0.9375rem] font-medium">
                    <span className="mr-1.5 text-label-2">{code}</span>
                    {name}
                  </span>
                  <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-sep">
                    <span className="block h-full rounded-full bg-bad" style={{ width: `${rate * 100}%` }} />
                  </span>
                </span>
                <span className="shrink-0 text-right text-[0.8125rem] text-label-2 tabular-nums">
                  {w.missed} of {w.reviews}
                  <br />
                  missed
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

function MissedMost({ report }: { report: WeeklyReport }) {
  if (report.missedMost.length === 0) return null;
  return (
    <section>
      <SectionHead title="Missed most">
        <Link href="/drill" className="text-tint hover:opacity-80">
          Drill what you&apos;ve missed ›
        </Link>
      </SectionHead>
      <ul className="mt-3 overflow-hidden rounded-2xl bg-group">
        {report.missedMost.map(({ card, missed }) => {
          const row = (
            <span className="flex min-w-0 flex-1 items-center gap-3 border-b border-sep py-3 pr-3 group-last/row:border-b-0">
              <span className="min-w-0 flex-1 text-[0.9375rem]">{card.title}</span>
              <span className="shrink-0 text-[0.8125rem] text-bad tabular-nums">{missed}×</span>
              {!isPrivate(card.id) && <ChevronRightIcon className="size-4 shrink-0 text-label-2" />}
            </span>
          );
          return (
            <li key={card.id} className="group/row">
              {isPrivate(card.id) ? (
                <span className="flex pl-4">{row}</span>
              ) : (
                <Link href={`/cards/${card.id}`} className="flex pl-4 transition-colors hover:bg-group-2">
                  {row}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
