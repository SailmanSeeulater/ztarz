import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowUpRightIcon, ChevronLeftIcon } from "@/components/icons";
import { LabRunner } from "@/components/lab-runner";
import { CardPass, Field } from "@/components/pass";
import { allLabs, getLab } from "@/lib/content";
import type { CheckResult } from "@/lib/labs";
import { getCurrentUser } from "@/lib/session";
import { TRPCReactProvider } from "@/trpc/client";
import { getCaller } from "@/trpc/server";

export function generateStaticParams() {
  return allLabs().map((l) => ({ id: l.id }));
}

export async function generateMetadata({ params }: PageProps<"/labs/[id]">): Promise<Metadata> {
  return { title: getLab((await params).id)?.title };
}

export default function LabPage({ params }: PageProps<"/labs/[id]">) {
  return (
    <article>
      <Link
        href="/labs"
        className="-ml-1.5 inline-flex items-center gap-0.5 text-[0.9375rem] text-tint hover:opacity-80"
      >
        <ChevronLeftIcon className="size-5" />
        Labs
      </Link>
      <Suspense fallback={<div className="pass mt-4 h-96 animate-pulse opacity-60" />}>
        <LabBody params={params} />
      </Suspense>
    </article>
  );
}

async function LabBody({ params }: { params: PageProps<"/labs/[id]">["params"] }) {
  const lab = getLab((await params).id);
  if (!lab) notFound();
  await getCurrentUser();
  const latest = await (await getCaller()).lab.latest({ labId: lab.id });
  const prev = latest?.evidence as { text?: string; results?: CheckResult[] } | null | undefined;

  const section = (key: string) => lab.sections.find((s) => s.key === key);
  return (
    <CardPass
      className="mt-4"
      module={lab.module}
      title={lab.title}
      titleAs="h1"
      stack={lab.stack}
      fields={
        <>
          <Field label="Time">{lab.minutes} min</Field>
          <Field label="Checks">{lab.checks.length}</Field>
        </>
      }
      footer={
        <dl>
          <Field label="Source">
            <a
              href={lab.source}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 underline underline-offset-2 hover:opacity-80"
            >
              {new URL(lab.source).hostname}
              <ArrowUpRightIcon />
            </a>
          </Field>
        </dl>
      }
    >
      <div className="space-y-5">
        {lab.sections
          .filter((s) => s.key !== "evidence")
          .map((s) => (
            <section key={s.key}>
              <h2 className="field-label">{s.heading}</h2>
              <div className="card-md mt-1.5" dangerouslySetInnerHTML={{ __html: s.html }} />
            </section>
          ))}
        <section className="border-t border-[var(--well-strong)] pt-4">
          <h2 className="field-label">Evidence</h2>
          <div className="card-md mt-1.5" dangerouslySetInnerHTML={{ __html: section("evidence")!.html }} />
          <TRPCReactProvider>
            <LabRunner
              labId={lab.id}
              labels={lab.checks.map((c) => c.label)}
              initial={prev?.results ? { text: prev.text ?? "", results: prev.results } : null}
            />
          </TRPCReactProvider>
        </section>
      </div>
    </CardPass>
  );
}
