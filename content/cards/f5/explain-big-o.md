---
title: "Big-O for a non-engineer"
module: f5
type: out-loud
source: "https://en.wikipedia.org/wiki/Big_O_notation#Common_big-O_orders_of_functions"
tags: ["big-o", "communication"]
---

## Prompt

Explain Big-O to a non-engineer in about 60 seconds.

## Model answer

Big-O describes how the work grows as the input grows. It's not a stopwatch time; it's the shape of the curve. Think of finding a name in a paper phone book:

- **O(1):** opening it at a bookmark. Same effort however thick the book.
- **O(log n):** open in the middle, keep the half with the name, repeat. Doubling the book adds just one step.
- **O(n):** reading every name from the start. Double the book, double the time.
- **O(n²):** checking every name against every other name for duplicates. Double the book, four times the work.

We ignore constant factors and small terms because at large sizes the shape wins: a linear approach on a slow machine eventually beats a quadratic one on a fast machine. It matters because code that's fine with 100 rows in testing can fall over with a million in production.
