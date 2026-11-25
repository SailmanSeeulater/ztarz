---
title: "What a PR description owes the reviewer"
module: f11
type: concept
source: "https://google.github.io/eng-practices/review/developer/cl-descriptions.html"
tags: ["collaboration", "code-review", "writing"]
---

## Prompt

What should a pull request description give the reviewer?

## Answer

- **A first line that says what the change does**, as a short imperative sentence: "Revoke API keys when an account is deleted", not "Fix bug". People skim history by this line.
- **The why:** the problem being solved and why this approach. The code shows what it does, not why; decisions you made that aren't visible in the code belong here.
- **Shortcomings and context:** known limits, the issue number, a design doc or benchmark, with enough written inline that it still makes sense if a link dies.

Re-read it before merging: if the change shifted in review, update the description.
