---
title: "Character replacement: the window rule"
module: leetcode
type: concept
source: "https://leetcode.com/problems/longest-repeating-character-replacement/"
tags: ["sliding-window", "strings", "counting"]
stack: ["leetcode"]
---

## Prompt

LeetCode 424. Longest Repeating Character Replacement: in an uppercase string, you may change up to k characters; find the longest substring you can turn into a single repeated letter. What condition keeps a sliding window valid, and why is it safe never to lower `maxFreq` when the left edge moves?

## Answer

A window is valid when `windowLength - maxFreq <= k`. `maxFreq` is the count of the most common letter in the window; everything else is what you'd replace.

Grow the right edge, update a 26-slot count and `maxFreq`. If the window breaks the rule, move the left edge one step and decrement that letter's count. The window never shrinks, it only slides.

`maxFreq` can go stale (too high) after the left edge moves, but that's harmless: the answer only grows when a window holds a letter more often than any earlier window did, and that count is real. A stale value can only keep the window at a size already achieved. O(n) time, O(1) space.
