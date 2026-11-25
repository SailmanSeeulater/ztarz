import type { Metadata } from "next";
import { Suspense } from "react";
import { Field, ModuleBadge, hueFor, moduleParts } from "@/components/pass";
import { BRANCH_PREREQS, FOUNDATIONS, type ModuleId } from "@/lib/content/schema";
import { getCurrentUser } from "@/lib/session";
import type { ModuleProgress } from "@/server/srs";
import { getCaller } from "@/trpc/server";

export const metadata: Metadata = { title: "Curriculum map" };

const BRANCHES = Object.keys(BRANCH_PREREQS) as (keyof typeof BRANCH_PREREQS)[];
const ACROSS: ModuleId[] = ["stack", "interview"];
const EMPTY: ModuleProgress = { total: 0, started: 0, mature: 0, due: 0 };

export default function MapPage() {
  return (
    <div>
      <h1 className="text-[2.125rem] leading-tight font-bold tracking-[-0.02em]">Map</h1>
      <p className="mt-1 max-w-[60ch] text-[0.9375rem] text-label-2">
        Foundations feed the role branches. A card is mature once it&apos;s scheduled 21+ days out. Tap a pass for
        details.
      </p>
      <Suspense fallback={<CurriculumMap progress={{}} loading />}>
        <MapWithProgress />
      </Suspense>
    </div>
  );
}

async function MapWithProgress() {
  await getCurrentUser();
  const progress = await (await getCaller()).session.progress();
  return <CurriculumMap progress={progress} />;
}

function CurriculumMap({ progress, loading = false }: { progress: Record<string, ModuleProgress>; loading?: boolean }) {
  const of = (id: ModuleId) => progress[id] ?? EMPTY;
  const readiness = (ids: readonly ModuleId[]) => {
    const total = ids.reduce((n, id) => n + of(id).total, 0);
    return total ? ids.reduce((n, id) => n + of(id).mature, 0) / total : 0;
  };

  return (
    <div className={`mt-8 space-y-10 ${loading ? "animate-pulse" : ""}`}>
      <Stack title="Role branches" hint="Each builds on three foundations">
        {BRANCHES.map((id) => (
          <ModulePass key={id} id={id} p={of(id)}>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="field-label mr-1">Needs</span>
              {BRANCH_PREREQS[id].map((f) => (
                <span key={f} className="rounded-md bg-[var(--well)] px-1.5 py-0.5 text-xs font-semibold">
                  {moduleParts(f).code}
                </span>
              ))}
              <span className="ml-auto text-sm tabular-nums">
                {Math.round(readiness(BRANCH_PREREQS[id]) * 100)}% of those mature
              </span>
            </div>
          </ModulePass>
        ))}
      </Stack>

      <Stack title="Foundations" hint="Every branch assumes these">
        {FOUNDATIONS.map((id) => (
          <ModulePass key={id} id={id} p={of(id)} />
        ))}
      </Stack>

      <Stack title="Across branches">
        {ACROSS.map((id) => (
          <ModulePass key={id} id={id} p={of(id)} />
        ))}
      </Stack>
    </div>
  );
}

function Stack({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-baseline justify-between gap-4 px-1">
        <h2 className="text-[1.25rem] font-bold tracking-[-0.01em]">{title}</h2>
        {hint && <p className="text-[0.8125rem] text-label-2">{hint}</p>}
      </div>
      <ul className="pass-stack mt-3" style={{ "--covered": "4.25rem" } as React.CSSProperties}>
        {children}
      </ul>
    </section>
  );
}

/** One module as a pass. Collapsed, the next pass covers all but its top strip; open, it shows everything. */
function ModulePass({ id, p, children }: { id: ModuleId; p: ModuleProgress; children?: React.ReactNode }) {
  const { name } = moduleParts(id);
  const pct = (n: number) => (p.total ? (n / p.total) * 100 : 0);
  const empty = p.total === 0;

  return (
    <li>
      <details className="pass" data-hue={hueFor(id)}>
        <summary className="block rounded-[inherit]">
          {/* The strip that stays visible in the stack */}
          <div className="flex h-[3.75rem] items-center gap-3 px-4">
            <ModuleBadge id={id} />
            <span className="min-w-0 flex-1 truncate text-[0.9375rem] font-semibold">{name}</span>
            {p.due > 0 ? (
              <span className="shrink-0 rounded-full bg-[var(--ink)] px-2 py-0.5 text-xs font-semibold text-[var(--pass)] tabular-nums">
                {p.due} due
              </span>
            ) : (
              <span className="shrink-0 text-sm text-[var(--ink-2)] tabular-nums">
                {empty ? "No cards yet" : `${p.mature}/${p.total}`}
              </span>
            )}
          </div>
          {/* Covered by the next pass, except on the last one in a stack */}
          <div className="h-[4.25rem] px-4 pt-1">
            <div
              className="flex h-1.5 overflow-hidden rounded-full bg-[var(--well-strong)]"
              role="img"
              aria-label={`${p.mature} mature, ${p.started} started, ${p.total} cards`}
            >
              <div className="bg-[var(--ink)]" style={{ width: `${pct(p.mature)}%` }} />
              <div className="bg-[var(--ink-2)] opacity-50" style={{ width: `${pct(p.started - p.mature)}%` }} />
            </div>
            <p className="mt-2 text-xs text-[var(--ink-2)] tabular-nums">
              {empty ? "Nothing to practise here yet" : `${p.started} of ${p.total} started`}
            </p>
          </div>
        </summary>
        <div className="border-t border-[var(--well-strong)] px-4 pt-3.5 pb-4">
          <dl className="grid grid-cols-4 gap-3">
            <Field label="Cards">{p.total}</Field>
            <Field label="Started">{p.started}</Field>
            <Field label="Mature">{p.mature}</Field>
            <Field label="Due">{p.due}</Field>
          </dl>
          {children && <div className="mt-4">{children}</div>}
        </div>
      </details>
    </li>
  );
}
