---
title: "Hardening an Express app for production"
module: express
type: out-loud
source: "https://expressjs.com/en/advanced/best-practice-security.html"
tags: ["express", "security", "production"]
stack: ["express", "nodedotjs"]
---

## Prompt

Your Express API is about to go live. What security basics do you put in place?

## Model answer

Start with the transport and headers: serve over TLS, and add `helmet`, which sets headers such as `Strict-Transport-Security` and `Content-Security-Policy`. I'd also turn off `X-Powered-By` so the server doesn't advertise Express.

Then the inputs: validate every body, query and param against a schema, and never build SQL or shell commands from strings. Rate-limit login and other expensive endpoints to slow brute-force attempts.

For sessions, set cookies `httpOnly`, `secure` and `sameSite`, and don't use the default session cookie name.

Finally, the supply chain and errors: keep Express and dependencies current with `npm audit`, run with `NODE_ENV=production`, and make sure the error handler never sends stack traces to clients.
