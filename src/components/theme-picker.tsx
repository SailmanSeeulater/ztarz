"use client";

import { useSyncExternalStore } from "react";
import { THEMES, THEME_STORAGE_KEY, type ThemeId } from "@/lib/themes";
import { CheckIcon, PassesIcon } from "./icons";

// The head script sets data-theme before paint; this reads it back and follows changes.
const subscribe = (onChange: () => void) => {
  const obs = new MutationObserver(onChange);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => obs.disconnect();
};
const current = () => document.documentElement.getAttribute("data-theme");

function choose(id: ThemeId) {
  document.documentElement.setAttribute("data-theme", id);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, id);
  } catch {
    // Private mode or blocked storage: the theme still applies for this visit.
  }
}

/** A button in the top bar that opens a popover of the ten themes, each drawn as a small pass. */
export function ThemePicker() {
  const active = useSyncExternalStore(subscribe, current, () => null);
  const groups = [
    { scheme: "dark", title: "Dark" },
    { scheme: "light", title: "Light" },
  ] as const;

  return (
    <>
      <button
        type="button"
        popoverTarget="theme-picker"
        aria-label="Theme"
        className="grid size-9 place-items-center rounded-full text-label-2 transition-colors hover:bg-group hover:text-label"
      >
        <PassesIcon />
      </button>
      <div
        id="theme-picker"
        popover="auto"
        className="theme-popover w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-sep bg-group p-4 text-label shadow-2xl"
      >
        <h2 className="text-[0.9375rem] font-semibold">Theme</h2>
        {groups.map((g) => (
          <fieldset key={g.scheme} className="mt-3">
            <legend className="text-xs font-medium text-label-2">{g.title}</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {THEMES.filter((t) => t.scheme === g.scheme).map((t) => {
                const selected = active === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    data-theme={t.id}
                    aria-pressed={selected}
                    onClick={() => choose(t.id)}
                    className={`group relative rounded-xl bg-[var(--bg)] p-1.5 text-left transition-shadow ${
                      selected ? "ring-2 ring-[var(--tint)]" : "ring-1 ring-[var(--sep)] hover:ring-[var(--label-2)]"
                    }`}
                  >
                    <span className="pass flex h-12 items-end justify-between rounded-lg px-2.5 pb-1.5">
                      <span className="text-[0.8125rem] font-semibold">{t.name}</span>
                      {selected && <CheckIcon className="size-4" />}
                    </span>
                    <span className="mt-1.5 flex gap-1 px-0.5" aria-hidden>
                      <span className="h-1.5 flex-1 rounded-full" style={{ background: "var(--pass-2)" }} />
                      <span className="h-1.5 flex-1 rounded-full" style={{ background: "var(--pass-3)" }} />
                      <span className="h-1.5 flex-1 rounded-full" style={{ background: "var(--tint)" }} />
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
    </>
  );
}
