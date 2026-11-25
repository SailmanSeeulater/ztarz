---
title: "Let's Encrypt renewal and HTTP-01"
module: f8
type: concept
source: "https://letsencrypt.org/docs/challenge-types/#http-01-challenge"
tags: ["tls", "certificates", "ops"]
stack: ["letsencrypt", "certbot", "nginx"]
---

## Prompt

What does certbot renew, how often, and how does the HTTP-01 challenge prove you control the domain?

## Answer

- **What:** the certificate. Let's Encrypt certificates are short-lived (90 days by default), so renewal is the normal state, not an emergency.
- **How often:** a systemd timer or cron job runs `certbot renew` regularly. It only renews certificates near expiry (the last third of their lifetime). `certbot renew --dry-run` tests the whole path.
- **HTTP-01:** the client gets a token, then serves a file at `http://<domain>/.well-known/acme-challenge/<token>`. Let's Encrypt fetches it on port 80, from several places. A match proves you control what the domain serves.

Renewal repeats validation, so port 80 must stay reachable even when everything else redirects to HTTPS.
