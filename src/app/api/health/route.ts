import { sql } from "drizzle-orm";
import { connection } from "next/server";
import { db } from "@/db";

// Used by Docker's healthcheck and uptime monitors: is the app up and can it reach Postgres?
export async function GET() {
  await connection(); // always run at request time, never prerendered
  try {
    await db.execute(sql`select 1`);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "database unreachable" }, { status: 503 });
  }
}
