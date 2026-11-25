---
number: 20
title: Valid Parentheses
difficulty: Easy
source: https://leetcode.com/problems/valid-parentheses/
patterns: [Stack matching]
structures: [Stack, Hash map]
time: O(n)
space: O(n)
stack: [leetcode, typescript]
---

## The problem
Given a string made only of the bracket characters `( ) [ ] { }`, decide whether it is balanced: every opener is closed by the same kind of bracket, and brackets close in the reverse order they were opened.

`"{[()]}()"` is valid. `"([)]"` is not, because `]` arrives while `(` is still open.

## Thinking it through
1. **Restate.** Every closing bracket must match the most recent opener that hasn't been closed yet.
2. **Why counting fails.** Keeping a counter per bracket type checks the totals but not the order: `"([)]"` has balanced counts and is still invalid.
3. **"Most recent unclosed" means last in, first out.** That is exactly what a **stack** gives: push each opener, and when a closer arrives, the top of the stack is the opener it must match.
4. **Data structure.** An array used as a stack (`push` and `pop` are O(1)), plus a small **hash map** from each closer to its opener so the match is one lookup, not a chain of `if`s.
5. **Algorithm.** Scan once. Opener: push. Closer: pop and compare with the expected opener; a mismatch, or an empty stack (`pop` returns `undefined`), means invalid.
6. **Finish.** After the scan, the stack must be empty. Leftover openers (`"(("`) mean something was never closed.
7. **Quick reject.** An odd-length string can never be balanced. It's an optional shortcut, not needed for correctness.
8. **Edge cases.** Empty string: valid. Starts with a closer (`")"`): invalid on the first character. `"]["`: the first `]` finds an empty stack.

## Solution
```ts
function isValid(s: string): boolean {
  const pairs: Record<string, string> = { ")": "(", "]": "[", "}": "{" };
  const stack: string[] = [];
  for (const ch of s) {
    if (ch in pairs) {
      // A closer must match the most recent unclosed opener.
      if (stack.pop() !== pairs[ch]) return false;
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}
```

## Complexity
- **Time:** O(n). One pass with O(1) work per character.
- **Space:** O(n). In the worst case (all openers) every character is on the stack.

## Pitfalls
- Returning `true` at the end without checking the stack is empty.
- Popping from an empty stack in a language that throws on it. In JavaScript `pop()` returns `undefined`, which the comparison already treats as a mismatch.
