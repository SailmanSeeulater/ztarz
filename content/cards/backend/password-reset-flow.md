---
title: "A safe password reset flow"
module: backend
type: out-loud
source: "https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html"
tags: ["auth", "security", "password-reset"]
stack: ["owasp"]
---

## Prompt

Walk me through a password reset flow you'd trust in production.

## Model answer

1. **Request:** the user enters an email. Always reply "If that account exists, we've sent a link", with the same response time either way, so nobody can probe which emails are registered. Rate-limit requests per account.
2. **Token:** generate a long random token with a cryptographically secure generator. Store it securely (hashed, for example), tied to one user, single-use, expiring soon.
3. **Link:** build it from a configured base URL, never from the request's `Host` header, or an attacker can make you email a link to their domain. Set `Referrer-Policy: no-referrer` on the reset page so the token doesn't leak.
4. **Reset:** change nothing until a valid token arrives. Then set the new password, burn the token, and offer to sign out other sessions.
5. **After:** send them to the normal login rather than signing them in automatically, and never put the new password in an email.
