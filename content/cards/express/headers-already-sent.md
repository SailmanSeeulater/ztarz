---
title: "Cannot set headers after they are sent"
module: express
type: bug-hunt
source: "https://nodejs.org/api/errors.html#err_http_headers_sent"
tags: ["express", "errors", "responses"]
stack: ["express", "nodedotjs"]
choices:
  - text: "`res.status(400)` must come after `.json()`"
    why: "`status` sets the code for the response that's about to be sent; calling it afterwards is too late."
  - text: "Missing `return`: after the 400 is sent, the function carries on and `res.json` tries to send a second response"
    correct: true
    why: "Sending a response doesn't stop your function. Write `return res.status(400).json(...)` so every branch sends exactly once."
  - text: "Express 5 forbids `res.json` in async handlers"
    why: "`res.json` works the same in sync and async handlers."
  - text: "The client closed the connection early"
    why: "That gives a different error. Here the server itself responds twice."
---

## Prompt

Requests without an email get their 400, but the log fills with `ERR_HTTP_HEADERS_SENT`. Why?

```js
app.post("/invite", async (req, res) => {
  if (!req.body.email) {
    res.status(400).json({ error: "email required" });
  }
  const invite = await createInvite(req.body.email);
  res.json(invite);
});
```

## Explanation

Each request gets exactly one response. Once headers are written, any later `res.json`, `res.send` or `res.redirect` throws `ERR_HTTP_HEADERS_SENT`. The same bug appears when a handler both calls `next()` and sends a response, or when a callback fires twice.
