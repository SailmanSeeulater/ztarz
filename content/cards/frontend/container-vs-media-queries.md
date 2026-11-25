---
title: "A card that adapts to its own width"
module: frontend
type: mcq
source: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries"
tags: ["css", "responsive"]
stack: ["css"]
choices:
  - text: "A media query on `min-width`"
    why: "Media queries look at the viewport, which is the same for both copies of the card."
  - text: "`container-type: inline-size` on the wrapper, then `@container (min-width: 30rem)` for the card"
    correct: true
    why: "A container query reads the nearest ancestor that is a query container, so each card responds to the space it actually has."
  - text: "`flex-wrap: wrap` on the card's children"
    why: "Wrapping helps, but you can't switch to a different layout or hide parts at a chosen width."
  - text: "`clamp()` on the card's font size"
    why: "That scales values smoothly. It can't change the card's structure."
---

## Prompt

The same card component sits in a wide main column and a narrow sidebar on one page. You want it to switch from stacked to side-by-side based on how wide the card itself is. What do you reach for?
