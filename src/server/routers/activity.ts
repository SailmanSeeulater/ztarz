import { z } from "zod";
import { MODULES, type ModuleId } from "@/lib/content/schema";
import { getActivityLog, logActivity } from "../activity";
import { protectedProcedure, router } from "../trpc";

export const activityRouter = router({
  log: protectedProcedure.query(({ ctx }) => getActivityLog(ctx.userId)),

  /** Drills aren't scheduled or scored anywhere else, so finishing one is noted here. */
  drillFinished: protectedProcedure
    .input(
      z.object({
        module: z.string().max(40).nullable(),
        total: z.number().int().min(1).max(100),
        knew: z.number().int().min(0).max(100),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const m = input.module && input.module in MODULES ? (input.module as ModuleId) : null;
      const name = m ? MODULES[m].split(" · ").at(-1) : "missed cards";
      await logActivity(
        ctx.userId,
        "drill.finished",
        `Drilled ${name}: knew ${Math.min(input.knew, input.total)} of ${input.total}`,
        m ? `/drill?m=${m}` : "/drill",
      );
      return { ok: true };
    }),
});
