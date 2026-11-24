import "dotenv/config";

/** End-to-end tests run against their own database in the dev Postgres container, never your real one. */
function e2eDatabaseUrl(): string {
  const base = process.env.DATABASE_URL;
  if (!base) throw new Error("Set DATABASE_URL in .env (the e2e database is created next to it).");
  const url = new URL(base);
  url.pathname = "/ztarz_e2e";
  return url.toString();
}

export const E2E_PORT = 3200;
export const E2E_URL = `http://127.0.0.1:${E2E_PORT}`;
export const E2E_DATABASE_URL = e2eDatabaseUrl();

/** Test-only account, created in the e2e database by global setup. Not a real credential. */
export const E2E_OWNER = { email: "owner@ztarz.test", password: "e2e-only-not-a-secret", name: "E2E Owner" };

/** Variables that point a process at the e2e database and server. */
const overrides = {
  DATABASE_URL: E2E_DATABASE_URL,
  PORT: String(E2E_PORT),
  HOSTNAME: "127.0.0.1",
  BETTER_AUTH_URL: E2E_URL,
  OWNER_EMAIL: E2E_OWNER.email,
  OWNER_PASSWORD: E2E_OWNER.password,
  OWNER_NAME: E2E_OWNER.name,
};

/** The current environment plus the e2e overrides, for child processes. */
export function e2eEnv(): Record<string, string> {
  const env: Record<string, string> = {};
  for (const [k, v] of Object.entries(process.env)) if (v !== undefined) env[k] = v;
  return { ...env, ...overrides };
}
