"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Card } from "@/lib/content/schema";
import { playDeal, playRight, playWrong } from "@/lib/sound";
import { useTRPC } from "@/trpc/client";
import { CardView } from "./card-view";
import { CardPass, Field } from "./pass";
import { TYPE_LABEL } from "./type-label";

type Result = { card: Card; knew: boolean };

/**
 * A practice run: answer, see how you did, move on. Nothing is recorded, so drilling a card
 * here never changes when your daily session shows it next.
 */
export function DrillSession({
  cards,
  seed,
  againHref,
  module,
}: {
  cards: Card[];
  seed: number;
  againHref: string;
  /** The module being drilled, or null for the missed-lately pile; only used for the activity log. */
  module: string | null;
}) {
  const trpc = useTRPC();
  const { mutate: logFinished } = useMutation(trpc.activity.drillFinished.mutationOptions());
  const [pos, setPos] = useState(0);
  // undefined: not answered; boolean: auto-graded; null: revealed, waiting for "did you know it?"
  const [answer, setAnswer] = useState<boolean | null | undefined>(undefined);
  const [results, setResults] = useState<Result[]>([]);
  const card = cards[pos];

  const next = (knew: boolean) => {
    playDeal();
    const all = [...results, { card, knew }];
    if (all.length === cards.length) logFinished({ module, total: all.length, knew: all.filter((r) => r.knew).length });
    setResults(all);
    setAnswer(undefined);
    setPos((p) => p + 1);
  };

  // Enter moves on after an auto-graded answer; Y / N answer "did you know it?".
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || !card) return;
      if (typeof answer === "boolean" && e.key === "Enter") next(answer);
      if (answer === null && (e.key === "y" || e.key === "n")) next(e.key === "y");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!card) {
    const knew = results.filter((r) => r.knew).length;
    const missed = results.filter((r) => !r.knew);
    return (
      <section className="pass pass-enter px-5 pt-5 pb-6">
        <h2 className="text-[1.625rem] leading-tight font-semibold tracking-[-0.015em]">Drill complete</h2>
        <dl className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
          <Field label="Knew">
            {knew} of {results.length}
          </Field>
          <Field label="Score">{results.length ? Math.round((knew / results.length) * 100) : 0}%</Field>
        </dl>
        {missed.length > 0 && (
          <div className="mt-5 border-t border-[var(--well-strong)] pt-4">
            <h3 className="field-label">Worth another look</h3>
            <ul className="mt-2 space-y-1.5">
              {missed.map(({ card: c }) => (
                <li key={c.id}>
                  {c.id.startsWith("private/") ? (
                    c.title
                  ) : (
                    <Link href={`/cards/${c.id}`} className="underline underline-offset-2 hover:opacity-80">
                      {c.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-6 flex flex-wrap gap-2">
          {/* A plain link: the server deals a fresh shuffle. */}
          <a href={againHref} className="rounded-xl bg-[var(--ink)] px-4 py-2.5 text-[0.9375rem] font-semibold text-[var(--pass)]">
            Drill again
          </a>
          <Link href="/library" className="rounded-xl bg-[var(--well)] px-4 py-2.5 text-[0.9375rem] font-semibold">
            Library
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div>
      <CardPass
        key={pos}
        className="pass-enter"
        module={card.module}
        title={card.title}
        stack={card.stack}
        topRight={
          <dl>
            <Field label="Drill" align="end">
              {pos + 1} / {cards.length}
            </Field>
          </dl>
        }
        fields={<Field label="Type">{TYPE_LABEL[card.type]}</Field>}
      >
        <CardView
          card={card}
          seed={seed + pos}
          onAnswered={(correct) => {
            if (correct !== null) (correct ? playRight : playWrong)();
            setAnswer(correct);
          }}
        />
      </CardPass>

      {answer !== undefined && (
        <div className="sticky bottom-0 z-20 -mx-4 mt-6 border-t border-sep/70 bg-bg/85 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl">
          {answer === null ? (
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => next(false)} className="rounded-xl bg-group px-2 py-2.5 text-[0.9375rem] font-semibold text-bad hover:bg-group-2">
                Didn&apos;t know it <span className="font-normal text-label-2">· N</span>
              </button>
              <button type="button" onClick={() => next(true)} className="rounded-xl bg-tint px-2 py-2.5 text-[0.9375rem] font-semibold text-tint-ink">
                Knew it <span className="font-normal opacity-80">· Y</span>
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => next(answer)} className="w-full rounded-xl bg-tint px-2 py-2.5 text-[0.9375rem] font-semibold text-tint-ink">
              {pos + 1 === cards.length ? "Finish" : "Next"} <span className="font-normal opacity-80">· Enter</span>
            </button>
          )}
          <p className="mt-2 text-center text-xs text-label-2">Practice only: this doesn&apos;t change your schedule.</p>
        </div>
      )}
    </div>
  );
}
