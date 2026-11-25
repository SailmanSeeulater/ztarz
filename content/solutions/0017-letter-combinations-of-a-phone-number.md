---
number: 17
title: Letter Combinations of a Phone Number
difficulty: Medium
source: https://leetcode.com/problems/letter-combinations-of-a-phone-number/
patterns: [Backtracking]
structures: [String, Hash map, Recursion]
time: O(4ⁿ * n)
space: O(n) extra (ignoring output)
stack: [leetcode, typescript]
---

## The problem
On an old phone keypad, each digit from 2 to 9 maps to three or four letters (2 is abc, 7 is pqrs, 9 is wxyz). Given a string of those digits, return every word you could spell by picking one letter per digit, in any order. An empty input gives an empty list.

For `"79"` there are 4 × 4 = 16 words, starting `"pw"`, `"px"`, `"py"`, `"pz"`, `"qw"`.

## Thinking it through
1. **Restate.** Build the Cartesian product of the letter groups, one group per digit, keeping digit order.
2. **Why not nested loops.** One loop per digit works for a fixed length, but the input length varies, so I can't write a fixed number of loops.
3. **See it as a tree.** Level 0 picks a letter for the first digit, level 1 for the second, and so on. Every root-to-leaf path is one answer. Visiting every leaf of a tree is a depth-first search.
4. **Backtracking.** Keep a `path` of letters chosen so far. At depth `index`, try each letter for `digits[index]`: push it, recurse to `index + 1`, then pop it so the next letter starts from the same state. When `index` reaches the input length, the path is a full word.
5. **Data structure.** A **hash map** from digit to letters for O(1) lookups, and an array as the path, used like a **stack** (push on the way down, pop on the way back).
6. **Why push and pop instead of string concatenation.** Passing `path + letter` also works and is arguably simpler. The push and pop version shows the general backtracking template that carries over to subsets, permutations and N-Queens.
7. **Iterative alternative.** Start with `[""]` and, for each digit, replace the list with every existing word extended by each letter. Same output, a breadth-first build.
8. **Edge cases.** Empty input returns `[]`, not `[""]`; check that first. A single digit returns its letters.

## Solution
```ts
const KEYS: Record<string, string> = {
  "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
  "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz",
};

function letterCombinations(digits: string): string[] {
  if (digits.length === 0) return [];
  const result: string[] = [];
  const path: string[] = [];

  function backtrack(index: number): void {
    if (index === digits.length) {
      result.push(path.join(""));
      return;
    }
    for (const letter of KEYS[digits[index]]) {
      path.push(letter);   // choose
      backtrack(index + 1); // explore
      path.pop();          // un-choose
    }
  }

  backtrack(0);
  return result;
}
```

## Complexity
- **Time:** O(4ⁿ * n), where n is the number of digits. There are at most 4ⁿ words and building each one costs O(n).
- **Space:** O(n) for the recursion depth and the path, not counting the output.

## Pitfalls
- Returning `[""]` for empty input.
- Forgetting `path.pop()`, so letters pile up across branches.
