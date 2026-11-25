---
title: "Zombie and orphan processes"
module: os
type: mcq
source: "https://man7.org/linux/man-pages/man2/wait.2.html"
tags: ["processes", "wait", "signals"]
stack: ["linux"]
choices:
  - text: "A zombie is a child that has exited but hasn't been waited for; an orphan is a running child whose parent has died, and it gets adopted by init or the nearest subreaper"
    correct: true
    why: "The zombie keeps a process table slot so the parent can read its exit status. Once adopted, init reaps orphans when they exit."
  - text: "A zombie is a hung process that ignores SIGKILL"
    why: "A zombie has already exited, so there's nothing left to kill. Only the parent calling `wait()` (or dying) removes it."
  - text: "An orphan is killed automatically when its parent exits"
    why: "It keeps running. It's reparented, not killed. Shells use process groups and SIGHUP to end jobs, which is a separate mechanism."
  - text: "Zombies use a lot of memory, so a few of them can crash a server"
    why: "A zombie holds almost nothing but a process table entry. The danger is many of them filling the PID space."
---

## Prompt

`ps` shows processes in state `Z` (defunct) piling up under your server. What are zombies, and how do they differ from orphans?
