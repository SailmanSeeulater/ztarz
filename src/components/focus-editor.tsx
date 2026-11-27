"use client";

import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { MODULE_GROUPS, type ModuleId } from "@/lib/content/schema";
import { MAX_NEW_PER_DAY, type Prefs } from "@/lib/prefs";
import { useTRPC } from "@/trpc/client";
import { CheckIcon } from "./icons";
import { ModuleArt } from "./module-art";
import { hueFor, moduleParts } from "./pass";

/** Pick what feeds your new cards and how many arrive each day. Saves on every change. */
export function FocusEditor({ initial, unseen }: { initial: Prefs; unseen: Partial<Record<ModuleId, number>> }) {
  const trpc = useTRPC();
  const save = useMutation(trpc.prefs.set.mutationOptions());
  const [prefs, setPrefs] = useState(initial);

  const [dirty, setDirty] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Saves a moment after the last tap, so picking five modules is one save (and one log line).
  const change = (next: Prefs) => {
    setPrefs(next);
    setDirty(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => save.mutate(next, { onSettled: () => setDirty(false) }), 600);
  };
  const toggle = (id: ModuleId) =>
    change({ ...prefs, focus: prefs.focus.includes(id) ? prefs.focus.filter((m) => m !== id) : [...prefs.focus, id] });
  const step = (d: number) =>
    change({ ...prefs, newPerDay: Math.min(MAX_NEW_PER_DAY, Math.max(0, prefs.newPerDay + d)) });

  const left = prefs.focus.reduce((n, id) => n + (unseen[id] ?? 0), 0);
  const days = prefs.newPerDay > 0 && prefs.focus.length > 0 ? Math.ceil(left / prefs.newPerDay) : null;

  return (
    <div className="mt-6 space-y-8">
      <section className="rounded-2xl bg-group px-4 py-3.5">
        <div className="flex items-center gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="text-[1rem] font-semibold">New cards a day</h2>
            <p className="mt-0.5 text-[0.8125rem] text-label-2">
              {prefs.newPerDay === 0
                ? "Reviews only: nothing new until you raise this."
                : "Each new card comes back several times in its first week, so reviews grow with this number."}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1 rounded-full bg-group-2 p-1">
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={prefs.newPerDay <= 0}
              aria-label="Fewer new cards"
              className="size-8 rounded-full text-[1.125rem] font-semibold transition-colors hover:bg-group disabled:opacity-30"
            >
              −
            </button>
            <output aria-live="polite" className="w-8 text-center text-[1.0625rem] font-semibold tabular-nums">
              {prefs.newPerDay}
            </output>
            <button
              type="button"
              onClick={() => step(1)}
              disabled={prefs.newPerDay >= MAX_NEW_PER_DAY}
              aria-label="More new cards"
              className="size-8 rounded-full text-[1.125rem] font-semibold transition-colors hover:bg-group disabled:opacity-30"
            >
              +
            </button>
          </div>
        </div>
      </section>

      <div className="flex items-baseline justify-between gap-4 px-1 text-[0.8125rem] text-label-2">
        <p aria-live="polite">
          {prefs.focus.length === 0
            ? "No focus: new cards follow the whole curriculum, foundations first."
            : `${prefs.focus.length} in focus · ${left} new cards left${days ? ` · about ${days} days` : ""}`}
        </p>
        <span className="flex shrink-0 items-center gap-3">
          {save.isError ? <span className="text-bad">Couldn&apos;t save</span> : dirty || save.isPending ? "Saving…" : save.isSuccess ? "Saved" : null}
          {prefs.focus.length > 0 && (
            <button type="button" onClick={() => change({ ...prefs, focus: [] })} className="text-tint hover:opacity-80">
              Clear
            </button>
          )}
        </span>
      </div>

      {MODULE_GROUPS.map((g) => (
        <section key={g.id} aria-labelledby={`fg-${g.id}`}>
          <h2 id={`fg-${g.id}`} className="px-1 text-[1.0625rem] font-bold tracking-[-0.01em]">
            {g.title}
          </h2>
          <ul className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {g.modules.map((id: ModuleId) => {
              const on = prefs.focus.includes(id);
              const n = unseen[id] ?? 0;
              return (
                <li key={id}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(id)}
                    className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors ${
                      on ? "bg-group-2 ring-2 ring-tint" : "bg-group hover:bg-group-2"
                    }`}
                  >
                    <span className="pass grid size-9 shrink-0 place-items-center rounded-xl" data-hue={hueFor(id)}>
                      <ModuleArt id={id} strokeWidth={2.75} className="size-6" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.9375rem] font-medium">{moduleParts(id).name}</span>
                      <span className="block text-[0.75rem] text-label-2 tabular-nums">
                        {n === 0 ? "All started" : `${n} new`}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={`grid size-5 shrink-0 place-items-center rounded-full ${on ? "bg-tint text-white" : "border border-sep"}`}
                    >
                      {on && <CheckIcon className="size-3.5" />}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
