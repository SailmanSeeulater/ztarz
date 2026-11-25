---
title: "Exit code 137 and OOMKilled"
module: f8
type: mcq
source: "https://docs.docker.com/engine/containers/resource_constraints/"
tags: ["docker", "memory", "ops"]
stack: ["docker", "linux", "nodedotjs"]
choices:
  - text: "Node threw an uncaught exception and exited"
    why: "An uncaught exception usually exits with code 1, and `OOMKilled` would be false."
  - text: "Docker paused the container until memory freed up"
    why: "Nothing waits. At the cap the kernel's OOM killer kills a process in the container."
  - text: "It hit its memory cap and the kernel killed it with SIGKILL. Cap Node's heap below the limit and give the host swap"
    correct: true
    why: "137 is 128 + 9 (SIGKILL). `--max-old-space-size` makes V8 collect garbage harder before it reaches the cap. With swap on the host, a container also gets swap up to its memory limit by default, which absorbs short spikes."
  - text: "Change the restart policy to `always`"
    why: "It's already restarting. The restart policy treats the symptom; the process still dies at the same point."
---

## Prompt

On a 1 GB VPS, an app container with `mem_limit: 256m` keeps restarting under load. `docker inspect` shows exit code 137 and `"OOMKilled": true`. What happened, and what helps?
