import type { Metadata } from "next";
import Link from "next/link";
import { cardsByModule, publicCards } from "@/lib/content";
import { ChevronRightIcon } from "@/components/icons";
import { ModuleArt } from "@/components/module-art";
import { StackMark } from "@/components/stack-logo";
import { hueFor, moduleParts } from "@/components/pass";
import { TYPE_LABEL } from "@/components/type-label";

export const metadata: Metadata = { title: "Library" };

export default function Library() {
  const groups = cardsByModule();
  return (
    <div>
      <h1 className="text-[2.125rem] leading-tight font-bold tracking-[-0.02em]">Library</h1>
      <p className="mt-1 max-w-[60ch] text-[0.9375rem] text-label-2">
        {publicCards().length} cards. Practising one here doesn&apos;t change its schedule; your daily session does
        that.
      </p>

      <div className="mt-8 space-y-8">
        {groups.map(([moduleId, cards]) => (
          <section key={moduleId} aria-labelledby={`m-${moduleId}`}>
            <div className="flex items-center gap-2.5 px-1">
              <span className="pass grid size-10 shrink-0 place-items-center rounded-xl" data-hue={hueFor(moduleId)}>
                <ModuleArt id={moduleId} strokeWidth={2.75} className="size-7" />
              </span>
              <h2 id={`m-${moduleId}`} className="min-w-0 flex-1 truncate text-[1.0625rem] font-semibold">
                <span className="mr-1.5 text-label-2">{moduleParts(moduleId).code}</span>
                {moduleParts(moduleId).name}
              </h2>
              <span className="text-[0.8125rem] text-label-2 tabular-nums">{cards.length}</span>
            </div>
            <ul className="mt-2.5 overflow-hidden rounded-2xl bg-group">
              {cards.map((card) => (
                <li key={card.id} className="group/row">
                  <Link
                    href={`/cards/${card.id}`}
                    className="flex items-center gap-3 pl-4 transition-colors hover:bg-group-2 active:bg-group-2"
                  >
                    <span className="flex min-w-0 flex-1 items-center gap-3 border-b border-sep py-3 pr-3 group-last/row:border-b-0">
                      <span className="min-w-0 flex-1 text-[0.9375rem]">{card.title}</span>
                      {card.stack.length > 0 && (
                        <span className="flex shrink-0 items-center gap-1" title={card.stack.map((l) => l.title).join(", ")}>
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
          </section>
        ))}
      </div>
    </div>
  );
}
