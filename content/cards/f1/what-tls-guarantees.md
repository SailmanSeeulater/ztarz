---
title: "What HTTPS does and doesn't protect"
module: f1
type: concept
source: "https://developer.mozilla.org/en-US/docs/Web/Security/Transport_Layer_Security"
tags: ["tls", "https", "security"]
---

## Prompt

What does HTTPS (TLS) protect, and what doesn't it?

## Answer

**Protects:**

- **Confidentiality:** traffic is encrypted, so nobody on the path can read it.
- **Integrity:** tampering in transit is detected.
- **Server authentication:** the certificate, signed by a CA the browser trusts, proves you're talking to that hostname.

**Doesn't:**

- Hide which IP you connect to, the size and timing of traffic, or usually the hostname (it's sent in the clear in SNI unless Encrypted Client Hello is used).
- Make the site trustworthy. Phishing sites get certificates too; the padlock means "private connection", not "safe site".
