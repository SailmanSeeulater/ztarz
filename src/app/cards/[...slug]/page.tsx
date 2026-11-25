import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getPublicCard, moduleNeighbours, publicCards } from "@/lib/content";
import { ArrowKeysNav } from "@/components/arrow-keys-nav";
import { ChevronRightIcon } from "@/components/icons";
import { moduleParts } from "@/components/pass";
import { CardView } from "@/components/card-view";
import { ArrowUpRightIcon, ChevronLeftIcon } from "@/components/icons";
import { CardPass, Field } from "@/components/pass";
import { TYPE_LABEL } from "@/components/type-label";

export function generateStaticParams() {
  return publicCards().map((c) => ({ slug: c.id.split("/") }));
}

export async function generateMetadata({ params }: PageProps<"/cards/[...slug]">): Promise<Metadata> {
  const card = getPublicCard((await params).slug.join("/"));
  return { title: card?.title };
}

export default function CardPage({ params }: PageProps<"/cards/[...slug]">) {
  return (
    <article>
      {/* Every card is prerendered; the boundary keeps unknown slugs from blocking navigation. */}
      <Suspense fallback={<div className="pass mt-11 h-72 animate-pulse opacity-60" />}>
        <CardBody params={params} />
      </Suspense>
    </article>
  );
}

async function CardBody({ params }: { params: PageProps<"/cards/[...slug]">["params"] }) {
  const card = getPublicCard((await params).slug.join("/"));
  if (!card) notFound();

  const notes = card.source.startsWith("notes:");
  const nav = moduleNeighbours(card.id)!;
  return (
    <>
      <SectionNav card={card} nav={nav} />
      <CardPass
      className="mt-4"
      module={card.module}
      title={card.title}
      stack={card.stack}
      titleAs="h1"
      fields={
        <>
          <Field label="Type">{TYPE_LABEL[card.type]}</Field>
          {card.tags.length > 0 && <Field label="Tags">{card.tags.slice(0, 3).join(", ")}</Field>}
        </>
      }
      footer={
        <dl>
          <Field label="Source">
            {notes ? (
              <>your notes ({card.source.slice("notes:".length)})</>
            ) : (
              <a
                href={card.source}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 underline underline-offset-2 hover:opacity-80"
              >
                {new URL(card.source).hostname}
                <ArrowUpRightIcon />
              </a>
            )}
          </Field>
        </dl>
      }
    >
      {/* key resets answer state when navigating between cards */}
      <CardView key={card.id} card={card} />
    </CardPass>
      {/* Bottom pager: after reading the answer, the next card is right there. */}
      <Pager nav={nav} className="mt-4" />
    </>
  );
}

type Nav = NonNullable<ReturnType<typeof moduleNeighbours>>;
type CardT = NonNullable<ReturnType<typeof getPublicCard>>;

/** Back to this module in the library, where in the module you are, and every card in it. */
function SectionNav({ card, nav }: { card: CardT; nav: Nav }) {
  const { code, name } = moduleParts(card.module);
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <Link
          href={`/library#m-${card.module}`}
          className="-ml-1.5 inline-flex min-w-0 items-center gap-0.5 text-[0.9375rem] text-tint hover:opacity-80"
        >
          <ChevronLeftIcon className="size-5 shrink-0" />
          <span className="truncate">{name}</span>
        </Link>
        <Pager nav={nav} compact />
      </div>
      <ArrowKeysNav prev={nav.prev && `/cards/${nav.prev.id}`} next={nav.next && `/cards/${nav.next.id}`} />
      <details className="group/all mt-3 rounded-2xl bg-group">
        <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-2.5 text-[0.875rem] text-label-2 [&::-webkit-details-marker]:hidden">
          <span className="font-semibold text-label">{code}</span>
          <span className="tabular-nums">
            Card {nav.index + 1} of {nav.siblings.length}
          </span>
          <span className="ml-auto">All cards</span>
          <ChevronRightIcon className="size-4 transition-transform duration-200 group-open/all:rotate-90" />
        </summary>
        <ol className="max-h-80 overflow-y-auto border-t border-sep py-1">
          {nav.siblings.map((c, i) => (
            <li key={c.id}>
              <Link
                href={`/cards/${c.id}`}
                aria-current={c.id === card.id ? "page" : undefined}
                className="flex gap-3 px-4 py-2 text-[0.9375rem] transition-colors hover:bg-group-2 aria-[current=page]:font-semibold aria-[current=page]:text-tint"
              >
                <span className="w-6 shrink-0 text-right text-label-2 tabular-nums">{i + 1}</span>
                <span className="min-w-0 flex-1">{c.title}</span>
              </Link>
            </li>
          ))}
        </ol>
      </details>
    </div>
  );
}

function Pager({ nav, compact = false, className = "" }: { nav: Nav; compact?: boolean; className?: string }) {
  const btn = (c: CardT | undefined, dir: "prev" | "next") => {
    const label = dir === "prev" ? "Previous" : "Next";
    const icon =
      dir === "prev" ? <ChevronLeftIcon className="size-4 shrink-0" /> : <ChevronRightIcon className="size-4 shrink-0" />;
    const base = compact
      ? "inline-flex size-9 items-center justify-center rounded-full bg-group"
      : `flex min-w-0 flex-1 items-center gap-2 rounded-2xl bg-group px-4 py-3 ${dir === "next" ? "justify-end text-right" : ""}`;
    if (!c) return <span aria-hidden className={`${base} opacity-40`}>{compact ? icon : null}</span>;
    return (
      <Link
        href={`/cards/${c.id}`}
        aria-label={compact ? `${label} card: ${c.title}` : undefined}
        title={compact ? `${label}: ${c.title} (${dir === "prev" ? "←" : "→"})` : undefined}
        className={`${base} text-tint transition-colors hover:bg-group-2`}
      >
        {compact ? (
          icon
        ) : (
          <>
            {dir === "prev" && icon}
            <span className="min-w-0">
              <span className="block text-[0.75rem] text-label-2">{label}</span>
              <span className="block truncate text-[0.9375rem] text-label">{c.title}</span>
            </span>
            {dir === "next" && icon}
          </>
        )}
      </Link>
    );
  };
  return (
    <nav aria-label="Cards in this module" className={`flex gap-2 ${className}`}>
      {btn(nav.prev, "prev")}
      {btn(nav.next, "next")}
    </nav>
  );
}
