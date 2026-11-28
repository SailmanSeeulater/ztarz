import { TRPCError } from "@trpc/server";
import { and, count, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { note } from "@/db/schema";
import { MAX_NOTE_CHARS, MAX_NOTES, MAX_TITLE_CHARS } from "@/lib/notes";
import { logActivity } from "../activity";
import { protectedProcedure, router } from "../trpc";

const title = z.string().max(MAX_TITLE_CHARS);
const body = z.string().max(MAX_NOTE_CHARS);
const id = z.uuid();

/** Every query is scoped to the signed-in user, so one note id can't reach someone else's note. */
const mine = (userId: string, noteId: string) => and(eq(note.userId, userId), eq(note.id, noteId));

export const noteRouter = router({
  list: protectedProcedure.query(({ ctx }) =>
    db
      .select({ id: note.id, title: note.title, body: note.body, updatedAt: note.updatedAt })
      .from(note)
      .where(eq(note.userId, ctx.userId))
      .orderBy(desc(note.updatedAt)),
  ),

  get: protectedProcedure.input(z.object({ id })).query(async ({ ctx, input }) => {
    const [row] = await db.select().from(note).where(mine(ctx.userId, input.id));
    return row ?? null;
  }),

  create: protectedProcedure
    .input(z.object({ title: title.default(""), body: body.default("") }))
    .mutation(async ({ ctx, input }) => {
      const row = await db.transaction(async (tx) => {
        // Lock this user's notes so two quick "New note" taps can't both slip under the limit.
        await tx.select({ id: note.id }).from(note).where(eq(note.userId, ctx.userId)).for("update");
        const [{ n }] = await tx.select({ n: count() }).from(note).where(eq(note.userId, ctx.userId));
        if (n >= MAX_NOTES) {
          throw new TRPCError({ code: "BAD_REQUEST", message: `You can keep up to ${MAX_NOTES} notes. Delete one first.` });
        }
        const [row] = await tx
          .insert(note)
          .values({ userId: ctx.userId, title: input.title, body: input.body })
          .returning({ id: note.id });
        return row;
      });
      await logActivity(ctx.userId, "note.created", "Created a note", `/notes/${row.id}`);
      return row;
    }),

  update: protectedProcedure
    .input(z.object({ id, title, body }))
    .mutation(async ({ ctx, input }) => {
      const [row] = await db
        .update(note)
        .set({ title: input.title, body: input.body, updatedAt: new Date() })
        .where(mine(ctx.userId, input.id))
        .returning({ updatedAt: note.updatedAt });
      if (!row) throw new TRPCError({ code: "NOT_FOUND", message: "Note not found" });
      return row;
    }),

  delete: protectedProcedure.input(z.object({ id })).mutation(async ({ ctx, input }) => {
    const [gone] = await db.delete(note).where(mine(ctx.userId, input.id)).returning({ title: note.title });
    if (gone) await logActivity(ctx.userId, "note.deleted", `Deleted the note “${gone.title || "Untitled"}”`);
    return { ok: true };
  }),
});
