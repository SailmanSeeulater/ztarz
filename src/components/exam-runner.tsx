"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ModuleId } from "@/lib/content/schema";
import { useTRPC } from "@/trpc/client";
import { CardPass, Field } from "./pass";

export type ExamQuestion = {
  cardId: string;
  title: string;
  module: ModuleId;
  promptHtml: string;
  /** Shuffled; `key` is the choice's index in the card as written. No right/wrong here. */
  choices: { key: number; html: string }[];
};

const clock = (ms: number) => {
  const s = Math.max(0, Math.ceil(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

/** Exam conditions: a clock, no feedback until you hand it in, free movement between questions. */
export function ExamRunner({ scope, questions, limitMs }: { scope: string; questions: ExamQuestion[]; limitMs: number }) {
  const trpc = useTRPC();
  const router = useRouter();
  const [pos, setPos] = useState(0);
  const [picked, setPicked] = useState<(number | null)[]>(() => questions.map(() => null));
  const [left, setLeft] = useState(limitMs);
  const [confirming, setConfirming] = useState(false);
  const startedAt = useRef(0);
  const submit = useMutation(trpc.exam.submit.mutationOptions({ onSuccess: ({ id }) => router.replace(`/exams/${id}`) }));
  const { mutate, isPending, isSuccess } = submit;
  const sent = isPending || isSuccess;

  const handIn = useCallback(() => {
    if (sent) return;
    mutate({
      scope,
      answers: questions.map((q, i) => ({ cardId: q.cardId, picked: picked[i] })),
      durationMs: Math.min(Date.now() - startedAt.current, limitMs),
      limitMs,
    });
  }, [sent, mutate, scope, questions, picked, limitMs]);

  useEffect(() => {
    startedAt.current = Date.now();
    const t = setInterval(() => setLeft(limitMs - (Date.now() - startedAt.current)), 500);
    return () => clearInterval(t);
  }, [limitMs]);

  // Time's up: hand in whatever is answered.
  useEffect(() => {
    if (left <= 0) handIn();
  }, [left, handIn]);

  // Leaving mid-exam loses it.
  useEffect(() => {
    if (sent) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [sent]);

  const q = questions[pos];
  const answered = picked.filter((p) => p !== null).length;
  const blank = questions.length - answered;
  const low = left < 60_000;

  return (
    <div>
      <div className="sticky top-[5.25rem] z-10 sm:top-[3.25rem] -mx-4 flex items-center gap-3 bg-[var(--bg)]/90 px-4 py-2.5 backdrop-blur-md">
        <span className={`rounded-full bg-group px-3 py-1 text-[0.9375rem] font-semibold tabular-nums ${low ? "text-bad" : ""}`} role="timer" aria-label="Time left">
          {clock(left)}
        </span>
        <span className="text-[0.8125rem] text-label-2 tabular-nums">
          {answered} of {questions.length} answered
        </span>
        <button
          type="button"
          disabled={sent}
          onClick={() => (blank > 0 && !confirming ? setConfirming(true) : handIn())}
          onBlur={() => setConfirming(false)}
          className={`ml-auto rounded-full px-4 py-1.5 text-[0.9375rem] font-semibold transition-colors disabled:opacity-50 ${
            confirming ? "bg-bad text-white" : "bg-tint text-tint-ink"
          }`}
        >
          {sent ? "Marking…" : confirming ? `Hand in with ${blank} blank?` : "Hand in"}
        </button>
      </div>
      {submit.isError && (
        <p role="alert" className="mt-2 text-sm text-bad">
          Couldn&apos;t hand that in. Try again; your answers are still here.
        </p>
      )}

      <nav aria-label="Questions" className="mt-3 flex flex-wrap gap-1.5">
        {questions.map((x, i) => (
          <button
            key={x.cardId}
            type="button"
            aria-current={i === pos ? "step" : undefined}
            aria-label={`Question ${i + 1}${picked[i] === null ? ", not answered" : ", answered"}`}
            onClick={() => setPos(i)}
            className={`size-8 rounded-lg text-[0.8125rem] font-semibold tabular-nums transition-colors ${
              i === pos ? "ring-2 ring-tint" : ""
            } ${picked[i] === null ? "bg-group text-label-2" : "bg-tint text-tint-ink"}`}
          >
            {i + 1}
          </button>
        ))}
      </nav>

      <CardPass
        key={q.cardId}
        className="mt-4"
        module={q.module}
        title={q.title}
        topRight={
          <dl>
            <Field label="Question" align="end">
              {pos + 1} / {questions.length}
            </Field>
          </dl>
        }
      >
        <div className="space-y-5">
          <div className="card-md" dangerouslySetInnerHTML={{ __html: q.promptHtml }} />
          <ol className="space-y-2">
            {q.choices.map((c) => {
              const on = picked[pos] === c.key;
              return (
                <li key={c.key}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setPicked((p) => p.map((v, i) => (i === pos ? (on ? null : c.key) : v)))}
                    className={`flex w-full items-start gap-3 rounded-xl px-3.5 py-3 text-left text-[0.9375rem] transition-colors ${
                      on ? "bg-[var(--ink)] text-[var(--pass)]" : "bg-[var(--well)] hover:bg-[var(--well-strong)]"
                    }`}
                  >
                    <span className="card-md min-w-0 flex-1" dangerouslySetInnerHTML={{ __html: c.html }} />
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </CardPass>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          disabled={pos === 0}
          onClick={() => setPos((p) => p - 1)}
          className="flex-1 rounded-xl bg-group px-4 py-2.5 text-[0.9375rem] font-semibold transition-colors hover:bg-group-2 disabled:opacity-40"
        >
          Previous
        </button>
        <button
          type="button"
          disabled={pos === questions.length - 1}
          onClick={() => setPos((p) => p + 1)}
          className="flex-1 rounded-xl bg-group px-4 py-2.5 text-[0.9375rem] font-semibold transition-colors hover:bg-group-2 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
