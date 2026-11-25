---
number: 19
title: Remove Nth Node From End of List
difficulty: Medium
source: https://leetcode.com/problems/remove-nth-node-from-end-of-list/
patterns: [Two pointers with a gap, Dummy head]
structures: [Linked list]
time: O(L)
space: O(1)
stack: [leetcode, typescript]
---

## The problem
Given the head of a singly linked list and a number `n`, delete the node that is `n` places from the end and return the head of the updated list. `n` is always between 1 and the list's length.

For `10 → 20 → 30 → 40` with `n = 2`, remove 30 and return `10 → 20 → 40`.

## Thinking it through
1. **Restate.** Removing a node in a singly linked list means changing the `next` of the node *before* it. So I really need the node `n + 1` from the end.
2. **Two-pass approach.** Walk once to count the length `L`, then walk `L - n` steps to reach the node before the target and unlink it. O(L) time, O(1) space, and perfectly acceptable.
3. **Can I do it in one pass?** The interviewer often asks this. The trouble is I don't know where the end is until I reach it.
4. **The insight: a fixed gap.** Start two pointers together and move `fast` ahead first. If `fast` is `n + 1` nodes ahead of `slow`, then when `fast` falls off the end (`null`), `slow` is exactly on the node before the target.
5. **Dummy head.** If the target is the head itself (`n = L`), there is no "node before" it. A **dummy node** placed in front of the head gives every real node a predecessor, so the same unlink code works, and I return `dummy.next`.
6. **Pattern.** This is **two pointers with a gap** (a cousin of fast/slow pointers): both move at the same speed, but one starts ahead, so their distance encodes "n from the end".
7. **Walk through.** Dummy → 10 → 20 → 30 → 40, n = 2. Move `fast` 3 steps to 30. Then step both until `fast` is null: `fast` goes 40, null; `slow` goes 10, 20. Set `20.next = 40`.
8. **Edge cases.** One node with `n = 1`: the result is `null`. Removing the last node (`n = 1`): `slow` stops on the second-to-last node.

## Solution
```ts
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  const dummy = new ListNode(0, head); // gives the head a predecessor
  let fast: ListNode | null = dummy;
  let slow: ListNode = dummy;
  // Open a gap of n + 1 nodes between fast and slow.
  for (let i = 0; i <= n; i++) fast = fast!.next;
  while (fast !== null) {
    fast = fast.next;
    slow = slow.next!;
  }
  slow.next = slow.next!.next; // unlink the target
  return dummy.next;
}
```

## Complexity
- **Time:** O(L), where L is the list length. `fast` visits each node once.
- **Space:** O(1). Two pointers and one dummy node.

## Pitfalls
- Opening a gap of `n` instead of `n + 1`, which leaves `slow` on the target rather than before it.
- Returning `head` instead of `dummy.next`. When the head is removed, `head` still points at the deleted node.
