---
number: 5
title: Longest Palindromic Substring
difficulty: Medium
source: https://leetcode.com/problems/longest-palindromic-substring/
patterns: [Expand around centre, Two pointers]
structures: [String]
time: O(n²)
space: O(1)
stack: [leetcode, typescript]
---

## The problem
Given a string, return the longest contiguous piece of it that reads the same forwards and backwards. In `"tracecars"` the answer is `"racecar"`; in `"cabbad"` it is `"abba"`.

## Thinking it through
1. **Restate.** Contiguous substring, same both ways. If several tie, any one will do.
2. **Brute force.** Check every substring, O(n²) of them, and test each in O(n): O(n³) in total.
3. **What is wasted?** Testing each substring from scratch. A palindrome is built from the middle out: if `s[i..j]` is a palindrome and `s[i-1] === s[j+1]`, the wider one is too.
4. **Option A, DP table.** `dp[i][j]` is true when `s[i] === s[j]` and `dp[i+1][j-1]` is true. O(n²) time but also O(n²) memory.
5. **Option B, expand around centre.** Same O(n²) time, O(1) memory. Every palindrome has a centre. Pick each one and push two pointers outwards while the characters match.
6. **Two kinds of centre.** Odd-length palindromes centre on a character (`"racecar"` on `e`); even-length ones centre between two (`"abba"` between the `b`s). So there are 2n - 1 centres; try `expand(c, c)` and `expand(c, c + 1)` for each `c`.
7. **Measuring.** The loop stops one step past the palindrome on each side, so its length is `hi - lo - 1` and it starts at `lo + 1`. Track the best start and length and slice once at the end.
8. **Edge cases.** Empty and one-character strings return themselves. With no repeats, any single character is the answer.
9. **Beyond.** Manacher's algorithm does this in O(n), but expand-around-centre is the expected interview answer.

## Solution
```ts
function longestPalindrome(s: string): string {
  if (s.length < 2) return s;
  let start = 0;
  let maxLen = 1;

  const expand = (lo: number, hi: number) => {
    while (lo >= 0 && hi < s.length && s[lo] === s[hi]) {
      lo--;
      hi++;
    }
    const len = hi - lo - 1; // the loop overshoots by one on each side
    if (len > maxLen) {
      maxLen = len;
      start = lo + 1;
    }
  };

  for (let c = 0; c < s.length; c++) {
    expand(c, c);     // odd length: centre on a character
    expand(c, c + 1); // even length: centre between two characters
  }
  return s.slice(start, start + maxLen);
}
```

## Complexity
- **Time O(n²):** 2n - 1 centres, each expanding up to O(n).
- **Space O(1):** just indices; the substring is sliced once at the end.

## Pitfalls
- Only trying odd centres, which misses `"abba"`.
- Off-by-one in the length after the loop overshoots.
- Slicing a new string on every improvement instead of storing indices.
