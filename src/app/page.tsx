import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ChevronRightIcon } from "@/components/icons";
import { moduleParts } from "@/components/pass";
import { StreakBadge } from "@/components/streak-badge";
import { TodaySession } from "@/components/today-session";
import { getCurrentUser } from "@/lib/session";
import { TRPCReactProvider } from "@/trpc/client";
import { getCaller } from "@/trpc/server";

export const metadata: Metadata = { title: "Today" };

export default function TodayPage() {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="text-[2.125rem] leading-tight font-bold tracking-[-0.02em]">Today</h1>
        <Link href="/week" className="inline-flex items-center text-[0.9375rem] text-tint hover:opacity-80">
          This week
          <ChevronRightIcon className="size-4" />
        </Link>
      </div>
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
  const caller = await getCaller();
  const [{ items, totals, seed, prefs }, streak] = await Promise.all([caller.session.today(), caller.session.streak()]);

  return (
    <>
      <p className="mt-1 text-[0.9375rem] text-label-2 tabular-nums">
        {items.length} cards today
        <span className="mx-1.5">·</span>
        {totals.seen} of {totals.cards} started
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <StreakBadge streak={streak} />
        <Link
          href="/focus"
          className="inline-flex max-w-full items-center gap-1 rounded-full bg-group px-3 py-1 text-[0.8125rem] font-medium text-tint hover:bg-group-2"
        >
          <span className="truncate">
            {prefs.focus.length === 0
              ? "Focus: everything"
              : `Focus: ${prefs.focus
                  .slice(0, 2)
                  .map((id) => moduleParts(id).name)
                  .join(", ")}${prefs.focus.length > 2 ? ` +${prefs.focus.length - 2}` : ""}`}
          </span>
          <ChevronRightIcon className="size-3.5 shrink-0" />
        </Link>
      </div>
      <div className="mt-6">
        <TRPCReactProvider>
          <TodaySession items={items} seed={seed} />
        </TRPCReactProvider>
      </div>
    </>
  );
}
