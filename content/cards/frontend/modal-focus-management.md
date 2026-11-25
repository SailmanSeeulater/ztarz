---
title: "Keyboard focus in a modal"
module: frontend
type: out-loud
source: "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/"
tags: ["accessibility", "focus", "keyboard", "dialog"]
---

## Prompt

You're building a modal dialog. How do you handle keyboard focus?

## Model answer

When it opens, move focus inside: usually the first focusable element, or the safest button for a destructive action. Keep Tab and Shift+Tab cycling inside the dialog, and make Escape close it. The content behind is inert. When it closes, return focus to the button that opened it, so the user doesn't land at the top of the page.

For screen readers: `role="dialog"`, `aria-modal="true"` and `aria-labelledby` pointing at the visible title. The native `<dialog>` element opened with `showModal()` does much of this for you, so I'd start there.
