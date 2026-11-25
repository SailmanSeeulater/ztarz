---
title: "The nested router that loses :postId"
module: express
type: what-prints
source: "https://expressjs.com/en/5x/api/express/#expressrouter"
tags: ["express", "routing"]
stack: ["express", "nodedotjs"]
---

## Prompt

A client requests `GET /posts/7/comments`. What does it get back?

```js
const comments = express.Router();
comments.get("/", (req, res) => res.json(req.params));

app.use("/posts/:postId/comments", comments);
```

## Answer

`{}`

## Explanation

A router only sees the params from its own paths by default; `:postId` belongs to the parent mount path. Create the router with `express.Router({ mergeParams: true })` and `req.params` becomes `{ "postId": "7" }`.
