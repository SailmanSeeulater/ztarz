"use client";

import { useMemo, useState } from "react";
import type { Card, RenderedChoice } from "@/lib/content/schema";
import { CheckIcon, CrossIcon } from "./icons";

/** Deterministic shuffle (mulberry32), so server and client render the same order. */
function shuffle<T>(items: T[], seed: number): T[] {
  let a = seed >>> 0;
  const rand = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Card HTML is rendered at build time from Markdown in this repo, so it's trusted.
function Md({ html, className = "" }: { html: string; className?: string }) {
  return <div className={`card-md ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}

/** A revealed section, set like the back of a pass: small label, then the content. */
function Section({ heading, html }: { heading: string; html: string }) {
  return (
    <section className="border-t border-[var(--well-strong)] pt-4">
      <h3 className="field-label">{heading}</h3>
      <Md html={html} className="mt-1.5" />
    </section>
  );
}

const field =
  "w-full rounded-xl bg-[var(--well)] px-3.5 py-2.5 text-[0.9375rem] text-[var(--ink)] outline-none placeholder:text-[var(--ink-2)] focus-visible:outline-2 focus-visible:outline-[var(--ink)]";

/**
 * The body of a card, drawn on its pass (inherits the pass's --ink and --well colours).
 * `onAnswered` fires once: with `correct` for auto-graded cards, `null` for self-rated ones.
 * `seed` shuffles the choices (sessions pass one so you can't memorize positions).
 */
export function CardView({
  card,
  onAnswered,
  seed,
}: {
  card: Card;
  onAnswered?: (correct: boolean | null) => void;
  seed?: number;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [guess, setGuess] = useState("");

  const choices = useMemo<RenderedChoice[] | undefined>(
    () => (card.choices && seed !== undefined ? shuffle(card.choices, seed) : card.choices),
    [card.choices, seed],
  );
  const prompt = card.sections.find((s) => s.key === "prompt");
  const rest = card.sections.filter((s) => s.key !== "prompt");
  const done = choices ? picked !== null : revealed;
  const reveal = () => {
    setRevealed(true);
    onAnswered?.(null);
  };

  return (
    <div className="space-y-5">
      {prompt && <Md html={prompt.html} className="text-[1.0625rem]" />}

      {card.type === "comparison" && !revealed && (
        <div className="rounded-xl bg-[var(--well)] px-4 py-3 text-sm">
          <p className="font-medium">Recall both sides for each, then reveal:</p>
          <ul className="mt-2 list-disc space-y-0.5 pl-5 text-[var(--ink-2)]">
            {card.sections.map((s) => (
              <li key={s.key}>{s.heading}</li>
            ))}
          </ul>
        </div>
      )}

      {choices && (
        <ol className="space-y-2">
          {choices.map((c, i) => {
            const state = picked === null ? "idle" : c.correct ? "right" : i === picked ? "wrong" : "other";
            return (
              <li key={i}>
                <button
                  type="button"
                  disabled={picked !== null}
                  data-state={state}
                  onClick={() => {
                    setPicked(i);
                    onAnswered?.(c.correct);
                  }}
                  className={`flex w-full items-start gap-3 rounded-xl px-3.5 py-3 text-left transition-[background-color,color,opacity] duration-200 ${
                    state === "right"
                      ? "bg-[var(--ink)] text-[var(--pass)]"
                      : state === "wrong"
                        ? "bg-[var(--well-strong)]"
                        : state === "other"
                          ? "bg-[var(--well)] opacity-70"
                          : "bg-[var(--well)] hover:bg-[var(--well-strong)] active:scale-[0.99]"
                  }`}
                >
                  <span className="min-w-0 flex-1">
                    <Md html={c.html} />
                    {picked !== null && (
                      <Md
                        html={c.whyHtml}
                        className={`mt-1.5 text-sm ${state === "right" ? "opacity-85" : "text-[var(--ink-2)]"}`}
                      />
                    )}
                  </span>
                  {state === "right" && <CheckIcon className="mt-0.5 size-5 shrink-0" />}
                  {state === "wrong" && <CrossIcon className="mt-0.5 size-5 shrink-0" />}
                </button>
              </li>
            );
          })}
        </ol>
      )}

      {card.type === "what-prints" && !revealed && (
        <input
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && reveal()}
          placeholder="Your prediction"
          aria-label="Your prediction"
          className={`${field} font-mono text-sm`}
        />
      )}

      {(card.type === "out-loud" || card.type === "concept") && !revealed && (
        <textarea
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          rows={3}
          placeholder={card.type === "out-loud" ? "Say it out loud, or type it here" : "Your answer (optional)"}
          aria-label="Your answer"
          className={`${field} resize-y`}
        />
      )}

      {!choices && !revealed && (
        <button
          type="button"
          onClick={reveal}
          className="w-full rounded-xl bg-[var(--ink)] px-4 py-3 text-[0.9375rem] font-semibold text-[var(--pass)] transition-opacity hover:opacity-90 active:scale-[0.99]"
        >
          Reveal answer
        </button>
      )}

      {done && (
        <div className="space-y-4">
          {picked !== null && (
            <p className="flex items-center gap-2 text-[0.9375rem] font-semibold">
              {choices![picked].correct ? <CheckIcon className="size-5" /> : <CrossIcon className="size-5" />}
              <span>{choices![picked].correct ? "Correct." : "Not quite."}</span>
            </p>
          )}
          {guess && (
            <p className="rounded-xl bg-[var(--well)] px-3.5 py-2.5 text-sm">
              <span className="field-label mr-2">You said</span>
              {guess}
            </p>
          )}
          {rest.map((s) => (
            <Section key={s.key} heading={s.heading} html={s.html} />
          ))}
        </div>
      )}
    </div>
  );
}
