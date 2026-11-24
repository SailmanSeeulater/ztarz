---
title: "Variables a child process can see"
module: f2
type: what-prints
source: "https://man7.org/linux/man-pages/man1/bash.1.html#ENVIRONMENT"
tags: ["shell", "env-vars"]
---

## Prompt

What prints?

```bash
NAME=ztarz
bash -c 'echo "name: $NAME"'
export NAME
bash -c 'echo "name: $NAME"'
```

## Answer

```
name:
name: ztarz
```

## Explanation

A plain assignment makes a shell variable that only this shell sees. `export` puts it in the environment, which child processes inherit. The single quotes stop the parent from expanding `$NAME`, so the child does the expanding. To set a variable for one command only: `NAME=ztarz bash -c '...'`.
