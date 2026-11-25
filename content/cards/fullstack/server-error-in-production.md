---
title: "A server error reaching the browser in production"
module: fullstack
type: mcq
source: "https://nextjs.org/docs/app/api-reference/file-conventions/error"
tags: ["error-handling", "nextjs", "security"]
stack: ["nextdotjs"]
choices:
  - text: "The original message, so the user can report it."
    why: "That's development behaviour. In production the message could leak internals such as table names or credentials."
  - text: "A generic message plus `error.digest`, an id you can match in the server logs."
    correct: true
    why: "The detail stays on the server; the digest lets support find the real error. Expected failures, such as validation errors, are better returned as values than thrown."
  - text: "Nothing; the boundary only catches errors thrown in Client Components."
    why: "`error.tsx` also receives errors forwarded from Server Components."
  - text: "The full stack trace, but only when the user is signed in."
    why: "Next doesn't vary error detail by auth state; it strips it for everyone in production."
---

## Prompt

A Server Component throws `new Error('password rejected for role app_rw')`. In production, what does the segment's `error.tsx` receive?
