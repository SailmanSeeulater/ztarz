"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Today", match: (p: string) => p === "/" },
  { href: "/map", label: "Map", match: (p: string) => p.startsWith("/map") },
  { href: "/labs", label: "Labs", match: (p: string) => p.startsWith("/labs") },
  { href: "/library", label: "Library", match: (p: string) => p.startsWith("/library") || p.startsWith("/cards") },
] as const;

/** iOS-style segmented control for the three sections. */
export function TopNav() {
  const pathname = usePathname();
  // Signed out, every tab but Library just leads back here.
  if (pathname === "/sign-in") return null;
  return (
    <nav aria-label="Sections" className="flex rounded-[0.6rem] bg-group p-0.5 text-[0.8125rem] font-medium">
      {TABS.map((t) => {
        const active = t.match(pathname);
        return (
          <Link
            key={t.href}
            href={t.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-[0.5rem] px-3.5 py-1 transition-colors duration-200 ${
              active ? "bg-group-2 text-label shadow-sm" : "text-label-2 hover:text-label"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
