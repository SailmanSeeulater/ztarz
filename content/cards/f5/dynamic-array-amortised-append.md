---
title: "Amortised O(1) append in a dynamic array"
module: f5
type: mcq
source: "https://en.wikipedia.org/wiki/Dynamic_array#Geometric_expansion_and_amortized_cost"
tags: ["data-structures", "arrays", "big-o", "amortised"]
choices:
  - text: "O(n log n) in total: there are log n resizes and each copies up to n items"
    why: "The copies aren't all size n. They are 1, 2, 4, ... up to n, and that series sums to less than 2n."
  - text: "O(n²) in total, because every resize copies the whole array"
    why: "That's what happens if capacity grows by a fixed amount (say +10 each time): resizes happen every few appends. Doubling makes them rare enough to cancel out."
  - text: "O(1) for every single append, with no slow ones"
    why: "The append that triggers a resize copies every element, so that one is O(n). The O(1) is an average over the sequence, not a guarantee per call."
  - text: "O(n) in total, so O(1) amortised per append"
    correct: true
    why: "Each item is written once, and the copies add up to less than 2n because each resize is twice the size of the last. Spread across n appends, that's a constant per append."
---

## Prompt

A dynamic array (like a JavaScript array or a Java `ArrayList`) doubles its capacity and copies everything across whenever it fills up. What does appending n items cost?
