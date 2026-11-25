---
title: "The div that acts as a button"
module: frontend
type: bug-hunt
source: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/button_role"
tags: ["html", "accessibility", "keyboard"]
stack: ["html5"]
choices:
  - text: "Add `role=\"button\"` and it's fixed"
    why: "The role changes what a screen reader announces, nothing else. It still can't be focused or pressed from the keyboard."
  - text: "Add `tabindex=\"0\"` and it's fixed"
    why: "Now it takes focus, but Enter and Space still do nothing and it isn't announced as a button."
  - text: "Keyboard users can't reach or press it, and screen readers don't call it a button. Use `<button type=\"button\">`"
    correct: true
    why: "A real button is focusable, fires `click` on Enter and Space, and exposes its role, all for free."
  - text: "Inline `onclick` attributes are deprecated, so the handler never runs"
    why: "They aren't deprecated and the handler runs fine for mouse users. The problem is everyone else."
---

## Prompt

It works with a mouse. What's broken, and what's the fix?

```html
<div class="btn" onclick="save()">Save</div>
```

## Explanation

A `<div>` has no role, isn't in the tab order and ignores key presses. You could add `role`, `tabindex` and a keydown handler for Enter and Space, but `<button>` already does all of it. Restyle the button instead of rebuilding it.
