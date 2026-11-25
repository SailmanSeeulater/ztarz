---
title: "Fast and slow pointers for a cycle"
module: leetcode
type: concept
source: "https://en.wikipedia.org/wiki/Cycle_detection#Floyd's_tortoise_and_hare"
tags: ["linked-list", "fast-slow-pointers", "cycle-detection"]
stack: ["leetcode"]
---

## Prompt

LeetCode 141. Linked List Cycle asks whether a list loops back on itself. How do fast and slow pointers detect that in O(1) extra memory, why must they meet, and how do you then find the node where the cycle starts (LeetCode 142)?

## Answer

Move `slow` one step and `fast` two steps at a time. With no cycle, `fast` reaches `null`. With a cycle, once both are inside it, the gap between them shrinks by one node per step, so `fast` can't jump over `slow`; they meet within one lap. O(n) time and O(1) space, where a `Set` of visited nodes would need O(n) memory.

To find the start: after they meet, put one pointer back at the head and move both one step at a time. They meet again at the first node of the cycle.

```js
let slow = head, fast = head;
while (fast && fast.next) {
  slow = slow.next;
  fast = fast.next.next;
  if (slow === fast) return true;
}
return false;
```

The same idea finds the middle of a list: when `fast` reaches the end, `slow` is halfway.
