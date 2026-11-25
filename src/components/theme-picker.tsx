"use client";

import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { signOut } from "@/app/sign-in/actions";
import { setSoundOn, soundOn } from "@/lib/sound";
import { THEMES, THEME_STORAGE_KEY, applyTheme, type ThemeId } from "@/lib/themes";
import { CheckIcon, PassesIcon } from "./icons";

// The head script sets data-theme before paint; this reads it back and follows changes.
const subscribe = (onChange: () => void) => {
  const obs = new MutationObserver(onChange);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => obs.disconnect();
};
const current = () => document.documentElement.getAttribute("data-theme");

function choose(id: ThemeId) {
  applyTheme(id);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, id);
  } catch {
    // Private mode or blocked storage: the theme still applies for this visit.
  }
}

const subscribeSound = (onChange: () => void) => {
  window.addEventListener("ztarz-sound", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("ztarz-sound", onChange);
    window.removeEventListener("storage", onChange);
  };
};

/**
 * A button in the top bar that opens a popover of the ten themes, each drawn as a small pass,
 * with the sound switch and sign out below them.
 */
export function ThemePicker() {
  const active = useSyncExternalStore(subscribe, current, () => null);
  const sound = useSyncExternalStore(subscribeSound, soundOn, () => true);
  const signedOutPage = usePathname() === "/sign-in";
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
        <div className="mt-4 overflow-hidden rounded-xl bg-group-2 text-[0.9375rem]">
          <label className="flex cursor-pointer items-center justify-between gap-3 px-3.5 py-2.5">
            <span>Paper sounds</span>
            <button
              type="button"
              role="switch"
              aria-checked={sound}
              onClick={() => setSoundOn(!sound)}
              className={`relative h-[1.625rem] w-[2.75rem] shrink-0 rounded-full transition-colors duration-200 ${
                sound ? "bg-good" : "bg-sep"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 size-[1.375rem] rounded-full bg-white shadow transition-transform duration-200 ease-[var(--ease-out-expo)] ${
                  sound ? "translate-x-[1.125rem]" : ""
                }`}
              />
            </button>
          </label>
          {!signedOutPage && (
            <form action={signOut} className="border-t border-sep">
              <button type="submit" className="w-full px-3.5 py-2.5 text-left text-bad hover:bg-group">
                Sign out
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
