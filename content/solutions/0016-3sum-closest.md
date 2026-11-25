---
number: 16
title: 3Sum Closest
difficulty: Medium
source: https://leetcode.com/problems/3sum-closest/
patterns: [Sort then two pointers]
structures: [Array]
time: O(n²)
space: O(1) extra (ignoring sort)
stack: [leetcode, typescript]
---

## The problem
Given an array of at least three integers and a target, choose three numbers from different positions whose sum is as close to the target as possible, and return that sum. You can assume exactly one closest sum exists.

For `[4, -2, 1, 7]` and target 6, the answer is 6: `-2 + 1 + 7`.

## Thinking it through
1. **Restate.** Minimise `|a + b + c - target|` over all triples and return the sum, not the triple.
2. **Brute force.** Try every triple: O(n³). Works for tiny inputs only.
3. **Borrow from 3Sum.** Fix one number, then search the rest for a pair. With the array **sorted**, the pair search becomes **two pointers**.
4. **Why the pointers can move safely.** For a fixed `i`, if the current sum is below the target, every pair that keeps `left` and uses a smaller `right` is even further below. So `left` can't help any more: move it right. If the sum is above the target, the mirror argument drops `right`.
5. **Track the best.** At every step, compare the current distance to the best seen so far and keep the closer sum. Unlike 3Sum, I check every sum, not only exact hits.
6. **Early return.** If a sum equals the target, the distance is 0 and nothing can beat it.
7. **Duplicates.** They don't matter here, because I return one number, not a list of unique triples. Skipping them would only be a small speed-up.
8. **Initial value and edge cases.** Start `best` at the sum of the first three sorted numbers, a real candidate, rather than `Infinity`, which would make the distance maths fragile. With exactly three numbers, that is the answer.

## Solution
```ts
function threeSumClosest(nums: number[], target: number): number {
  const sorted = [...nums].sort((a, b) => a - b);
  let best = sorted[0] + sorted[1] + sorted[2];
  for (let i = 0; i < sorted.length - 2; i++) {
    let left = i + 1;
    let right = sorted.length - 1;
    while (left < right) {
      const sum = sorted[i] + sorted[left] + sorted[right];
      if (Math.abs(sum - target) < Math.abs(best - target)) best = sum;
      if (sum < target) left++;
      else if (sum > target) right--;
      else return sum; // can't get closer than exact
    }
  }
  return best;
}
```

## Complexity
- **Time:** O(n²). n anchors, each with an O(n) two-pointer sweep; the sort is O(n log n).
- **Space:** O(1) extra beyond the sorted copy.

## Pitfalls
- Returning the distance instead of the sum.
- Initialising `best` to `Infinity`: `Math.abs(Infinity - target)` works, but it hides bugs if the loop never runs.
- Forgetting the numeric comparator in `sort`.
