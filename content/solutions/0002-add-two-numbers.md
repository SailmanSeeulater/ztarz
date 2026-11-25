---
number: 2
title: Add Two Numbers
difficulty: Medium
source: https://leetcode.com/problems/add-two-numbers/
patterns: [Linked list traversal, Carry propagation, Dummy head]
structures: [Linked list]
time: O(max(m, n))
space: O(max(m, n))
stack: [leetcode, typescript]
---

## The problem
Two non-negative numbers are stored as linked lists, one digit per node, with the ones digit first. Return their sum as a list in the same format. For 27 + 65, the lists are `7 -> 2` and `5 -> 6`, and the answer is `2 -> 9` (92).

## Thinking it through
1. **Restate.** Digits arrive least significant first, which is exactly the order you add in by hand. That is the gift in this problem.
2. **Tempting shortcut.** Convert both lists to numbers, add, convert back. It breaks once the lists are long: a 30-digit number is beyond `Number.MAX_SAFE_INTEGER`. Avoid it.
3. **Do column addition.** Walk both lists together. At each step add the two digits plus the carry, write `sum % 10`, and carry `Math.floor(sum / 10)`, which is 0 or 1.
4. **Uneven lengths.** When one list runs out, treat its digit as 0. One loop handles every shape: `while (l1 || l2 || carry)`.
5. **The final carry.** 999 + 1 needs a new node at the end. Keeping `carry` in the loop condition makes that automatic.
6. **Building the output.** Use a dummy head node so the first digit isn't a special case; keep a `tail` pointer and return `dummy.next`.
7. **Edge cases.** `0 + 0` gives a single `0`. `5 + 5` gives `0 -> 1`.

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

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode();
  let tail = dummy;
  let carry = 0;
  while (l1 || l2 || carry) {
    const sum = (l1?.val ?? 0) + (l2?.val ?? 0) + carry;
    carry = Math.floor(sum / 10);
    tail.next = new ListNode(sum % 10);
    tail = tail.next;
    l1 = l1?.next ?? null;
    l2 = l2?.next ?? null;
  }
  return dummy.next;
}
```

## Complexity
- **Time O(max(m, n)):** one step per digit of the longer list, plus at most one for the final carry.
- **Space O(max(m, n)):** the result list; the working space beyond it is O(1).

## Pitfalls
- Converting to numbers and back overflows on long inputs.
- Dropping the last carry, so 5 + 5 returns `0` instead of `0 -> 1`.
- Stopping when the shorter list ends.
