---
title: "3Sum returns the same triplet twice"
module: leetcode
type: bug-hunt
source: "https://en.wikipedia.org/wiki/3SUM"
tags: ["two-pointers", "sorting", "dedupe"]
stack: ["leetcode", "javascript"]
choices:
  - text: "The outer loop needs `if (i > 0 && nums[i] === nums[i - 1]) continue;` so each first value is used once"
    correct: true
    why: "After sorting, the two -1s both act as the first number and both find 0 and 1. Skipping a repeated first value removes the duplicate."
  - text: "The sort should be plain `nums.sort()`"
    why: "The default sort compares values as strings, so negatives end up in the wrong order and the two-pointer logic breaks."
  - text: "After a match, `hi` also needs a loop that skips duplicates"
    why: "Harmless to add, but not the cause. Once `lo` has moved to a new value, a zero sum needs a different `hi` value anyway."
  - text: "The outer bound should be `i < nums.length`"
    why: "With fewer than two elements after `i` the inner loop never runs, so the current bound is fine."
---

## Prompt

LeetCode 15. 3Sum asks for every distinct triplet that sums to zero. `threeSum([0, -1, 2, -1, 1])` returns `[[-1,-1,2],[-1,0,1],[-1,0,1]]`. What's missing?

```js
function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const out = [];
  for (let i = 0; i < nums.length - 2; i++) {
    let lo = i + 1, hi = nums.length - 1;
    while (lo < hi) {
      const sum = nums[i] + nums[lo] + nums[hi];
      if (sum < 0) lo++;
      else if (sum > 0) hi--;
      else {
        out.push([nums[i], nums[lo], nums[hi]]);
        lo++;
        hi--;
        while (lo < hi && nums[lo] === nums[lo - 1]) lo++;
      }
    }
  }
  return out;
}
```

## Explanation

Sort, fix the first number, then run two pointers inward on the rest: O(n²) overall, which beats the O(n³) triple loop. Sorting is also what makes de-duplication cheap: equal values sit next to each other, so you skip a repeat of the first number in the outer loop and a repeat of `lo` after each match.
