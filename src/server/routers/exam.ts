import { TRPCError } from "@trpc/server";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { examAttempt } from "@/db/schema";
import { getCard } from "@/lib/content";
import { gradeExam, resolveScope } from "@/lib/exam";
import { logActivity } from "../activity";
import { getPrefs } from "../srs";
import { protectedProcedure, router } from "../trpc";

export const examRouter = router({
  /** Marks a finished paper on the server (the browser never sees which choice is right) and saves it. */
  submit: protectedProcedure
    .input(
      z.object({
        scope: z.string().min(1).max(40),
        answers: z
          .array(z.object({ cardId: z.string().min(1).max(200), picked: z.number().int().min(0).max(20).nullable() }))
          .min(1)
          .max(60),
        durationMs: z.number().int().min(0).max(6 * 3_600_000),
        limitMs: z.number().int().min(0).max(6 * 3_600_000),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const scope = resolveScope(input.scope, (await getPrefs(ctx.userId)).focus);
      if (!scope) throw new TRPCError({ code: "BAD_REQUEST", message: "Unknown exam scope" });
      const unique = [...new Map(input.answers.map((a) => [a.cardId, a])).values()];
      const graded = gradeExam(getCard, unique);
      if (graded.total === 0) throw new TRPCError({ code: "BAD_REQUEST", message: "No questions to mark" });
      const [row] = await db
        .insert(examAttempt)
        .values({
          userId: ctx.userId,
          scope: input.scope,
          scopeLabel: scope.label,
          total: graded.total,
          correct: graded.correct,
          durationMs: input.durationMs,
          limitMs: input.limitMs,
          answers: graded.items.map((i) => ({ cardId: i.card.id, picked: i.picked })),
        })
        .returning({ id: examAttempt.id });
      await logActivity(
        ctx.userId,
        "exam.finished",
        `Exam on ${scope.label}: ${graded.correct} of ${graded.total} (${Math.round(graded.score * 100)}%)`,
        `/exams/${row.id}`,
      );
      return { id: row.id };
    }),

  history: protectedProcedure.query(({ ctx }) =>
    db
      .select({
        id: examAttempt.id,
        scopeLabel: examAttempt.scopeLabel,
        total: examAttempt.total,
        correct: examAttempt.correct,
        durationMs: examAttempt.durationMs,
        createdAt: examAttempt.createdAt,
      })
      .from(examAttempt)
      .where(eq(examAttempt.userId, ctx.userId))
      .orderBy(desc(examAttempt.createdAt))
      .limit(50),
  ),

  get: protectedProcedure.input(z.object({ id: z.uuid() })).query(async ({ ctx, input }) => {
    const [row] = await db
      .select()
      .from(examAttempt)
      .where(and(eq(examAttempt.userId, ctx.userId), eq(examAttempt.id, input.id)));
    return row ?? null;
  }),
});
