---
title: "Animating a slide-in panel smoothly"
module: frontend
type: mcq
source: "https://web.dev/articles/animations-guide"
tags: ["css", "performance", "rendering"]
stack: ["css"]
choices:
  - text: "Animate `margin-left` instead of `left`"
    why: "Margin also changes geometry, so it still triggers layout on every frame."
  - text: "Add `will-change: left`"
    why: "It hints at a change but can't stop `left` from needing layout. It also costs memory if overused."
  - text: "Animate `transform: translateX()` instead"
    correct: true
    why: "Transform and opacity can skip layout and paint, so the compositor can run them smoothly. `left` reruns layout every frame."
  - text: "Drive it from JavaScript with `setInterval` every 16 ms"
    why: "Still animates `left`, and timers aren't synced to frames. If you need JS, use `requestAnimationFrame`."
---

## Prompt

A side panel slides in by animating `left` from `-300px` to `0`, and it stutters on slower phones. What's the fix?
