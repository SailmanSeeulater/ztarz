---
title: "Delegated click gives an undefined id"
module: frontend
type: bug-hunt
source: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling"
tags: ["dom", "events", "delegation"]
stack: ["javascript"]
choices:
  - text: "Click events don't bubble up from a `<span>`"
    why: "They do, which is why the listener on the `<ul>` runs at all."
  - text: "Use `e.currentTarget` instead of `e.target`"
    why: "`currentTarget` is the element the listener is on: the `<ul>`, which has no `data-id`."
  - text: "Delegation doesn't work for lists; put a listener on each `<li>`"
    why: "That works, but delegation is fine and cheaper. The bug is which element you read from."
  - text: "`e.target` is the innermost element clicked, here the `<span>`. Use `e.target.closest(\"li\")` and read its `dataset.id`"
    correct: true
    why: "The event bubbles from where it happened. `closest` walks up to the item you care about."
---

## Prompt

Clicking the text of a todo logs `undefined`. Why?

```html
<ul id="todos">
  <li data-id="1"><span class="label">Buy milk</span></li>
</ul>
```

```js
todos.addEventListener("click", (e) => {
  console.log(e.target.dataset.id);
});
```

## Explanation

Fix:

```js
todos.addEventListener("click", (e) => {
  const item = e.target.closest("li");
  if (item) console.log(item.dataset.id);
});
```

One listener on the parent also covers items added later.
