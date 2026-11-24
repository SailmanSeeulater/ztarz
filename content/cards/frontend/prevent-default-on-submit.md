---
title: "The page reloads on submit"
module: frontend
type: mcq
source: "https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault"
tags: ["html", "forms"]
choices:
  - text: "Call `e.preventDefault()` in the submit handler"
    correct: true
    why: "Without it the browser does a full-page form submission."
  - text: "Use `useRef`"
    why: "A ref doesn't stop the default submit."
  - text: "Add a `key`"
    why: "Keys don't affect browser form behavior."
  - text: "Remove the form element"
    why: "Loses Enter-to-submit and form semantics for screen readers."
---

## Prompt

The page reloads when the form submits. Fix?
