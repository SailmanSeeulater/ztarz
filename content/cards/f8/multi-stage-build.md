---
title: "Why a multi-stage Docker build"
module: f8
type: concept
source: "https://docs.docker.com/build/building/multi-stage/"
tags: ["docker", "images", "build"]
stack: ["docker", "nextdotjs"]
---

## Prompt

The Dockerfile builds in one stage and copies into a fresh `runner` stage. Why? And why might there be a separate `migrator` stage?

## Answer

Only the last stage becomes the image. The build stage holds the compiler, dev dependencies, package-manager cache and source; the runner gets just the built output via `COPY --from=build`. So the image is smaller, pulls faster, and ships no build tools for an attacker to use.

A Next.js standalone build traces only what the server imports, so a migration tool isn't in it. A small `migrator` stage installs just the migration dependencies and copies them into the runner, so a deploy migrates with the exact image it's about to run.

`docker build --target <stage>` stops at one stage.
