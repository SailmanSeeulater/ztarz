---
title: "Where form validation belongs"
module: fullstack
type: mcq
source: "https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html"
tags: ["validation", "forms", "security"]
stack: ["zod"]
choices:
  - text: "Nothing. The browser already rejects bad input, so the server can trust it."
    why: "Anyone can skip the form and call the endpoint with curl or devtools. Client-side checks are bypassable."
  - text: "Drop the browser checks and validate only on the server."
    why: "Safe, but worse UX: users wait a round trip to learn a field is empty. Keep both."
  - text: "Client checks are for quick feedback; the server must validate again, because it's the only check a caller can't skip."
    correct: true
    why: "Share one Zod schema between both so the rules can't drift, and treat the server's result as the truth."
  - text: "Rely on database constraints instead of validating in code."
    why: "Constraints are a good last line, but they give poor error messages and can't express most business rules."
---

## Prompt

A signup form checks the email with `required`, `type="email"` and a Zod schema in the browser. The Server Action writes the fields straight to the database. What's wrong?
