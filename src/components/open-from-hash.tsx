"use client";

import { useEffect } from "react";

/** Opens the <details> named by the URL hash (e.g. /library#m-f6), so "back to the module" lands open. */
export function OpenFromHash() {
  useEffect(() => {
    const open = () => {
      if (!location.hash) return;
      const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      const details = el?.closest("details");
      if (el && details) {
        details.open = true;
        el.scrollIntoView({ block: "start" });
      }
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);
  return null;
}
