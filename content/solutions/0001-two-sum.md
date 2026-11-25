---
number: 1
title: Two Sum
difficulty: Easy
source: https://leetcode.com/problems/two-sum/
patterns: [Hash map lookup, Complement search]
structures: [Array, Hash map]
time: O(n)
space: O(n)
stack: [leetcode, typescript]
---

## The problem
You get an array of integers and a target. Exactly one pair of different positions adds up to the target; return those two indices. With `[4, 9, 1, 6]` and target `7`, the answer is `[2, 3]` because `1 + 6 = 7`.

## Thinking it through
1. **Restate.** For some `i < j`, `nums[i] + nums[j] === target`. I return indices, not values, so I can't lose positions by sorting without extra bookkeeping.
2. **Brute force.** Try every pair with two nested loops. That is n(n-1)/2 checks, so O(n²) time and O(1) space. Correct, but slow for large inputs.
3. **What is wasted?** For each `nums[j]`, the inner loop is really asking one question: "have I already seen `target - nums[j]`?" I answer it by rescanning everything to the left, every time.
4. **The insight.** Turn that question into a lookup. The number I need is the *complement*, `target - nums[j]`. If I remember every value I've passed, the check is constant time.
5. **The data structure.** A hash map from value to index (`Map<number, number>`). Walk the array once: compute the complement, look it up, and if it's there I have my pair. Otherwise store the current value and move on.
6. **Why insert after checking.** Checking first means an element never pairs with itself. With `[3, 4]` and target `6`, the 3 must not match its own entry.
7. **Duplicates.** `[5, 5]` with target `10` works because the first 5 is stored before the second one looks for it.
8. **Alternative.** Sort index/value pairs and close in with two pointers: O(n log n) time. The hash map wins on time; sorting wins only if memory is tight.

## Solution
```ts
function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>(); // value -> index
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    const j = seen.get(need);
    if (j !== undefined) return [j, i];
    seen.set(nums[i], i);
  }
  return []; // unreachable when a pair is guaranteed
}
```

## Complexity
- **Time O(n):** one pass, and each map lookup and insert is O(1) on average.
- **Space O(n):** in the worst case the map holds every value before the pair is found.

## Pitfalls
- Writing `if (seen.get(need))`: index `0` is falsy, so a match at position 0 is missed. Compare against `undefined`.
- Inserting before checking lets an element pair with itself.
- Sorting the original array loses the indices you have to return.
