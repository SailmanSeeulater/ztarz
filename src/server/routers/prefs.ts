import { z } from "zod";
import { MODULES, type ModuleId } from "@/lib/content/schema";
import { MAX_NEW_PER_DAY } from "@/lib/prefs";
import { getPrefs, savePrefs } from "../srs";
import { protectedProcedure, router } from "../trpc";

const moduleId = z.enum(Object.keys(MODULES) as [ModuleId, ...ModuleId[]]);

export const prefsRouter = router({
  get: protectedProcedure.query(({ ctx }) => getPrefs(ctx.userId)),
  set: protectedProcedure
    .input(
      z.object({
        newPerDay: z.number().int().min(0).max(MAX_NEW_PER_DAY),
        focus: z.array(moduleId).max(Object.keys(MODULES).length),
      }),
    )
    .mutation(({ ctx, input }) => savePrefs(ctx.userId, { newPerDay: input.newPerDay, focus: [...new Set(input.focus)] })),
});
