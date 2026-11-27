import { randomInt } from "node:crypto";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ExamRunner, type ExamQuestion } from "@/components/exam-runner";
import { allCards } from "@/lib/content";
import { EXAM_SIZES, SECONDS_PER_QUESTION, pickExam, resolveScope } from "@/lib/exam";
import { getCurrentUser } from "@/lib/session";
import { seededShuffle } from "@/lib/shuffle";
import { TRPCReactProvider } from "@/trpc/client";
import { getCaller } from "@/trpc/server";

export const metadata: Metadata = { title: "Exam" };

export default function ExamRunPage({ searchParams }: PageProps<"/exams/run">) {
  return (
    <Suspense fallback={<div className="pass mt-11 h-96 animate-pulse opacity-60" />}>
      <Run searchParams={searchParams} />
    </Suspense>
  );
}

async function Run({ searchParams }: { searchParams: PageProps<"/exams/run">["searchParams"] }) {
  const sp = await searchParams;
  await getCurrentUser();
  const scopeId = typeof sp.scope === "string" ? sp.scope : "all";
  const n = Number(sp.n);
  const size = (EXAM_SIZES as readonly number[]).includes(n) ? n : EXAM_SIZES[0];
  const prefs = await (await getCaller()).prefs.get();
  const scope = resolveScope(scopeId, prefs.focus);

  const seed = randomInt(2 ** 31);
  const paper = scope ? pickExam(allCards(), scope.modules, size, seed) : [];
  if (!scope || paper.length === 0) {
    return (
      <p className="rounded-2xl bg-group px-4 py-3.5 text-[0.9375rem] text-label-2">
        There are no exam questions for that choice.{" "}
        <Link href="/exams" className="text-tint">
          Pick another
        </Link>
        .
      </p>
    );
  }

  const questions: ExamQuestion[] = paper.map((c, i) => ({
    cardId: c.id,
    title: c.title,
    module: c.module,
    promptHtml: c.sections.find((s) => s.key === "prompt")?.html ?? "",
    // Only the text goes to the browser; marking happens on the server.
    choices: seededShuffle(
      c.choices!.map((ch, key) => ({ key, html: ch.html })),
      seed + i,
    ),
  }));

  return (
    <div>
      <h1 className="text-[1.5rem] leading-tight font-bold tracking-[-0.02em]">Exam: {scope.label}</h1>
      <TRPCReactProvider>
        <ExamRunner key={seed} scope={scopeId} questions={questions} limitMs={questions.length * SECONDS_PER_QUESTION * 1000} />
      </TRPCReactProvider>
    </div>
  );
}
