---
number: 9
title: Palindrome Number
difficulty: Easy
source: https://leetcode.com/problems/palindrome-number/
patterns: [Digit extraction, Reverse half]
structures: [Integer]
time: O(log n)
space: O(1)
stack: [leetcode, typescript]
---

## The problem
Decide whether an integer reads the same forwards and backwards in decimal. `4554` and `30703` do. `-363` does not, because `363-` isn't the same, and neither does `50`.

## Thinking it through
1. **Restate.** Compare the digit sequence with its reverse. The minus sign counts, so every negative number is out.
2. **String approach.** `String(x) === [...String(x)].reverse().join("")`. O(d) time and O(d) extra space for d digits. The usual follow-up is "do it without converting to a string".
3. **Reverse the whole number.** Build the reversed integer with `% 10` and division, then compare. It works, but in a fixed-width language the reverse of a large number can overflow.
4. **The insight: reverse only half.** Pop digits off the end of `x` onto `reversedHalf` until `reversedHalf >= x`. At that point I've processed half the digits, and the reversed half can never be larger than the original, so no overflow.
5. **Compare.** Even digit count: `x === reversedHalf` (`45 | 54` becomes 45 vs 45). Odd: the middle digit ended up on `reversedHalf`, so drop it with `floor(reversedHalf / 10)` (`30703` stops at x = 30, reversedHalf = 307).
6. **The trailing-zero trap.** If `x` ends in 0 and isn't 0, it can't be a palindrome (no number starts with 0). Without this check, `10` ends with x = 0 and reversedHalf = 1, and the odd-length comparison `floor(1 / 10) === 0` wrongly says yes. Reject those up front.
7. **Edge cases.** `0` and single digits are palindromes. Negatives and `x % 10 === 0` (except 0) are not.

## Solution
```ts
function isPalindrome(x: number): boolean {
  // Negatives fail, and so does anything ending in 0 except 0 itself.
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
  let reversedHalf = 0;
  while (x > reversedHalf) {
    reversedHalf = reversedHalf * 10 + (x % 10);
    x = Math.floor(x / 10);
  }
  // Even digit count: halves match. Odd: drop the middle digit from reversedHalf.
  return x === reversedHalf || x === Math.floor(reversedHalf / 10);
}
```

## Complexity
- **Time O(log n):** the loop handles half the decimal digits of n.
- **Space O(1):** two numbers.

## Pitfalls
- Skipping the trailing-zero check, so `10` comes back true.
- Forgetting the odd-length case and only comparing `x === reversedHalf`.
