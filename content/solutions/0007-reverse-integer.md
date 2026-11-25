---
number: 7
title: Reverse Integer
difficulty: Medium
source: https://leetcode.com/problems/reverse-integer/
patterns: [Digit extraction, Overflow check before multiply]
structures: [Integer]
time: O(log n)
space: O(1)
stack: [leetcode, typescript]
---

## The problem
Reverse the decimal digits of a signed 32-bit integer, keeping the sign. If the reversed value no longer fits in 32 bits, return 0. You may not rely on 64-bit integers to hold the result. So `4096` becomes `6904`, `-305` becomes `-503`, and `1534236469` returns 0 because `9646324351` is too big.

## Thinking it through
1. **Restate.** The valid range is `-2147483648` to `2147483647`. Trailing zeros vanish (`1200` gives `21`).
2. **String approach.** Turn the number into a string, reverse it, parse it, check the range. Fine in JavaScript because a `number` holds the overflowed value exactly, but it dodges the real point: the rule says act as if you only have 32 bits.
3. **Digit extraction.** Peel digits off the end with `x % 10` and remove them with `Math.trunc(x / 10)`, building `result = result * 10 + digit`. In JavaScript, `%` keeps the sign of the dividend (`-305 % 10 === -5`), so negatives work without special handling. Use `Math.trunc`, not `Math.floor`, so negatives round towards zero.
4. **The overflow insight.** I must catch overflow *before* the multiply, because in a real 32-bit type the overflowed value would already be garbage. `result * 10 + digit > MAX` is the same as `result > floor(MAX / 10)`, or `result === floor(MAX / 10)` and `digit > 7` (MAX ends in 7). The negative side mirrors it with `-8`.
5. **Why that is enough.** Each step checks the exact condition under which the next step would leave the range, so `result` never holds an out-of-range value.
6. **Edge cases.** `0`, trailing zeros, `MAX` and `MIN` themselves (both reverse to overflow), and values that reverse to just under the limit, like `1463847412` to `2147483641`.

## Solution
```ts
function reverse(x: number): number {
  const MAX = 2 ** 31 - 1; // 2147483647
  const MIN = -(2 ** 31);  // -2147483648
  const LIMIT = Math.trunc(MAX / 10); // 214748364
  let result = 0;
  while (x !== 0) {
    const digit = x % 10;  // keeps the sign: -305 % 10 === -5
    x = Math.trunc(x / 10);
    // Check before multiplying so result never leaves the 32-bit range.
    if (result > LIMIT || (result === LIMIT && digit > 7)) return 0;
    if (result < -LIMIT || (result === -LIMIT && digit < -8)) return 0;
    result = result * 10 + digit;
  }
  return result;
}
```

## Complexity
- **Time O(log n):** one iteration per decimal digit, at most 10 for 32-bit input.
- **Space O(1):** a few numbers.

## Pitfalls
- Checking for overflow after the multiply, which is too late in a fixed-width language.
- Using `Math.floor` for negatives, which rounds `-30.5` to `-31` and corrupts the digits.
- Forgetting that `MIN` cannot be negated in 32 bits, so "reverse the absolute value" needs care.
