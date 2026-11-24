import { getModuleProgress, getTodaySession } from "../srs";
import { protectedProcedure, router } from "../trpc";

export const sessionRouter = router({
  today: protectedProcedure.query(({ ctx }) => getTodaySession(ctx.userId)),
  progress: protectedProcedure.query(({ ctx }) => getModuleProgress(ctx.userId)),
});
