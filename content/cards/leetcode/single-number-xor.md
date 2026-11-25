---
title: "Single Number with XOR"
module: leetcode
type: what-prints
source: "https://en.wikipedia.org/wiki/XOR_swap_algorithm"
tags: ["bit-manipulation", "xor"]
stack: ["leetcode", "javascript"]
---

## Prompt

LeetCode 136. Single Number: every value in the array appears twice except one; find it in O(n) time and O(1) space. What does this print?

```js
const nums = [7, 3, 5, 3, 7];
let x = 0;
for (const n of nums) x ^= n;
console.log(x);
```

## Answer

`5`

## Explanation

XOR cancels pairs: `a ^ a = 0`, `a ^ 0 = a`, and order doesn't matter (it's commutative and associative). So every duplicate cancels out and only the single value is left. Step by step: 7, 4, 1, 2, 5. A hash set would also work, but needs O(n) memory.
