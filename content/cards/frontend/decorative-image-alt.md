---
title: "Alt text for a decorative image"
module: frontend
type: mcq
source: "https://www.w3.org/WAI/tutorials/images/decorative/"
tags: ["html", "accessibility", "images"]
stack: ["html5"]
choices:
  - text: "Leave the `alt` attribute off"
    why: "Without `alt`, some screen readers announce the file name instead, which is worse than nothing."
  - text: "`alt=\"decorative image\"`"
    why: "That's read aloud on every visit. It adds clutter and tells the user nothing useful."
  - text: "`alt=\"\"`"
    correct: true
    why: "An empty `alt` tells assistive tech to skip the image. Keep the attribute; just leave it empty."
  - text: "`alt=\"divider.svg\"`"
    why: "File names mean nothing to a listener. It's the same clutter, only harder to understand."
---

## Prompt

A purely decorative flourish image sits under each section heading. What should its `alt` be?
