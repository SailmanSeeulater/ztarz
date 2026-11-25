"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/** ← and → move to the previous and next card, unless you're typing or using a modifier. */
export function ArrowKeysNav({ prev, next }: { prev?: string; next?: string }) {
  const router = useRouter();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      const t = e.target as HTMLElement | null;
      if (t?.closest("input, textarea, select, [contenteditable=true]")) return;
      const href = e.key === "ArrowLeft" ? prev : e.key === "ArrowRight" ? next : undefined;
      if (href) {
        e.preventDefault();
        router.push(href);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, router]);
  return null;
}
