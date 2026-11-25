---
title: "Why the effect runs twice in development"
module: frontend
type: out-loud
source: "https://react.dev/reference/react/StrictMode"
tags: ["react", "useEffect", "strict-mode"]
stack: ["react"]
---

## Prompt

Why does your effect run twice in development?

## Model answer

Strict Mode mounts, unmounts and remounts components once in development to surface missing cleanups. An `AbortController` or `ignore` flag in the cleanup makes it harmless. It doesn't happen in production.
