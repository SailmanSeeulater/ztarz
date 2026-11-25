import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowKeysNav } from "@/components/arrow-keys-nav";
import { ArrowUpRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { CardPass, Field } from "@/components/pass";
import { allSolutions, getSolution } from "@/lib/content";
import { Difficulty } from "@/components/difficulty";

export function generateStaticParams() {
  return allSolutions().map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: PageProps<"/library/solutions/[id]">): Promise<Metadata> {
  const s = getSolution((await params).id);
  return { title: s && `${s.number}. ${s.title}` };
}

/** Sections shown folded, so you can think before you look. */
const FOLDED = new Set(["solution"]);

export default function SolutionPage({ params }: PageProps<"/library/solutions/[id]">) {
  return (
    // Every solution is prerendered; the boundary keeps unknown ids from blocking navigation.
    <Suspense fallback={<div className="pass mt-11 h-96 animate-pulse opacity-60" />}>
      <SolutionBody params={params} />
    </Suspense>
  );
}

async function SolutionBody({ params }: { params: PageProps<"/library/solutions/[id]">["params"] }) {
  const s = getSolution((await params).id);
  if (!s) notFound();
  const all = allSolutions();
  const i = all.findIndex((x) => x.id === s.id);
  const prev = all[i - 1];
  const next = all[i + 1];

  return (
    <article>
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/library/solutions"
          className="-ml-1.5 inline-flex items-center gap-0.5 text-[0.9375rem] text-tint hover:opacity-80"
        >
          <ChevronLeftIcon className="size-5" />
          Solutions
        </Link>
        <span className="text-[0.8125rem] text-label-2 tabular-nums">
          {i + 1} of {all.length}
        </span>
      </div>
      <ArrowKeysNav
        prev={prev && `/library/solutions/${prev.id}`}
        next={next && `/library/solutions/${next.id}`}
      />
      <CardPass
        className="mt-4"
        module="leetcode"
        title={
          <>
            <span className="text-[var(--ink-2)]">{s.number}.</span> {s.title}
          </>
        }
        titleAs="h1"
        stack={s.stack}
        topRight={<Difficulty level={s.difficulty} className="pt-0.5 text-[0.9375rem] font-semibold" />}
        fields={
          <>
            <Field label="Time">{s.time}</Field>
            <Field label="Space">{s.space}</Field>
            <Field label="Pattern">{s.patterns.join(", ")}</Field>
            {s.structures.length > 0 && <Field label="Data structures">{s.structures.join(", ")}</Field>}
          </>
        }
        footer={
          <dl>
            <Field label="Problem">
              <a
                href={s.source}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 underline underline-offset-2 hover:opacity-80"
              >
                leetcode.com
                <ArrowUpRightIcon />
              </a>
            </Field>
          </dl>
        }
      >
        <div className="space-y-6">
          {s.sections.map((sec) =>
            FOLDED.has(sec.key) ? (
              <details key={sec.key} className="group/sol rounded-xl bg-[var(--well)]">
                <summary className="flex cursor-pointer list-none items-center gap-2 px-3.5 py-2.5 text-[0.9375rem] font-semibold [&::-webkit-details-marker]:hidden">
                  <ChevronRightIcon className="size-4 transition-transform duration-200 group-open/sol:rotate-90" />
                  {sec.heading}
                  <span className="ml-auto text-[0.8125rem] font-normal text-[var(--ink-2)] group-open/sol:hidden">
                    Tap to show the code
                  </span>
                </summary>
                <div className="card-md px-3.5 pb-3.5" dangerouslySetInnerHTML={{ __html: sec.html }} />
              </details>
            ) : (
              <section key={sec.key}>
                <h2 className="field-label">{sec.heading}</h2>
                <div className="card-md mt-1.5" dangerouslySetInnerHTML={{ __html: sec.html }} />
              </section>
            ),
          )}
        </div>
      </CardPass>
      <nav aria-label="Other solutions" className="mt-4 flex gap-2">
        {[prev, next].map((x, k) =>
          x ? (
            <Link
              key={x.id}
              href={`/library/solutions/${x.id}`}
              className={`flex min-w-0 flex-1 items-center gap-2 rounded-2xl bg-group px-4 py-3 text-tint transition-colors hover:bg-group-2 ${k ? "justify-end text-right" : ""}`}
            >
              {k === 0 && <ChevronLeftIcon className="size-4 shrink-0" />}
              <span className="min-w-0">
                <span className="block text-[0.75rem] text-label-2">{k ? "Next" : "Previous"}</span>
                <span className="block truncate text-[0.9375rem] text-label">
                  {x.number}. {x.title}
                </span>
              </span>
              {k === 1 && <ChevronRightIcon className="size-4 shrink-0" />}
            </Link>
          ) : (
            <span key={k} className="flex-1" />
          ),
        )}
      </nav>
    </article>
  );
}
