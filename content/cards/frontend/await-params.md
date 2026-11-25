---
title: "Reading a dynamic route param"
module: frontend
type: mcq
source: "https://nextjs.org/docs/app/api-reference/file-conventions/page"
tags: ["nextjs", "routing"]
stack: ["nextdotjs"]
choices:
  - text: "`const { id } = await params`"
    correct: true
    why: "`params` and `searchParams` are Promises since Next 15."
  - text: "`useRouter().query.id` in a Server Component"
    why: "Hooks don't run in Server Components, and `query` is the Pages Router."
  - text: "`params.id` synchronously"
    why: "That was Next 14 and earlier."
  - text: "`getServerSideProps`"
    why: "That's the Pages Router."
---

## Prompt

In Next 15+, how do you read a dynamic route param?
