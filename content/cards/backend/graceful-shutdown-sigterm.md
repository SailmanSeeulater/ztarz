---
title: "Errors on every deploy"
module: backend
type: bug-hunt
source: "https://nodejs.org/api/net.html#serverclosecallback"
tags: ["node", "deployment", "reliability", "signals"]
stack: ["nodedotjs"]
choices:
  - text: "It exits at once, cutting off in-flight requests and closing the pool under them. Stop accepting, let requests finish, then close the pool and exit"
    correct: true
    why: "Graceful shutdown means draining. `server.close()` stops new connections and calls back once the open ones have ended."
  - text: "Listen for SIGKILL instead of SIGTERM"
    why: "SIGKILL can't be caught. SIGTERM is the polite warning you get to act on."
  - text: "Exit with code 1 instead of 0"
    why: "The exit code doesn't change what happens to the requests in flight."
  - text: "Run it under the `cluster` module"
    why: "More processes doesn't help if each one still dies mid-request."
---

## Prompt

During each deploy a few users get connection errors or half-saved requests. What's wrong?

```js
const server = app.listen(3000);

process.on("SIGTERM", () => {
  db.end();
  process.exit(0);
});
```

## Explanation

```js
process.on("SIGTERM", () => {
  server.close(async () => {   // no new connections; runs once open ones end
    await db.end();
    process.exit(0);
  });
  // Give up before the platform's grace period ends and it sends SIGKILL.
  setTimeout(() => process.exit(1), 9000).unref();
});
```

Behind a load balancer, start failing the readiness check first so no new traffic arrives while you drain.
