---
title: "Exit status, && and ||"
module: f2
type: concept
source: "https://man7.org/linux/man-pages/man1/bash.1.html#EXIT_STATUS"
tags: ["shell", "scripting"]
stack: ["gnubash"]
---

## Prompt

What is an exit status, and how do `&&`, `||` and `;` use it?

## Answer

Every command exits with a number: **0 means success**, anything from 1 to 255 means failure. `$?` holds the last one.

- `a && b`: run `b` only if `a` succeeded. `pnpm test && git push` never pushes broken code.
- `a || b`: run `b` only if `a` failed.
- `a ; b`: always run `b`.

In scripts, start with `set -euo pipefail`: stop on the first failure, treat unset variables as errors, and fail a pipeline if any part fails (without `pipefail`, a pipeline's status is just its last command's).
