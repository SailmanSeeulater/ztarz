import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { RATINGS } from "@/lib/srs/scheduler";
import { UnknownCardError, recordReview } from "../srs";
import { protectedProcedure, router } from "../trpc";

export const reviewRouter = router({
  record: protectedProcedure
    .input(
      z.object({
        reviewId: z.uuid(),
        cardId: z.string().min(1).max(200),
        rating: z.enum(RATINGS),
        correct: z.boolean().optional(),
        durationMs: z.number().int().min(0).max(3_600_000).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await recordReview(ctx.userId, input);
      } catch (e) {
        if (e instanceof UnknownCardError) throw new TRPCError({ code: "NOT_FOUND", message: "Unknown card" });
        throw e;
      }
    }),
});
