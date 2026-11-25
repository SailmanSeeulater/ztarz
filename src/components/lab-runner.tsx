"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import type { CheckResult } from "@/lib/labs";
import { playRight, playWrong } from "@/lib/sound";
import { useTRPC } from "@/trpc/client";
import { CheckIcon, CrossIcon } from "./icons";

/** Paste box and check list for a lab. Drawn on its pass, so it uses the pass's ink and wells. */
export function LabRunner({
  labId,
  labels,
  initial,
}: {
  labId: string;
  labels: string[];
  initial: { text: string; results: CheckResult[] } | null;
}) {
  const trpc = useTRPC();
  const submit = useMutation(trpc.lab.submit.mutationOptions());
  const [text, setText] = useState(initial?.text ?? "");
  const results = submit.data?.results ?? initial?.results ?? null;
  const passed = results?.every((r) => r.passed) ?? false;

  const check = () =>
    submit.mutate(
      { labId, evidence: text },
      { onSuccess: (r) => (r.passed ? playRight() : playWrong()) },
    );

  return (
    <div className="mt-3 space-y-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        spellCheck={false}
        placeholder="Paste your terminal output here"
        aria-label="Your terminal output"
        className="w-full resize-y rounded-xl bg-[var(--well)] px-3.5 py-2.5 font-mono text-[0.8125rem] leading-relaxed text-[var(--ink)] outline-none placeholder:text-[var(--ink-2)] focus-visible:outline-2 focus-visible:outline-[var(--ink)]"
      />
      <button
        type="button"
        onClick={check}
        disabled={!text.trim() || submit.isPending}
        className="w-full rounded-xl bg-[var(--ink)] px-4 py-3 text-[0.9375rem] font-semibold text-[var(--pass)] transition-opacity hover:opacity-90 active:scale-[0.99] disabled:opacity-50"
      >
        {submit.isPending ? "Checking…" : results ? "Check again" : "Check"}
      </button>
      {submit.isError && (
        <p role="alert" className="text-sm">
          Couldn&apos;t check that. Try again.
        </p>
      )}

      <ul aria-live="polite" className="space-y-1.5">
        {(results ?? labels.map((label) => ({ label, passed: null as boolean | null }))).map((r) => (
          <li key={r.label} className="flex items-start gap-2.5 text-[0.9375rem]">
            <span
              className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${
                r.passed === true
                  ? "bg-[var(--ink)] text-[var(--pass)]"
                  : r.passed === false
                    ? "bg-[var(--well-strong)]"
                    : "border border-[var(--well-strong)]"
              }`}
            >
              {r.passed === true && <CheckIcon className="size-3.5" />}
              {r.passed === false && <CrossIcon className="size-3.5" />}
            </span>
            <span className={r.passed === false ? "text-[var(--ink-2)]" : ""}>{r.label}</span>
          </li>
        ))}
      </ul>
      {results && (
        <p className="pt-1 text-[0.9375rem] font-semibold">
          {passed ? "Lab passed." : `${results.filter((r) => r.passed).length} of ${results.length} checks passed.`}
        </p>
      )}
    </div>
  );
}
