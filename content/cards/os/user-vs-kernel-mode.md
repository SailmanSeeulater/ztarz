---
title: "User mode vs kernel mode"
module: os
type: mcq
source: "https://en.wikipedia.org/wiki/Protection_ring"
tags: ["kernel", "privilege", "cpu"]
choices:
  - text: "The instruction runs, but more slowly"
    why: "Privilege isn't a speed setting. The CPU refuses privileged instructions outright in user mode."
  - text: "The CPU raises a fault, the kernel takes over and usually kills the process"
    correct: true
    why: "On x86 this is a general protection fault; Linux turns it into a signal such as SIGSEGV. Only code in the kernel's privilege level may disable interrupts or touch hardware directly."
  - text: "The kernel quietly performs it on the program's behalf"
    why: "The kernel only does privileged work through defined entry points, the system calls, not on arbitrary instructions."
  - text: "Nothing: the restriction is a convention the compiler enforces"
    why: "It's enforced by the CPU in hardware. A compiler can emit any instruction; the processor checks the current privilege level."
---

## Prompt

A user-space program executes an instruction that only the kernel may run, such as disabling interrupts. What happens?
