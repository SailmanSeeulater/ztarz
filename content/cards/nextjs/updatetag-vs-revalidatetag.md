---
title: "updateTag or revalidateTag?"
module: nextjs
type: mcq
source: "https://nextjs.org/docs/app/api-reference/functions/updateTag"
tags: ["nextjs", "caching", "server-actions"]
stack: ["nextdotjs"]
choices:
  - text: "`revalidateTag(\"posts\", \"max\")`, because it's the only one allowed in a Server Action"
    why: "Both work in Server Actions. With `max`, the next visitor may still see the stale list while it refreshes."
  - text: "`updateTag(\"posts\")`: it expires the tag immediately so the next request waits for fresh data"
    correct: true
    why: "It's built for read-your-own-writes in Server Actions. `revalidateTag` with `max` serves stale content while revalidating, which suits CMS webhooks in Route Handlers."
  - text: "`revalidatePath(\"/\")`, because tags can't be used with `use cache`"
    why: "Tags are set with `cacheTag` inside `use cache` functions, and that's what both tag functions target."
  - text: "Nothing: Server Actions refresh every cache automatically"
    why: "You have to say which data changed. Nothing is invalidated without a call."
---

## Prompt

A Server Action creates a post. The author must see it in the list right after the redirect. The list is cached with `cacheTag("posts")`. Which call?
