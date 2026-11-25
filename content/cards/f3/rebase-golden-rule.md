---
title: "When not to rebase"
module: f3
type: mcq
source: "https://git-scm.com/book/en/v2/Git-Branching-Rebasing"
tags: ["git", "rebase"]
stack: ["git"]
choices:
  - text: "When it causes conflicts"
    why: "Rebase handles conflicts: resolve, `git add`, then `git rebase --continue`."
  - text: "When the branch has more than one commit"
    why: "Rebasing many commits is normal; interactive rebase exists to tidy them."
  - text: "When the commits are pushed and others may have built on them"
    correct: true
    why: "Rebase makes new commits. Anyone with the old ones now has a history that diverges from yours. Rebasing your own unpushed work, or a branch only you use, is fine."
  - text: "Never: rebase is always better than merge"
    why: "It's a trade-off: rebase gives a linear log, merge keeps true history and never rewrites it."
---

## Prompt

When should you *not* rebase?
