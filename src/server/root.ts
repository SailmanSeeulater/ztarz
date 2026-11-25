import { labRouter } from "./routers/lab";
import { reviewRouter } from "./routers/review";
import { sessionRouter } from "./routers/session";
import { router } from "./trpc";

export const appRouter = router({
  lab: labRouter,
  review: reviewRouter,
  session: sessionRouter,
});

export type AppRouter = typeof appRouter;
