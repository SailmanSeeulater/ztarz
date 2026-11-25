---
title: "Cache-aside and invalidation"
module: f6
type: mcq
source: "https://redis.io/learn/howtos/solutions/microservices/caching"
tags: ["caching", "redis", "performance"]
stack: ["redis"]
choices:
  - text: "After the database write commits, delete the key so the next read misses and reloads it"
    correct: true
    why: "The next `getProduct` call falls through to the database and caches the fresh row. The TTL stays as a safety net for any invalidation you miss."
  - text: "Lower the TTL to one second"
    why: "Almost every read would then miss, and the cache would stop protecting the database. A TTL bounds staleness; it isn't the invalidation strategy."
  - text: "Write the new price to Redis first, then to the database"
    why: "If the database write fails, the cache now serves a price that was never saved. Write the database, then invalidate."
  - text: "Nothing; Redis evicts the key when the row changes"
    why: "Redis knows nothing about your database. The application has to invalidate."
---

## Prompt

Products are cached like this. An admin changes a price. What's the usual way to stop customers seeing the old price for up to 5 minutes?

```ts
async function getProduct(id: string) {
  const cached = await redis.get(`product:${id}`);
  if (cached) return JSON.parse(cached);

  const product = await loadProductFromDb(id);
  await redis.set(`product:${id}`, JSON.stringify(product), { EX: 300 });
  return product;
}
```
