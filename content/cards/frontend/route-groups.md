---
title: "Folders in parentheses"
module: frontend
type: mcq
source: "https://nextjs.org/docs/app/api-reference/file-conventions/route-groups"
tags: ["nextjs", "routing"]
stack: ["nextdotjs"]
choices:
  - text: "`/(dashboard)/settings`"
    why: "Parentheses never appear in URLs."
  - text: "It isn't routable"
    why: "It's a normal route; only the group folder is hidden from the path."
  - text: "`/dashboard/settings`"
    why: "The group name is left out of the URL."
  - text: "`/settings`"
    correct: true
    why: "Parentheses make a route group: it organizes files and layouts without appearing in the URL."
---

## Prompt

What URL does `app/(dashboard)/settings/page.tsx` serve?
