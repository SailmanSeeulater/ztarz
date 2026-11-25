---
title: "Why sorting can't beat n log n, and when it can"
module: f5
type: out-loud
source: "https://en.wikipedia.org/wiki/Comparison_sort#Number_of_comparisons_required_to_sort_a_list"
tags: ["algorithms", "sorting", "big-o", "counting-sort"]
---

## Prompt

An interviewer asks: "Can any sorting algorithm do better than O(n log n)?" Answer in about a minute.

## Model answer

Not if it only learns about the data by comparing two elements. n distinct items can be in n! possible orders, and the algorithm has to tell them all apart to know which rearrangement sorts them. Each comparison is a yes-or-no answer, so k comparisons can tell apart at most 2ᵏ cases. You need 2ᵏ ≥ n!, so k ≥ log₂(n!), which works out to about n log n. Merge sort reaches that bound, so it's tight.

The way round it is to not compare. If the keys are small integers, say exam scores from 0 to 100, counting sort counts how many of each value there are and writes them back out in order. That's O(n + k), where k is the size of the key range: linear when the range is small next to n. It uses O(k) extra memory, so it falls apart when the range is huge, like arbitrary 64-bit numbers or strings.

So my answer is: no for general comparison sorts, yes when you know something about the keys.
