---
title: "Typing async UI state"
module: f4
type: mcq
source: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions"
tags: ["typescript", "state"]
choices:
  - text: "A string message"
    why: "Loses the data and makes every check a string comparison."
  - text: "Three separate booleans"
    why: "Allows nonsense combinations like loading and error at once."
  - text: "A discriminated union: `{ status: 'loading' } | { status: 'error'; error: string } | { status: 'success'; data: T }`"
    correct: true
    why: "Impossible states (loading *and* error) can't be represented, and TypeScript narrows on `status`."
  - text: "`any`"
    why: "Gives up type checking entirely."
---

## Prompt

Best type for async UI state?
