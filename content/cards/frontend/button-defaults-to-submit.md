---
title: "Next submits the whole form"
module: frontend
type: bug-hunt
source: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button"
tags: ["html", "forms"]
choices:
  - text: "A `<button>` inside a form defaults to `type=\"submit\"`; set `type=\"button\"`"
    correct: true
    why: "Also guard in the submit handler: if it isn't the last step, run `next()` instead."
  - text: "The input has no `id`"
    why: "Ids matter for labels, not submission."
  - text: "The form needs `action=\"#\"`"
    why: "That still submits; it just posts to the same page."
  - text: "`onClick` is async"
    why: "Click handlers run synchronously; the default submit still happens."
---

## Prompt

Clicking Next on step 1 submits the whole form. Why?

```jsx
<form onSubmit={submit}>
  <input name="name" />
  <button onClick={next}>Next</button>
</form>
```

## Explanation

Also guard in the submit handler: if it isn't the last step, run `next()` instead.
