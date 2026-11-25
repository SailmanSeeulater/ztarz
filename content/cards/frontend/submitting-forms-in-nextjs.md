---
title: "Submitting a form in Next.js"
module: frontend
type: out-loud
source: "https://nextjs.org/docs/app/guides/forms"
tags: ["nextjs", "forms", "server-actions"]
stack: ["nextdotjs"]
---

## Prompt

How would you submit the intake form in Next.js?

## Model answer

A Server Action or a tRPC mutation that re-validates with the same Zod schema and checks the session (and tenant). Never trust client-side validation alone; it's for UX, not security.
