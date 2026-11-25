---
title: "Why semantic HTML over styled divs"
module: frontend
type: mcq
source: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML"
tags: ["html", "accessibility", "semantics"]
stack: ["html5"]
choices:
  - text: "Semantic elements render faster because the browser can skip style calculation"
    why: "Rendering speed is the same. A `<nav>` and a `<div>` cost the browser about the same."
  - text: "They expose meaning to assistive tech: screen reader users can jump between landmarks and headings, and `<button>` comes with focus and keyboard support for free"
    correct: true
    why: "The browser builds the accessibility tree from your elements. A `<div>` says nothing, so you'd have to rebuild that meaning and behaviour by hand."
  - text: "It's only for SEO; screen readers read every element the same way"
    why: "SEO is a side benefit. Screen readers do treat landmarks, headings and buttons differently, and many users navigate by them."
  - text: "Layout features like grid and sticky positioning only work on semantic elements"
    why: "CSS works on any element. Semantics affect meaning, not what CSS you can apply."
---

## Prompt

Why build a page from `<header>`, `<nav>`, `<main>`, real headings and `<button>`, rather than `<div>`s styled to look the same?
