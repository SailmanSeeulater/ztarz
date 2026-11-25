---
title: "Charged twice by a queue worker"
module: swe
type: bug-hunt
source: "https://learn.microsoft.com/en-us/azure/architecture/patterns/idempotent-consumer"
tags: ["system-design", "messaging", "idempotency"]
choices:
  - text: "If the worker crashes or the ack is lost after the charge, the broker redelivers the message and the charge runs again; nothing checks whether this order was already handled"
    correct: true
    why: "At-least-once delivery means duplicates are normal. Pass `orderId` as an idempotency key to the payment provider, and record processed message IDs under a unique constraint in the same transaction as the status update."
  - text: "Ack the message first, then charge"
    why: "Now a crash after the ack loses the payment entirely. That swaps duplicates for lost work (at-most-once)."
  - text: "Switch to a broker that offers exactly-once delivery"
    why: "A broker can only control its own operations. It can't stop your code calling an external payment API twice."
  - text: "Run a single worker instead of several"
    why: "The duplicates come from redelivery, not concurrency. One worker still receives a redelivered message after a crash."
---

## Prompt

A few customers were charged twice. The queue promises at-least-once delivery. What's wrong with this consumer?

```ts
queue.on("message", async (msg) => {
  const { orderId, amount } = JSON.parse(msg.body);
  await payments.charge(orderId, amount);
  await db.query("UPDATE orders SET status = 'paid' WHERE id = $1", [orderId]);
  await msg.ack();
});
```

## Explanation

"Exactly once" across a broker and your side effects isn't something the broker can give you. What you build instead is effectively-once: at-least-once delivery plus a consumer that recognises a message it has already processed. Commit the "processed" marker and the business change together, so a crash leaves both done or neither. A side effect outside your database, like a charge, needs its own idempotency key.
