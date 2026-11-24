import type { Metadata } from "next";
import Link from "next/link";
import { MODULES, allCards, cardsByModule } from "@/lib/content";
import { TYPE_LABEL } from "@/components/type-label";

export const metadata: Metadata = { title: "Library" };

export default function Library() {
  const groups = cardsByModule();
  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight">Card library</h1>
        <p className="mt-1 text-muted">
          {allCards().length} cards. Practising one here doesn&apos;t change its schedule; your daily session does that.
        </p>
      </section>

      {groups.map(([moduleId, cards]) => (
        <section key={moduleId}>
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted">{MODULES[moduleId]}</h2>
          <ul className="mt-3 divide-y divide-border overflow-hidden rounded-lg border border-border bg-surface">
            {cards.map((card) => (
              <li key={card.id}>
                <Link
                  href={`/cards/${card.id}`}
                  className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-background"
                >
                  <span>{card.title}</span>
                  <span className="shrink-0 text-xs text-muted">{TYPE_LABEL[card.type]}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
