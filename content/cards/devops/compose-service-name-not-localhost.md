---
title: "ECONNREFUSED 127.0.0.1:5432 in Compose"
module: devops
type: bug-hunt
source: "https://docs.docker.com/compose/how-tos/networking/"
tags: ["docker", "compose", "networking"]
stack: ["docker", "postgresql"]
choices:
  - text: "Postgres isn't published to the host; add `ports: [\"5432:5432\"]`"
    why: "Publishing is for reaching the container from outside Docker. It wouldn't change what `localhost` means inside the app container, and it exposes the database."
  - text: "The app starts before Postgres is ready"
    why: "A plausible cause of a first-boot failure, but it would fail on the right host and recover. This fails every time because of the address."
  - text: "Inside the app container, `localhost` is the app container itself; use the service name, `db`"
    correct: true
    why: "Compose puts both services on a default network with DNS for service names, so the URL should be `postgres://app:...@db:5432/app`."
  - text: "Containers on the same network need `network_mode: host` to talk"
    why: "They already reach each other by service name on the default network. Host networking throws away that isolation."
---

## Prompt

The app works when run on the laptop, but in Compose it logs `connect ECONNREFUSED 127.0.0.1:5432`. Why?

```yaml
services:
  app:
    build: .
    environment:
      DATABASE_URL: postgres://app:pw@localhost:5432/app
  db:
    image: postgres:17
```

## Explanation

Each container has its own network namespace, so `127.0.0.1` is the container it runs in. Compose registers each service name with an internal DNS server, and service-to-service traffic uses the **container** port (5432), not any host port mapping. For start-up order, add a `healthcheck` on `db` and `depends_on: { db: { condition: service_healthy } }`.
