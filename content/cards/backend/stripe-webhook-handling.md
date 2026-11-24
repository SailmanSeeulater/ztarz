---
title: "Handling Stripe webhooks safely"
module: backend
type: out-loud
source: "https://docs.stripe.com/webhooks"
tags: ["stripe", "webhooks", "idempotency"]
---

## Prompt

How do you handle Stripe webhooks safely?

## Model answer

- Verify the signature with the endpoint's signing secret.
- Make the handler idempotent using the event id, because Stripe can deliver an event more than once.
- Save to the database *before* returning 200, so a failure makes Stripe retry.
- Map plans by explicit price IDs, never by display name.
