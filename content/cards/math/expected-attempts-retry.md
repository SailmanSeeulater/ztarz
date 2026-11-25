---
title: "Expected value: how many tries until it works"
module: math
type: concept
source: "https://en.wikipedia.org/wiki/Geometric_distribution"
tags: ["probability", "expected-value"]
---

## Prompt

A flaky job succeeds on any given attempt with probability 0.2, independently. On average, how many attempts until the first success, and what does "expected value" mean here?

## Answer

**5 attempts.** The number of tries until the first success follows a geometric distribution, whose expected value is 1/p = 1/0.2 = 5.

Expected value is the probability-weighted average of the outcomes: run the experiment many times and the mean converges to it. It is not the most likely outcome. Here the single most likely result is success on the first try (20%), yet some runs take 15 tries, which drags the average up.

Practical use: if the job must succeed with high confidence, the average isn't enough. The chance of still failing after k tries is 0.8ᵏ, so 10 tries still fail about 11% of the time.
