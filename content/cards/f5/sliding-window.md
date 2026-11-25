---
title: "The sliding window pattern"
module: f5
type: concept
source: "https://en.wikipedia.org/wiki/Moving_average#Simple_moving_average"
tags: ["algorithms", "sliding-window", "big-o"]
---

## Prompt

What is the sliding window pattern, and what does it save? Use "largest sum of any k consecutive numbers" as the example.

## Answer

Keep a running result for a contiguous window. When the window moves one step, add the element coming in and subtract the one going out, instead of recomputing the whole window. That turns O(n·k) into O(n).

```js
function maxSum(nums, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += nums[i];
  let best = sum;
  for (let i = k; i < nums.length; i++) {
    sum += nums[i] - nums[i - k];
    best = Math.max(best, sum);
  }
  return best;
}
```

Variable-size windows work the same way: extend the right edge, and move the left edge in while the window breaks a rule (for example, "no repeated characters", tracked with a set). Each element enters and leaves once, so it's still O(n). The clue in a problem: "contiguous subarray or substring" plus "longest", "shortest" or "largest".
