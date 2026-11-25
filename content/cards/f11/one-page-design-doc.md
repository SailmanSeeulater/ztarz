---
title: "The sections of a short design doc"
module: f11
type: concept
source: "https://www.industrialempathy.com/posts/design-docs-at-google/"
tags: ["collaboration", "design-docs", "writing"]
---

## Prompt

You're writing a one-page design doc for a new feature. Which sections matter, and what goes in each?

## Answer

1. **Context and scope:** brief, objective background. What exists, what you're building.
2. **Goals and non-goals:** non-goals are things that could reasonably be goals but you've chosen not to do, such as "no offline support".
3. **The design:** an overview first, then the details that matter: APIs, data storage, a diagram. This is where the trade-offs are written down. Little or no code.
4. **Alternatives considered:** the other reasonable options and why this one fits the goals better. Often the most useful section for reviewers.
5. **Cross-cutting concerns:** security, privacy, observability.

A short "mini design doc" is fine for a smaller change; the point is to get the trade-offs reviewed before the code is written.
