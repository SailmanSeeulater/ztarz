import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRightIcon } from "@/components/icons";
import { LibraryTabs } from "@/components/library-tabs";
import { Difficulty } from "@/components/difficulty";
import { allSolutions } from "@/lib/content";

export const metadata: Metadata = { title: "LeetCode solutions" };

export default function Solutions() {
  const solutions = allSolutions();
  return (
    <div>
      <h1 className="text-[2.125rem] leading-tight font-bold tracking-[-0.02em]">Library</h1>
      <LibraryTabs active="solutions" />
      <p className="mt-4 max-w-[60ch] text-[0.9375rem] text-label-2">
        Worked LeetCode problems, each from brute force to the final approach: the thinking, the data structures and
        the pattern. Try the problem first, then read.
      </p>
      {solutions.length === 0 ? (
        <p className="mt-6 rounded-2xl bg-group px-4 py-3.5 text-label-2">No solutions yet.</p>
      ) : (
        <ul className="mt-6 overflow-hidden rounded-2xl bg-group">
          {solutions.map((s) => (
            <li key={s.id} className="group/row">
              <Link
                href={`/library/solutions/${s.id}`}
                className="flex items-center gap-3 pl-4 transition-colors hover:bg-group-2 active:bg-group-2"
              >
                <span className="w-7 shrink-0 text-right text-[0.8125rem] font-semibold text-label-2 tabular-nums">
                  {s.number}
                </span>
                <span className="flex min-w-0 flex-1 items-center gap-3 border-b border-sep py-3 pr-3 group-last/row:border-b-0">
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.9375rem]">{s.title}</span>
                    <span className="mt-0.5 block truncate text-[0.8125rem] text-label-2">{s.patterns.join(" · ")}</span>
                  </span>
                  <Difficulty level={s.difficulty} className="shrink-0 text-[0.8125rem] text-label-2" />
                  <ChevronRightIcon className="size-4 shrink-0 text-label-2" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
