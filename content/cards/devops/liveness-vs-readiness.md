---
title: "A liveness probe that checks the database"
module: devops
type: mcq
source: "https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/"
tags: ["kubernetes", "health-checks", "reliability"]
stack: ["kubernetes"]
choices:
  - text: "Nothing bad: restarting reconnects the Pods to the database"
    why: "Restarts don't fix a database outage. They add cold starts and reconnection storms on top of it."
  - text: "Kubernetes ignores liveness failures while a readiness probe is defined"
    why: "Both run independently once any startup probe has passed. A failing liveness probe still restarts the container."
  - text: "The Pods are removed from the Service but keep running, which is what you want"
    why: "That describes a failing readiness probe. Liveness failures restart the container."
  - text: "Every Pod fails liveness at once and gets restarted repeatedly, so the app can't even serve cached pages or errors"
    correct: true
    why: "Liveness should only ask 'is this process stuck?'. Put dependency checks in readiness, which takes the Pod out of rotation without restarting it."
---

## Prompt

Every Pod's liveness probe calls `/healthz`, which runs `SELECT 1` against Postgres. Postgres goes down for two minutes. What happens?
