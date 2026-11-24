---
title: "Redirection order matters"
module: f2
type: what-prints
source: "https://man7.org/linux/man-pages/man1/bash.1.html#REDIRECTION"
tags: ["shell", "redirection"]
---

## Prompt

`build` prints progress to stdout and errors to stderr. Where do the errors end up in each line?

```bash
build > log.txt 2>&1
build 2>&1 > log.txt
```

## Answer

- Line 1: both stdout and stderr go to `log.txt`.
- Line 2: errors go to the terminal; only stdout goes to `log.txt`.

## Explanation

Redirections apply left to right, and `2>&1` means "point fd 2 wherever fd 1 points *right now*". In line 2, fd 1 is still the terminal when `2>&1` runs; `> log.txt` then moves only fd 1. Bash's shorthand for both is `&> log.txt`.
