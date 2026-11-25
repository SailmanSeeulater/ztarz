---
title: "A webhook handler that survives retries"
module: f7
minutes: 45
source: "https://docs.stripe.com/webhooks#handle-duplicate-events"
stack: ["nodedotjs"]
checks:
  - label: "the first delivery was processed"
    pattern: "processed evt_123"
    times: 1
  - label: "the retry was recognised and skipped"
    pattern: "duplicate evt_123"
  - label: "the retry still got a 200, so the sender stops retrying"
    pattern: "^200$"
    times: 2
---

## Goal

Providers resend a webhook when they don't get a 2xx in time, so the same event can arrive twice. Make the handler do the work once and still answer 200 to the retry.

## Steps

1. Save this as `webhook.mjs`. It processes every delivery, so a retry would charge twice:

   ```js
   import { createServer } from "node:http";

   const processed = new Set(); // in production: a table with a unique event id

   createServer(async (req, res) => {
     let body = "";
     for await (const chunk of req) body += chunk;
     const event = JSON.parse(body);

     // TODO: if this event id was already handled, log "duplicate <id>" and answer 200 without redoing the work.
     console.log(`processed ${event.id}`);
     processed.add(event.id);

     res.writeHead(200).end("ok");
   }).listen(4242, () => console.log("listening on 4242"));
   ```

2. Fill in the TODO, then run it with `node webhook.mjs` and, in another terminal, deliver the same event twice:

   ```console
   for i in 1 2; do
     curl -s -o /dev/null -w '%{http_code}\n' -X POST localhost:4242 -d '{"id":"evt_123","type":"invoice.paid"}'
   done
   ```

3. Why should a duplicate get 200 rather than 409?

## Evidence

Paste the server's log and the two status codes curl printed.
