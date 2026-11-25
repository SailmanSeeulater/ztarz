---
title: "Whose code is HEAD during a rebase?"
module: f3
type: mcq
source: "https://git-scm.com/docs/git-rebase"
tags: ["git", "rebase", "conflicts"]
stack: ["git"]
choices:
  - text: "Yours, from the feature branch"
    why: "That's true in `git merge main`, not in a rebase."
  - text: "main's, plus any of your commits already replayed"
    correct: true
    why: "Rebase checks out main and replays your commits onto it, so HEAD is the new base and the commit being applied is the bottom side. \"Ours\" and \"theirs\" are swapped compared with a merge."
  - text: "The common ancestor's"
    why: "The base version only appears with `merge.conflictStyle=diff3` (or `zdiff3`), in a `|||||||` section."
  - text: "Whichever side is newer"
    why: "Git doesn't order the sides by date."
---

## Prompt

During `git rebase main` you hit this conflict. Whose code is between `<<<<<<< HEAD` and `=======`?

```
<<<<<<< HEAD
const timeout = 5000;
=======
const timeout = 10_000;
>>>>>>> a1b2c3d (Raise login timeout)
```
