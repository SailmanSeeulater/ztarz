---
title: "The stray 0 on the screen"
module: frontend
type: what-prints
source: "https://react.dev/learn/conditional-rendering"
tags: ["react", "jsx", "conditional-rendering"]
---

## Prompt

With `count === 0`, what does this render?

```jsx
{count && <Badge count={count} />}
```

## Answer

A literal `0`.

## Explanation

`0 && x` evaluates to `0`, and React renders numbers. Make the left side a real boolean:

```jsx
{count > 0 && <Badge count={count} />}
```
