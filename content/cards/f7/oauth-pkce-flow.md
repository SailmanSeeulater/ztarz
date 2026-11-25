---
title: "OAuth authorization code with PKCE"
module: f7
type: concept
source: "https://www.rfc-editor.org/rfc/rfc7636"
tags: ["oauth", "auth", "security"]
stack: ["oauth"]
---

## Prompt

List the steps of the OAuth 2.0 authorization-code flow with PKCE, in order.

## Answer

1. The client makes a random `code_verifier` (43 to 128 characters) and derives `code_challenge = BASE64URL(SHA256(verifier))`.
2. It redirects the user to the authorization server with `response_type=code`, `client_id`, `redirect_uri`, `scope`, `state`, `code_challenge` and `code_challenge_method=S256`.
3. The user signs in and consents. The server stores the challenge with a short-lived, one-time authorization code.
4. The server redirects back to `redirect_uri?code=...&state=...`. The client checks `state` matches what it sent.
5. The client POSTs the `code`, `redirect_uri` and the original `code_verifier` to the token endpoint.
6. The server hashes the verifier and compares it with the stored challenge. If they match it returns the tokens; if not, `invalid_grant`.

Why PKCE: an attacker who intercepts the code in the redirect doesn't have the verifier, so the code is useless to them. It's what lets public clients (SPAs, mobile apps) use the code flow without a client secret.
