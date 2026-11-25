---
title: "Rotated array search misses a two-element case"
module: leetcode
type: bug-hunt
source: "https://leetcode.com/problems/search-in-rotated-sorted-array/"
tags: ["binary-search", "off-by-one"]
stack: ["leetcode", "javascript"]
choices:
  - text: "`nums[lo] < nums[mid]` should be `<=`: when `lo === mid`, the left half is one element, which counts as sorted"
    correct: true
    why: "With `[3, 1]`, mid is 0. The strict check says the left half isn't sorted, so the code treats `[3, 1]` as the sorted right half, decides 1 isn't in it, and drops it."
  - text: "The loop should be `while (lo < hi)`"
    why: "With an inclusive `hi`, that skips the last remaining candidate and breaks more inputs, not fewer."
  - text: "The left-half test should be `nums[lo] < target`"
    why: "Then a target equal to `nums[lo]` is sent to the wrong half. The left end must be inclusive."
  - text: "You must first find the rotation point with a separate binary search"
    why: "That's a valid alternative design, not the bug. This one-pass version is correct once the comparison is fixed."
---

## Prompt

LeetCode 33. Search in Rotated Sorted Array: a sorted array of distinct numbers has been rotated at an unknown point; find the target's index in O(log n). This returns -1 for `search([3, 1], 1)`. Why?

```js
function search(nums, target) {
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (nums[mid] === target) return mid;
    if (nums[lo] < nums[mid]) {        // left half sorted
      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {                            // right half sorted
      if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return -1;
}
```

## Explanation

At every step at least one half of a rotated array is sorted. Work out which, then ask whether the target lies inside that sorted half's range; if so search there, otherwise search the other half. Still O(log n). The edge case is the one-element half when `lo === mid`, which is why the check is `<=`.
