---
title: "Is that ability really emergent?"
module: llm
type: out-loud
source: "https://arxiv.org/abs/2304.15004"
tags: ["llm", "scaling", "evaluation"]
---

## Prompt

A colleague shows a chart: small models score near zero on a task, then the largest model suddenly scores well. "It's an emergent ability," they say. How do you respond?

## Model answer

Maybe, but I'd check the metric before believing the jump.

Schaeffer and colleagues argue that many apparent emergent abilities come from how the task is scored. Nonlinear or discontinuous metrics, such as giving credit only if a whole multi-step answer is exactly right, can turn steady improvement into a sudden cliff. Score the same outputs with a continuous metric, like partial credit, and the curve is often smooth and predictable.

So I'd ask: what's the metric, how many model sizes are on the chart, and what does a continuous measure show? It doesn't mean bigger models aren't better. It means a sharp jump on a chart isn't by itself evidence of a new capability switching on, and it's a poor basis for predicting what the next size will do.
