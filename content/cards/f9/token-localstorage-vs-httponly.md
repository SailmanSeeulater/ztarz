---
title: "Session token: localStorage or HttpOnly cookie?"
module: f9
type: mcq
source: "https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html#local-storage"
tags: ["security", "xss", "csrf", "cookies"]
stack: ["jsonwebtokens", "owasp"]
choices:
  - text: "localStorage is safer: it isn't sent automatically, so neither XSS nor CSRF can touch it"
    why: "It does avoid CSRF. But any script on the page can read it, so one XSS steals the token."
  - text: "They're equivalent as long as the JWT is signed"
    why: "A signature stops tampering, not theft. A stolen valid token works for whoever holds it."
  - text: "localStorage can be read by any script, so XSS steals it; an `HttpOnly` cookie can't be read by script, but needs CSRF defences"
    correct: true
    why: "The browser attaches cookies automatically, so add `SameSite` and an Origin check. That trade is usually worth it."
  - text: "An `HttpOnly` cookie makes you immune to XSS"
    why: "XSS can't read the cookie, but it can still send requests as the user from inside the page. You still have to prevent XSS."
---

## Prompt

Where should a browser app keep its session token, and what's the trade-off?
