---
title: "A CNAME at the bare domain"
module: devops
type: mcq
source: "https://www.rfc-editor.org/rfc/rfc1912#section-2.4"
tags: ["dns", "networking"]
choices:
  - text: "CNAMEs only work for subdomains longer than three letters"
    why: "There's no length rule. `www` is a perfectly good CNAME name."
  - text: "A CNAME can't share a name with any other record, and the apex must hold SOA and NS records"
    correct: true
    why: "A CNAME says 'this name is an alias, look over there for everything', so it can't coexist with other data. Use A/AAAA at the apex, or your provider's ALIAS/flattening feature."
  - text: "CNAMEs can only point to IP addresses, not hostnames"
    why: "Backwards. A and AAAA hold addresses; a CNAME always points to another name."
  - text: "The apex can have a CNAME, but only if the TTL is under 300 seconds"
    why: "TTL doesn't change which record types may coexist."
---

## Prompt

Your host says "point your domain at `app.host-example.net`". `www.example.com CNAME app.host-example.net` works, but the DNS panel refuses `example.com CNAME app.host-example.net`. Why?
