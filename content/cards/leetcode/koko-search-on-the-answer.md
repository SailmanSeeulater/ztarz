---
title: "Koko Eating Bananas in 60 seconds"
module: leetcode
type: out-loud
source: "https://cp-algorithms.com/num_methods/binary_search.html"
tags: ["binary-search", "search-on-answer"]
stack: ["leetcode", "javascript"]
---

## Prompt

LeetCode 875. Koko Eating Bananas: there are piles of bananas and h hours. Each hour Koko eats up to k bananas from one pile. Find the smallest k that finishes every pile within h hours. Explain your approach in a minute.

## Model answer

The clue is "smallest value that still works". The condition is monotonic: if speed k finishes in time, any faster speed does too. So I binary search on the answer, not on the array.

The range is 1 to the largest pile: at that speed every pile takes one hour, and h is at least the number of piles. To test a speed, sum `ceil(pile / k)` over the piles and compare with h. That check is O(n).

```js
let lo = 1, hi = Math.max(...piles);
while (lo < hi) {
  const mid = Math.floor((lo + hi) / 2);
  const hours = piles.reduce((t, p) => t + Math.ceil(p / mid), 0);
  if (hours <= h) hi = mid;   // mid works; maybe something smaller does
  else lo = mid + 1;          // too slow
}
return lo;
```

It's the "first true" form: `hi = mid` keeps a speed that works, and the loop ends when `lo === hi`. Total cost is O(n log m), where m is the largest pile. The same shape solves shipping capacity and split-array problems.
