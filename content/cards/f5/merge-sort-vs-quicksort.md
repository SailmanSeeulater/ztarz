---
title: "Merge sort vs quicksort"
module: f5
type: comparison
source: "https://en.wikipedia.org/wiki/Sorting_algorithm#Comparison_of_algorithms"
tags: ["algorithms", "sorting", "big-o"]
---

## What it is

Two O(n log n) divide-and-conquer sorts. **Merge sort** splits the input in half, sorts each half, then merges the two sorted halves. **Quicksort** picks a pivot, partitions the input into "smaller than pivot" and "larger than pivot", then sorts each side.

## How it models the problem

Merge sort does the real work on the way back up (the merge); the split is trivial. Quicksort does the real work on the way down (the partition); once both sides are sorted, there's nothing left to combine. That difference drives everything else below.

## Where it shines

- **Merge sort:** O(n log n) in the worst case, always. It's **stable**: equal keys keep their input order, which matters when you sort by one field after another. It needs only sequential access, so it's the natural choice for linked lists, and its merge step is how data too big for memory gets combined.
- **Quicksort:** in-place, with only O(log n) extra space for the recursion. Average O(n log n) and fast in practice on arrays.

## Where it bites

- **Merge sort:** O(n) extra memory for arrays, to hold the merged output.
- **Quicksort:** O(n²) in the worst case, when pivots keep splitting badly. A naive "first element as pivot" hits that on already-sorted input. Random pivots make it very unlikely, and introsort guarantees O(n log n) by switching to heapsort if recursion gets too deep. Quicksort is also not stable.

## What interviewers ask

- "Worst case of each, and what input triggers quicksort's?" O(n log n) vs O(n²), from consistently bad pivots such as sorted input with a first-element pivot.
- "Which would you use to sort a linked list?" Merge sort: it needs no random access.
- "What does stable mean, and when do you need it?" Equal elements keep their relative order; you need it when sorting by a second key must preserve an earlier sort.
- "What do real libraries do?" Hybrids: Timsort (merge sort plus insertion sort) is the standard sort in Python and Java; introsort is quicksort with a heapsort fallback.
