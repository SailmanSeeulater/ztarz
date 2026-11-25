---
number: 10
title: Regular Expression Matching
difficulty: Hard
source: https://leetcode.com/problems/regular-expression-matching/
patterns: [Recursion, Dynamic programming, Memoisation]
structures: [String, 2D DP table]
time: O(m × n)
space: O(m × n)
stack: [leetcode, typescript]
---

## The problem
Implement a tiny regex matcher. The pattern has letters, `.` (any one character) and `*` (zero or more of the character just before it). The whole string must match the whole pattern. So `"caat"` matches `"ca*t"`, `"ct"` also matches it (zero `a`s), and `"cbt"` does not.

## Thinking it through
1. **Restate.** Full match, not search. A `*` never stands alone; it always binds to the character before it, so treat `x*` as one token.
2. **Small example.** `"caat"` vs `"ca*t"`: `c` matches `c`, then `a*` eats `aa`, then `t` matches `t`. The hard part is that `a*` could eat zero, one or two `a`s and I don't know which until later.
3. **Simpler approach: recursion.** Compare the first character, then decide based on whether the next pattern character is `*`:
   - No star: the first characters must match (`.` matches anything), then recurse on the rest of both.
   - Star: either skip `x*` entirely (match zero), or, if the first characters match, consume one string character and keep the same pattern (match one more).

   ```ts
   function isMatchRecursive(s: string, p: string): boolean {
     if (p.length === 0) return s.length === 0;
     const first = s.length > 0 && (p[0] === s[0] || p[0] === ".");
     if (p[1] === "*") {
       return isMatchRecursive(s, p.slice(2)) || (first && isMatchRecursive(s.slice(1), p));
     }
     return first && isMatchRecursive(s.slice(1), p.slice(1));
   }
   ```
4. **Why it's slow.** Each star branches two ways, and patterns like `a*a*a*a*b` against a long run of `a`s explore an exponential number of paths. Yet every call is really just "does `s` from index i match `p` from index j?", and there are only (m + 1) × (n + 1) such pairs. The same pairs are solved over and over.
5. **The insight: overlapping subproblems.** That is the signal for dynamic programming. Either memoise the recursion on `(i, j)`, or fill a table bottom up.
6. **Define the table.** `dp[i][j]` means "`s.slice(i)` matches `p.slice(j)`". The answer is `dp[0][0]`. Base case: `dp[m][n] = true` (empty matches empty). `dp[i][n]` is false for `i < m` (leftover string, no pattern).
7. **Transitions,** read straight off the recursion:
   - `first = i < m && (p[j] === s[i] || p[j] === ".")`
   - If `p[j + 1] === "*"`: `dp[i][j] = dp[i][j + 2] || (first && dp[i + 1][j])`.
   - Otherwise: `dp[i][j] = first && dp[i + 1][j + 1]`.
8. **Fill order.** Each cell depends on cells with a larger `i` or larger `j`, so loop `i` from `m` down to 0 and `j` from `n - 1` down to 0. Row `i = m` matters: it handles an empty remaining string against patterns like `a*b*`.
9. **Edge cases.** Both empty is true; empty string vs `a*b*.*` is true; empty string vs `.` is false; `.*` matches anything.

## Solution
```ts
function isMatch(s: string, p: string): boolean {
  const m = s.length;
  const n = p.length;
  // dp[i][j]: does s.slice(i) match p.slice(j)?
  const dp: boolean[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));
  dp[m][n] = true; // empty matches empty

  for (let i = m; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      const firstMatches = i < m && (p[j] === s[i] || p[j] === ".");
      if (j + 1 < n && p[j + 1] === "*") {
        // Skip "x*" entirely, or use it for one character and stay on it.
        dp[i][j] = dp[i][j + 2] || (firstMatches && dp[i + 1][j]);
      } else {
        dp[i][j] = firstMatches && dp[i + 1][j + 1];
      }
    }
  }
  return dp[0][0];
}
```

## Complexity
- **Time O(m × n):** each of the (m + 1) × (n + 1) cells is filled once in O(1).
- **Space O(m × n):** the table. Each row only reads the row below, so two rows would bring it down to O(n).

## Pitfalls
- Treating `*` on its own instead of together with the character before it.
- Starting the `i` loop at `m - 1`, which skips the empty-string row and breaks `""` vs `"a*"`.
- Forgetting that `.*` can match zero characters as well as many.
