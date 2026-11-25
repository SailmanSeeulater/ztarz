---
title: "Minimum contrast for body text"
module: frontend
type: mcq
source: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html"
tags: ["accessibility", "wcag", "design"]
choices:
  - text: "3:1 for all text"
    why: "3:1 is the AA minimum for large text only (roughly 18pt, or 14pt bold). Body text needs more."
  - text: "7:1 for normal text"
    why: "That's the stricter AAA level. AA, the usual target, is lower."
  - text: "4.5:1 for normal text, 3:1 for large text"
    correct: true
    why: "WCAG success criterion 1.4.3 (AA). The ratios are thresholds: 4.49:1 fails."
  - text: "There's no number; it's a judgement call by the designer"
    why: "WCAG gives exact ratios you can check with DevTools or any contrast checker."
---

## Prompt

What contrast ratio does WCAG level AA require between text and its background?
