/**
 * `pnpm dev:e2e`: the dev server pointed at the e2e database, signed in as the e2e test owner.
 * Handy for looking at pages with realistic progress without touching your own data.
 * Run `pnpm test:e2e` once first so the database and owner exist.
 */
import { spawn } from "node:child_process";
import { E2E_PORT, e2eEnv } from "./env";

spawn("pnpm", ["exec", "next", "dev", "--port", String(E2E_PORT), "--hostname", "127.0.0.1"], {
  env: { ...process.env, ...e2eEnv() },
  stdio: "inherit",
}).on("exit", (code) => process.exit(code ?? 0));
