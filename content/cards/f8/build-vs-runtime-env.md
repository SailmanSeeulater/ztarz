---
title: "Build-time vs runtime env in a Docker image"
module: f8
type: mcq
source: "https://nextjs.org/docs/app/guides/environment-variables#runtime-environment-variables"
tags: ["nextjs", "docker", "config", "secrets"]
stack: ["nextdotjs", "docker"]
choices:
  - text: "`COPY .env .` in the Dockerfile so the container always has its config"
    why: "The secrets end up in an image layer. Anyone who can pull the image can read them, and one image can't serve two environments."
  - text: "Change `NEXT_PUBLIC_API_URL` per environment by restarting the container with a new value"
    why: "`NEXT_PUBLIC_` values are inlined into the JavaScript at build time. After the build they're frozen."
  - text: "Server-only values come from the host's `.env` (mode 600) at runtime; `NEXT_PUBLIC_` values must be right at build time"
    correct: true
    why: "Server code reads `process.env` when it runs, so one image can be promoted through environments. Only browser-visible values are baked in, and those aren't secret."
  - text: "Pass secrets as build `ARG`s so they never become environment variables"
    why: "Build args are recorded in the image's build metadata. They're for build options, not secrets."
---

## Prompt

One Docker image of a Next.js app is deployed to staging and production. Which way of handling config is right?
