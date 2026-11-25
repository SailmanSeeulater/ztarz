---
title: "What a p-value of 0.03 means"
module: data
type: mcq
source: "https://en.wikipedia.org/wiki/P-value"
tags: ["statistics", "ab-testing", "p-value"]
choices:
  - text: "There's a 3% chance the new button makes no difference"
    why: "The most common misreading. The p-value is computed assuming no difference, so it can't also be the probability that there's no difference."
  - text: "There's a 97% chance the new button is better"
    why: "Same mistake from the other side. That would need prior beliefs and a Bayesian analysis."
  - text: "If the button truly made no difference, a gap at least this big would turn up about 3% of the time"
    correct: true
    why: "The p-value is the probability of data at least as extreme as yours, assuming the null hypothesis is true. Small means 'surprising if nothing changed'."
  - text: "The new button improves conversion by 3%"
    why: "A p-value says nothing about effect size. A tiny, worthless lift can have a small p-value with enough traffic. Report the effect and its confidence interval."
---

## Prompt

An A/B test of a new checkout button reports p = 0.03 for the difference in conversion. Which reading is correct?
