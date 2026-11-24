"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { RatingName } from "@/lib/srs/scheduler";
import type { Slot } from "@/lib/srs/today";
import type { TodaySession as Session } from "@/server/srs";
import { useTRPC } from "@/trpc/client";
import { CardView } from "./card-view";
import { TYPE_LABEL } from "./type-label";

type Item = Session["items"][number] & { again?: boolean };

const SLOT_LABEL: Record<Slot, string> = {
  review: "Review",
  new: "New",
  drill: "Drill",
  "out-loud": "Say it out loud",
};

const RATING_LABEL: Record<RatingName, string> = { again: "Again", hard: "Hard", good: "Good", easy: "Easy" };

export function TodaySession({ items }: { items: Session["items"] }) {
  const trpc = useTRPC();
  const record = useMutation(trpc.review.record.mutationOptions());

  const [queue, setQueue] = useState<Item[]>(items);
  const [pos, setPos] = useState(0);
  const [turn, setTurn] = useState(0); // remounts CardView, including when a card comes back
  // Set when the card is answered; the same reviewId is reused if saving has to be retried.
  const [answer, setAnswer] = useState<{ correct: boolean | null; reviewId: string } | null>(null);
  const [stats, setStats] = useState({ answered: 0, graded: 0, correct: 0, missed: 0 });
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
            setStats((s) => ({
              answered: s.answered + 1,
              graded: s.graded + (answer.correct === null ? 0 : 1),
              correct: s.correct + (answer.correct ? 1 : 0),
              missed: s.missed + (rating === "again" ? 1 : 0),
            }));
            if (res.requeue) setQueue((q) => [...q, { ...item, preview: res.preview, again: true }]);
            setPos((p) => p + 1);
            setAnswer(null);
            setTurn((t) => t + 1);
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
      <Panel title="All caught up">
        Nothing is due and there are no new cards left today. Browse the <Link href="/library" className="underline">library</Link>, or write a few cards.
      </Panel>
    );
  }

  if (!item) {
    const pct = stats.graded ? Math.round((stats.correct / stats.graded) * 100) : null;
    return (
      <Panel title="Session complete">
        {stats.answered} answers{pct !== null && <>, {pct}% right on auto-graded cards</>}
        {stats.missed > 0 && <>; {stats.missed} misses are rescheduled to come back soon</>}. See you tomorrow.
      </Panel>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-muted">
          <span className="font-medium uppercase tracking-wide">
            {SLOT_LABEL[item.slot]}
            {item.again && " · again"} · {TYPE_LABEL[item.card.type]}
          </span>
          <span>
            {pos + 1} / {queue.length}
          </span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-border">
          <div className="h-full bg-accent transition-all" style={{ width: `${(pos / queue.length) * 100}%` }} />
        </div>
      </div>

      <h2 className="text-xl font-semibold tracking-tight">{item.card.title}</h2>

      <CardView
        key={turn}
        card={item.card}
        onAnswered={(correct) => setAnswer({ correct, reviewId: crypto.randomUUID() })}
      />

      {answer && (
        <div className="sticky bottom-0 -mx-4 border-t border-border bg-background/95 px-4 py-3 backdrop-blur">
          {record.isError && (
            <p role="alert" className="mb-2 text-sm text-bad">
              Couldn&apos;t save that answer. Try again.
            </p>
          )}
          <div className={`grid gap-2 ${ratings.length === 1 ? "grid-cols-1" : ratings.length === 3 ? "grid-cols-3" : "grid-cols-4"}`}>
            {ratings.map((r, i) => (
              <button
                key={r}
                type="button"
                disabled={record.isPending}
                onClick={() => rate(r)}
                className={`rounded-md border px-2 py-2 text-sm disabled:opacity-60 ${
                  r === "again" ? "border-bad text-bad" : r === "good" ? "border-accent bg-accent text-white" : "border-border bg-surface"
                }`}
              >
                <span className="font-medium">{ratings.length === 1 ? "Continue" : RATING_LABEL[r]}</span>
                <span className="block text-xs opacity-75">
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

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-1 text-muted">{children}</p>
    </div>
  );
}
