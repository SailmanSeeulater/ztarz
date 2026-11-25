---
title: "Tell me about a bug you chased"
module: interview
type: out-loud
source: "https://github.com/SailmanSeeulater/ztarz/blob/main/playwright.config.ts"
tags: ["debugging", "testing", "project", "star"]
stack: ["playwright"]
---

## Prompt

Tell me about a bug you chased.

## Model answer

**Situation.** I was adding an end-to-end test to ztarz: Playwright signs in and completes a day's session against a production build. It uses its own database, which a global-setup step creates, migrates and wipes on every run.

**Problem.** The run hung for the full four-minute web-server timeout and then failed. The test itself never started, and there was no stack trace to go on.

**What I did.** I listed what starts in what order. Playwright launches the web server and waits for a readiness URL before it runs global setup. I'd pointed that URL at `/api/health`, and the health route also runs `select 1` against the database. So the health check could never pass: the e2e database didn't exist yet, because global setup creates it, and global setup was waiting for the health check. Each step was waiting on the other.

**Fix.** I pointed the readiness check at `/sign-in`, which renders without the database, and left a comment in the config saying why. Docker and the deploy script still use `/api/health`, where the database must be up.

**Result and lesson.** The test has run in CI on every push since. A readiness check should test exactly what the waiting step needs, and when something hangs silently, write down the start-up order before reading logs.
