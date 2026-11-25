---
title: "How many times fork() prints"
module: os
type: what-prints
source: "https://man7.org/linux/man-pages/man2/fork.2.html"
tags: ["processes", "fork"]
stack: ["linux", "c"]
---

## Prompt

How many lines does this print?

```c
#include <stdio.h>
#include <unistd.h>

int main(void) {
    fork();
    fork();
    printf("hi\n");
}
```

## Answer

4

## Explanation

`fork()` returns twice: once in the parent and once in the new child, and both carry on from the next line. After the first call there are 2 processes; each runs the second `fork()`, giving 4, and all 4 reach the `printf`. With n unconditional forks you get 2^n processes. Real code checks the return value (0 in the child, the child's PID in the parent) to decide who does what.
