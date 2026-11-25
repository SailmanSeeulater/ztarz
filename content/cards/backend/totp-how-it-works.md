---
title: "How a TOTP code is checked"
module: backend
type: concept
source: "https://www.rfc-editor.org/rfc/rfc6238"
tags: ["auth", "mfa", "totp", "security"]
---

## Prompt

How does an authenticator app's six-digit code (TOTP) work, and what must the server do when it checks one?

## Answer

At enrolment the server creates a random secret for that user and shares it with the app, usually as a QR code. From then on both sides compute the same code from the secret and the current time step: `T = floor((unix_time - T0) / 30)`, run through HMAC (SHA-1 by default) and cut down to six digits. No network call is needed.

When checking a code, the server:

- accepts the current step and allows a small, bounded amount of clock drift (about one step);
- rejects a code that has already been used successfully in that window, so a shoulder-surfed code can't be replayed;
- rate-limits attempts, because six digits are guessable by brute force.

The secret can't be hashed like a password: the server needs the real value to compute codes, so it has to be protected like any other key.
