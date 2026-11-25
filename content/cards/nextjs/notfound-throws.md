---
title: "How notFound() works"
module: nextjs
type: concept
source: "https://nextjs.org/docs/app/api-reference/functions/not-found"
tags: ["nextjs", "errors", "routing"]
stack: ["nextdotjs"]
---

## Prompt

`/users/[id]` gets an id that doesn't exist in the database. How do you show a 404, and what does `notFound()` actually do?

## Answer

```tsx
import { notFound } from "next/navigation";

const user = await getUser(id);
if (!user) notFound();
```

`notFound()` throws a special error that stops rendering the segment and shows the nearest `not-found.tsx` (or the default 404 UI). Next.js also adds `<meta name="robots" content="noindex">`.

Because it works by throwing, call it in the render path, not inside a promise nobody awaits. The response gets a 404 status if it's called before streaming starts; once streaming has begun the status stays 200, though the not-found UI still renders.
