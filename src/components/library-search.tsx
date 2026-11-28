"use client";

import Link from "next/link";
import { useDeferredValue, useState } from "react";
import { searchLibrary, type SearchItem } from "@/lib/search";
import { ChevronRightIcon } from "./icons";

const KIND: Record<SearchItem["kind"], string> = { card: "Card", term: "Glossary", solution: "Solution" };

/** One box over cards, glossary terms and solutions. With nothing typed it shows `children` (the shelves). */
export function LibrarySearch({ items, children }: { items: SearchItem[]; children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  const q = useDeferredValue(query);
  const searching = q.trim().length > 0;
  const results = searching ? searchLibrary(items, q) : [];

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search cards, terms and solutions"
        aria-label="Search the library"
        className="mt-4 w-full rounded-xl bg-group px-3.5 py-2.5 text-[1rem] outline-none placeholder:text-label-2 focus-visible:ring-2 focus-visible:ring-tint"
      />
      {searching ? (
        <div className="mt-4" aria-live="polite">
          {results.length === 0 ? (
            <p className="rounded-2xl bg-group px-4 py-3.5 text-label-2">Nothing matches “{q.trim()}”.</p>
          ) : (
            <ul className="overflow-hidden rounded-2xl bg-group">
              {results.map((r) => (
                <li key={r.href} className="group/row">
                  <Link href={r.href} className="flex items-center gap-3 pl-4 transition-colors hover:bg-group-2">
                    <span className="flex min-w-0 flex-1 items-center gap-3 border-b border-sep py-2.5 pr-3 group-last/row:border-b-0">
                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.9375rem]">{r.title}</span>
                        <span className="mt-0.5 block truncate text-[0.8125rem] text-label-2">{r.context}</span>
                      </span>
                      <span className="shrink-0 text-[0.75rem] text-label-2">{KIND[r.kind]}</span>
                      <ChevronRightIcon className="size-4 shrink-0 text-label-2" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        children
      )}
    </div>
  );
}
