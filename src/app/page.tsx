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
    <div>
      <h1 className="text-[2.125rem] leading-tight font-bold tracking-[-0.02em]">Today</h1>
      <Suspense fallback={<TodaySkeleton />}>
        <Today />
      </Suspense>
    </div>
  );
}

function TodaySkeleton() {
  return (
    <>
      <div className="mt-1 h-5 w-56 animate-pulse rounded bg-group" />
      <div className="pass mt-6 h-80 animate-pulse opacity-60" />
    </>
  );
}

// Reads the session and the due queue at request time, so it streams in behind Suspense.
async function Today() {
  await getCurrentUser(); // redirects to /sign-in when signed out
  const { items, totals, seed } = await (await getCaller()).session.today();
  const count = (slot: string) => items.filter((i) => i.slot === slot).length;

  return (
    <>
      <p className="mt-1 text-[0.9375rem] text-label-2 tabular-nums">
        {count("review")} reviews · {count("new")} new · {count("drill")} drill · {count("out-loud")} out loud
        <span className="mx-1.5">·</span>
        {totals.seen} of {totals.cards} started
      </p>
      <div className="mt-6">
        <TRPCReactProvider>
          <TodaySession items={items} seed={seed} />
        </TRPCReactProvider>
      </div>
      <form action={signOut} className="mt-12 text-center">
        <button type="submit" className="text-sm text-label-2 hover:text-label">
          Sign out
        </button>
      </form>
    </>
  );
}
