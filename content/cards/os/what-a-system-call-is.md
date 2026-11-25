---
title: "What a system call is"
module: os
type: concept
source: "https://man7.org/linux/man-pages/man2/intro.2.html"
tags: ["syscalls", "kernel", "libc"]
stack: ["linux", "c"]
---

## Prompt

What is a system call, and how does calling `read()` in C differ from calling an ordinary function?

## Answer

A system call is an entry point into the kernel: the only way a user program can ask for things it isn't allowed to do itself, such as reading a file, opening a socket or creating a process.

`read()` in C is a thin **libc wrapper**. It puts the arguments and the syscall number in registers and executes a trap instruction, which switches the CPU to kernel mode. The kernel checks the request, does the work, and returns a result; on failure the wrapper sets `errno` and returns -1.

So it looks like a function call, but it crosses a privilege boundary into the kernel, which makes it far more expensive than an ordinary call.
