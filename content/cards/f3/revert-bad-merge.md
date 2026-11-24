---
title: "Undoing a bad merge on main"
module: f3
type: out-loud
source: "https://git-scm.com/docs/git-revert"
tags: ["git", "recovery"]
---

## Prompt

You merged a broken feature branch into main and pushed. Teammates have already pulled. Recover, and explain what you did.

## Model answer

Main is shared, so I don't rewrite it. `git revert -m 1 <merge-sha>` makes a new commit that undoes the merge's changes, keeping main's side (parent 1) as the mainline. I push that: history stays honest and nobody's clone breaks.

The gotcha: Git still considers that branch merged, so merging it again later won't bring its old commits back. When the fix is ready, I revert the revert first, then merge the fix.

If I hadn't pushed yet, I'd just move main back: `git reset --hard ORIG_HEAD`, or find the pre-merge commit in the reflog.
