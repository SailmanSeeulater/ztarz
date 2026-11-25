---
title: "Memoisation vs tabulation"
module: f5
type: what-prints
source: "https://en.wikipedia.org/wiki/Dynamic_programming#Computer_science"
tags: ["algorithms", "dynamic-programming", "memoisation", "recursion"]
stack: ["javascript"]
---

## Prompt

What prints?

```js
let calls = 0;
function fib(n) {
  calls++;
  return n < 2 ? n : fib(n - 1) + fib(n - 2);
}
fib(20);
console.log(calls);

calls = 0;
const memo = new Map();
function fibMemo(n) {
  calls++;
  if (n < 2) return n;
  if (memo.has(n)) return memo.get(n);
  const value = fibMemo(n - 1) + fibMemo(n - 2);
  memo.set(n, value);
  return value;
}
fibMemo(20);
console.log(calls);
```

## Answer

```text
21891
39
```

## Explanation

Plain recursion recomputes the same subproblems over and over (`fib(18)` is computed twice, `fib(17)` three times, and so on), so the call count grows exponentially. Memoisation caches each result the first time it's computed: every `n` is solved once, and each later call is a cache hit. That makes it O(n) time and O(n) space, plus O(n) recursion depth.

That's **top-down** dynamic programming. **Tabulation** is bottom-up: fill in answers from the smallest case upwards in a loop, with no recursion. When each step only needs the previous few, you can keep just those:

```js
function fibTab(n) {
  let [a, b] = [0, 1];
  for (let i = 0; i < n; i++) [a, b] = [b, a + b];
  return a;
}
```

Same O(n) time, O(1) space, and no risk of a stack overflow. Memoisation is quicker to write from a recursive definition and only solves the subproblems you actually reach; tabulation needs you to work out the order but is usually leaner.
