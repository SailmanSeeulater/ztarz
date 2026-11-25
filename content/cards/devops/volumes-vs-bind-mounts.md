---
title: "Named volume or bind mount?"
module: devops
type: mcq
source: "https://docs.docker.com/engine/storage/volumes/"
tags: ["docker", "storage", "compose"]
stack: ["docker"]
choices:
  - text: "A bind mount for Postgres data, so it lives next to your code in the repo"
    why: "Database files in the repo folder are easy to commit or delete by accident, and they depend on host paths and permissions."
  - text: "A named volume for Postgres data; a bind mount for source code you edit live in development"
    correct: true
    why: "Volumes are managed by Docker and survive container removal, which suits data the container owns. Bind mounts share a host path both ways, which suits files you edit on the host."
  - text: "Neither: data in the container's writable layer persists across `docker compose up`"
    why: "It survives a restart, but it's gone when the container is recreated, which happens whenever the image or config changes."
  - text: "They're the same thing with different syntax"
    why: "A bind mount maps an exact host path. A named volume is storage Docker creates and manages under its own directory."
---

## Prompt

In a Compose project, which storage suits which job: the Postgres data directory, and your app's source code during local development?
