import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CheckIcon } from "@/components/icons";
import { PassEmboss } from "@/components/module-art";
import { ModuleBadge, hueFor, moduleParts } from "@/components/pass";
import { StackChips } from "@/components/stack-logo";
import { allLabs, type Lab } from "@/lib/content";
import { getCurrentUser } from "@/lib/session";
import { getCaller } from "@/trpc/server";

export const metadata: Metadata = { title: "Labs" };

type Status = "passed" | "failed" | "started" | undefined;

export default function LabsPage() {
  return (
    <div>
      <h1 className="text-[2.125rem] leading-tight font-bold tracking-[-0.02em]">Labs</h1>
      <p className="mt-1 max-w-[60ch] text-[0.9375rem] text-label-2">
        Hands-on tasks for a weekend afternoon. Do them in your own terminal, paste the output back, and the checks tell
        you whether it worked.
      </p>
      <Suspense fallback={<LabStack status={{}} />}>
        <LabsWithStatus />
      </Suspense>
    </div>
  );
}

async function LabsWithStatus() {
  await getCurrentUser();
  const status = await (await getCaller()).lab.status();
  return <LabStack status={Object.fromEntries(Object.entries(status).map(([id, s]) => [id, s.status]))} />;
}

function LabStack({ status }: { status: Record<string, Status> }) {
  return (
    <ul className="pass-stack mt-8" style={{ "--covered": "3.25rem" } as React.CSSProperties}>
      {allLabs().map((lab) => (
        <li key={lab.id}>
          <LabPass lab={lab} status={status[lab.id]} />
        </li>
      ))}
    </ul>
  );
}

/** One lab as a pass: a two-line strip that shows in the stack, the lab's tools tucked underneath. */
function LabPass({ lab, status }: { lab: Lab; status: Status }) {
  return (
    <Link href={`/labs/${lab.id}`} className="pass relative isolate block" data-hue={hueFor(lab.module)}>
      <PassEmboss id={lab.module} logo={lab.stack[0]} className="-top-2 right-16 -z-10 size-[4.5rem]" />
      <div className="flex h-[4.5rem] items-center gap-3 px-4">
        <ModuleBadge id={lab.module} />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[0.9375rem] font-semibold">{lab.title}</span>
          <span className="mt-0.5 block text-xs text-[var(--ink-2)] tabular-nums">
            {moduleParts(lab.module).name} · {lab.minutes} min · {lab.checks.length} checks
          </span>
        </span>
        <StatusPill status={status} />
      </div>
      <div className="h-[3.25rem] overflow-hidden px-4 pt-0.5">
        <StackChips stack={lab.stack} className="flex-nowrap" />
      </div>
    </Link>
  );
}

function StatusPill({ status }: { status: Status }) {
  if (status === "passed") {
    return (
      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[var(--ink)] px-2 py-0.5 text-xs font-semibold text-[var(--pass)]">
        <CheckIcon className="size-3.5" />
        Passed
      </span>
    );
  }
  if (status === "failed") return <span className="shrink-0 text-sm text-[var(--ink-2)]">Not yet</span>;
  return null;
}
