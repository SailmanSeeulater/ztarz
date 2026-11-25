---
title: "Login spikes slow down every endpoint"
module: backend
type: bug-hunt
source: "https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop"
tags: ["node", "event-loop", "performance"]
stack: ["nodedotjs"]
choices:
  - text: "`await findUser()` is blocking the other requests"
    why: "Awaiting I/O hands the thread back to the event loop. Other requests run meanwhile."
  - text: "`pbkdf2Sync` runs a long burst of CPU work on the one event loop thread, so every other request waits. Use the async version or a worker"
    correct: true
    why: "Node serves all clients from one event loop. Any synchronous CPU-heavy call stalls everyone, which is also a denial-of-service risk."
  - text: "600,000 iterations is too many; cut it to 1,000"
    why: "That weakens password storage and only shrinks the stall. The real bug is where the work runs."
  - text: "Mark more functions `async`"
    why: "`async` doesn't move synchronous work off the thread. It still runs on the event loop."
---

## Prompt

During login spikes, every endpoint gets slow, even `/health`. Why?

```js
app.post("/login", async (req, res) => {
  const user = await findUser(req.body.email);
  const hash = crypto.pbkdf2Sync(req.body.password, user.salt, 600_000, 64, "sha512");
  if (!crypto.timingSafeEqual(hash, user.hash)) return res.status(401).end();
  res.json({ ok: true });
});
```

## Explanation

`crypto.pbkdf2` (no `Sync`) runs on libuv's worker pool and calls back when done, so the event loop stays free:

```js
const hash = await promisify(crypto.pbkdf2)(req.body.password, user.salt, 600_000, 64, "sha512");
```

The same applies to other `*Sync` calls, huge `JSON.parse` calls and catastrophic regexes. For your own CPU-heavy code, use `worker_threads` or a separate job queue.
