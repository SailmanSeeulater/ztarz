---
number: 13
title: Roman to Integer
difficulty: Easy
source: https://leetcode.com/problems/roman-to-integer/
patterns: [Lookup table, Look-ahead scan]
structures: [String, Hash map]
time: O(n)
space: O(1)
stack: [leetcode, typescript]
---

## The problem
Given a valid Roman numeral, return the number it stands for. Symbols normally add up from left to right, but when a smaller symbol sits directly before a larger one, it is subtracted instead (IV is 4, XC is 90).

For example, `XLVII` is 47: XL is 40, then V and two Is add 7.

## Thinking it through
1. **Restate.** Sum the symbol values, except that some symbols count as negative.
2. **Small example.** `MCMXC`: M = 1000, then C before M means -100 and M = +1000, then X before C means -10 and C = +100. Total 1990.
3. **First idea.** Look for the six two-letter pairs (IV, IX, XL, XC, CD, CM) with string checks, then handle single letters. It works, but it means a list of special cases.
4. **The rule underneath.** A symbol is subtracted exactly when the next symbol is larger. That one comparison covers all six pairs without naming them.
5. **Data structure.** A **hash map** (a plain object here) from symbol to value gives O(1) lookups.
6. **Algorithm.** Scan once, left to right. For each position, peek at the next symbol's value (0 past the end). If the current value is smaller, subtract it; otherwise add it. This is a **look-ahead scan**.
7. **Why it's safe.** The input is guaranteed valid, so I never see something like `IM`; I don't need to validate.
8. **Edge cases.** A single symbol (`I`) just adds itself. The last symbol is always added because its "next" is 0.

## Solution
```ts
const SYMBOL: Record<string, number> = {
  I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000,
};

function romanToInt(s: string): number {
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const value = SYMBOL[s[i]];
    const next = i + 1 < s.length ? SYMBOL[s[i + 1]] : 0;
    // A smaller symbol before a larger one is subtracted.
    total += value < next ? -value : value;
  }
  return total;
}
```

## Complexity
- **Time:** O(n). One pass over the string with constant work per character.
- **Space:** O(1). The map has seven fixed entries.

## Pitfalls
- Comparing with the previous symbol instead of the next, then forgetting to undo the value already added (the fix is `- 2 * prev`, which is easy to get wrong).
- Reading past the end of the string when peeking at `s[i + 1]`.
