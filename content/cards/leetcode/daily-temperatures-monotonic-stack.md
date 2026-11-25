---
title: "Daily Temperatures: which pattern"
module: leetcode
type: mcq
source: "https://en.wikipedia.org/wiki/All_nearest_smaller_values"
tags: ["monotonic-stack", "stack", "next-greater-element"]
stack: ["leetcode"]
choices:
  - text: "For each day, scan forward until a warmer day. O(n²)"
    why: "Correct output, but a long cooling run makes every scan go to the end. Too slow at 10⁵ days."
  - text: "Sort the days by temperature, then walk the sorted list. O(n log n)"
    why: "Sorting throws away time order, and the question is about the next warmer day, later in time."
  - text: "A stack of indices whose temperatures never rise from bottom to top; when today is warmer, pop and fill in answers. O(n)"
    correct: true
    why: "Each index is pushed once and popped at most once, so the total work is linear. Popped day j gets answer i - j."
  - text: "A max-heap of the days still waiting. O(n log n)"
    why: "A heap gives you the warmest waiting day, but the days that today resolves are the colder ones, so it answers the wrong question."
---

## Prompt

LeetCode 739. Daily Temperatures: for each day, how many days until a warmer one (0 if there isn't one)? Which approach is the standard one, and what does it cost?
