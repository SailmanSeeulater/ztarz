// Applies pending migrations from ./drizzle. Runs inside the production image
// (`node migrator/migrate.mjs`), where drizzle-kit isn't installed. Uses the same
// drizzle.__drizzle_migrations journal as `pnpm db:migrate`, so the two agree.
import { fileURLToPath } from "node:url";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

const sql = postgres(url, { max: 1, onnotice: () => {} });
try {
  await migrate(drizzle(sql), { migrationsFolder: fileURLToPath(new URL("./drizzle", import.meta.url)) });
  console.log("✓ migrations applied");
} finally {
  await sql.end();
}
