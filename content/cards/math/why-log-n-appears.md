---
title: "Why log n keeps showing up"
module: math
type: out-loud
source: "https://en.wikipedia.org/wiki/Binary_logarithm"
tags: ["logarithms", "complexity"]
---

## Prompt

Explain in about 60 seconds what log₂ n means and why it appears in so many running times.

## Model answer

log₂ n answers one question: how many times can I halve n before I reach 1? Or the reverse: how many doublings get me from 1 to n? 2¹⁰ is 1,024, so log₂ of a thousand is about 10, and log₂ of a million is about 20.

It shows up whenever an algorithm throws away half the remaining work at each step:

- **Binary search** keeps one half of a sorted array, so a million items take about 20 comparisons.
- **Balanced trees** (BSTs, heaps, B-trees) have height around log n, so a lookup walks that many levels.
- **Merge sort** halves the input log n times and does O(n) work per level, giving O(n log n).

The base doesn't matter in Big-O, because changing base only multiplies by a constant. The practical point: doubling the input adds one step, so log n algorithms barely notice growth.
