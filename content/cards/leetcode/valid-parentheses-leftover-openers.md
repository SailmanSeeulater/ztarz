---
title: "Valid Parentheses accepts unclosed brackets"
module: leetcode
type: bug-hunt
source: "https://leetcode.com/problems/valid-parentheses/"
tags: ["stack", "strings"]
stack: ["leetcode", "javascript"]
choices:
  - text: "`stack.pop()` on an empty stack throws"
    why: "In JavaScript it returns `undefined`, which fails the comparison, so `)(` is correctly rejected."
  - text: "It should `return stack.length === 0`: openers left on the stack were never closed"
    correct: true
    why: "Every closer matched, but one `(` is still waiting. Valid means every opener is closed too."
  - text: "`ch in pairs` also matches inherited keys such as `toString`"
    why: "True of `in` in general, but the input is single characters, and no inherited property has a one-character name."
  - text: "It needs a queue so brackets close in the order they opened"
    why: "Brackets close in reverse order: the most recent opener must close first. That's last in, first out, a stack."
---

## Prompt

LeetCode 20. Valid Parentheses: decide whether a string of `()[]{}` is properly opened, closed and nested. This returns `true` for `"(()"`. What's wrong?

```js
function isValid(s) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const stack = [];
  for (const ch of s) {
    if (ch in pairs) {
      if (stack.pop() !== pairs[ch]) return false;
    } else {
      stack.push(ch);
    }
  }
  return true;
}
```

## Explanation

Push openers; on a closer, pop and check it matches. There are two ways to fail: a closer that doesn't match (or finds the stack empty), and openers still on the stack at the end. O(n) time, O(n) space. A quick extra check: an odd-length string can never be valid.
