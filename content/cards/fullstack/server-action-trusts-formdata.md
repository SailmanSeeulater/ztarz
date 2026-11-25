---
title: "The Server Action that casts instead of parsing"
module: fullstack
type: bug-hunt
source: "https://nextjs.org/docs/app/guides/forms"
tags: ["validation", "server-actions", "typescript"]
stack: ["nextdotjs", "zod"]
choices:
  - text: "`z.coerce.number()` should be `z.number()`."
    why: "FormData values are always strings, so coercion is right here. The problem is that the schema never runs."
  - text: "Server Actions can't import Zod."
    why: "They can. The Next.js forms guide validates a Server Action's fields with Zod."
  - text: "The `as` cast checks nothing at runtime, so the schema is never applied."
    correct: true
    why: "Types vanish at runtime. A negative amount or a non-UUID goes straight into the insert. Call `Invoice.safeParse(...)` and return field errors."
  - text: "`Object.fromEntries` drops fields that share a name."
    why: "It keeps the last value for a repeated key, which matters for multi-selects, but these fields are single."
---

## Prompt

What's the bug?

```ts
'use server'
import { z } from 'zod'

const Invoice = z.object({
  customerId: z.string().uuid(),
  amount: z.coerce.number().positive(),
})

export async function createInvoice(formData: FormData) {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const data = Object.fromEntries(formData) as z.infer<typeof Invoice>
  await db.insert(invoices).values(data)
}
```

## Explanation

A type assertion only silences the compiler. Parse at the boundary instead:

```ts
const parsed = Invoice.safeParse(Object.fromEntries(formData))
if (!parsed.success) return { errors: parsed.error.flatten().fieldErrors }
await db.insert(invoices).values(parsed.data)
```

`safeParse` also drops unknown keys, such as the `$ACTION_` fields Next adds to the form data.
