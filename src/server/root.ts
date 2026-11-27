import { activityRouter } from "./routers/activity";
import { examRouter } from "./routers/exam";
import { labRouter } from "./routers/lab";
import { noteRouter } from "./routers/note";
import { prefsRouter } from "./routers/prefs";
import { reviewRouter } from "./routers/review";
import { sessionRouter } from "./routers/session";
import { router } from "./trpc";

export const appRouter = router({
  activity: activityRouter,
  exam: examRouter,
  lab: labRouter,
  note: noteRouter,
  prefs: prefsRouter,
  review: reviewRouter,
  session: sessionRouter,
});

export type AppRouter = typeof appRouter;
