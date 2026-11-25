---
title: "Container With Most Water: which pointer moves"
module: leetcode
type: mcq
source: "https://leetcode.com/problems/container-with-most-water/"
tags: ["two-pointers", "greedy"]
stack: ["leetcode"]
choices:
  - text: "The taller one, to look for an even taller line"
    why: "The area is capped by the shorter line. Moving the taller one only shrinks the width, so the area can't go up."
  - text: "Both at once, to finish in half the steps"
    why: "That skips pairs that were never ruled out, so it can miss the best one."
  - text: "The shorter one: every narrower pair that keeps it is no better, so it can be dropped"
    correct: true
    why: "Any pair using the shorter line with a smaller width has area at most the one just measured. Discarding it is safe, and the scan is O(n) time, O(1) space."
  - text: "Whichever side has the smaller next neighbour"
    why: "A heuristic with no proof behind it. It can throw away a line that belongs to the best pair."
---

## Prompt

LeetCode 11. Container With Most Water: given the heights of vertical lines, pick two that hold the most water (width between them times the shorter height). You start with pointers at both ends and record the area. Which pointer do you move next?
