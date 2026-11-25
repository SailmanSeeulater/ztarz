---
title: "Top k with a heap"
module: f5
type: concept
source: "https://en.wikipedia.org/wiki/Partial_sorting"
tags: ["data-structures", "heap", "priority-queue", "big-o"]
---

## Prompt

You need the 10 highest scores out of 10 million. Sorting costs O(n log n). How do you get it down to O(n log k), and why does it work?

## Answer

Keep a **min-heap of size k**. For each score:

- If the heap has fewer than k items, push it.
- Otherwise, if the score beats the heap's minimum (peeking is O(1)), pop the minimum and push the score (O(log k)).

At the end, the heap holds the top k. It's a min-heap because the item to evict is always the smallest of the current top k, and that sits at the root.

Cost: n items × O(log k) per item = O(n log k), with only O(k) memory, so it also works on a stream too large to hold. When k is close to n, just sort.
