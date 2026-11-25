---
title: "Longest Common Subsequence: state and recurrence"
module: leetcode
type: concept
source: "https://en.wikipedia.org/wiki/Longest_common_subsequence"
tags: ["dynamic-programming", "2d-dp", "strings"]
stack: ["leetcode"]
---

## Prompt

LeetCode 1143. Longest Common Subsequence: return the length of the longest sequence of characters that appears in both strings in the same order, not necessarily side by side. Define the DP state and recurrence, and give the cost.

## Answer

`dp[i][j]` is the LCS length of the first `i` characters of `a` and the first `j` characters of `b`. Row 0 and column 0 are 0 (an empty prefix shares nothing).

- If `a[i-1] === b[j-1]`: `dp[i][j] = dp[i-1][j-1] + 1` (use the match).
- Otherwise: `dp[i][j] = max(dp[i-1][j], dp[i][j-1])` (drop a character from one string).

The answer is `dp[m][n]`. O(m · n) time and space. Each row only reads the row above, so two rows (O(min(m, n)) space) are enough.

The clue: two sequences plus "subsequence" or "edits" means a 2-D grid indexed by prefixes. Edit Distance (LeetCode 72) has the same shape.
