---
title: "Combination Sum: where the recursion restarts"
module: leetcode
type: mcq
source: "https://leetcode.com/problems/combination-sum/"
tags: ["backtracking", "recursion"]
stack: ["leetcode"]
choices:
  - text: "`dfs(i + 1, remaining - candidates[i])`"
    why: "That uses each number at most once, which is the rule in LeetCode 40. Here `[2, 2, 3]` would never be found."
  - text: "`dfs(i, remaining - candidates[i])`"
    correct: true
    why: "Staying on `i` allows the same number again, and never going back to earlier indices means `[2, 3]` and `[3, 2]` can't both appear. Stop when `remaining` hits 0 (record) or drops below 0 (prune)."
  - text: "`dfs(0, remaining - candidates[i])`"
    why: "Restarting from 0 produces every ordering: `[2, 2, 3]`, `[2, 3, 2]` and `[3, 2, 2]` all come out."
  - text: "Skip backtracking and fill a DP table of ways to reach each sum"
    why: "That counts combinations (LeetCode 518, Coin Change II), but this problem asks you to list them."
---

## Prompt

LeetCode 39. Combination Sum: given distinct positive candidates and a target, list every combination that adds up to the target, where a number may be used any number of times and order doesn't matter. Inside `dfs(start, remaining)`, a loop tries `candidates[i]` for `i` from `start`. After choosing it, which call comes next?
