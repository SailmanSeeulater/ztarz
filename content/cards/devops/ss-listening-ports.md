---
title: "Reading ss -tlnp"
module: devops
type: what-prints
source: "https://man7.org/linux/man-pages/man8/ss.8.html"
tags: ["linux", "networking", "ports"]
stack: ["linux"]
---

## Prompt

On a VPS with no firewall, `sudo ss -tlnp` prints this. Which services can someone on the internet connect to, and which one is a problem?

```text
State  Recv-Q Send-Q Local Address:Port  Peer Address:Port Process
LISTEN 0      128          0.0.0.0:22         0.0.0.0:*    users:(("sshd",pid=650,fd=3))
LISTEN 0      511          0.0.0.0:443        0.0.0.0:*    users:(("nginx",pid=990,fd=8))
LISTEN 0      244          0.0.0.0:5432       0.0.0.0:*    users:(("postgres",pid=701,fd=5))
LISTEN 0      511        127.0.0.1:6379       0.0.0.0:*    users:(("redis-server",pid=812,fd=6))
```

## Answer

Reachable: SSH on 22, nginx on 443, and Postgres on 5432. Redis on 6379 is only reachable from the machine itself.

The problem is Postgres listening on `0.0.0.0`.

## Explanation

`-t` shows TCP, `-l` only listening sockets, `-n` numeric ports instead of service names, and `-p` the owning process. The local address is what matters: `0.0.0.0` (or `[::]`, or `*`) means every interface, while `127.0.0.1` means loopback only.

The app talks to Postgres locally, so nothing outside needs 5432. Bind it to localhost (`listen_addresses = 'localhost'`) and add a default-deny firewall. Common ports worth knowing: 22 SSH, 80 HTTP, 443 HTTPS, 5432 Postgres, 3306 MySQL, 6379 Redis.
