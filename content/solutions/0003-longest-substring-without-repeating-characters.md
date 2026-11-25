---
number: 3
title: Longest Substring Without Repeating Characters
difficulty: Medium
source: https://leetcode.com/problems/longest-substring-without-repeating-characters/
patterns: [Sliding window, Two pointers]
structures: [String, Hash map]
time: O(n)
space: O(k)
stack: [leetcode, typescript]
---

## The problem
Given a string, find the length of the longest run of consecutive characters in which no character appears twice. In `"tmmzuxt"` the answer is 5, from `"mzuxt"`.

## Thinking it through
1. **Restate.** Substring means contiguous. I want the longest window `s[left..right]` whose characters are all distinct.
2. **Brute force.** Check every substring and test it for duplicates with a set. That is O(n²) substrings, each up to O(n) to check: O(n³). Growing each start until the first repeat brings it to O(n²).
3. **What is wasted?** If `s[left..right]` has no repeats, every window inside it is also clean. When I hit a repeat, restarting from `left + 1` re-checks characters I've already proved distinct.
4. **The pattern.** A sliding window with two pointers. `right` moves forward one character at a time; `left` only ever moves forward too. Each character enters and leaves the window at most once.
5. **What the window needs to know.** Whether the new character is already inside it, and where. A hash map from character to its last index answers both.
6. **Shrinking in one jump.** If `s[right]` was last seen at `prev` and `prev >= left`, the duplicate is inside the window, so jump `left` to `prev + 1`. If `prev < left`, that old occurrence is already outside; ignore it. Forgetting this check breaks `"abba"`.
7. **Record.** After updating, the window length is `right - left + 1`; keep the maximum.
8. **Edge cases.** Empty string gives 0, one character gives 1, `"gggg"` gives 1. Spaces and punctuation count as characters.

## Solution
```ts
function lengthOfLongestSubstring(s: string): number {
  const lastSeen = new Map<string, number>(); // char -> last index
  let left = 0;
  let best = 0;
  for (let right = 0; right < s.length; right++) {
    const prev = lastSeen.get(s[right]);
    if (prev !== undefined && prev >= left) left = prev + 1; // jump past the duplicate
    lastSeen.set(s[right], right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}
```

## Complexity
- **Time O(n):** `right` visits each character once and `left` never moves backwards.
- **Space O(k):** the map holds at most one entry per distinct character, where k is the alphabet size.

## Pitfalls
- Moving `left` to `prev + 1` without checking `prev >= left`, which can move it backwards (`"abba"` returns 3 instead of 2).
- Counting the answer before updating `left`.
