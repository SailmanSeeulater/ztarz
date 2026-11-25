---
title: "req.body is undefined"
module: express
type: mcq
source: "https://expressjs.com/en/5x/api/express/#expressjson"
tags: ["express", "body-parsing"]
stack: ["express", "nodedotjs"]
choices:
  - text: "The client must send the body as `FormData`"
    why: "Express doesn't parse multipart bodies at all without extra middleware such as multer."
  - text: "It should be `await req.body`, since the body arrives asynchronously"
    why: "`req.body` isn't a promise. It's filled in by body-parsing middleware before your handler runs."
  - text: "No body parser is registered: add `app.use(express.json())` before the routes"
    correct: true
    why: "Express doesn't parse bodies by default. `express.json()` parses requests whose `Content-Type` is JSON, so the client must send `application/json` too."
  - text: "JSON bodies are only allowed on PUT, not POST"
    why: "Any method can carry a body; POST is the most common."
---

## Prompt

A client POSTs `{"email":"a@example.com"}` with `Content-Type: application/json`, but `req.body` is `undefined` in the handler. Most likely cause?
