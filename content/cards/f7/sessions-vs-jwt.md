---
title: "Sessions vs JWTs"
module: f7
type: out-loud
source: "https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_Cheat_Sheet.html#not-using-jwts"
tags: ["auth", "sessions", "jwt", "tradeoffs"]
stack: ["jsonwebtokens"]
---

## Prompt

Server-side sessions or JWTs for auth? Compare them.

## Model answer

- **Where state lives:** a session keeps it on the server. The cookie holds only a random id, and each request looks it up in the database or Redis. A JWT carries the state itself: signed claims (user id, roles, expiry) that any service with the key can verify without a lookup.
- **Revocation:** deleting a session row logs the user out at once. A JWT stays valid until `exp`. Killing one early needs a denylist, which is server state again. So keep access tokens short-lived and pair them with a refresh token you can revoke.
- **Size:** a session cookie is a short id. A JWT grows with every claim and rides on every request, and its claims are signed, not encrypted, so anyone holding it can read them.

My default is sessions for a web app talking to its own backend; ztarz uses Better Auth's database sessions. JWTs fit when many services must verify identity without sharing a database, or for short-lived service-to-service tokens.
