"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Today", match: (p: string) => p === "/" || p.startsWith("/focus") || p.startsWith("/drill") },
  { href: "/library", label: "Library", match: (p: string) => p.startsWith("/library") || p.startsWith("/cards") },
  { href: "/labs", label: "Labs", match: (p: string) => p.startsWith("/labs") },
  { href: "/exams", label: "Exams", match: (p: string) => p.startsWith("/exams") },
  { href: "/notes", label: "Notes", match: (p: string) => p.startsWith("/notes") },
  {
    href: "/progress",
    label: "Progress",
    match: (p: string) => p.startsWith("/progress") || p.startsWith("/map") || p.startsWith("/week"),
  },
] as const;

/** iOS-style segmented control for the app's sections. */
export function TopNav() {
  const pathname = usePathname();
  // Signed out, every tab but Library just leads back here.
  if (pathname === "/sign-in") return null;
  return <TopNavView pathname={pathname} />;
}

/** The tabs themselves; with no pathname (while the URL is unknown) none is marked current. */
export function TopNavView({ pathname }: { pathname: string | null }) {
  return (
    <nav aria-label="Sections" className="grid grid-cols-6 rounded-[0.6rem] bg-group p-0.5 text-[0.75rem] font-medium sm:flex sm:text-[0.8125rem]">
      {TABS.map((t) => {
        const active = pathname !== null && t.match(pathname);
        return (
          <Link
            key={t.href}
            href={t.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-[0.5rem] py-1 text-center sm:px-3 transition-colors duration-200 ${
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
