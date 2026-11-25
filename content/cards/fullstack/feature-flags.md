---
title: "What feature flags buy, and what they cost"
module: fullstack
type: concept
source: "https://martinfowler.com/articles/feature-toggles.html"
tags: ["feature-flags", "deployment", "release"]
---

## Prompt

Why ship a half-built feature behind a flag, and what's the catch?

## Answer

A release flag separates deploying code from releasing a feature. Unfinished work merges to main and ships switched off, so there's no long-lived branch to rebase, and turning it on (for staff, then 10% of users, then everyone) is a config change, not a deploy. Other kinds of flag serve experiments, kill switches for operations, and per-plan permissions.

The catch: every flag is a branch in the code and another combination to test. Release flags should be short-lived, so give each one an owner and a removal task when it's created.
