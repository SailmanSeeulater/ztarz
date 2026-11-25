---
title: "Check your own site's HTTPS from the outside"
module: f8
minutes: 15
source: "https://letsencrypt.org/docs/challenge-types/"
stack: ["letsencrypt", "nginx", "curl"]
checks:
  - label: "the certificate was issued by Let's Encrypt"
    pattern: "issuer:.*Let's Encrypt"
  - label: "you can see when it expires"
    pattern: "expire date:"
  - label: "nginx passed the request to the app and it answered 200"
    pattern: "^< HTTP/[0-9.]+ 200"
  - label: "plain HTTP redirects to HTTPS"
    pattern: "^HTTP/[0-9.]+ 301"
---

## Goal

Confirm, from outside the server, that your deployed app serves a valid certificate, answers through the reverse proxy, and never serves plain HTTP.

## Steps

1. Look at the certificate and the response (use your own domain):

   ```console
   curl -sv https://your-domain.example/api/health -o /dev/null 2>&1 | grep -E "issuer:|expire date:|^< HTTP"
   ```

2. Check that plain HTTP is redirected:

   ```console
   curl -sI http://your-domain.example | head -1
   ```

3. When does the certificate expire, and what renews it before then?

## Evidence

Paste the output of both commands.
