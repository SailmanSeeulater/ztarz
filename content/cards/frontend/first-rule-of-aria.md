---
title: "The first rule of ARIA"
module: frontend
type: concept
source: "https://www.w3.org/TR/using-aria/#rule1"
tags: ["accessibility", "aria", "html"]
stack: ["html5"]
---

## Prompt

What's the first rule of ARIA, and why does it exist?

## Answer

If a native HTML element or attribute already has the meaning and behaviour you need, use it instead of adding ARIA to something else. Use `<button>`, not `<div role="button">`.

ARIA only changes what assistive tech is told. It adds no focus, no keyboard handling and no states, so every role you add is behaviour you now have to build and test yourself. Wrong ARIA is worse than none.
