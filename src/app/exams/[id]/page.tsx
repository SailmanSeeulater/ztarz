import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CheckIcon, ChevronLeftIcon, CrossIcon } from "@/components/icons";
import { Field, moduleParts } from "@/components/pass";
import { getCard, isPrivate } from "@/lib/content";
import { PASS_MARK, gradeExam } from "@/lib/exam";
import { appTimeZone } from "@/lib/srs/day";
import { getCurrentUser } from "@/lib/session";
import { getCaller } from "@/trpc/server";

export const metadata: Metadata = { title: "Exam result" };

export default function ExamResultPage({ params }: PageProps<"/exams/[id]">) {
  return (
    <div>
      <Link href="/exams" className="-ml-1.5 inline-flex items-center gap-0.5 text-[0.9375rem] text-tint hover:opacity-80">
        <ChevronLeftIcon className="size-5" />
        Exams
      </Link>
      <Suspense fallback={<div className="pass mt-4 h-64 animate-pulse opacity-60" />}>
        <Result params={params} />
      </Suspense>
    </div>
  );
}

const mins = (ms: number) => `${Math.floor(ms / 60_000)}m ${String(Math.round((ms % 60_000) / 1000)).padStart(2, "0")}s`;

async function Result({ params }: { params: PageProps<"/exams/[id]">["params"] }) {
  const { id } = await params;
  await getCurrentUser();
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const attempt = await (await getCaller()).exam.get({ id });
  if (!attempt) notFound();

  // Shown as it was marked on the day; the breakdown is rebuilt from the cards as they are now.
  const g = gradeExam(getCard, attempt.answers);
  const pct = Math.round((attempt.correct / attempt.total) * 100);
  const passed = attempt.correct / attempt.total >= PASS_MARK;
  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short", timeZone: appTimeZone() }).format(attempt.createdAt);

  return (
    <>
      <section className="pass mt-4 px-5 pt-4 pb-5" data-hue={passed ? "2" : "1"}>
        <p className="text-[0.9375rem] font-semibold">Exam · {attempt.scopeLabel}</p>
        <h1 className="mt-6 text-[2.75rem] leading-none font-semibold tracking-[-0.02em] tabular-nums">{pct}%</h1>
        <p className="mt-1.5 text-[1.0625rem] font-semibold">{passed ? "Passed" : `Not yet: ${Math.round(PASS_MARK * 100)}% passes`}</p>
        <dl className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
          <Field label="Right">
            {attempt.correct} of {attempt.total}
          </Field>
          <Field label="Time">
            {mins(attempt.durationMs)} of {mins(attempt.limitMs)}
          </Field>
          <Field label="Taken">{date}</Field>
        </dl>
        {g.perModule.length > 1 && (
          <ul className="mt-5 space-y-2.5 border-t border-[var(--well-strong)] pt-4">
            {g.perModule.map((m) => (
              <li key={m.module} className="flex items-center gap-3 text-[0.875rem]">
                <span className="w-40 shrink-0 truncate">{moduleParts(m.module).name}</span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--well-strong)]">
                  <span className="block h-full rounded-full bg-[var(--ink)]" style={{ width: `${(m.correct / m.total) * 100}%` }} />
                </span>
                <span className="w-10 shrink-0 text-right tabular-nums">
                  {m.correct}/{m.total}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <h2 className="mt-9 px-1 text-[1.25rem] font-bold tracking-[-0.01em]">Question by question</h2>
      <ol className="mt-3 space-y-3">
        {g.items.map(({ card, picked, correct }, i) => {
          const right = card.choices!.find((c) => c.correct)!;
          const mine = picked === null ? null : card.choices![picked];
          const explanation = card.sections.find((s) => s.key === "explanation");
          return (
            <li key={card.id} className="rounded-2xl bg-group px-4 py-3.5">
              <div className="flex items-start gap-2.5">
                <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-white ${correct ? "bg-good" : "bg-bad"}`}>
                  {correct ? <CheckIcon className="size-3.5" /> : <CrossIcon className="size-3.5" />}
                </span>
                <h3 className="min-w-0 flex-1 text-[0.9375rem] font-semibold">
                  <span className="mr-1.5 text-label-2 tabular-nums">{i + 1}.</span>
                  {isPrivate(card.id) ? (
                    card.title
                  ) : (
                    <Link href={`/cards/${card.id}`} className="hover:underline">
                      {card.title}
                    </Link>
                  )}
                </h3>
                <span className="shrink-0 text-[0.75rem] text-label-2">{moduleParts(card.module).name}</span>
              </div>
              {!correct && (
                <div className="mt-2.5 space-y-2 pl-[1.875rem] text-[0.875rem]">
                  <div>
                    <p className="text-[0.75rem] font-semibold text-bad">{mine ? "You chose" : "Left blank"}</p>
                    {mine && (
                      <>
                        <div className="card-md" dangerouslySetInnerHTML={{ __html: mine.html }} />
                        <div className="card-md mt-0.5 text-label-2" dangerouslySetInnerHTML={{ __html: mine.whyHtml }} />
                      </>
                    )}
                  </div>
                  <div>
                    <p className="text-[0.75rem] font-semibold text-good">Right answer</p>
                    <div className="card-md" dangerouslySetInnerHTML={{ __html: right.html }} />
                    <div className="card-md mt-0.5 text-label-2" dangerouslySetInnerHTML={{ __html: right.whyHtml }} />
                  </div>
                  {explanation && (
                    <div className="card-md border-t border-sep pt-2 text-label-2" dangerouslySetInnerHTML={{ __html: explanation.html }} />
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </>
  );
}
