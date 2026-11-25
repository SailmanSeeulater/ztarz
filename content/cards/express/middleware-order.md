---
title: "The admin route anyone can open"
module: express
type: bug-hunt
source: "https://expressjs.com/en/guide/using-middleware.html"
tags: ["express", "middleware", "auth"]
stack: ["express", "nodedotjs"]
choices:
  - text: "`requireAuth` must be `async` to run before the routes"
    why: "Being async doesn't change order. Express runs middleware and routes in the order they're registered."
  - text: "`app.use` only applies to routes in other files"
    why: "`app.use` applies to every route registered after it, in any file."
  - text: "`/admin/stats` is registered before `requireAuth`, so it answers the request before the auth middleware is ever reached"
    correct: true
    why: "Middleware runs in registration order. Put `app.use(requireAuth)` (or a router with the middleware) above every route it should guard."
  - text: "`requireAuth` should call `res.end()` instead of `next()` when the user is valid"
    why: "Ending the response would stop the request there. `next()` is what passes control on to the route."
---

## Prompt

Signed-out users can read `/admin/stats` but get 401 on `/admin/users`. Why?

```js
app.get("/admin/stats", getStats);
app.use(requireAuth); // calls next() if signed in, else 401
app.get("/admin/users", listUsers);
```

## Explanation

Express keeps one ordered stack of middleware and route handlers. Each request walks it top to bottom, and stops at the first handler that sends a response instead of calling `next()`. Guard a whole area with a router: `adminRouter.use(requireAuth)` then mount it with `app.use("/admin", adminRouter)`.
