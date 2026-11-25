import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getPublicCard, publicCards } from "@/lib/content";
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
      <Link
        href="/library"
        className="-ml-1.5 inline-flex items-center gap-0.5 text-[0.9375rem] text-tint hover:opacity-80"
      >
        <ChevronLeftIcon className="size-5" />
        Library
      </Link>
      {/* Every card is prerendered; the boundary keeps unknown slugs from blocking navigation. */}
      <Suspense fallback={<div className="pass mt-4 h-72 animate-pulse opacity-60" />}>
        <CardBody params={params} />
      </Suspense>
    </article>
  );
}

async function CardBody({ params }: { params: PageProps<"/cards/[...slug]">["params"] }) {
  const card = getPublicCard((await params).slug.join("/"));
  if (!card) notFound();

  const notes = card.source.startsWith("notes:");
  return (
    <CardPass
      className="mt-4"
      module={card.module}
      title={card.title}
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
  );
}
