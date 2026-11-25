---
title: "params, query or body?"
module: express
type: mcq
source: "https://expressjs.com/en/5x/api/request/#reqquery"
tags: ["express", "requests"]
stack: ["express", "nodedotjs"]
choices:
  - text: "`req.params.id` is the number 42 and `req.query.notify` is the boolean true"
    why: "Route params and query values are strings. Convert and validate them yourself."
  - text: "`req.params.id` is `\"42\"`, `req.query.notify` is `\"true\"` and `req.body.name` is `\"Ada\"`"
    correct: true
    why: "Path segments go to `params`, the query string to `query`, and the parsed JSON body (with `express.json()`) to `body`. Everything from the URL is a string."
  - text: "`req.query.id` is `\"42\"`, because Express merges path params into the query"
    why: "They're kept separate. `req.query` only holds what follows the `?`."
  - text: "`req.body.notify` is `\"true\"`, because query values are merged into the body"
    why: "The body only contains what the client sent in the request body."
---

## Prompt

Route `app.patch("/users/:id", ...)` receives `PATCH /users/42?notify=true` with JSON body `{"name":"Ada"}` (and `express.json()` is in place). Which is true?
