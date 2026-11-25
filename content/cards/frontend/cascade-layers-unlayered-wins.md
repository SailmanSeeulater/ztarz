---
title: "Cascade layers vs specificity"
module: frontend
type: mcq
source: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Cascade_layers"
tags: ["css", "cascade", "specificity"]
stack: ["css"]
choices:
  - text: "Purple: `.btn.primary` has higher specificity"
    why: "Specificity only compares declarations in the same layer. Layer order is checked first."
  - text: "Purple: `components` is the last layer declared, so it wins"
    why: "It beats `base`, but unlayered styles come after every named layer."
  - text: "Grey: unlayered styles beat every layer, whatever the specificity"
    correct: true
    why: "For normal declarations the order is first layer to last, then unlayered. It flips for `!important`, where layered styles win."
  - text: "Grey: the rule written last in the file always wins"
    why: "Source order is only the final tie-break, after origin, layers and specificity."
---

## Prompt

What background does `<a class="btn primary">` get?

```css
@layer base, components;

@layer components {
  .btn.primary { background: purple; }
}

a.btn { background: grey; }
```
