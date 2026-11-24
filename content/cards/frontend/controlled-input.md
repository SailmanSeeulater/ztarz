---
title: "Controlled inputs"
module: frontend
type: mcq
source: "https://react.dev/reference/react-dom/components/input"
tags: ["react", "forms"]
choices:
  - text: "One inside a `<form>`"
    why: "Being in a form doesn't change who owns the value."
  - text: "One the DOM manages"
    why: "That's the definition of uncontrolled."
  - text: "One with a ref attached"
    why: "A ref is how you read an *uncontrolled* input."
  - text: "One whose value comes from React state and updates through `onChange`"
    correct: true
    why: "State is the source of truth. Uncontrolled inputs keep the value in the DOM; you read it with a ref or FormData."
---

## Prompt

What is a controlled input?
