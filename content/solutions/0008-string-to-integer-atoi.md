---
number: 8
title: String to Integer (atoi)
difficulty: Medium
source: https://leetcode.com/problems/string-to-integer-atoi/
patterns: [Parsing, Overflow clamping]
structures: [String]
time: O(n)
space: O(1)
stack: [leetcode, typescript]
---

## The problem
Parse a signed 32-bit integer from the front of a string, the way C's `atoi` does. Skip leading spaces, accept one optional `+` or `-`, then read digits until something that isn't a digit. If nothing was read, return 0. If the value goes past the 32-bit range, clamp it to the nearest bound. So `"  -0042kg"` gives `-42`, `"days 7"` gives 0, and `"99999999999999999999"` gives `2147483647`.

## Thinking it through
1. **Restate as stages.** Whitespace, sign, digits, stop. A small hand-rolled state machine with one index `i` is clearer than a regex.
2. **Why not `parseInt`?** It is close but accepts things the rules don't (leading tabs and newlines, for example) and doesn't clamp. Interviewers want the stages written out.
3. **Stage 1, spaces.** Advance `i` past `' '` characters only.
4. **Stage 2, sign.** If `s[i]` is `+` or `-`, record it and advance once. A second sign (`"+-3"`) is not a digit, so parsing stops with 0.
5. **Stage 3, digits.** While `s[i]` is `'0'` to `'9'`, do `result = result * 10 + digit`. Leading zeros fall out naturally.
6. **Stage 4, overflow.** Clamp as soon as `sign * result` passes a bound, and return immediately. In a 32-bit language you would compare against `floor(MAX / 10)` before multiplying, as in Reverse Integer; in JavaScript a `number` holds values up to 2^53 exactly, so checking right after one more digit is safe.
7. **Asymmetric range.** The negative bound is one larger in magnitude: `"-2147483648"` is valid, `"2147483648"` clamps to `2147483647`.
8. **Edge cases.** Empty, only spaces, only a sign, `"-0"` (return `0`, not `-0`), a decimal point (stops there), digits after letters (ignored).

## Solution
```ts
function myAtoi(s: string): number {
  const MAX = 2 ** 31 - 1;
  const MIN = -(2 ** 31);
  let i = 0;

  while (i < s.length && s[i] === " ") i++; // 1. leading spaces

  let sign = 1;
  if (s[i] === "+" || s[i] === "-") {       // 2. at most one sign
    if (s[i] === "-") sign = -1;
    i++;
  }

  let result = 0;
  while (i < s.length && s[i] >= "0" && s[i] <= "9") { // 3. digits
    result = result * 10 + (s.charCodeAt(i) - 48);
    if (sign * result > MAX) return MAX;    // 4. clamp on the first overflow
    if (sign * result < MIN) return MIN;
    i++;
  }
  return sign * result || 0; // turns -0 into 0
}
```

## Complexity
- **Time O(n):** one pass over the string, and the digit loop stops at the first overflow.
- **Space O(1):** an index, a sign and the running value.

## Pitfalls
- Clamping only at the end, after the value has grown past what the type can hold.
- Accepting a second sign or skipping spaces after the sign.
- Returning `-0` for `"-0"`, which fails strict equality checks in some test harnesses.
