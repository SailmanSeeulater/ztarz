import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ChevronRightIcon } from "@/components/icons";
import { Field, moduleParts } from "@/components/pass";
import { ProgressTabs } from "@/components/progress-tabs";
import { TYPE_LABEL } from "@/components/type-label";
import type { Analytics, Tally } from "@/lib/analytics";
import { PASS_MARK } from "@/lib/exam";
import { getCurrentUser } from "@/lib/session";
import { getCaller } from "@/trpc/server";

export const metadata: Metadata = { title: "Progress" };

export default function ProgressPage() {
  return (
    <div>
      <h1 className="text-[2.125rem] leading-tight font-bold tracking-[-0.02em]">Progress</h1>
      <ProgressTabs active="overview" />
      <Suspense fallback={<div className="pass mt-6 h-72 animate-pulse opacity-60" />}>
        <Overview />
      </Suspense>
    </div>
  );
}

const pct = (t: Tally) => Math.round((t.kept / t.reviews) * 100);
const hours = (ms: number) => {
  const m = Math.round(ms / 60_000);
  return m < 60 ? `${m} min` : `${Math.floor(m / 60)}h ${m % 60}m`;
};
// Keys are calendar days with no timezone, so format them as UTC.
const shortDate = (key: string) =>
  new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(`${key}T00:00:00Z`));

