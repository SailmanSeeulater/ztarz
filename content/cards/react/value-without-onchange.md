---
title: "An input that ignores typing"
module: react
type: what-prints
source: "https://react.dev/reference/react-dom/components/input#my-text-input-doesnt-update-when-i-type-into-it"
tags: ["react", "forms", "inputs"]
stack: ["react"]
---

## Prompt

What happens when the user types into this input?

```jsx
function Profile() {
  const [name, setName] = useState("Ada");
  return <input value={name} />;
}
```

## Answer

Nothing changes on screen: the input stays "Ada", and React warns in the console that `value` was provided without an `onChange` handler.

## Explanation

Passing `value` makes the input controlled, so React forces it back to `name` on every render, and nothing ever updates `name`. Add `onChange={(e) => setName(e.target.value)}`, use `defaultValue="Ada"` for an uncontrolled input, or mark it `readOnly` if it's meant to be fixed.
