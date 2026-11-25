"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import {
  ViewTransition,
  addTransitionType,
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { playDeal } from "@/lib/sound";
import type { RatingName } from "@/lib/srs/scheduler";
import type { Slot } from "@/lib/srs/today";
import type { TodaySession as Session } from "@/server/srs";
import { useTRPC } from "@/trpc/client";
import { CardView } from "./card-view";
import { Field, CardPass, hueFor } from "./pass";
import { TYPE_LABEL } from "./type-label";

type Item = Session["items"][number] & { again?: boolean };
type Stats = { answered: number; graded: number; correct: number; missed: number; results: ("kept" | "missed")[] };

/** Enter and exit animations for passes, keyed by transition type; only a "deal" moves them. */
const DEAL_IN = { deal: "pass-deal-in", default: "none" };
const DEAL_OUT = { deal: "pass-deal-out", default: "none" };

const SLOT_LABEL: Record<Slot, string> = {
  review: "Review",
  new: "New",
  drill: "Drill",
  "out-loud": "Out loud",
};

const RATING_LABEL: Record<RatingName, string> = { again: "Again", hard: "Hard", good: "Good", easy: "Easy" };

export function TodaySession({ items, seed }: { items: Session["items"]; seed: number }) {
  const trpc = useTRPC();
  const record = useMutation(trpc.review.record.mutationOptions());

  const [queue, setQueue] = useState<Item[]>(items);
  const [pos, setPos] = useState(0);
  const [turn, setTurn] = useState(0); // remounts the pass, including when a card comes back
  // Set when the card is answered; the same reviewId is reused if saving has to be retried.
  const [answer, setAnswer] = useState<{ correct: boolean | null; reviewId: string } | null>(null);
  const [stats, setStats] = useState<Stats>({ answered: 0, graded: 0, correct: 0, missed: 0, results: [] });
  const shownAt = useRef(0);

  const item = queue[pos];
  useEffect(() => {
    shownAt.current = Date.now();
  }, [turn]);

  // A wrong auto-graded answer is always "again"; a right one can't be.
  const ratings = useMemo<RatingName[]>(() => {
    if (answer === null) return [];
    if (answer.correct === false) return ["again"];
    if (answer.correct) return ["hard", "good", "easy"];
    return ["again", "hard", "good", "easy"];
  }, [answer]);

  const rate = useCallback(
    (rating: RatingName) => {
      if (!item || !answer || record.isPending) return;
      record.mutate(
        {
          reviewId: answer.reviewId,
          cardId: item.card.id,
          rating,
          correct: answer.correct ?? undefined,
          durationMs: Math.min(Date.now() - shownAt.current, 3_600_000),
        },
        {
          onSuccess: (res) => {
            // "deal": the answered pass lifts away and the next one rises from the stack.
            playDeal();
            startTransition(() => {
              addTransitionType("deal");
              setStats((s) => ({
                answered: s.answered + 1,
                graded: s.graded + (answer.correct === null ? 0 : 1),
                correct: s.correct + (answer.correct ? 1 : 0),
                missed: s.missed + (rating === "again" ? 1 : 0),
                results: [...s.results, rating === "again" ? "missed" : "kept"],
              }));
              if (res.requeue) setQueue((q) => [...q, { ...item, preview: res.preview, again: true }]);
              setPos((p) => p + 1);
              setAnswer(null);
              setTurn((t) => t + 1);
            });
            record.reset();
          },
        },
      );
    },
    [item, answer, record],
  );

  // 1–4 picks the rating buttons left to right (ignored while typing).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const r = ratings[Number(e.key) - 1];
      if (r) rate(r);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ratings, rate]);

  if (queue.length === 0) {
    return (
      <EndPass title="All caught up">
        Nothing is due and there are no new cards left today. Browse the{" "}
        <Link href="/library" className="underline underline-offset-2">
          library
        </Link>
        , or write a few cards.
      </EndPass>
    );
  }

  if (!item) {
    const pct = stats.graded ? Math.round((stats.correct / stats.graded) * 100) : null;
    return (
      <EndPass
        title="Session complete"
        fields={
          <>
            <Field label="Answers">{stats.answered}</Field>
            {pct !== null && <Field label="Auto-graded right">{pct}%</Field>}
            <Field label="Coming back soon">{stats.missed}</Field>
          </>
        }
        barcode={stats.results}
      >
        See you tomorrow.
      </EndPass>
    );
  }

  const upcoming = queue.slice(pos + 1);

  return (
    <div>
      <div className="relative">
        <ViewTransition key={turn} enter={DEAL_IN} exit={DEAL_OUT} default="none">
          <CardPass
            className={`relative z-10 ${turn === 0 ? "pass-enter" : ""}`}
            module={item.card.module}
            title={item.card.title}
            stack={item.card.stack}
            topRight={
              <dl>
                <Field label="Card" align="end">
                  <span>
                    {pos + 1} / {queue.length}
                  </span>
                </Field>
              </dl>
            }
            fields={
              <>
                <Field label="Slot">
                  {SLOT_LABEL[item.slot]}
                  {item.again && " · again"}
                </Field>
                <Field label="Type">{TYPE_LABEL[item.card.type]}</Field>
              </>
            }
          >
            <CardView
              card={item.card}
              seed={seed + turn}
              onAnswered={(correct) => setAnswer({ correct, reviewId: crypto.randomUUID() })}
            />
          </CardPass>
        </ViewTransition>

        {/* The rest of today's queue, tucked under the open pass like a wallet's stack. */}
        <div aria-hidden className="relative -mt-3">
          {upcoming.slice(0, 3).map((next, i) => (
            <div
              key={`${next.card.id}-${i}`}
              className="pass mx-auto h-5 rounded-t-none"
              data-hue={hueFor(next.card.module)}
              style={{
                width: `calc(100% - ${(i + 1) * 1.25}rem)`,
                marginTop: i === 0 ? 0 : "-0.75rem",
                zIndex: 9 - i,
                position: "relative",
                opacity: 1 - i * 0.18,
              }}
            />
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-label-2">
          {upcoming.length === 0 ? "Last card today" : `${upcoming.length} more after this one`}
        </p>
      </div>

      {answer && (
        <div className="sticky bottom-0 z-20 -mx-4 mt-6 border-t border-sep/70 bg-bg/85 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl">
          {record.isError && (
            <p role="alert" className="mb-2 text-sm text-bad">
              Couldn&apos;t save that answer. Try again.
            </p>
          )}
          <div
            className={`grid gap-2 ${ratings.length === 1 ? "grid-cols-1" : ratings.length === 3 ? "grid-cols-3" : "grid-cols-4"}`}
          >
            {ratings.map((r, i) => (
              <button
                key={r}
                type="button"
                disabled={record.isPending}
                onClick={() => rate(r)}
                className={`rounded-xl px-2 py-2.5 text-[0.9375rem] transition-[opacity,transform] duration-150 active:scale-[0.97] disabled:opacity-60 ${
                  r === "good" ? "bg-tint text-tint-ink" : "bg-group text-label hover:bg-group-2"
                }`}
              >
                <span className={`font-semibold ${r === "again" && ratings.length > 1 ? "text-bad" : ""}`}>
                  {ratings.length === 1 ? "Continue" : RATING_LABEL[r]}
                </span>
                <span className={`block text-xs tabular-nums ${r === "good" ? "opacity-80" : "text-label-2"}`}>
                  {item.preview[r]} · {i + 1}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/** The closing pass: same shape as a card, in the first pass colour. */
function EndPass({
  title,
  fields,
  barcode,
  children,
}: {
  title: string;
  fields?: React.ReactNode;
  barcode?: Stats["results"];
  children: React.ReactNode;
}) {
  return (
    <ViewTransition enter={DEAL_IN} default="none">
      <section className="pass pass-enter px-5 pt-5 pb-6">
        <h2 className="text-[1.625rem] leading-tight font-semibold tracking-[-0.015em]">{title}</h2>
        {fields && <dl className="mt-4 flex flex-wrap gap-x-7 gap-y-3">{fields}</dl>}
        <p className="mt-5 border-t border-[var(--well-strong)] pt-4 text-[var(--ink-2)]">{children}</p>
        {barcode && barcode.length > 0 && <ResultsBarcode results={barcode} />}
      </section>
    </ViewTransition>
  );
}

/**
 * Where a Wallet pass has its barcode, today's answers in order: a full bar for each card you kept,
 * a short one for each that comes back soon.
 */
function ResultsBarcode({ results }: { results: Stats["results"] }) {
  const missed = results.filter((r) => r === "missed").length;
  return (
    <figure className="mx-auto mt-6 w-fit max-w-full rounded-xl bg-[var(--ink)] px-5 pt-4 pb-3 text-[var(--pass)]">
      <div
        role="img"
        aria-label={`${results.length - missed} kept, ${missed} coming back soon, in the order you answered`}
        className="flex h-14 items-end justify-center gap-[3px]"
      >
        {results.map((r, i) => (
          <span key={i} className={`w-1 rounded-[1px] bg-current ${r === "missed" ? "h-[40%]" : "h-full"}`} />
        ))}
      </div>
      <figcaption className="mt-2 text-center text-[0.6875rem] font-semibold tracking-[0.08em] tabular-nums uppercase">
        {results.length - missed} kept · {missed} back soon
      </figcaption>
    </figure>
  );
}
