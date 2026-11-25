---
title: "An input labelled only by its placeholder"
module: frontend
type: bug-hunt
source: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/placeholder"
tags: ["html", "forms", "accessibility"]
stack: ["html5"]
choices:
  - text: "`type=\"email\"` should be `type=\"text\"` so the placeholder shows on every browser"
    why: "Placeholders work on email inputs. `type=\"email\"` also gives the right mobile keyboard and free validation."
  - text: "Add `required` so screen readers know what to type"
    why: "`required` says the field must be filled, not what it's for."
  - text: "Use `aria-placeholder` instead"
    why: "That's for custom widgets that can't use the native attribute. It still isn't a label."
  - text: "There's no label. The placeholder vanishes once you type and isn't a substitute for one. Add `<label for=\"email\">`"
    correct: true
    why: "A visible `<label>` tied to the input's `id` gives it a reliable accessible name and a bigger click target."
---

## Prompt

What's wrong with this sign-up field?

```html
<input type="email" id="email" name="email" placeholder="Email address">
```

## Explanation

Once the user starts typing, the only prompt disappears, which hurts anyone who loses their place. Placeholders are for a short example of the format. Fix:

```html
<label for="email">Email address</label>
<input type="email" id="email" name="email" placeholder="name@example.com">
```
