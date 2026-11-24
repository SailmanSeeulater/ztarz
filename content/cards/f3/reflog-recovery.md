---
title: "Getting commits back after reset --hard"
module: f3
type: concept
source: "https://git-scm.com/docs/git-reflog"
tags: ["git", "recovery"]
---

## Prompt

You ran `git reset --hard HEAD~3` and your last three commits are gone. How do you get them back?

## Answer

`git reflog` lists every commit `HEAD` has pointed at, including where it was before the reset (`HEAD@{1}`). Find the commit, then `git reset --hard <sha>`, or `git branch rescue <sha>` to be safe.

Commits aren't deleted when no branch points at them; they become unreachable and are garbage-collected later (unreachable reflog entries are kept for 30 days by default). What `--hard` really destroys is **uncommitted** work, which was never in the reflog.
