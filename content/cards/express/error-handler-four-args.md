---
title: "The error handler that never runs"
module: express
type: mcq
source: "https://expressjs.com/en/guide/error-handling.html"
tags: ["express", "errors", "middleware"]
stack: ["express", "nodedotjs"]
choices:
  - text: "Error handlers must be registered before the routes"
    why: "The opposite: define them last, after all other `app.use()` and route calls."
  - text: "It needs all four parameters, `(err, req, res, next)`, or Express treats it as ordinary middleware"
    correct: true
    why: "Express tells error handlers apart by their arity. With three parameters it's skipped for errors, and the default handler sends its own HTML 500 page."
  - text: "Errors only reach it if the route calls `res.status(500)` first"
    why: "Throwing (or calling `next(err)`) is what routes an error to error handlers."
  - text: "Express only supports one error handler, set with `app.set(\"errorHandler\")`"
    why: "There's no such setting. You can chain several error handlers with `next(err)`."
---

## Prompt

A route throws, but this handler never runs and the client gets Express's default HTML error page. Why?

```js
app.use((err, req, res) => {
  res.status(500).json({ error: "Something went wrong" });
});
```
