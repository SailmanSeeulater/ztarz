---
title: "Simpson's paradox"
module: data
type: concept
source: "https://en.wikipedia.org/wiki/Simpson%27s_paradox"
tags: ["statistics", "simpsons-paradox", "confounding"]
---

## Prompt

What is Simpson's paradox? Use the kidney stone study as the example.

## Answer

A trend that appears in every subgroup reverses when the groups are combined.

| | Treatment A | Treatment B |
|---|---|---|
| Small stones | 93% (81/87) | 87% (234/270) |
| Large stones | 73% (192/263) | 69% (55/80) |
| All | 78% (273/350) | 83% (289/350) |

A wins for both small and large stones, yet B looks better overall. The cause is a lurking variable: B was mostly given to small stones, which are easier to treat, so its overall rate is flattered. Severity drives both the choice of treatment and the outcome.

Lesson for dashboards: before trusting an aggregate comparison, split it by the obvious segments (plan, region, device) and check the groups have a similar mix.
