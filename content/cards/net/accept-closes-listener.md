---
title: "The server that serves one client"
module: net
type: bug-hunt
source: "https://man7.org/linux/man-pages/man2/accept.2.html"
tags: ["sockets", "tcp", "server"]
stack: ["linux", "c"]
choices:
  - text: "`listen()`'s backlog of 16 is too small"
    why: "The backlog limits queued, not-yet-accepted connections. It wouldn't stop the second client completely."
  - text: "The loop closes the listening socket instead of the connection socket"
    correct: true
    why: "`accept()` returns a new socket for each connection and leaves the listening socket untouched. Close `cfd` after handling it; keep `lfd` open."
  - text: "`accept()` should be called before `listen()`"
    why: "The order is socket, bind, listen, then accept. accept on a socket that isn't listening fails."
  - text: "Each client needs its own port, so the second `bind()` is missing"
    why: "One listening port serves any number of clients. Each connection is told apart by the client's address and port."
---

## Prompt

The first client gets a response. Every client after that gets "connection refused". Why?

```c
int lfd = socket(AF_INET, SOCK_STREAM, 0);
bind(lfd, (struct sockaddr *)&addr, sizeof addr);
listen(lfd, 16);

for (;;) {
    int cfd = accept(lfd, NULL, NULL);
    handle(cfd);
    close(lfd);
}
```

## Explanation

There are two kinds of socket here. `lfd` is the listening socket that waits for new connections; `cfd` is the connected socket for one client. Closing `lfd` stops the server listening, so the kernel refuses new connections, and the next `accept()` fails. Meanwhile every `cfd` leaks.
