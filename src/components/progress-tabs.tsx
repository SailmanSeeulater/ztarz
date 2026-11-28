import Link from "next/link";

const TABS = [
  { id: "overview", href: "/progress", label: "Overview" },
  { id: "week", href: "/week", label: "This week" },
  { id: "map", href: "/map", label: "Map" },
  { id: "log", href: "/progress/log", label: "Log" },
] as const;

/** The four views of how you're doing, as a segmented control under the title. */
export function ProgressTabs({ active }: { active: (typeof TABS)[number]["id"] }) {
  return (
    <nav aria-label="Progress" className="mt-4 grid grid-cols-4 rounded-[0.6rem] bg-group p-0.5 text-[0.8125rem] font-medium">
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
