---
title: "Refreshing data after a mutation"
module: frontend
type: mcq
source: "https://nextjs.org/docs/app/getting-started/revalidating"
tags: ["nextjs", "caching", "trpc"]
choices:
  - text: "`revalidatePath` or `revalidateTag` (or `updateTag` in a Server Action)"
    correct: true
    why: "With tRPC's TanStack integration, invalidate the client cache instead: `queryClient.invalidateQueries({ queryKey: trpc.x.queryKey() })`."
  - text: "`useEffect` with `[]`"
    why: "Runs once on mount; it won't refetch after a mutation."
  - text: "`window.location.reload()`"
    why: "Throws away all client state for a full page load."
  - text: "Delete the `.next` folder"
    why: "That's the build output, not a runtime cache."
---

## Prompt

After a mutation, how do you refresh server-rendered data?
