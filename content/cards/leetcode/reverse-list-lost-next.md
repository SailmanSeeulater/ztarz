---
title: "Reverse Linked List loses the rest of the list"
module: leetcode
type: what-prints
source: "https://leetcode.com/problems/reverse-linked-list/"
tags: ["linked-list", "pointers"]
stack: ["leetcode", "javascript"]
---

## Prompt

LeetCode 206. Reverse Linked List: reverse a singly linked list and return the new head. What does this print?

```js
function reverse(head) {
  let prev = null, curr = head;
  while (curr) {
    curr.next = prev;
    prev = curr;
    curr = curr.next;
  }
  return prev;
}
const list = { val: 1, next: { val: 2, next: { val: 3, next: null } } };
let node = reverse(list);
const out = [];
while (node) { out.push(node.val); node = node.next; }
console.log(out);
```

## Answer

`[ 1 ]`

## Explanation

`curr.next = prev` overwrites the only link to node 2, so `curr = curr.next` moves to `null` and the loop stops after one node. Save the next node before rewiring:

```js
const next = curr.next;
curr.next = prev;
prev = curr;
curr = next;
```

O(n) time, O(1) space. Draw three boxes and the arrows when you explain it; it's the easiest way to show the order of the four lines.
