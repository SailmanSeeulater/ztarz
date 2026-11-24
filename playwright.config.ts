import { defineConfig, devices } from "@playwright/test";
import { E2E_URL, e2eEnv } from "./e2e/env";

export default defineConfig({
  testDir: "./e2e",
  globalSetup: "./e2e/global-setup.ts",
  // Tests share one database and one account, so run them one at a time.
  workers: 1,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: E2E_URL,
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    // A production build, so the test exercises what gets deployed.
    command: "pnpm build && pnpm start",
    // Not /api/health: the server starts before global setup has created the e2e database.
    url: `${E2E_URL}/sign-in`,
    env: e2eEnv(),
    timeout: 240_000,
    reuseExistingServer: false,
  },
});
