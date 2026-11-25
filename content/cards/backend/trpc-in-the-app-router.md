---
title: "This page with tRPC"
module: backend
type: out-loud
source: "https://trpc.io/docs/client/tanstack-react-query/server-components"
tags: ["trpc", "nextjs", "tanstack-query"]
stack: ["trpc", "nextdotjs"]
---

## Prompt

How would the users page look with tRPC in the App Router?

## Model answer

On the server, call the procedure through a server-side caller, or prefetch it and hydrate TanStack Query's cache. On the client, `useQuery(trpc.user.list.queryOptions())`. After a mutation, invalidate with `queryClient.invalidateQueries({ queryKey: trpc.user.list.queryKey() })`.
