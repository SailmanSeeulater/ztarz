---
number: 11
title: Container With Most Water
difficulty: Medium
source: https://leetcode.com/problems/container-with-most-water/
patterns: [Two pointers, Greedy]
structures: [Array]
time: O(n)
space: O(1)
stack: [leetcode, typescript]
---

## The problem
You get an array of non-negative heights. Each one is a vertical wall standing at its index. Pick two walls so that, with the ground between them, they hold the most water, and return that amount. The water level is capped by the shorter wall, and the width is the distance between the two indices.

For `[3, 1, 2, 4, 2]` the answer is 9: walls at index 0 (height 3) and index 3 (height 4) give `min(3, 4) * 3`.

## Thinking it through
1. **Restate.** For any pair `i < j`, the area is `min(h[i], h[j]) * (j - i)`. I want the maximum over all pairs.
2. **Brute force.** Two nested loops try every pair: O(n²) time, O(1) space. Correct, but too slow for large inputs, so I look for pairs I can rule out without checking them.
3. **Start wide.** Put one pointer at each end. That pair has the largest possible width, so it is a fair first candidate.
4. **Which pointer to move.** Say the left wall is shorter. Any other pair that keeps this left wall has a smaller width, and its height is still capped by this same short wall (or something even shorter). So no pair using the left wall can beat the area I just measured. I can discard it and move the left pointer inward. The same argument applies to the right side when it is the shorter one.
5. **Why moving the taller one is useless.** If I moved the taller wall instead, the width shrinks and the height is still limited by the short wall, so the area can only fall. That is the greedy choice: always drop the shorter wall.
6. **Pattern.** This is **two pointers** closing in from both ends, with a **greedy** rule for which end to move. Each step discards one wall for good, so the loop runs at most n - 1 times.
7. **Ties.** When both walls are equal, moving either one is safe, because neither can be part of a bigger pair with the current partner.
8. **Edge cases.** Two walls: one pair, one answer. All zeros: the answer is 0.

## Solution
```ts
function maxArea(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let best = 0;
  while (left < right) {
    const area = Math.min(height[left], height[right]) * (right - left);
    best = Math.max(best, area);
    // The shorter wall can't do better with any closer partner, so drop it.
    if (height[left] < height[right]) left++;
    else right--;
  }
  return best;
}
```

## Complexity
- **Time:** O(n). Each iteration moves one pointer inward, and they meet after at most n - 1 steps.
- **Space:** O(1). Only three numbers are kept.

## Pitfalls
- Moving the taller wall. It feels like you are keeping the "good" wall, but the short wall is the bottleneck.
- Using the height of the taller wall, or forgetting the width is `right - left`, not `right - left + 1`.
