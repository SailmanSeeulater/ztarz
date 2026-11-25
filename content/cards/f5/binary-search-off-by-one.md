---
title: "Binary search that misses the last element"
module: f5
type: bug-hunt
source: "https://en.wikipedia.org/wiki/Binary_search"
tags: ["algorithms", "binary-search", "off-by-one"]
choices:
  - text: "`mid` should round up with `Math.ceil`"
    why: "That changes which middle is picked, but the loop still exits with one unchecked element: on this input it still returns -1."
  - text: "`(lo + hi) / 2` overflows"
    why: "Overflow is a real bug with fixed-width integers (Java, C), fixed by `lo + (hi - lo) / 2`. JavaScript numbers are doubles, and array indices are nowhere near the limit."
  - text: "`while (lo < hi)` exits before checking the last remaining element; with an inclusive `hi` it must be `lo <= hi`"
    correct: true
    why: "When `lo === hi`, one candidate is left and the loop skips it. Here that's index 3, the 7."
  - text: "The array must be sorted in descending order"
    why: "The comparisons assume ascending order, and the input is ascending, so the precondition holds."
---

## Prompt

`search([1, 3, 5, 7], 7)` returns `-1`. Why?

```js
function search(sorted, target) {
  let lo = 0;
  let hi = sorted.length - 1;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (sorted[mid] === target) return mid;
    if (sorted[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
```

## Explanation

Binary search needs sorted input and halves the range each step, so it costs O(log n): about 20 comparisons for a million items. Most bugs are in the boundaries. Pick one convention and stick to it: inclusive `hi = length - 1` with `lo <= hi` and `hi = mid - 1`, or exclusive `hi = length` with `lo < hi` and `hi = mid`.
