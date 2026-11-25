---
title: "A resize loop that janks"
module: frontend
type: bug-hunt
source: "https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing"
tags: ["performance", "rendering", "dom"]
stack: ["javascript"]
choices:
  - text: "The browser repaints the screen after every `style.width` assignment"
    why: "Paint waits for the end of the frame. The cost here is layout being forced early, over and over."
  - text: "`for...of` is slow; use `forEach`"
    why: "The loop style makes no measurable difference. The work inside it does."
  - text: "Each iteration reads `offsetWidth` right after a style write, forcing a synchronous layout every time. Read it once before the loop"
    correct: true
    why: "Reading geometry after a write makes the browser lay out the page immediately to give an accurate answer. Batch reads, then writes."
  - text: "Setting `style.width` directly is slow; toggle a class instead"
    why: "A class still changes width and still invalidates layout. It's the read-after-write pattern that hurts."
---

## Prompt

With 500 boxes, this freezes the page for a moment. Why?

```js
for (const box of boxes) {
  box.style.width = container.offsetWidth / 2 + "px";
}
```

## Explanation

This is layout thrashing: write, read, write, read. Fix:

```js
const half = container.offsetWidth / 2;
for (const box of boxes) box.style.width = half + "px";
```

The Performance panel in DevTools flags these as forced reflows.
