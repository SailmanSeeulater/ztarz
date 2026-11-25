---
title: "Stopping CSRF"
module: f9
type: mcq
source: "https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html"
tags: ["security", "csrf", "cookies"]
choices:
  - text: "`SameSite=Lax` or `Strict` on the cookie, and reject state-changing requests whose `Origin` isn't yours"
    correct: true
    why: "SameSite keeps the cookie off most cross-site requests; the Origin check catches what's left. `Lax` still sends cookies on top-level GET navigations, so GET must never change state."
  - text: "Mark the session cookie `HttpOnly`"
    why: "That stops scripts reading the cookie. The browser still attaches it to the forged request."
  - text: "Accept only POST for this endpoint"
    why: "State changes shouldn't use GET, but a cross-site form can POST too."
  - text: "Allow CORS only from your own origin"
    why: "CORS controls who can read a response. A plain form POST is still sent, with cookies, and the server acts on it."
---

## Prompt

Your app signs users in with a session cookie. A page on another site auto-submits a hidden form to `https://app.example/settings/email`. The browser sends the user's cookie with it. Which defences stop this?
