import { z } from "zod";
import { MODULES, type ModuleId } from "@/lib/content/schema";
import { MAX_NEW_PER_DAY } from "@/lib/prefs";
import { logActivity } from "../activity";
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
    .mutation(async ({ ctx, input }) => {
      const focus = [...new Set(input.focus)];
      const saved = await savePrefs(ctx.userId, { newPerDay: input.newPerDay, focus });
      const names = focus.map((id) => MODULES[id].split(" · ").at(-1)).join(", ");
      await logActivity(
        ctx.userId,
        "focus.changed",
        `Focus: ${names || "everything"} · ${input.newPerDay} new a day`,
        "/focus",
      );
      return saved;
    }),
});
