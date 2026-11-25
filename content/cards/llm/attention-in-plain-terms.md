---
title: "Explain attention without the maths"
module: llm
type: out-loud
source: "https://arxiv.org/html/1706.03762v7"
tags: ["llm", "attention", "transformer"]
---

## Prompt

Explain what self-attention does inside a transformer, to an engineer who hasn't studied machine learning.

## Model answer

Every token gets to look at the other tokens and pull in information from the ones that matter to it.

1. From each token's vector the layer makes three vectors with learned weights: a **query** (what am I looking for), a **key** (what do I offer) and a **value** (what I'll pass on).
2. It scores one token's query against every key with a dot product, scales the scores down by the square root of the key size, and runs softmax so the weights sum to 1.
3. The token's new vector is the weighted average of all the values.

So in "The bank raised its rates", the vector for "its" can take most of its update from "bank". Several heads run in parallel, each free to track a different kind of relation. In a generating model a mask stops a token from looking at tokens after it, so it can't peek at the answer.
