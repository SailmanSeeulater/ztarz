---
title: "Taking on technical debt on purpose"
module: swe
type: out-loud
source: "https://martinfowler.com/bliki/TechnicalDebtQuadrant.html"
tags: ["technical-debt", "tradeoffs", "refactoring"]
---

## Prompt

Tell me about technical debt. Is it always bad?

## Model answer

No. Debt is any design shortcut that makes later changes slower; the extra effort each time is the interest. What matters is whether it was prudent or reckless, deliberate or accidental.

Prudent and deliberate: "we'll hard-code one payment provider to hit the launch date, and generalise it if we add a second." That's a trade-off made with eyes open, written down with a ticket to revisit. Reckless debt is skipping tests or design because "there's no time." Some debt is inadvertent: you only learn the better design by building the first one.

I prioritise repayment by interest. Messy code nobody touches can stay. Debt in a module we change every week gets paid down first, in small refactors alongside feature work.
