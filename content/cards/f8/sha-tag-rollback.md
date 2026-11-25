---
title: "Image tags: :latest vs :<git sha>"
module: f8
type: mcq
source: "https://docs.docker.com/build/building/best-practices/#pin-base-image-versions"
tags: ["docker", "deploy", "rollback"]
stack: ["docker", "githubactions"]
choices:
  - text: "`:latest` is a mutable pointer that moves on every push; a SHA tag always names one build"
    correct: true
    why: "Tags are mutable, but if CI only ever pushes `:<sha>` once, that tag stays put. Rollback is setting the tag back to the previous SHA and running `docker compose up -d`, with no rebuild."
  - text: "SHA-tagged images are smaller"
    why: "A tag is only a name. The same build has the same layers whatever it's called."
  - text: "Docker re-pulls `:latest` on every start, so it changes under you"
    why: "`docker compose up` uses the image already on the host unless you pull. The problem is that the name itself is reassigned on every push."
  - text: "Roll back with `docker pull app:latest~1`"
    why: "There's no such syntax. Nothing records what `:latest` pointed to before."
---

## Prompt

CI pushes `app:latest` and `app:<git sha>` for every commit. A deploy goes bad. Why deploy by SHA rather than `:latest`?
