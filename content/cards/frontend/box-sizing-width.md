---
title: "How wide is the box?"
module: frontend
type: what-prints
source: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-sizing"
tags: ["css", "box-model"]
stack: ["css"]
---

## Prompt

How wide is `.box` on screen? Then, how wide is it after adding `box-sizing: border-box`?

```css
.box {
  width: 200px;
  padding: 20px;
  border: 2px solid;
}
```

## Answer

244px, then 200px.

## Explanation

The default, `content-box`, applies `width` to the content only, so padding and border are added: 200 + 2×20 + 2×2. With `border-box`, `width` includes padding and border, and the content shrinks to 156px. Many resets set `*, *::before, *::after { box-sizing: border-box; }` so widths mean what they say.
