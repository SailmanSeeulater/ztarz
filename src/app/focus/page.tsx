import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { FocusEditor } from "@/components/focus-editor";
import { ChevronLeftIcon } from "@/components/icons";
import type { ModuleId } from "@/lib/content/schema";
import { getCurrentUser } from "@/lib/session";
import { TRPCReactProvider } from "@/trpc/client";
import { getCaller } from "@/trpc/server";

export const metadata: Metadata = { title: "Focus" };

export default function FocusPage() {
  return (
    <div>
      <Link href="/" className="-ml-1.5 inline-flex items-center gap-0.5 text-[0.9375rem] text-tint hover:opacity-80">
        <ChevronLeftIcon className="size-5" />
        Today
      </Link>
      <h1 className="mt-2 text-[2.125rem] leading-tight font-bold tracking-[-0.02em]">Focus</h1>
      <p className="mt-1 max-w-[60ch] text-[0.9375rem] text-label-2">
        Choose what your new cards come from. Picking a few modules mixes them day by day; cards you&apos;ve already
        started keep coming back whatever you pick.
      </p>
      <Suspense fallback={<div className="mt-6 h-96 animate-pulse rounded-2xl bg-group" />}>
        <Focus />
      </Suspense>
    </div>
  );
}

async function Focus() {
  await getCurrentUser();
  const caller = await getCaller();
  const [prefs, progress] = await Promise.all([caller.prefs.get(), caller.session.progress()]);
  const unseen: Partial<Record<ModuleId, number>> = {};
  for (const [id, p] of Object.entries(progress)) unseen[id as ModuleId] = p.total - p.started;
  return (
    <TRPCReactProvider>
      <FocusEditor initial={prefs} unseen={unseen} />
    </TRPCReactProvider>
  );
}
