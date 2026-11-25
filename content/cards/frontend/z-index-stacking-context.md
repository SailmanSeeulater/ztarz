---
title: "z-index: 9999 and still underneath"
module: frontend
type: bug-hunt
source: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Positioned_layout/Stacking_context"
tags: ["css", "z-index", "stacking-context"]
stack: ["css"]
choices:
  - text: "`position: fixed` elements ignore `z-index`"
    why: "Fixed elements honour `z-index`; a fixed element even creates its own stacking context."
  - text: "`.page` creates a stacking context at `z-index: 1`. The modal's 9999 only counts inside it, so the whole page, modal included, sits under the header's 10"
    correct: true
    why: "`z-index` only compares siblings within the same stacking context. Render the modal as a direct child of `<body>` (a portal), or drop the `z-index` on `.page`."
  - text: "Browsers cap `z-index` at 999"
    why: "There's no such cap. Raising the number further changes nothing here."
  - text: "The header rule needs `!important` removed; it beats the modal on specificity"
    why: "Specificity decides which declaration applies, not painting order. Both values apply as written."
---

## Prompt

The modal shows under the sticky header. Why?

```html
<header class="site-header">...</header>
<main class="page">
  <div class="modal">...</div>
</main>
```

```css
.site-header { position: sticky; top: 0; z-index: 10; }
.page        { position: relative; z-index: 1; }
.modal       { position: fixed; inset: 0; z-index: 9999; }
```

## Explanation

A stacking context is painted as one unit inside its parent. Besides positioned elements with a `z-index`, `opacity` below 1, `transform`, `filter` and a few other properties also create one, which is how this bug usually sneaks in.
