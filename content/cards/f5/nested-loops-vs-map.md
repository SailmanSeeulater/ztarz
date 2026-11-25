---
title: "Nested loops vs a single pass with a map"
module: f5
type: concept
source: "https://en.wikipedia.org/wiki/Hash_table"
tags: ["algorithms", "big-o", "hashing"]
---

## Prompt

Both functions return the indices of two numbers that add up to `target`. What does each cost in time and space, and why is B faster?

```js
// A
for (let i = 0; i < nums.length; i++)
  for (let j = i + 1; j < nums.length; j++)
    if (nums[i] + nums[j] === target) return [i, j];

// B
const seen = new Map(); // value -> index
for (let i = 0; i < nums.length; i++) {
  const need = target - nums[i];
  if (seen.has(need)) return [seen.get(need), i];
  seen.set(nums[i], i);
}
```

## Answer

- **A:** O(n²) time, since it checks every pair (about n²/2 of them). O(1) extra space.
- **B:** O(n) time on average, O(n) extra space.

B trades memory for time. Instead of an inner loop scanning for the partner, it asks the map, which answers in O(1) on average. For 100,000 numbers, A checks about 5 billion pairs; B does 100,000 lookups.

The habit to build: when an inner loop is *searching* for something, ask whether a map or set could answer it in one lookup.
