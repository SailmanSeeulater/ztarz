import "server-only";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/db";
import { account, session, user, verification } from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { user, session, account, verification },
  }),
  emailAndPassword: {
    enabled: true,
    // Single-user for now: the owner is created by `pnpm owner:create`.
    disableSignUp: true,
  },
  telemetry: { enabled: false },
  plugins: [nextCookies()], // must stay last: sets cookies from Server Actions
});
