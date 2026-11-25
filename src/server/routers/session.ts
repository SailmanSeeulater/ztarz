import { getModuleProgress, getTodaySession, getWeeklyReport } from "../srs";
import { protectedProcedure, router } from "../trpc";

export const sessionRouter = router({
  today: protectedProcedure.query(({ ctx }) => getTodaySession(ctx.userId)),
  progress: protectedProcedure.query(({ ctx }) => getModuleProgress(ctx.userId)),
  week: protectedProcedure.query(({ ctx }) => getWeeklyReport(ctx.userId)),
});
