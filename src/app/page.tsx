import type { Metadata } from "next";
import { Suspense } from "react";
import { TodaySession } from "@/components/today-session";
import { getCurrentUser } from "@/lib/session";
import { TRPCReactProvider } from "@/trpc/client";
import { getCaller } from "@/trpc/server";
import { signOut } from "./sign-in/actions";

export const metadata: Metadata = { title: "Today" };

export default function TodayPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Today</h1>
      <Suspense fallback={<div className="h-64 animate-pulse rounded-lg bg-surface" />}>
        <Today />
      </Suspense>
    </div>
  );
}

// Reads the session and the due queue at request time, so it streams in behind Suspense.
async function Today() {
  await getCurrentUser(); // redirects to /sign-in when signed out
  const { items, totals } = await (await getCaller()).session.today();
  const count = (slot: string) => items.filter((i) => i.slot === slot).length;

  return (
    <>
      <p className="-mt-4 text-sm text-muted">
        {count("review")} reviews · {count("new")} new · {count("drill")} drill · {count("out-loud")} out loud
        <span className="mx-2">·</span>
        {totals.seen} of {totals.cards} cards started
      </p>
      <TRPCReactProvider>
        <TodaySession items={items} />
      </TRPCReactProvider>
      <form action={signOut} className="pt-8 text-right">
        <button type="submit" className="text-sm text-muted hover:text-foreground">
          Sign out
        </button>
      </form>
    </>
  );
}
