---
title: "Jump Game in 60 seconds"
module: leetcode
type: out-loud
source: "https://leetcode.com/problems/jump-game/"
tags: ["greedy", "arrays"]
stack: ["leetcode"]
---

## Prompt

LeetCode 55. Jump Game: each number in an array is the furthest you can jump forward from that position. Starting at index 0, can you reach the last index? Explain your approach in a minute.

## Model answer

Greedy, tracking the furthest index I can reach so far.

I scan left to right. If the current index is beyond `furthest`, I'm stuck and return false. Otherwise I update `furthest = max(furthest, i + nums[i])`, and as soon as it reaches the last index I return true.

It's safe because a jump can be any length up to the number, so the reachable positions always form one unbroken stretch from 0 to `furthest`. I never need to remember which jumps got me there.

O(n) time, O(1) space. A DP that marks each index reachable or not also works, but costs O(n²). For the follow-up, Jump Game II (LeetCode 45, fewest jumps), I'd use the same scan in layers, like BFS: count a jump each time I pass the end of the current reach.
