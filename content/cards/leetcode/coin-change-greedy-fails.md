---
title: "Coin Change: greedy or DP"
module: leetcode
type: mcq
source: "https://en.wikipedia.org/wiki/Change-making_problem"
tags: ["dynamic-programming", "1d-dp", "greedy"]
stack: ["leetcode"]
choices:
  - text: "Bottom-up DP: `dp[0] = 0`, every other entry `Infinity`, `dp[a] = min(dp[a - c] + 1)` over the coins. O(amount × coins)"
    correct: true
    why: "It tries every last coin for every amount, so it finds 3 + 3. If `dp[amount]` is still `Infinity`, return -1."
  - text: "Greedy: keep taking the largest coin that fits"
    why: "It takes 4 + 1 + 1, three coins, when 3 + 3 needs two. Greedy is only safe for some coin systems."
  - text: "Try every combination of coins with backtracking and keep the shortest"
    why: "Correct, but exponential. It recomputes the same remaining amounts over and over, which is exactly what DP caches."
  - text: "The same DP, but fill the table with 0 to start"
    why: "Then `min` always keeps the 0 and every answer comes out as 0. Unreached amounts must start at `Infinity`."
---

## Prompt

LeetCode 322. Coin Change: return the fewest coins that make up an amount, or -1 if it can't be done. With coins `[1, 3, 4]` and amount 6, which approach is correct and efficient?
