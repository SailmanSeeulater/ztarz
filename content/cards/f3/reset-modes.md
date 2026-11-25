---
title: "Undo a commit, keep the changes staged"
module: f3
type: mcq
source: "https://git-scm.com/docs/git-reset"
tags: ["git", "reset"]
stack: ["git"]
choices:
  - text: "`git reset HEAD~1`"
    why: "The default, `--mixed`, keeps the changes but unstages them."
  - text: "`git reset --hard HEAD~1`"
    why: "That throws the changes away too (you could only get them back through the reflog)."
  - text: "`git revert HEAD`"
    why: "That adds a new commit undoing it; the original stays in history."
  - text: "`git reset --soft HEAD~1`"
    correct: true
    why: "It moves the branch back one commit and leaves the index and working tree alone, so everything is still staged."
---

## Prompt

You committed too early. You want to undo the commit but keep its changes staged, ready to commit again. Which command?
