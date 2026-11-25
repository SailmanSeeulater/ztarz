---
title: "Finding the bad commit with bisect"
module: f3
type: concept
source: "https://git-scm.com/docs/git-bisect"
tags: ["git", "debugging"]
stack: ["git"]
---

## Prompt

A bug appeared somewhere in the last 200 commits. How does `git bisect` find the commit that introduced it?

## Answer

Binary search over history:

```bash
git bisect start
git bisect bad              # the current commit has the bug
git bisect good v1.4.0      # this one didn't
```

Git checks out the commit halfway between; you test it and mark it `good` or `bad`, and the range halves each time: about 8 steps for 200 commits. Automate it with `git bisect run pnpm test` (exit 0 = good, 125 = skip this commit, other codes from 1 to 127 = bad). Finish with `git bisect reset`.

It only works well if every commit builds: one more reason to keep commits small and working.
