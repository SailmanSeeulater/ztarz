---
title: "House Robber with two variables"
module: leetcode
type: what-prints
source: "https://leetcode.com/problems/house-robber/"
tags: ["dynamic-programming", "1d-dp"]
stack: ["leetcode", "javascript"]
---

## Prompt

LeetCode 198. House Robber: pick values from a list to get the largest total, never taking two neighbours. What does this print?

```js
function rob(nums) {
  let prev = 0, curr = 0;   // best up to i-2, best up to i-1
  for (const n of nums) {
    const next = Math.max(curr, prev + n);
    prev = curr;
    curr = next;
  }
  return curr;
}
console.log(rob([5, 1, 2, 10, 3]));
```

## Answer

`15`

## Explanation

`curr` goes 5, 5, 7, 15, 15. At each house the choice is skip it (keep `curr`) or take it (`prev + n`, the best total that ends two houses back). That's the recurrence `best(i) = max(best(i-1), best(i-2) + nums[i])`. Only the last two values are needed, so it's O(n) time and O(1) space. Climbing Stairs has the same shape, with addition in place of `max`.
