import type { Metadata } from "next";
import Link from "next/link";
import { cardsByModule, publicCards } from "@/lib/content";
import { MODULE_GROUPS, type ModuleId } from "@/lib/content/schema";
import type { Card } from "@/lib/content";
import { ChevronRightIcon } from "@/components/icons";
import { LibraryTabs } from "@/components/library-tabs";
import { ModuleArt } from "@/components/module-art";
import { OpenFromHash } from "@/components/open-from-hash";
import { StackMark } from "@/components/stack-logo";
import { hueFor, moduleParts } from "@/components/pass";
import { TYPE_LABEL } from "@/components/type-label";

export const metadata: Metadata = { title: "Library" };

export default function Library() {
  const byModule = new Map(cardsByModule());
  return (
    <div>
      <h1 className="text-[2.125rem] leading-tight font-bold tracking-[-0.02em]">Library</h1>
      <LibraryTabs active="cards" />
      <p className="mt-4 max-w-[60ch] text-[0.9375rem] text-label-2">
        {publicCards().length} cards. Tap a module to open it. Practising here doesn&apos;t change a card&apos;s
        schedule; your daily session does that.
      </p>
      <OpenFromHash />

      <div className="mt-8 space-y-9">
        {MODULE_GROUPS.map((g) => {
          const modules = g.modules.filter((id: ModuleId) => byModule.has(id));
          if (!modules.length) return null;
          return (
            <section key={g.id} aria-labelledby={`g-${g.id}`}>
              <h2 id={`g-${g.id}`} className="px-1 text-[1.25rem] font-bold tracking-[-0.01em]">
                {g.title}
              </h2>
              <div className="mt-3 overflow-hidden rounded-2xl bg-group">
                {modules.map((id: ModuleId) => (
                  <ModuleSection key={id} id={id} cards={byModule.get(id)!} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

/** One module: a row that opens to its cards. Each opens and closes on its own. */
function ModuleSection({ id, cards }: { id: ModuleId; cards: Card[] }) {
  const { code, name } = moduleParts(id);
  return (
    <details className="group/mod border-b border-sep last:border-b-0">
      <summary
        id={`m-${id}`}
        className="flex cursor-pointer list-none items-center gap-3 px-3 py-2.5 transition-colors hover:bg-group-2 [&::-webkit-details-marker]:hidden"
      >
        <span className="pass grid size-10 shrink-0 place-items-center rounded-xl" data-hue={hueFor(id)}>
          <ModuleArt id={id} strokeWidth={2.75} className="size-7" />
        </span>
        <span className="min-w-0 flex-1 truncate text-[1rem] font-semibold">
          <span className="mr-1.5 text-label-2">{code}</span>
          {name}
        </span>
        <span className="text-[0.8125rem] text-label-2 tabular-nums">{cards.length}</span>
        <ChevronRightIcon className="size-4 shrink-0 text-label-2 transition-transform duration-200 group-open/mod:rotate-90" />
      </summary>
      <ul className="border-t border-sep bg-group-2/40">
        {cards.map((card) => (
          <li key={card.id} className="group/row">
            <Link
              href={`/cards/${card.id}`}
              className="flex items-center gap-3 pl-[4.25rem] transition-colors hover:bg-group-2 active:bg-group-2"
            >
              <span className="flex min-w-0 flex-1 items-center gap-3 border-b border-sep py-3 pr-3 group-last/row:border-b-0">
                <span className="min-w-0 flex-1 text-[0.9375rem]">{card.title}</span>
                {card.stack.length > 0 && (
                  <span className="hidden shrink-0 items-center gap-1 sm:flex" title={card.stack.map((l) => l.title).join(", ")}>
                    {card.stack.slice(0, 3).map((l) => (
                      <StackMark key={l.slug} logo={l} color="currentColor" className="size-3.5 text-label-2" />
                    ))}
                  </span>
                )}
                <span className="shrink-0 text-[0.8125rem] text-label-2">{TYPE_LABEL[card.type]}</span>
                <ChevronRightIcon className="size-4 shrink-0 text-label-2" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
