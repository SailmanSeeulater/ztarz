---
number: 12
title: Integer to Roman
difficulty: Medium
source: https://leetcode.com/problems/integer-to-roman/
patterns: [Greedy, Lookup table]
structures: [Array]
time: O(1)
space: O(1)
stack: [leetcode, typescript]
---

## The problem
Convert a whole number from 1 to 3999 into a Roman numeral. The symbols are I = 1, V = 5, X = 10, L = 50, C = 100, D = 500 and M = 1000. Six values use a smaller symbol in front of a larger one instead of repeating: 4 is IV, 9 is IX, 40 is XL, 90 is XC, 400 is CD and 900 is CM.

For example, 2024 becomes `MMXXIV` and 444 becomes `CDXLIV`.

## Thinking it through
1. **Restate.** I have to write the number as a sum of symbol values, largest first, using the subtractive pairs where they apply.
2. **Small example.** 444: take 400 (CD), leaving 44. Take 40 (XL), leaving 4. Take 4 (IV). Result: `CDXLIV`.
3. **First idea: digit by digit.** Handle thousands, hundreds, tens and ones separately, with special cases for 4 and 9 in each place. It works, but the branching per digit is easy to get wrong.
4. **The insight.** If I treat the six subtractive pairs as symbols in their own right, the problem becomes plain coin change with a canonical coin set: 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1.
5. **Greedy.** With that set, always taking the largest value that still fits gives the correct numeral, just like making change with standard coins. No special cases left.
6. **Data structure.** An ordered **lookup table** (array of `[value, symbol]` pairs, largest first). An array keeps the order explicit, which a plain object would not guarantee for numeric keys.
7. **Loop.** Walk the table once. For each entry, append the symbol while the remaining number is at least its value.
8. **Edge cases.** 1 gives `I`; 3999 gives `MMMCMXCIX`, the longest valid case. A symbol never repeats more than three times because the next pair or symbol takes over.

## Solution
```ts
// Largest first, with the subtractive pairs listed as their own symbols.
const VALUES: [number, string][] = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
  [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
  [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];

function intToRoman(num: number): string {
  let out = "";
  for (const [value, symbol] of VALUES) {
    while (num >= value) {
      out += symbol;
      num -= value;
    }
  }
  return out;
}
```

## Complexity
- **Time:** O(1). The input is capped at 3999, so the table has 13 entries and the output is at most 15 characters.
- **Space:** O(1). The table is fixed size.

## Pitfalls
- Leaving out the subtractive pairs, which produces `IIII` instead of `IV`.
- Listing the table out of order. Greedy only works when larger values come first.
