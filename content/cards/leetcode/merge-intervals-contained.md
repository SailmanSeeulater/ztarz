---
title: "Merge Intervals shrinks a contained interval"
module: leetcode
type: bug-hunt
source: "https://leetcode.com/problems/merge-intervals/"
tags: ["intervals", "sorting"]
stack: ["leetcode", "javascript"]
choices:
  - text: "The overlap test should be `start < last[1]`"
    why: "That stops touching intervals like `[1, 4]` and `[4, 5]` from merging. It doesn't explain the output."
  - text: "The new end should be `Math.max(last[1], end)`, because an interval inside the last one must not shrink it"
    correct: true
    why: "`[2, 4]` sits inside `[1, 10]`, and plain assignment cuts the end to 4. After that, `[6, 8]` looks separate."
  - text: "Sort by end time instead of start time"
    why: "Sorting by start is what puts overlapping intervals next to each other. Sorting by end breaks that."
  - text: "`out` starts with a reference to `intervals[0]`, which corrupts the result"
    why: "It does mutate the caller's array, a fair side effect to mention, but the output would be the same with a copy."
---

## Prompt

LeetCode 56. Merge Intervals: combine all overlapping intervals and return the result. `merge([[1, 10], [2, 4], [6, 8]])` returns `[[1,4],[6,8]]` instead of `[[1,10]]`. Why?

```js
function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const out = [intervals[0]];
  for (const [start, end] of intervals.slice(1)) {
    const last = out[out.length - 1];
    if (start <= last[1]) last[1] = end;
    else out.push([start, end]);
  }
  return out;
}
```

## Explanation

Sort by start (O(n log n)), then sweep once: each interval either overlaps the last merged one and may extend it, or starts a new one. Extending must take the larger end. Insert Interval and Non-overlapping Intervals use the same sort-then-sweep shape.
