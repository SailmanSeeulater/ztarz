import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ChevronLeftIcon } from "@/components/icons";
import { NoteEditor } from "@/components/note-editor";
import { getCurrentUser } from "@/lib/session";
import { TRPCReactProvider } from "@/trpc/client";
import { getCaller } from "@/trpc/server";

export const metadata: Metadata = { title: "Note" };

export default function NotePage({ params }: PageProps<"/notes/[id]">) {
  return (
    <div>
      <Link href="/notes" className="-ml-1.5 inline-flex items-center gap-0.5 text-[0.9375rem] text-tint hover:opacity-80">
        <ChevronLeftIcon className="size-5" />
        Notes
      </Link>
      <Suspense fallback={<div className="mt-4 h-96 animate-pulse rounded-2xl bg-group" />}>
        <Note params={params} />
      </Suspense>
    </div>
  );
}

async function Note({ params }: { params: PageProps<"/notes/[id]">["params"] }) {
  const { id } = await params;
  await getCurrentUser();
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const n = await (await getCaller()).note.get({ id });
  if (!n) notFound();
  return (
    <TRPCReactProvider>
      <NoteEditor key={n.id} id={n.id} initialTitle={n.title} initialBody={n.body} />
    </TRPCReactProvider>
  );
}
