---
title: "Bit tricks: powers of two and the lowest set bit"
module: f5
type: what-prints
source: "https://cp-algorithms.com/algebra/bit-manipulation.html"
tags: ["algorithms", "bit-manipulation"]
stack: ["javascript"]
---

## Prompt

What prints?

```js
const isPowerOfTwo = (n) => n > 0 && (n & (n - 1)) === 0;
console.log([1, 6, 8, 0].map(isPowerOfTwo));
console.log(12 & 11);
console.log([4, 1, 2, 1, 2].reduce((acc, x) => acc ^ x, 0));
```

## Answer

```text
[ true, false, true, false ]
8
4
```

## Explanation

Subtracting 1 flips the lowest set bit to 0 and every bit below it to 1. So `n & (n - 1)` clears the lowest set bit: `12` is `1100`, `11` is `1011`, and the AND is `1000`, which is `8`. A power of two has exactly one set bit, so clearing it leaves 0. The `n > 0` guard is needed because `0 & -1` is also 0.

XOR gives 1 only where the bits differ, so `x ^ x` is 0 and `x ^ 0` is `x`, and order doesn't matter. XOR-ing a list where every value appears twice except one cancels the pairs and leaves the odd one out, in O(n) time and O(1) space.
