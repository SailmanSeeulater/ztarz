---
title: "Walk me through a deploy pipeline you built"
module: interview
type: out-loud
source: "https://github.com/SailmanSeeulater/ztarz/blob/main/docs/deploy.md"
tags: ["deploy", "ci-cd", "project"]
stack: ["githubactions", "docker", "nginx"]
---

## Prompt

Walk me through a deploy pipeline you built.

## Model answer

**Context.** ztarz is a Next.js app with Postgres. It runs on a small VPS with 1 GB of RAM, next to my other sites, as two memory-capped containers behind the host's nginx, which terminates TLS with a Let's Encrypt certificate.

**CI.** Every push to main runs GitHub Actions: lint, unit tests, a production build that also validates every card, and a Playwright test against a real Postgres service container.

**Build.** Only if those pass does an image job build the Docker image on GitHub's runners, because the server is too small to run `next build`. It pushes to GHCR tagged with the commit SHA.

**Deploy.** A job SSHes in with a key used only for deploys, with the host key pinned, and runs a script that pins that SHA in the server's env file, pulls the image, runs migrations with the same image, and restarts the app.

**Safety.** The deploy fails unless the running container is exactly that image and the health endpoint, which also queries the database, answers. Then the job checks the public URL. Deploys queue rather than cancel, so one never stops halfway.

**Rollback and data.** Rollback is setting the tag to an earlier SHA and restarting, with no rebuild. Migrations aren't rolled back, so they must be backwards compatible. The database is dumped nightly and kept for 14 days.

**Next,** I'd add a staging environment and practise restores on a schedule.
