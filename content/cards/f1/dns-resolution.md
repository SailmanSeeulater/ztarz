---
title: "How a name becomes an IP"
module: f1
type: concept
source: "https://aws.amazon.com/route53/what-is-dns/"
tags: ["dns"]
---

## Prompt

How does a name like `api.example.com` turn into an IP address?

## Answer

1. **Caches first:** the browser, then the OS (which also reads `/etc/hosts`).
2. **Recursive resolver:** your ISP's, or a public one like 1.1.1.1. It does the legwork:
   - asks a **root** server, which points to the `.com` **TLD** servers;
   - asks a `.com` server, which points to example.com's **authoritative** nameservers;
   - asks the authoritative server, which returns the record: `A` (IPv4), `AAAA` (IPv6), or a `CNAME` to follow.
3. Every answer is cached for its **TTL**. That's why a DNS change "takes time to propagate": old answers live on until they expire. Lower the TTL before a planned move.
