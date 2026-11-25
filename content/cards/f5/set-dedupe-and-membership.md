---
title: "Set for de-duplication and membership"
module: f5
type: what-prints
source: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set"
tags: ["data-structures", "javascript", "set"]
stack: ["javascript"]
---

## Prompt

What prints?

```js
const tags = ["js", "db", "js", "JS", "db"];
const unique = new Set(tags);
console.log(unique.size);
console.log([...unique]);
console.log(unique.has("Js"));

const s = new Set([{ id: 1 }, { id: 1 }]);
console.log(s.size);
```

## Answer

```text
3
["js", "db", "JS"]
false
2
```

## Explanation

A `Set` keeps each value once, in the order first inserted, and compares values like `===` (except that `NaN` equals `NaN`). So `"JS"` and `"Js"` differ from `"js"`, and two object literals are two different objects. `has` is sublinear on average, which makes it faster than `array.includes` for repeated membership checks. To de-duplicate objects by a field, use a `Map` keyed by that field.
