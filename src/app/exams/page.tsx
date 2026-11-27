import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ChevronRightIcon } from "@/components/icons";
import { moduleParts } from "@/components/pass";
import { allCards } from "@/lib/content";
import { MODULE_GROUPS, type ModuleId } from "@/lib/content/schema";
import { EXAM_SIZES, PASS_MARK, SECONDS_PER_QUESTION, examPool } from "@/lib/exam";
import { appTimeZone } from "@/lib/srs/day";
import { getCurrentUser } from "@/lib/session";
import { getCaller } from "@/trpc/server";

export const metadata: Metadata = { title: "Exams" };

export default function ExamsPage() {
  return (
    <div>
      <h1 className="text-[2.125rem] leading-tight font-bold tracking-[-0.02em]">Exams</h1>
      <p className="mt-1 max-w-[60ch] text-[0.9375rem] text-label-2">
        A timed paper of multiple-choice and bug-hunt questions: {SECONDS_PER_QUESTION} seconds a question, no feedback
        until you hand it in, {Math.round(PASS_MARK * 100)}% to pass. Exams don&apos;t change your card schedule.
      </p>
      <Suspense fallback={<div className="mt-6 h-64 animate-pulse rounded-2xl bg-group" />}>
        <Exams />
      </Suspense>
    </div>
  );
}

async function Exams() {
  await getCurrentUser();
  const caller = await getCaller();
  const [history, prefs] = await Promise.all([caller.exam.history(), caller.prefs.get()]);
  const count = (modules: Set<ModuleId> | null) => examPool(allCards(), modules).length;
  const fmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: appTimeZone() });
  const field = "w-full rounded-xl bg-group-2 px-3 py-2.5 text-[0.9375rem] outline-none focus-visible:ring-2 focus-visible:ring-tint";

  return (
    <>
      {/* A plain GET form: the paper is drawn on the server when the run page loads. */}
      <form action="/exams/run" className="mt-6 rounded-2xl bg-group px-4 py-4">
        <div className="grid gap-3 sm:grid-cols-[1fr_9rem]">
          <label className="block">
            <span className="text-[0.8125rem] font-medium text-label-2">What on</span>
            <select name="scope" defaultValue={prefs.focus.length ? "focus" : "all"} className={`mt-1 ${field}`}>
              <option value="all">Everything ({count(null)} questions)</option>
              {prefs.focus.length > 0 && <option value="focus">Your focus ({count(new Set(prefs.focus))})</option>}
              {MODULE_GROUPS.map((g) => (
                <optgroup key={g.id} label={g.title}>
                  <option value={`g:${g.id}`}>
                    All of {g.title} ({count(new Set<ModuleId>(g.modules))})
                  </option>
                  {g.modules
                    .filter((id: ModuleId) => count(new Set([id])) > 0)
                    .map((id: ModuleId) => (
                      <option key={id} value={id}>
                        {moduleParts(id).name} ({count(new Set([id]))})
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-[0.8125rem] font-medium text-label-2">Questions</span>
            <select name="n" defaultValue={EXAM_SIZES[0]} className={`mt-1 ${field}`}>
              {EXAM_SIZES.map((n) => (
                <option key={n} value={n}>
                  {n} · {Math.round((n * SECONDS_PER_QUESTION) / 60)} min
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit" className="mt-4 w-full rounded-xl bg-tint px-4 py-2.5 text-[0.9375rem] font-semibold text-tint-ink">
          Start exam
        </button>
      </form>

      <h2 className="mt-9 px-1 text-[1.25rem] font-bold tracking-[-0.01em]">Past exams</h2>
      {history.length === 0 ? (
        <p className="mt-3 rounded-2xl bg-group px-4 py-3.5 text-[0.9375rem] text-label-2">None yet. Your results will be kept here.</p>
      ) : (
        <ul className="mt-3 overflow-hidden rounded-2xl bg-group">
          {history.map((h) => {
            const pct = Math.round((h.correct / h.total) * 100);
            return (
              <li key={h.id} className="group/row">
                <Link href={`/exams/${h.id}`} className="flex items-center gap-3 pl-4 transition-colors hover:bg-group-2">
                  <span className="flex min-w-0 flex-1 items-center gap-3 border-b border-sep py-3 pr-3 group-last/row:border-b-0">
                    <span className={`w-12 shrink-0 text-[1.0625rem] font-semibold tabular-nums ${pct >= PASS_MARK * 100 ? "text-good" : "text-bad"}`}>
                      {pct}%
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.9375rem]">{h.scopeLabel}</span>
                      <span className="mt-0.5 block text-[0.8125rem] text-label-2 tabular-nums">
                        {h.correct} of {h.total} · {fmt.format(h.createdAt)}
                      </span>
                    </span>
                    <ChevronRightIcon className="size-4 shrink-0 text-label-2" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
