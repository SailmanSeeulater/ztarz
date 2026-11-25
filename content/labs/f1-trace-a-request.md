---
title: "Trace a request with curl and dig"
module: f1
minutes: 20
source: "https://curl.se/docs/manpage.html#-v"
stack: ["curl"]
checks:
  - label: "dig found the site's IPv4 address (an A record)"
    pattern: "\\bIN\\s+A\\s+\\d{1,3}(\\.\\d{1,3}){3}"
  - label: "curl opened a TCP connection on port 443"
    pattern: "Connected to .+ port 443"
  - label: "curl negotiated TLS"
    pattern: "SSL connection using TLS|TLS handshake"
  - label: "curl sent the request line"
    pattern: "^> GET / HTTP"
  - label: "the server answered 200"
    pattern: "^< HTTP/[0-9.]+ 200"
---

## Goal

See every step between typing a URL and getting a page: the DNS lookup, the TCP connection, the TLS handshake, then the HTTP request and response.

## Steps

1. Look up the name. The **ANSWER SECTION** is what the resolver returned:

   ```console
   dig example.com A
   ```

2. Make the request and watch each step:

   ```console
   curl -v https://example.com -o /dev/null
   ```

3. In the curl output, find the line where the connection opens, the TLS lines, the request you sent (`>`) and the response you got (`<`).

## Evidence

Paste the output of both commands, one after the other.
