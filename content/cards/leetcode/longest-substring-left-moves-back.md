---
title: "Longest substring: the left edge moves backwards"
module: leetcode
type: bug-hunt
source: "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
tags: ["sliding-window", "hash-map", "strings"]
stack: ["leetcode", "javascript"]
choices:
  - text: "`best` should be updated before `last.set`"
    why: "The order of those two lines doesn't affect the window size, so the result is the same."
  - text: "The window length should be `right - left`"
    why: "Both edges are inclusive, so `right - left + 1` is the right length. This would undercount every window."
  - text: "Clear the map whenever a repeat is found"
    why: "That forgets characters still inside the window, so a later repeat of one of them goes unnoticed."
  - text: "`left` must never move backwards: use `left = Math.max(left, last.get(c) + 1)`"
    correct: true
    why: "At the final `a`, its last position (0) is already outside the window, but the code jumps `left` back to 1 and counts `bba` as valid."
---

## Prompt

LeetCode 3. Longest Substring Without Repeating Characters: return the length of the longest run of characters with no repeats. This returns 3 for `"abba"` instead of 2. Why?

```js
function lengthOfLongestSubstring(s) {
  const last = new Map();
  let left = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    if (last.has(c)) left = last.get(c) + 1;
    last.set(c, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}
```

## Explanation

The map keeps every character's last index, including ones that have already left the window. A stale index must be ignored, which `Math.max` does. With the fix, each character is handled once: O(n) time, and O(alphabet) space for the map.
