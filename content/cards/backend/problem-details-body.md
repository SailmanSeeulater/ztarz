---
title: "Reading a problem details error"
module: backend
type: mcq
source: "https://www.rfc-editor.org/rfc/rfc9457"
tags: ["http", "errors", "api-design"]
choices:
  - text: "`detail` is the right place for the stack trace, so clients can debug"
    why: "`detail` should help the client fix this occurrence, not debug your server. Stack traces leak internals."
  - text: "Adding a `limit` field breaks the format"
    why: "Extension members are allowed. Clients must ignore ones they don't recognise."
  - text: "The status line could be `200 OK` as long as `status` says 403"
    why: "The `status` member is advisory and must match the real HTTP status."
  - text: "`type` identifies the kind of problem; clients should branch on it, not on `title`"
    correct: true
    why: "`type` is the primary identifier (it defaults to `about:blank`). `title` is a human summary that may be translated."
---

## Prompt

An API returns this error. Which statement is true?

```http
HTTP/1.1 403 Forbidden
Content-Type: application/problem+json

{
  "type": "https://api.example.com/problems/plan-limit",
  "title": "Plan limit reached",
  "status": 403,
  "detail": "Your plan allows 3 projects and you have 3.",
  "instance": "/projects"
}
```
