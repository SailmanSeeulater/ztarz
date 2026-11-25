---
title: "Which model for ticket triage?"
module: ai
type: out-loud
source: "https://platform.claude.com/docs/en/about-claude/models/choosing-a-model"
tags: ["llm", "model-selection", "cost"]
stack: ["claude"]
---

## Prompt

A product manager asks which model you should use to sort incoming support tickets. How do you answer?

## Model answer

I'd answer from evidence, not from a leaderboard. Three criteria: can it do the task well enough, is it fast enough, and what does it cost at our volume.

1. **Build an eval set first:** a few hundred real tickets with the right category, including messy and ambiguous ones. This matters more than anything else in the decision.
2. **Pick a starting point.** Triage is high-volume and fairly simple, so I'd start efficiency-first: try the smallest, fastest model and move up only if the evals show a gap. For hard reasoning work I'd go the other way: start with the most capable model, get it right, then try cheaper settings.
3. **Tune before switching.** Where a model has an effort setting, adjusting it is often a better lever than changing models.
4. **Compare on our data:** accuracy, edge cases, latency and cost per thousand tickets.

If a few ticket types stay hard, I can route just those to a bigger model and keep the rest cheap.
