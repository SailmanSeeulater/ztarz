import type { Metadata } from "next";
import { Suspense } from "react";
import { BRANCH_PREREQS, FOUNDATIONS, MODULES, type ModuleId } from "@/lib/content/schema";
import { getCurrentUser } from "@/lib/session";
import type { ModuleProgress } from "@/server/srs";
import { getCaller } from "@/trpc/server";

export const metadata: Metadata = { title: "Curriculum map" };

const BRANCHES = Object.keys(BRANCH_PREREQS) as (keyof typeof BRANCH_PREREQS)[];
const ACROSS: ModuleId[] = ["stack", "interview"];
const EMPTY: ModuleProgress = { total: 0, started: 0, mature: 0, due: 0 };

/** "F1 · How the web works" → ["F1", "How the web works"] */
const split = (id: ModuleId) => {
  const [code, name] = MODULES[id].split(" · ");
  return name ? [code, name] : [null, code];
};

export default function MapPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Curriculum map</h1>
        <p className="mt-1 text-sm text-muted">
          Read it bottom up: foundations feed the role branches. A card is <em>mature</em> once it&apos;s scheduled 21+
          days out.
        </p>
      </div>
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
    <div className={`space-y-8 ${loading ? "animate-pulse" : ""}`}>
      <Section title="Role branches" hint="Each builds on three foundations.">
        {BRANCHES.map((id) => (
          <Tile key={id} id={id} p={of(id)}>
            <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-muted">
              needs
              {BRANCH_PREREQS[id].map((f) => (
                <span key={f} className="rounded border border-border px-1.5 py-0.5 font-medium">
                  {split(f)[0]}
                </span>
              ))}
              <span className="ml-auto">{Math.round(readiness(BRANCH_PREREQS[id]) * 100)}% of those mature</span>
            </div>
          </Tile>
        ))}
      </Section>

      <Section title="Foundations" hint="Every branch assumes these.">
        {FOUNDATIONS.map((id) => (
          <Tile key={id} id={id} p={of(id)} />
        ))}
      </Section>

      <Section title="Across branches">
        {ACROSS.map((id) => (
          <Tile key={id} id={id} p={of(id)} />
        ))}
      </Section>
    </div>
  );
}

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-sm font-medium uppercase tracking-wide text-muted">{title}</h2>
        {hint && <p className="text-xs text-muted">{hint}</p>}
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function Tile({ id, p, children }: { id: ModuleId; p: ModuleProgress; children?: React.ReactNode }) {
  const [code, name] = split(id);
  const pct = (n: number) => (p.total ? (n / p.total) * 100 : 0);
  return (
    <div className={`rounded-lg border border-border bg-surface p-4 ${p.total === 0 ? "opacity-60" : ""}`}>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-medium">
          {code && <span className="mr-1.5 text-muted">{code}</span>}
          {name}
        </h3>
        {p.due > 0 && <span className="shrink-0 text-xs font-medium text-accent">{p.due} due</span>}
      </div>
      {p.total === 0 ? (
        <p className="mt-2 text-sm text-muted">No cards yet.</p>
      ) : (
        <>
          <div
            className="mt-3 flex h-1.5 overflow-hidden rounded-full bg-border"
            role="img"
            aria-label={`${p.mature} mature, ${p.started} started, ${p.total} cards`}
          >
            <div className="bg-accent" style={{ width: `${pct(p.mature)}%` }} />
            <div className="bg-accent/35" style={{ width: `${pct(p.started - p.mature)}%` }} />
          </div>
          <p className="mt-2 text-xs text-muted">
            {p.mature} mature · {p.started} started · {p.total} cards
          </p>
        </>
      )}
      {children}
    </div>
  );
}
