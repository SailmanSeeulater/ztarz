---
title: "A container stuck restarting"
module: f8
type: out-loud
source: "https://docs.docker.com/reference/cli/docker/compose/logs/"
tags: ["docker", "logs", "debugging"]
stack: ["docker", "linux"]
---

## Prompt

`docker compose ps` shows the app as `Restarting`. What do you check, in order?

## Model answer

The restart policy hides the crash, so find out how it died.

1. **Logs from the last attempt:** `docker compose logs --tail 100 app` (or `docker logs --tail 100 <container>`). The last lines before it exits usually say why: a missing env var, the database unreachable, a port in use, an error at startup. Add `-f` to watch the next attempt, `--since 10m` to narrow it down.
2. **How it exited:** `docker inspect -f '{{.State.ExitCode}} {{.State.OOMKilled}} {{.RestartCount}}' <container>`. 137 with `OOMKilled` true is the memory cap; 1 is usually the app's own error.
3. **What changed:** a new image tag, an edited `.env`, a migration. If it's a bad deploy, roll back to the previous tag first and debug after.
4. **Its dependencies and the host:** is the database container healthy, is the disk full (`df -h`)?

Say how you'd confirm the fix: it stays up and the health check passes.
