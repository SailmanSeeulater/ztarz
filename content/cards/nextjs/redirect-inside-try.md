---
title: "The redirect that reports an error"
module: nextjs
type: bug-hunt
source: "https://nextjs.org/docs/app/api-reference/functions/redirect"
tags: ["nextjs", "server-actions", "errors"]
stack: ["nextdotjs"]
choices:
  - text: "`redirect()` throws a special error to stop rendering; the `catch` swallows it. Call `redirect` after the `try/catch`"
    correct: true
    why: "Save inside `try`, return the error from `catch`, and redirect only once the block has finished successfully."
  - text: "Server Actions can't redirect; return a URL and use `router.push` on the client"
    why: "`redirect` is supported in Server Actions and is the usual way to navigate after a mutation."
  - text: "The action must `await redirect(...)`"
    why: "`redirect` doesn't return a promise. It throws."
  - text: "`redirect` only works with absolute URLs"
    why: "Relative paths like `/invoices/42` are normal."
---

## Prompt

The invoice saves, but the user sees "Could not save invoice" and stays on the form. Why?

```ts
"use server";
export async function createInvoice(formData: FormData) {
  try {
    const invoice = await db.invoice.create({ data: parse(formData) });
    redirect(`/invoices/${invoice.id}`);
  } catch {
    return { error: "Could not save invoice" };
  }
}
```

## Explanation

`redirect()` works by throwing a `NEXT_REDIRECT` error that the framework catches higher up. A broad `catch` intercepts it first and turns a successful save into an error message. The same applies to `notFound()`.

```ts
let id: string;
try {
  id = (await db.invoice.create({ data: parse(formData) })).id;
} catch {
  return { error: "Could not save invoice" };
}
redirect(`/invoices/${id}`);
```
