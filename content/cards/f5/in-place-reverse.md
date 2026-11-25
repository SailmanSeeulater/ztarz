---
title: "Space complexity and in-place algorithms"
module: f5
type: mcq
source: "https://en.wikipedia.org/wiki/In-place_algorithm"
tags: ["algorithms", "big-o", "space-complexity", "arrays"]
stack: ["javascript"]
choices:
  - text: "A, because spreading and reversing is a single expression"
    why: "Short code isn't small memory. The spread builds a full copy of the array: O(n) extra space."
  - text: "B, because it only swaps pairs inside the array it was given"
    correct: true
    why: "It uses two indices and one temporary, whatever the array's length: O(1) auxiliary space. That's what in-place means."
  - text: "C, because it never creates a new array"
    why: "It doesn't, but each recursive call adds a stack frame and there are n/2 of them, so it uses O(n) space on the call stack. Recursion depth counts towards space."
  - text: "All three are O(1), since space complexity only counts the input"
    why: "Space complexity here means extra memory beyond the input, and copies and call frames both count."
---

## Prompt

Which of these reverses `arr` using O(1) extra space?

```js
// A
const reversed = [...arr].reverse();

// B
for (let i = 0, j = arr.length - 1; i < j; i++, j--) {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

// C
function rev(a, i = 0, j = a.length - 1) {
  if (i >= j) return;
  [a[i], a[j]] = [a[j], a[i]];
  rev(a, i + 1, j - 1);
}
rev(arr);
```
