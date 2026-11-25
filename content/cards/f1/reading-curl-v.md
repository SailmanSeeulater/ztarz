---
title: "Reading curl -v"
module: f1
type: what-prints
source: "https://curl.se/docs/manpage.html#-v"
tags: ["http", "curl", "debugging"]
stack: ["curl"]
---

## Prompt

What do the `*`, `>` and `<` prefixes mean in this output?

```console
$ curl -v https://example.com
* Connected to example.com (203.0.113.10) port 443
* SSL connection using TLSv1.3
> GET / HTTP/2
> Host: example.com
< HTTP/2 200
< content-type: text/html
```

## Answer

- `*` is curl's own commentary: the DNS result, the connection, the TLS handshake.
- `>` is a header curl sent.
- `<` is a header curl received.

## Explanation

That's the whole URL-to-page trace in one command: resolve, connect, TLS, request, response. Useful extras: `-I` for headers only, and `--resolve example.com:443:203.0.113.10` to test a server before DNS points at it.