async function Overview() {
  await getCurrentUser();
  const caller = await getCaller();
  const [a, streak, exams] = await Promise.all([caller.session.analytics(), caller.session.streak(), caller.exam.history()]);
  const t = a.totals;

  return (
    <div className="mt-6 space-y-9">
      <section className="pass px-5 pt-4 pb-5" data-hue="3">
        <p className="text-[0.9375rem] font-semibold">All time</p>
        <dl className="mt-5 grid grid-cols-2 gap-x-7 gap-y-4 sm:grid-cols-4">
          <Field label="Reviews">{t.reviews.toLocaleString()}</Field>
          <Field label="Kept">{t.reviews ? `${pct(t)}%` : "–"}</Field>
          <Field label="Time studied">{hours(t.timeMs)}</Field>
          <Field label="Days practised">{t.daysPractised}</Field>
          <Field label="Streak">
            {streak.current} {streak.current === 1 ? "day" : "days"}
          </Field>
          <Field label="Best streak">{streak.longest}</Field>
          <Field label="Cards started">
            {t.started} of {t.cards}
          </Field>
          <Field label="Mature">{t.mature}</Field>
        </dl>
        <div className="mt-5 border-t border-[var(--well-strong)] pt-4">
          <Heatmap a={a} />
        </div>
      </section>

      <section>
        <Head title="Retention by week">Share of reviews you kept</Head>
        <div className="mt-3 rounded-2xl bg-group px-4 pt-4 pb-3">
          <ol className="grid items-end gap-1.5" style={{ gridTemplateColumns: `repeat(${a.retention.length}, minmax(0, 1fr))` }} aria-label="Retention for each of the last weeks, oldest first">
            {a.retention.map((w) => (
              <li key={w.start} className="flex flex-col items-center gap-1.5" title={`Week of ${shortDate(w.start)}: ${w.reviews ? `${pct(w)}% of ${w.reviews}` : "no reviews"}`}>
                <span className="text-[0.625rem] font-semibold text-label-2 tabular-nums">{w.reviews ? pct(w) : ""}</span>
                <span className="flex h-20 w-full items-end">
                  <span
                    className={`w-full rounded-[0.3rem] ${w.reviews ? (w.kept / w.reviews >= 0.85 ? "bg-good" : "bg-tint") : "bg-sep"}`}
                    style={{ height: w.reviews ? `${Math.max(6, pct(w))}%` : "3px" }}
                  />
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-2 flex justify-between text-[0.6875rem] text-label-2">
            <span>{shortDate(a.retention[0].start)}</span>
            <span>this week</span>
          </p>
        </div>
      </section>

      <section>
        <Head title="By module">Weakest first · at least 5 reviews</Head>
        {a.byModule.length === 0 ? (
          <Empty>Review a few more cards and your accuracy per module shows up here.</Empty>
        ) : (
          <ul className="mt-3 overflow-hidden rounded-2xl bg-group">
            {a.byModule.map((m) => (
              <li key={m.module} className="flex items-center gap-3 border-b border-sep px-4 py-2.5 last:border-b-0">
                <span className="w-40 shrink-0 truncate text-[0.9375rem]">{moduleParts(m.module).name}</span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-sep">
                  <span className={`block h-full rounded-full ${pct(m) >= 85 ? "bg-good" : pct(m) >= 70 ? "bg-tint" : "bg-bad"}`} style={{ width: `${pct(m)}%` }} />
                </span>
                <span className="w-24 shrink-0 text-right text-[0.8125rem] text-label-2 tabular-nums">
                  {pct(m)}% of {m.reviews}
                </span>
                <Link href={`/drill?m=${m.module}`} prefetch={false} className="shrink-0 text-[0.8125rem] font-medium text-tint hover:opacity-80">
                  Drill
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {a.byType.length > 0 && (
        <section>
          <Head title="By question type" />
          <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {a.byType.map((ty) => (
              <li key={ty.type} className="rounded-2xl bg-group px-4 py-3">
                <p className="text-[0.8125rem] text-label-2">{TYPE_LABEL[ty.type]}</p>
                <p className="mt-0.5 text-[1.25rem] font-semibold tabular-nums">{pct(ty)}%</p>
                <p className="text-[0.75rem] text-label-2 tabular-nums">{ty.reviews} reviews</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <Head title="Coming due">{a.overdue > 0 ? `${a.overdue} due now` : "Nothing due right now"}</Head>
        <div className="mt-3 rounded-2xl bg-group px-4 pt-4 pb-3">
          <ol className="grid items-end gap-1.5" style={{ gridTemplateColumns: `repeat(${a.forecast.length}, minmax(0, 1fr))` }} aria-label={`Cards due each day for the next ${a.forecast.length} days: ${a.forecast.map((f) => f.count).join(", ")}`}>
            {a.forecast.map((f) => {
              const max = Math.max(1, ...a.forecast.map((x) => x.count));
              return (
                <li key={f.day} className="flex flex-col items-center gap-1.5" title={`${shortDate(f.day)}: ${f.count}`}>
                  <span className="text-[0.625rem] font-semibold text-label-2 tabular-nums">{f.count || ""}</span>
                  <span className="flex h-14 w-full items-end">
                    <span className={`w-full rounded-[0.3rem] ${f.count ? "bg-tint" : "bg-sep"}`} style={{ height: f.count ? `${Math.max(10, (f.count / max) * 100)}%` : "3px" }} />
                  </span>
                </li>
              );
            })}
          </ol>
          <p className="mt-2 flex justify-between text-[0.6875rem] text-label-2">
            <span>tomorrow</span>
            <span>{shortDate(a.forecast.at(-1)!.day)}</span>
          </p>
        </div>
      </section>

      <section>
        <Head title="Exams">
          <Link href="/exams" className="text-tint hover:opacity-80">
            Take one ›
          </Link>
        </Head>
        {exams.length === 0 ? (
          <Empty>No exams yet. A timed paper is the honest check on what the reviews say.</Empty>
        ) : (
          <ul className="mt-3 overflow-hidden rounded-2xl bg-group">
            {exams.slice(0, 5).map((e) => {
              const p = Math.round((e.correct / e.total) * 100);
              return (
                <li key={e.id} className="group/row">
                  <Link href={`/exams/${e.id}`} className="flex items-center gap-3 pl-4 transition-colors hover:bg-group-2">
                    <span className="flex min-w-0 flex-1 items-center gap-3 border-b border-sep py-2.5 pr-3 group-last/row:border-b-0">
                      <span className={`w-12 shrink-0 font-semibold tabular-nums ${p >= PASS_MARK * 100 ? "text-good" : "text-bad"}`}>{p}%</span>
                      <span className="min-w-0 flex-1 truncate text-[0.9375rem]">{e.scopeLabel}</span>
                      <span className="shrink-0 text-[0.8125rem] text-label-2 tabular-nums">
                        {e.correct}/{e.total}
                      </span>
                      <ChevronRightIcon className="size-4 shrink-0 text-label-2" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}

function Head({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 px-1">
      <h2 className="text-[1.25rem] font-bold tracking-[-0.01em]">{title}</h2>
      {children && <p className="text-[0.8125rem] text-label-2">{children}</p>}
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 rounded-2xl bg-group px-4 py-3.5 text-[0.9375rem] text-label-2">{children}</p>;
}

/** The tracker: one square per day, darker for more reviews, weeks as columns from Sunday down. */
function Heatmap({ a }: { a: Analytics }) {
  const level = (n: number) => (n === 0 ? 0 : Math.min(4, Math.ceil((n / Math.max(1, a.busiest)) * 4)));
  const OPACITY = ["", "opacity-30", "opacity-50", "opacity-75", "opacity-100"];
  const practised = a.heatmap.flat().filter((d) => d.count > 0).length;
  return (
    <figure>
      <div
        role="img"
        aria-label={`Practice over the last ${a.heatmap.length} weeks: reviews on ${practised} days`}
        className="grid grid-flow-col grid-rows-7 gap-[3px]"
        style={{ gridTemplateColumns: `repeat(${a.heatmap.length}, minmax(0, 1fr))` }}
      >
        {a.heatmap.flat().map((d) => (
          <span
            key={d.day}
            title={d.future ? undefined : `${shortDate(d.day)}: ${d.count} ${d.count === 1 ? "review" : "reviews"}`}
            className={`aspect-square rounded-[3px] ${d.future ? "opacity-0" : d.count ? `bg-[var(--ink)] ${OPACITY[level(d.count)]}` : "bg-[var(--well-strong)]"}`}
          />
        ))}
      </div>
      <figcaption className="mt-2 flex items-center justify-between text-[0.6875rem] text-[var(--ink-2)]">
        <span>{shortDate(a.heatmap[0][0].day)}</span>
        <span className="flex items-center gap-1">
          less
          {[1, 2, 3, 4].map((l) => (
            <span key={l} className={`size-2.5 rounded-[2px] bg-[var(--ink)] ${OPACITY[l]}`} />
          ))}
          more
        </span>
        <span>today</span>
      </figcaption>
    </figure>
  );
}
