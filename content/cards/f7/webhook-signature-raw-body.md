---
title: "The webhook signature that never matches"
module: f7
type: bug-hunt
source: "https://docs.stripe.com/webhooks#verify-manually"
tags: ["webhooks", "hmac", "security"]
stack: ["stripe"]
choices:
  - text: "`headers.get` is case-sensitive, so it must be `Stripe-Signature`"
    why: "Header lookups on `Headers` are case-insensitive."
  - text: "The HMAC is computed over `JSON.stringify` of the parsed body, not the raw bytes that were signed"
    correct: true
    why: "Re-serialising changes whitespace and can change key order or escaping, so the digest differs. Read `await req.text()`, verify that, then `JSON.parse` it."
  - text: "The secret should be the HMAC message and the payload the key"
    why: "The signing secret is the key and `${t}.${body}` is the message."
  - text: "The timestamp must be checked before computing the HMAC"
    why: "The handler should reject old timestamps, but missing that check makes it too lenient. It doesn't make valid deliveries fail."
---

## Prompt

Every genuine Stripe delivery fails this check. Why?

```ts
export async function POST(req: Request) {
  const event = await req.json();
  const { t, v1 } = parseSignature(req.headers.get("stripe-signature")!);
  const expected = createHmac("sha256", process.env.WEBHOOK_SECRET!)
    .update(`${t}.${JSON.stringify(event)}`)
    .digest("hex");
  if (expected !== v1) return new Response("bad signature", { status: 400 });
  await handle(event);
  return new Response("ok");
}
```

## Explanation

The sender signs `timestamp + "." + raw body` with HMAC-SHA256 and the endpoint secret. Verify over the exact bytes received, before any parsing. Two more fixes: compare with a constant-time function (`crypto.timingSafeEqual`) rather than `!==`, and reject the request if `t` is outside a tolerance (the Stripe libraries default to 5 minutes), so a captured request can't be replayed later.
