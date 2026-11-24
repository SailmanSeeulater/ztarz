/**
 * Creates the single owner account from OWNER_EMAIL / OWNER_PASSWORD / OWNER_NAME in .env.
 * Public sign-up is disabled, so this goes through Better Auth's internal adapter,
 * the same calls its own sign-up route makes. Safe to re-run.
 */
import "dotenv/config";
import { auth } from "../src/lib/auth";

const name = process.env.OWNER_NAME?.trim() || "Owner";

function required(key: string): string {
  const value = process.env[key]?.trim();
  if (!value) {
    console.error(`Set ${key} in .env first.`);
    process.exit(1);
  }
  return value;
}
const email = required("OWNER_EMAIL").toLowerCase();
const password = required("OWNER_PASSWORD");

async function main() {
  const ctx = await auth.$context;
  const existing = await ctx.internalAdapter.findUserByEmail(email);
  if (existing) {
    console.log(`✓ owner already exists (${email})`);
    return;
  }

  const user = await ctx.internalAdapter.createUser(
    { email, name, emailVerified: true },
    { method: "email-password" },
  );
  await ctx.internalAdapter.linkAccount({
    userId: user.id,
    providerId: "credential",
    accountId: user.id,
    password: await ctx.password.hash(password),
  });
  console.log(`✓ created owner ${email}`);
}

main().then(
  () => process.exit(0),
  (e) => {
    console.error(e);
    process.exit(1);
  },
);
