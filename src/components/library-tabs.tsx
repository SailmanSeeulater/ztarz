import Link from "next/link";

const TABS = [
  { id: "cards", href: "/library", label: "Cards" },
  { id: "solutions", href: "/library/solutions", label: "Solutions" },
  { id: "glossary", href: "/library/glossary", label: "Glossary" },
] as const;

/** The library's three shelves, as a full-width segmented control under the title. */
export function LibraryTabs({ active }: { active: (typeof TABS)[number]["id"] }) {
  return (
    <nav aria-label="Library" className="mt-4 grid grid-cols-3 rounded-[0.6rem] bg-group p-0.5 text-[0.8125rem] font-medium">
      {TABS.map((t) => (
        <Link
          key={t.id}
          href={t.href}
          aria-current={t.id === active ? "page" : undefined}
          className={`rounded-[0.5rem] py-1 text-center transition-colors duration-200 ${
            t.id === active ? "bg-group-2 text-label shadow-sm" : "text-label-2 hover:text-label"
          }`}
        >
          {t.label}
        </Link>
      ))}
    </nav>
  );
}
