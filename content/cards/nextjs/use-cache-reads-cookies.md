---
title: "Reading cookies inside \"use cache\""
module: nextjs
type: bug-hunt
source: "https://nextjs.org/docs/app/api-reference/directives/use-cache"
tags: ["nextjs", "caching", "cache-components"]
stack: ["nextdotjs"]
choices:
  - text: "`cacheLife(\"hours\")` is too long; cookies need `\"seconds\"`"
    why: "The lifetime isn't the issue. Runtime APIs are banned in a cached scope whatever its lifetime."
  - text: "Cached functions can't read runtime APIs like `cookies()` or `headers()`. Read the currency outside and pass it in as an argument"
    correct: true
    why: "Arguments become part of the cache key, so `getPrices(currency)` caches one entry per currency, and request data never leaks between users."
  - text: "`'use cache'` must be the first line of the file, not of the function"
    why: "It can go at the top of a file or at the top of an async function or component. Both are valid."
  - text: "Cached functions can't be `async`"
    why: "`use cache` is meant for async functions and components."
---

## Prompt

With Cache Components on, this throws `next-request-in-use-cache`. What's wrong?

```tsx
import { cookies } from "next/headers";
import { cacheLife } from "next/cache";

export async function getPrices() {
  "use cache";
  cacheLife("hours");
  const currency = (await cookies()).get("currency")?.value ?? "GBP";
  return db.prices.findMany({ where: { currency } });
}
```

## Explanation

A cached result is shared across requests, so it can't depend on anything request-specific it didn't receive as input. The restriction follows the call stack: a helper called from a cached function that reads `cookies()` fails too. Read runtime data in an uncached component and pass plain values down.

```tsx
const currency = (await cookies()).get("currency")?.value ?? "GBP";
const prices = await getPrices(currency); // getPrices(currency) has "use cache"
```
