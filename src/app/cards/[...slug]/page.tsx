import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { MODULES, allCards, getCard } from "@/lib/content";
import { CardView } from "@/components/card-view";
import { TYPE_LABEL } from "@/components/type-label";

export function generateStaticParams() {
  return allCards().map((c) => ({ slug: c.id.split("/") }));
}

export async function generateMetadata({ params }: PageProps<"/cards/[...slug]">): Promise<Metadata> {
  const card = getCard((await params).slug.join("/"));
  return { title: card?.title };
}

export default function CardPage({ params }: PageProps<"/cards/[...slug]">) {
  return (
    <article className="space-y-6">
      <Link href="/library" className="inline-block text-sm text-muted hover:text-foreground">
        ← Library
      </Link>
      {/* Every card is prerendered; the boundary keeps unknown slugs from blocking navigation. */}
      <Suspense fallback={<div className="h-40 animate-pulse rounded-lg bg-surface" />}>
        <CardBody params={params} />
      </Suspense>
    </article>
  );
}

async function CardBody({ params }: { params: PageProps<"/cards/[...slug]">["params"] }) {
  const card = getCard((await params).slug.join("/"));
  if (!card) notFound();

  return (
    <>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          {MODULES[card.module]} · {TYPE_LABEL[card.type]}
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">{card.title}</h1>
      </div>

      {/* key resets answer state when navigating between cards */}
      <CardView key={card.id} card={card} />

      <p className="border-t border-border pt-4 text-sm text-muted">
        Source:{" "}
        <a href={card.source} className="underline hover:text-foreground" target="_blank" rel="noreferrer">
          {new URL(card.source).hostname}
        </a>
      </p>
    </>
  );
}
