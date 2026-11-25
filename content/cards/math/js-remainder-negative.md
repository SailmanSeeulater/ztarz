---
title: "% with negative numbers in JavaScript"
module: math
type: what-prints
source: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder"
tags: ["modular-arithmetic", "javascript"]
stack: ["javascript"]
---

## Prompt

You step backwards through a 3-slide carousel. What prints?

```js
const n = 3;
let i = 0;
i = i - 7;
console.log(i % n);
console.log(((i % n) + n) % n);
```

## Answer

```text
-1
2
```

## Explanation

JavaScript's `%` is a remainder, not a modulo: the result takes the sign of the dividend, so `-7 % 3` is `-1`, which is not a valid index. Modular ("clock") arithmetic wants a result in `0..n-1`. MDN's fix is `((i % n) + n) % n`, which shifts a negative remainder back into range. Python's `%` already behaves like this (`-7 % 3 == 2`), which catches people moving between the two.
