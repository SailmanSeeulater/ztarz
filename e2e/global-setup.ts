import { execSync } from "node:child_process";
import postgres from "postgres";
import { E2E_DATABASE_URL, e2eEnv } from "./env";

/** Fresh state for every run: create the e2e database if needed, migrate it, wipe review history, ensure the owner exists. */
export default async function globalSetup() {
  const admin = new URL(E2E_DATABASE_URL);
  admin.pathname = "/postgres";
  const sql = postgres(admin.toString(), { onnotice: () => {} });
  try {
    const [{ exists }] = await sql`select exists (select 1 from pg_database where datname = 'ztarz_e2e') as exists`;
    if (!exists) await sql`create database ztarz_e2e`;
  } finally {
    await sql.end();
  }

  const run = (cmd: string) => execSync(cmd, { env: { ...process.env, ...e2eEnv() }, stdio: "inherit" });
  run("pnpm -s db:migrate");

  const db = postgres(E2E_DATABASE_URL, { onnotice: () => {} });
  try {
    await db`truncate review_log, card_state, lab_attempt, note, user_pref`;
  } finally {
    await db.end();
  }

  run("pnpm -s owner:create");
}
