---
title: "One id against three classes"
module: frontend
type: what-prints
source: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Specificity"
tags: ["css", "specificity", "cascade"]
stack: ["css"]
---

## Prompt

What colour is the heading?

```html
<section id="main" class="card">
  <h2 class="title big">Hello</h2>
</section>
```

```css
#main h2 { color: blue; }
.card .title.big { color: red; }
```

## Answer

Blue.

## Explanation

Specificity is compared column by column: ids, then classes (and attributes, pseudo-classes), then types. `#main h2` is 1-0-1 and `.card .title.big` is 0-3-0. One id beats any number of classes, so source order never comes into it. That's a reason to style with classes and keep ids out of selectors.
