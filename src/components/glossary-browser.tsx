"use client";

import { useDeferredValue, useMemo, useState } from "react";
import type { GlossaryCategory, GlossaryTerm } from "@/lib/content/schema";
import { ArrowUpRightIcon } from "./icons";
import { StackMark } from "./stack-logo";

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const plain = (html: string) => html.replace(/<[^>]+>/g, "");

/**
 * The glossary, filtered as you type. Terms arrive pre-rendered from the content build
 * (trusted HTML from this repo), so this only decides which ones to show.
 */
export function GlossaryBrowser({
  terms,
  categories,
}: {
  terms: GlossaryTerm[];
  categories: Record<GlossaryCategory, string>;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<GlossaryCategory | "all">("all");
  const q = useDeferredValue(query.trim().toLowerCase());

  const index = useMemo(
    () => terms.map((t) => ({ t, text: `${t.term} ${t.aka ?? ""} ${plain(t.shortHtml)}`.toLowerCase() })),
    [terms],
  );
  const shown = index
    .filter(({ t, text }) => (category === "all" || t.category === category) && (!q || text.includes(q)))
    .map(({ t }) => t);
  // Exact term matches first while searching ("dns" should put DNS above things that mention it).
  if (q) shown.sort((a, b) => Number(b.term.toLowerCase().startsWith(q)) - Number(a.term.toLowerCase().startsWith(q)));

  const groups = new Map<string, GlossaryTerm[]>();
  for (const t of shown) {
    const letter = q ? "Results" : /[a-z]/i.test(t.term[0]) ? t.term[0].toUpperCase() : "#";
    groups.set(letter, [...(groups.get(letter) ?? []), t]);
  }

  const jump = (term: string) => {
    setQuery("");
    setCategory("all");
    // Let the full list render, then scroll to the term.
    requestAnimationFrame(() =>
      document.getElementById(`t-${slug(term)}`)?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };

  const counts = useMemo(() => {
    const c: Partial<Record<GlossaryCategory, number>> = {};
    for (const t of terms) c[t.category] = (c[t.category] ?? 0) + 1;
    return c;
  }, [terms]);

  return (
    <div>
      <div className="sticky top-[5.25rem] z-10 -mx-4 sm:top-[3.25rem] bg-[var(--bg)]/90 px-4 pt-2 pb-3 backdrop-blur-md">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${terms.length} terms`}
          aria-label="Search the glossary"
          className="w-full rounded-xl bg-group px-3.5 py-2.5 text-[1rem] outline-none placeholder:text-label-2 focus-visible:ring-2 focus-visible:ring-tint"
        />
        <div className="-mx-4 mt-2.5 flex gap-1.5 overflow-x-auto px-4 pb-0.5 [scrollbar-width:none]" role="group" aria-label="Category">
          {(["all", ...Object.keys(categories)] as (GlossaryCategory | "all")[])
            .filter((c) => c === "all" || counts[c])
            .map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
                className="shrink-0 rounded-full bg-group px-3 py-1 text-[0.8125rem] font-medium whitespace-nowrap text-label-2 transition-colors aria-pressed:bg-tint aria-pressed:text-white"
              >
                {c === "all" ? "All" : categories[c]}
              </button>
            ))}
        </div>
      </div>

      {shown.length === 0 && (
        <p className="mt-6 rounded-2xl bg-group px-4 py-3.5 text-label-2">No terms match “{query}”.</p>
      )}

      <div className="mt-3 space-y-7">
        {[...groups].map(([letter, ts]) => (
          <section key={letter} aria-label={letter}>
            <h2 className="px-1 text-[0.8125rem] font-semibold tracking-wide text-label-2">{letter}</h2>
            <ul className="mt-2 space-y-2.5">
              {ts.map((t) => (
                <li key={t.id} id={`t-${t.id}`} className="scroll-mt-52 sm:scroll-mt-44 rounded-2xl bg-group px-4 py-3.5">
                  <div className="flex items-start gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[1.0625rem] font-semibold">
                        {t.term}
                        {t.aka && <span className="ml-2 text-[0.875rem] font-normal text-label-2">{t.aka}</span>}
                      </h3>
                      <p className="mt-0.5 text-[0.75rem] text-label-2">{categories[t.category]}</p>
                    </div>
                    {t.stack.length > 0 && (
                      <span className="flex shrink-0 gap-1.5 pt-1">
                        {t.stack.slice(0, 2).map((l) => (
                          <StackMark key={l.slug} logo={l} className="size-5" />
                        ))}
                      </span>
                    )}
                  </div>
                  <p className="card-md mt-2 text-[0.9375rem]" dangerouslySetInnerHTML={{ __html: t.shortHtml }} />
                  {t.detailHtml && (
                    <div className="card-md mt-2 text-[0.875rem] text-label-2" dangerouslySetInnerHTML={{ __html: t.detailHtml }} />
                  )}
                  {t.funHtml && (
                    <p className="mt-3 rounded-xl bg-group-2 px-3 py-2 text-[0.875rem]">
                      <span className="mr-1.5 font-semibold text-tint">Fun fact</span>
                      <span className="card-md" dangerouslySetInnerHTML={{ __html: t.funHtml }} />
                    </p>
                  )}
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[0.8125rem]">
                    {t.see.length > 0 && <span className="text-label-2">See</span>}
                    {t.see.map((s) => (
                      <button key={s} type="button" onClick={() => jump(s)} className="text-tint hover:opacity-80">
                        {s}
                      </button>
                    ))}
                    <a
                      href={t.source}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-auto inline-flex items-center gap-1 text-label-2 hover:text-label"
                    >
                      {new URL(t.source).hostname.replace(/^www\./, "")}
                      <ArrowUpRightIcon />
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
