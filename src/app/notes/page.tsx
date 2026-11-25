import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ChevronRightIcon } from "@/components/icons";
import { NewNoteButton } from "@/components/new-note-button";
import { MAX_NOTES, noteExcerpt } from "@/lib/notes";
import { appTimeZone } from "@/lib/srs/day";
import { getCurrentUser } from "@/lib/session";
import { TRPCReactProvider } from "@/trpc/client";
import { getCaller } from "@/trpc/server";

export const metadata: Metadata = { title: "Notes" };

export default function NotesPage() {
  return (
    <div>
      <Suspense
        fallback={
          <>
            <h1 className="text-[2.125rem] leading-tight font-bold tracking-[-0.02em]">Notes</h1>
            <div className="mt-6 h-40 animate-pulse rounded-2xl bg-group" />
          </>
        }
      >
        <Notes />
      </Suspense>
    </div>
  );
}

async function Notes() {
  await getCurrentUser();
  const notes = await (await getCaller()).note.list();
  const fmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: appTimeZone() });
  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-[2.125rem] leading-tight font-bold tracking-[-0.02em]">Notes</h1>
          <p className="mt-1 text-[0.9375rem] text-label-2 tabular-nums">
            {notes.length} of {MAX_NOTES} · Markdown works
          </p>
        </div>
        <TRPCReactProvider>
          <NewNoteButton disabled={notes.length >= MAX_NOTES} />
        </TRPCReactProvider>
      </div>
      {notes.length >= MAX_NOTES && (
        <p className="mt-4 rounded-2xl bg-group px-4 py-3 text-[0.875rem] text-label-2">
          That&apos;s the limit. Fold what you&apos;ve learnt into fewer notes, or delete one you&apos;ve outgrown.
        </p>
      )}
      {notes.length === 0 ? (
        <p className="mt-6 rounded-2xl bg-group px-4 py-3.5 text-[0.9375rem] text-label-2">
          No notes yet. Keep the things you keep looking up: commands, gotchas, your own explanations.
        </p>
      ) : (
        <ul className="mt-6 overflow-hidden rounded-2xl bg-group">
          {notes.map((n) => (
            <li key={n.id} className="group/row">
              <Link href={`/notes/${n.id}`} className="flex items-center gap-3 pl-4 transition-colors hover:bg-group-2">
                <span className="flex min-w-0 flex-1 items-center gap-3 border-b border-sep py-3 pr-3 group-last/row:border-b-0">
                  <span className="min-w-0 flex-1">
                    <span className={`block truncate text-[0.9375rem] font-medium ${n.title ? "" : "text-label-2"}`}>
                      {n.title || "Untitled"}
                    </span>
                    <span className="mt-0.5 block truncate text-[0.8125rem] text-label-2">
                      {noteExcerpt(n.body) || "Empty"}
                    </span>
                  </span>
                  <span className="shrink-0 text-[0.8125rem] text-label-2">{fmt.format(n.updatedAt)}</span>
                  <ChevronRightIcon className="size-4 shrink-0 text-label-2" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
