---
title: "Flexbox vs grid"
module: frontend
type: comparison
source: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Relationship_with_other_layout_methods"
tags: ["css", "layout", "flexbox", "grid"]
stack: ["css"]
---

## What it is

- **Flexbox:** a one-dimensional layout: items flow along a row or a column.
- **Grid:** a two-dimensional layout: you define rows and columns at the same time and place items in them.

## How it models the problem

- **Flexbox:** works from the content out. Items have a size, then `flex-grow`, `flex-shrink` and `flex-basis` share out the spare space along one line. With `flex-wrap`, each new line is laid out on its own, so items don't line up with the line above.
- **Grid:** works from the layout in. The container defines tracks (`grid-template-columns: repeat(3, 1fr)`), and items drop into cells that line up in both directions.

## Where it shines

- **Flexbox:** toolbars, nav bars, button groups, a row of tags, centring one thing, "push this item to the end" with `margin-left: auto`.
- **Grid:** page layouts, card galleries where every row must line up, forms with aligned labels, overlapping items in the same cell. `repeat(auto-fill, minmax(16rem, 1fr))` gives a responsive gallery with no media queries.

## Where it bites

- **Flexbox:** wrapped items in a gallery end up with odd widths on the last row, and you start fighting it with calc and fixed widths. That's the sign you wanted grid.
- **Grid:** overkill for a single row of unknown-width items, and the track syntax takes longer to read. They combine well: grid for the page, flexbox inside each component.

## What interviewers ask

- When would you choose grid over flexbox? (When you need control of rows and columns at once.)
- How do you centre an element? (`display: grid; place-items: center`, or flex with `justify-content` and `align-items`.)
- What does `1fr` mean? (One share of the free space in the grid container.)
