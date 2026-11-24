---
title: "What commits and branches really are"
module: f3
type: concept
source: "https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell"
tags: ["git"]
---

## Prompt

What is a Git commit, and what is a branch?

## Answer

- A **commit** is a snapshot of the whole project tree plus metadata: author, message, and a pointer to its parent commit(s). Its hash is computed from all of that, so changing anything, even the message, makes a *new* commit.
- A **branch** is just a movable name pointing at one commit. Committing moves it forward. `HEAD` points at the branch you're on.

That's why branches are cheap, and why "rewriting history" really means making new commits and moving the name.
