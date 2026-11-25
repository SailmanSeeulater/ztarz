---
title: "The TLS 1.3 handshake"
module: net
type: out-loud
source: "https://www.rfc-editor.org/rfc/rfc8446"
tags: ["tls", "https", "handshake"]
---

## Prompt

Walk through a full TLS 1.3 handshake. Why does it take only one round trip, and what's the catch with 0-RTT?

## Model answer

1. **ClientHello:** the client sends supported versions and cipher suites, plus a **key share**: its half of an (EC)DHE key exchange, guessing which group the server will pick.
2. **ServerHello:** the server picks the parameters and sends its own key share. Both sides can now derive the handshake keys, so everything after this is encrypted.
3. **Server's encrypted flight:** EncryptedExtensions, its **Certificate**, a **CertificateVerify** (a signature over the handshake so far, proving it holds the private key), and **Finished** (a MAC over the whole transcript).
4. **Client:** checks the certificate chain and hostname, verifies the signature and Finished, then sends its own Finished. Application data can go with it.

It's one round trip because the client sends its key share up front instead of waiting to negotiate first. TLS 1.2 needed two.

**0-RTT:** when resuming with a pre-shared key, the client can send data in its very first flight. That early data isn't protected against replay, so only use it for requests that are safe to repeat, like idempotent GETs.
