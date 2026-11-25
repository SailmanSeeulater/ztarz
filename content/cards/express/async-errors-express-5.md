---
title: "A rejected promise in an Express 5 route"
module: express
type: mcq
source: "https://expressjs.com/en/guide/error-handling.html"
tags: ["express", "errors", "async"]
stack: ["express", "nodedotjs"]
choices:
  - text: "The request hangs until the client times out"
    why: "That's what happened in Express 4 without a try/catch or wrapper. Express 5 handles returned promises."
  - text: "The process crashes with an unhandled rejection"
    why: "Express 5 catches the rejection itself, so it never becomes unhandled."
  - text: "Express calls `next(err)` with the rejection, so your error-handling middleware responds"
    correct: true
    why: "From Express 5, route handlers and middleware that return a rejected promise pass the reason to `next` automatically. No `express-async-handler` needed."
  - text: "Express retries the handler once"
    why: "Express never retries handlers; that would repeat side effects."
---

## Prompt

In Express 5, what happens when `await db.findUser(id)` rejects inside this route?

```js
app.get("/users/:id", async (req, res) => {
  const user = await db.findUser(req.params.id);
  res.json(user);
});
```
