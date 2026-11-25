import { TRPCError } from "@trpc/server";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { labAttempt } from "@/db/schema";
import { getLab } from "@/lib/content";
import { MAX_EVIDENCE, runChecks } from "@/lib/labs";
import { protectedProcedure, router } from "../trpc";

export const labRouter = router({
  /** Checks pasted output against the lab and records the attempt, passed or not. */
  submit: protectedProcedure
    .input(z.object({ labId: z.string().min(1).max(200), evidence: z.string().min(1).max(MAX_EVIDENCE) }))
    .mutation(async ({ ctx, input }) => {
      const lab = getLab(input.labId);
      if (!lab) throw new TRPCError({ code: "NOT_FOUND", message: "Unknown lab" });
      const results = runChecks(lab.checks, input.evidence);
      const passed = results.every((r) => r.passed);
      await db.insert(labAttempt).values({
        userId: ctx.userId,
        labId: lab.id,
        status: passed ? "passed" : "failed",
        evidence: { text: input.evidence, results },
      });
      return { passed, results };
    }),

  /** Best result per lab: passed if any attempt passed, else the latest status. */
  status: protectedProcedure.query(async ({ ctx }) => {
    const rows = await db
      .select({ labId: labAttempt.labId, status: labAttempt.status, at: labAttempt.createdAt })
      .from(labAttempt)
      .where(eq(labAttempt.userId, ctx.userId))
      .orderBy(desc(labAttempt.createdAt));
    const status: Record<string, { status: "passed" | "failed" | "started"; at: Date }> = {};
    for (const r of rows) {
      const prev = status[r.labId];
      if (!prev || (r.status === "passed" && prev.status !== "passed")) status[r.labId] = { status: r.status, at: r.at };
    }
    return status;
  }),

  /** The latest attempt at one lab, so the page can show what was pasted and how it went. */
  latest: protectedProcedure.input(z.object({ labId: z.string().min(1).max(200) })).query(async ({ ctx, input }) => {
    const [row] = await db
      .select({ status: labAttempt.status, evidence: labAttempt.evidence, at: labAttempt.createdAt })
      .from(labAttempt)
      .where(and(eq(labAttempt.userId, ctx.userId), eq(labAttempt.labId, input.labId)))
      .orderBy(desc(labAttempt.createdAt))
      .limit(1);
    return row ?? null;
  }),
});
