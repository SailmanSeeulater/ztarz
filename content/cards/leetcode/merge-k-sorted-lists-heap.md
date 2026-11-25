---
title: "Merge k Sorted Lists in 60 seconds"
module: leetcode
type: out-loud
source: "https://en.wikipedia.org/wiki/K-way_merge_algorithm"
tags: ["heap", "priority-queue", "linked-list", "divide-and-conquer"]
stack: ["leetcode"]
---

## Prompt

LeetCode 23. Merge k Sorted Lists: combine k sorted linked lists into one sorted list. Explain your approach and its cost in a minute.

## Model answer

Let N be the total number of nodes. The naive way merges the lists one after another, and the growing result gets re-walked each time: O(N · k).

Better: a min-heap holding the current head of each list. Pop the smallest, append it to the result, and push that node's `next` if there is one. The heap never holds more than k nodes and every node goes in and out once, so it's O(N log k) time and O(k) extra space. A dummy head node keeps the appending simple.

JavaScript has no built-in heap, so I'd say that up front and either write a small one or use divide and conquer instead: merge the lists in pairs, then merge the results in pairs, for log k rounds of O(N) work each. Same O(N log k), and it reuses the two-list merge from LeetCode 21.

Edge cases: k = 0, and empty lists in the input, which I skip when filling the heap.
