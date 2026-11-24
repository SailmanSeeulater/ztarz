---
title: "Amending a pushed commit"
module: f3
type: what-prints
source: "https://git-scm.com/docs/git-push"
tags: ["git", "push"]
---

## Prompt

What happens on the second `git push`?

```bash
git commit -m "Add login"
git push
git commit --amend -m "Add login form"
git push
```

## Answer

It's rejected as a non-fast-forward.

## Explanation

`--amend` doesn't edit a commit; it makes a new one with the same parent and moves the branch to it. The remote still has the old commit, which isn't an ancestor of yours, so a normal push would throw it away and Git refuses. On a branch only you use, `git push --force-with-lease` is right: it refuses if someone else pushed in the meantime. On shared branches, don't amend pushed commits.
