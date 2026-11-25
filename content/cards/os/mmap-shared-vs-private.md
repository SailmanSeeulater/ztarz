---
title: "Memory-mapped files: shared vs private"
module: os
type: concept
source: "https://man7.org/linux/man-pages/man2/mmap.2.html"
tags: ["memory", "mmap", "files"]
stack: ["linux"]
---

## Prompt

What does `mmap()` of a file do, and what's the difference between `MAP_SHARED` and `MAP_PRIVATE`?

## Answer

`mmap()` maps a file into the process's address space, so you read and write it as ordinary memory instead of calling `read()` and `write()`. Pages are loaded on demand by page faults.

- **`MAP_SHARED`:** writes go to the shared page and are visible to other processes mapping the same file, and they're carried through to the file itself.
- **`MAP_PRIVATE`:** a private copy-on-write mapping. You can read the file and modify your view, but writes are invisible to others and never reach the file.

Databases and loaders use it to avoid copying file data into a separate buffer. Use `msync()` when you need shared writes flushed to disk at a known point.
