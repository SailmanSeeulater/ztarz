---
title: "Merge vs rebase"
module: f3
type: concept
source: "https://git-scm.com/book/en/v2/Git-Branching-Rebasing"
tags: ["git", "rebase", "merge"]
---

## Prompt

On your feature branch, `git merge main` vs `git rebase main`: what does each do to history?

## Answer

- **Merge** creates a merge commit with two parents. Your commits keep their hashes, and history shows where the branches joined. You resolve conflicts once.
- **Rebase** replays your commits one by one on top of main's tip, producing **new commits with new hashes**. History becomes a straight line, as if you'd started from today's main. It may stop for conflicts at each replayed commit.

The trade: rebase gives a cleaner log but rewrites history; merge keeps true history but is noisier.
