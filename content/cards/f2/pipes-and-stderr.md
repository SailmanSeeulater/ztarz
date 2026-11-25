---
title: "Why grep missed the errors"
module: f2
type: mcq
source: "https://man7.org/linux/man-pages/man1/bash.1.html#SHELL_GRAMMAR"
tags: ["shell", "pipes"]
stack: ["gnubash"]
choices:
  - text: "grep starts before the build finishes"
    why: "Both run at once and grep reads data as it arrives; that's the point of a pipe."
  - text: "The pipe carries only stdout; the errors were written to stderr"
    correct: true
    why: "Use `npm run build 2>&1 | grep -c ERROR`, or bash's `|&`, to send both through the pipe."
  - text: "`grep -c` counts matching files, not lines"
    why: "`-c` counts matching lines."
  - text: "The output is buffered, so grep saw nothing"
    why: "Buffering delays output; it doesn't lose it. And the lines wouldn't appear on screen at all."
---

## Prompt

`npm run build | grep -c ERROR` prints `0`, yet `ERROR` lines still appear on your screen. Why?
