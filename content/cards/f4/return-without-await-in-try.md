---
title: "The catch that never catches"
module: f4
type: bug-hunt
source: "https://typescript-eslint.io/rules/return-await/"
tags: ["typescript", "async", "errors"]
choices:
  - text: "Async functions can't use try/catch"
    why: "They can: `await` inside `try` is exactly how you catch async errors."
  - text: "`catch (err)` needs a type annotation"
    why: "TypeScript only allows `unknown` or `any` there, and types don't change runtime behaviour."
  - text: "`logger.error` throws"
    why: "Then you'd see that error. Here the catch block never runs at all."
  - text: "`return db.insert(row)` hands back the promise before it settles, so the rejection happens outside the try; write `return await`"
    correct: true
    why: "Inside try/catch (or finally), `return await` is required. typescript-eslint's `return-await` rule enforces exactly this."
---

## Prompt

When the insert fails, nothing is logged and the caller gets a rejected promise. Why?

```ts
async function save(row: Row) {
  try {
    return db.insert(row);
  } catch (err) {
    logger.error(err);
    return null;
  }
}
```

## Explanation

`return somePromise` resolves the async function's own promise with that promise, after the function has already left the `try` block. `return await somePromise` waits inside the `try`, so a rejection throws there and the `catch` runs.
