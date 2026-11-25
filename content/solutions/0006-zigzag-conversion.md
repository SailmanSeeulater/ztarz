---
number: 6
title: Zigzag Conversion
difficulty: Medium
source: https://leetcode.com/problems/zigzag-conversion/
patterns: [Simulation, Direction flag]
structures: [String, Array]
time: O(n)
space: O(n)
stack: [leetcode, typescript]
---

## The problem
Write a string down a set of rows in a zigzag: down the first column, then diagonally back up, then down again. Then read the rows left to right, top to bottom, and return that string. `"WATERFALLS"` on 3 rows becomes `"WRLAEFLSTA"`:

```
W   R   L
A E F L S
T   A
```

## Thinking it through
1. **Restate.** Only the order characters land in each row matters. The gaps in the drawing are a distraction.
2. **Literal approach.** Build a 2D grid and fill it cell by cell, then read it row by row. It works, but most cells are empty and the column maths is fiddly.
3. **The insight.** Walking the zigzag, the row index goes 0, 1, 2, ..., numRows-1, then back down to 0, and repeats. I only need the current row and a direction.
4. **Data structure.** One string (or array of characters) per row. Append each character to the current row, flip direction at the top and bottom, and step.
5. **Join.** Concatenate the rows in order.
6. **Edge cases.** With one row there is no zigzag, and the direction flip would get stuck, so return the input. If `numRows >= s.length`, every character sits in its own row, so the answer is also the input. Empty string returns empty.
7. **Alternative.** There is a closed form: characters in row r sit at positions spaced `2 * (numRows - 1)` apart, with one extra in the middle rows. Same O(n), harder to get right under pressure.

## Solution
```ts
function convert(s: string, numRows: number): string {
  if (numRows === 1 || numRows >= s.length) return s;
  const rows: string[] = Array(numRows).fill("");
  let row = 0;
  let step = 1; // +1 going down, -1 going up
  for (const ch of s) {
    rows[row] += ch;
    if (row === 0) step = 1;
    else if (row === numRows - 1) step = -1;
    row += step;
  }
  return rows.join("");
}
```

## Complexity
- **Time O(n):** each character is appended once, then everything is joined once.
- **Space O(n):** the row buffers together hold every character.

## Pitfalls
- Not special-casing one row, so `step` flips every character and the row index goes negative.
- Allocating a full grid when a list of rows is enough.
