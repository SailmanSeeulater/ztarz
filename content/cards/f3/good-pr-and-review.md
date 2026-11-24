---
title: "Good PRs and good reviews"
module: f3
type: out-loud
source: "https://google.github.io/eng-practices/review/reviewer/looking-for.html"
tags: ["collaboration", "code-review"]
---

## Prompt

What makes a good pull request, and how do you review someone else's?

## Model answer

**A good PR** is small and does one thing. The description says why, what changed and how it was tested, with screenshots for UI. CI passes before anyone is asked to look.

**Reviewing**, in order: understand the goal, then the design (does this belong here?), correctness and edge cases, tests, readability and naming, and style last (ideally a linter handles it). Comment on the code, not the person; explain why; mark nits as nits. Approve when the change makes the codebase better, even if it isn't how you'd have written it.
