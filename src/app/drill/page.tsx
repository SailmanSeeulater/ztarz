import { randomInt } from "node:crypto";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { DrillSession } from "@/components/drill-session";
import { ChevronLeftIcon } from "@/components/icons";
import { moduleParts } from "@/components/pass";
import { allCards } from "@/lib/content";
import { MODULES, type ModuleId } from "@/lib/content/schema";
import { getCurrentUser } from "@/lib/session";
import { seededShuffle } from "@/lib/shuffle";
import { getCaller } from "@/trpc/server";

export const metadata: Metadata = { title: "Drill" };

const DRILL_SIZE = 10;

export default function DrillPage({ searchParams }: PageProps<"/drill">) {
  return (
    <div>
      <Suspense fallback={<div className="pass mt-11 h-80 animate-pulse opacity-60" />}>
        <Drill searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Drill({ searchParams }: { searchParams: PageProps<"/drill">["searchParams"] }) {
  const { m } = await searchParams;
  await getCurrentUser();
  const seed = randomInt(2 ** 31);
  const moduleId = typeof m === "string" && m in MODULES ? (m as ModuleId) : null;

  const cards = moduleId
    ? seededShuffle(
        allCards().filter((c) => c.module === moduleId),
        seed,
      ).slice(0, DRILL_SIZE)
    : (await (await getCaller()).session.missed()).map((x) => x.card);

  const back = moduleId ? { href: `/library#m-${moduleId}`, label: moduleParts(moduleId).name } : { href: "/week", label: "This week" };
  return (
    <>
      <Link href={back.href} className="-ml-1.5 inline-flex items-center gap-0.5 text-[0.9375rem] text-tint hover:opacity-80">
        <ChevronLeftIcon className="size-5" />
        {back.label}
      </Link>
      <h1 className="mt-2 text-[2.125rem] leading-tight font-bold tracking-[-0.02em]">
        {moduleId ? "Drill" : "Missed lately"}
      </h1>
      <p className="mt-1 text-[0.9375rem] text-label-2">
        {moduleId
          ? `${cards.length} cards from ${moduleParts(moduleId).name}, shuffled.`
          : "The cards you've missed in the last two weeks, most-missed first."}
      </p>
      <div className="mt-6">
        {cards.length === 0 ? (
          <p className="rounded-2xl bg-group px-4 py-3.5 text-[0.9375rem] text-label-2">
            {moduleId ? "No cards here yet." : "Nothing missed in the last two weeks. Pick a module in the library to drill instead."}
          </p>
        ) : (
          <DrillSession key={seed} cards={cards} seed={seed} againHref={moduleId ? `/drill?m=${moduleId}` : "/drill"} />
        )}
      </div>
    </>
  );
}
