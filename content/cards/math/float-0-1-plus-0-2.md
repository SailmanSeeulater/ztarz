---
title: "Why 0.1 + 0.2 isn't 0.3"
module: math
type: what-prints
source: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON"
tags: ["floating-point", "javascript"]
stack: ["javascript"]
---

## Prompt

What prints?

```js
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);
console.log(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON);
```

## Answer

```text
0.30000000000000004
false
true
```

## Explanation

Numbers are binary floating point. 0.1 has no exact binary form, just as 1/3 has no exact decimal form, so the stored values are slightly off and the error shows after adding. Compare floats with a tolerance, not `===`. MDN warns that `Number.EPSILON` only suits values near 1; pick a tolerance that fits the magnitude. For money, store integer pence or cents.
