---
title: "Adding a title to a \"use client\" page"
module: nextjs
type: mcq
source: "https://nextjs.org/docs/app/api-reference/functions/generate-metadata"
tags: ["nextjs", "metadata", "seo"]
stack: ["nextdotjs"]
choices:
  - text: "Export `metadata` from the client page; Next.js reads it at build time"
    why: "The `metadata` export and `generateMetadata` are only supported in Server Components."
  - text: "Set `document.title` in a `useEffect`"
    why: "The title would only appear after hydration, so crawlers and link previews reading the HTML miss it."
  - text: "Keep `page.tsx` a Server Component that exports `metadata`, and move the interactive part into a separate Client Component it renders"
    correct: true
    why: "Metadata is resolved on the server before the page renders, so it's in the initial HTML. The client logic still works inside the imported component."
  - text: "Put a `<title>` tag inside a `<Head>` component from `next/head`"
    why: "`next/head` belongs to the Pages Router. The App Router uses the Metadata API."
---

## Prompt

`app/settings/page.tsx` starts with `"use client"` and needs a page title for SEO and link previews. What's the right approach?
