---
number: 14
title: Longest Common Prefix
difficulty: Easy
source: https://leetcode.com/problems/longest-common-prefix/
patterns: [Vertical scanning]
structures: [Array, String]
time: O(n * m)
space: O(1)
stack: [leetcode, typescript]
---

## The problem
Given a list of strings, return the longest starting substring that every one of them shares. If they share nothing, return an empty string.

For `["carpet", "carton", "cargo"]` the answer is `"car"`. For `["dog", "cat"]` it is `""`.

## Thinking it through
1. **Restate.** Find the largest `k` such that the first `k` characters are identical in all strings.
2. **Small example.** Compare column by column: c, c, c match; a, a, a match; r, r, r match; then p, t, g differ. Stop: `"car"`.
3. **Horizontal option.** Take the first string as the prefix, then trim it against each other string in turn. Fine, but it can do extra work when the first strings share a long prefix and a later one shares almost none.
4. **Vertical scanning.** Check one column at a time across all strings. Stop at the first column where any string differs or has run out. This stops as early as possible and never looks past the answer.
5. **Data structure.** None beyond the input. I use the first string as the reference and index into the others.
6. **Why the first string is enough.** The prefix can't be longer than any string, including the first, so iterating over its characters covers every candidate column.
7. **Edge cases.** One string: the whole string is the prefix. An empty string anywhere: the answer is `""`. A shorter string that is itself a prefix of the rest (`["abc", "ab"]`): stop when it runs out, answer `"ab"`.
8. **Return.** If the loop finishes without a mismatch, the whole first string is the prefix.

## Solution
```ts
function longestCommonPrefix(strs: string[]): string {
  const first = strs[0];
  for (let i = 0; i < first.length; i++) {
    const ch = first[i];
    for (let j = 1; j < strs.length; j++) {
      // Stop when another string runs out or disagrees at this column.
      if (i === strs[j].length || strs[j][i] !== ch) return first.slice(0, i);
    }
  }
  return first;
}
```

## Complexity
- **Time:** O(n * m), where n is the number of strings and m the length of the shortest one. In the worst case every character of the prefix is checked in every string.
- **Space:** O(1) extra, apart from the returned slice.

## Pitfalls
- Forgetting the length check, so a shorter string yields `undefined` at index `i`, which happens to differ but hides the real reason.
- Sorting first and comparing only the first and last strings works too, but costs O(n log n) comparisons for no gain here.
