---
title: "Correlation is not causation"
module: data
type: out-loud
source: "https://en.wikipedia.org/wiki/Correlation_does_not_imply_causation"
tags: ["statistics", "causation", "confounding"]
---

## Prompt

A PM notices users who enable dark mode have 30% higher retention and wants to turn it on for everyone. Explain in about 60 seconds why that might not work.

## Model answer

That's a correlation, and there are three common explanations besides "dark mode causes retention".

- **A confounder:** something else drives both. Power users explore settings and also stick around. The classic example: ice cream sales and drownings rise together because hot weather drives both.
- **Reverse causation:** people who already plan to stay are more likely to customise the app.
- **Chance**, if we compared many features and this one happened to stand out.

To find out whether it's causal, run an experiment: randomly give half of new users dark mode by default and compare retention. Randomisation spreads the confounders evenly across both groups, so a difference left over is caused by the change.
