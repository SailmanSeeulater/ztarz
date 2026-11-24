"use client";

import { useState } from "react";
import type { Card } from "@/lib/content/schema";

// Card HTML is rendered at build time from Markdown in this repo, so it's trusted.
function Md({ html, className = "" }: { html: string; className?: string }) {
  return <div className={`card-md ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}

function Section({ heading, html }: { heading: string; html: string }) {
  return (
    <section className="rounded-lg border border-border bg-surface p-4">
      <h2 className="mb-2 text-sm font-medium text-muted">{heading}</h2>
      <Md html={html} />
    </section>
  );
}

function RevealButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90"
    >
      {label}
    </button>
  );
}

/** `onAnswered` fires once: with `correct` for auto-graded cards, `null` for self-rated ones. */
export function CardView({ card, onAnswered }: { card: Card; onAnswered?: (correct: boolean | null) => void }) {
  const [picked, setPicked] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [guess, setGuess] = useState("");

  const prompt = card.sections.find((s) => s.key === "prompt");
  const rest = card.sections.filter((s) => s.key !== "prompt");
  const done = card.choices ? picked !== null : revealed;
  const reveal = () => {
    setRevealed(true);
    onAnswered?.(null);
  };

  return (
    <div className="space-y-4">
      {prompt && <Md html={prompt.html} className="text-lg" />}

      {card.type === "comparison" && !revealed && (
        <div className="rounded-lg border border-dashed border-border p-4 text-sm text-muted">
          Recall both sides for each field before revealing:
          <ul className="mt-2 list-disc pl-5">
            {card.sections.map((s) => (
              <li key={s.key}>{s.heading}</li>
            ))}
          </ul>
        </div>
      )}

      {card.choices && (
        <ol className="space-y-2">
          {card.choices.map((c, i) => {
            const state = picked === null ? "idle" : c.correct ? "right" : i === picked ? "wrong" : "other";
            return (
              <li key={i}>
                <button
                  type="button"
                  disabled={picked !== null}
                  onClick={() => {
                    setPicked(i);
                    onAnswered?.(c.correct);
                  }}
                  className={`w-full rounded-lg border p-3 text-left transition-colors ${
                    state === "right"
                      ? "border-good bg-good-bg"
                      : state === "wrong"
                        ? "border-bad bg-bad-bg"
                        : state === "other"
                          ? "border-border bg-surface opacity-70"
                          : "border-border bg-surface hover:border-accent"
                  }`}
                >
                  <Md html={c.html} />
                  {picked !== null && <Md html={c.whyHtml} className="mt-2 text-sm text-muted" />}
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
          className="w-full rounded-md border border-border bg-surface px-3 py-2 font-mono text-sm outline-none focus:border-accent"
        />
      )}

      {(card.type === "out-loud" || card.type === "concept") && !revealed && (
        <textarea
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          rows={4}
          placeholder={card.type === "out-loud" ? "Say it out loud, or type it here" : "Your answer (optional)"}
          aria-label="Your answer"
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
        />
      )}

      {!card.choices && !revealed && <RevealButton onClick={reveal} label="Reveal answer" />}

      {done && (
        <div className="space-y-3">
          {picked !== null && (
            <p className={`font-medium ${card.choices![picked].correct ? "text-good" : "text-bad"}`}>
              {card.choices![picked].correct ? "Correct." : "Not quite."}
            </p>
          )}
          {guess && (
            <p className="text-sm text-muted">
              You said: <span className="text-foreground">{guess}</span>
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
