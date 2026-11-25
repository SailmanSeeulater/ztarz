---
title: "Two Sum: insert before you check"
module: leetcode
type: what-prints
source: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map"
tags: ["arrays-hashing", "hash-map"]
stack: ["leetcode", "javascript"]
---

## Prompt

LeetCode 1. Two Sum: return the indices of two different elements that add up to the target. What does this one-pass version print? The right answer is `[1, 2]`.

```js
function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    seen.set(nums[i], i);
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
  }
  return [];
}
console.log(twoSum([5, 3, 7], 10));
```

## Answer

`[ 0, 0 ]`

## Explanation

The 5 goes into the map before the lookup, so when `need` is also 5 it finds itself. Check first, then insert: the map then only holds earlier elements, so an element can never pair with itself. That's the whole pattern: one pass, O(n) time, O(n) space, instead of the O(n²) pair scan.
