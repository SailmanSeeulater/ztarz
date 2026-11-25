---
title: "When roles aren't enough"
module: backend
type: mcq
source: "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html"
tags: ["authorisation", "security", "rbac", "abac"]
choices:
  - text: "RBAC can only be enforced in the frontend"
    why: "Any model can be enforced on the server, and that is the only place it counts."
  - text: "RBAC is too slow to check on every request"
    why: "A role lookup is cheap. Speed isn't the problem."
  - text: "Roles say who the user is, not how they relate to this invoice; the rule needs attributes of both (ABAC or relationship-based)"
    correct: true
    why: "OWASP generally prefers ABAC or ReBAC for apps. Whatever the model: check on the server, on every request, and deny when no rule matches."
  - text: "RBAC stops working beyond about ten roles"
    why: "There's no fixed limit. Role explosion is a maintenance problem, not a hard cap."
---

## Prompt

The rule is: "a user may edit an invoice if it belongs to their organisation and is still a draft". Why does pure role-based access control (RBAC) struggle with this?
