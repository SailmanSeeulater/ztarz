---
title: "Which file descriptor open() returns"
module: os
type: what-prints
source: "https://man7.org/linux/man-pages/man2/open.2.html"
tags: ["file-descriptors", "syscalls"]
stack: ["linux", "c"]
---

## Prompt

What does this print, assuming `notes.txt` exists?

```c
#include <fcntl.h>
#include <stdio.h>
#include <unistd.h>

int main(void) {
    close(0);
    int fd = open("notes.txt", O_RDONLY);
    fprintf(stderr, "%d\n", fd);
}
```

## Answer

`0`

## Explanation

A successful `open()` returns the lowest-numbered descriptor not currently open in the process. Closing 0 (standard input) frees that slot, so the file takes it, and anything that now reads stdin reads the file. Shells use the same rule for redirection: `cmd < notes.txt` is just "make fd 0 point at this file" before `exec`.
