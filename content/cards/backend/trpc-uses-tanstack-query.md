---
title: "What tRPC's React client is built on"
module: backend
type: mcq
source: "https://trpc.io/docs/client/tanstack-react-query/setup"
tags: ["trpc", "tanstack-query"]
choices:
  - text: "Redux"
    why: "Redux isn't involved."
  - text: "TanStack Query (React Query)"
    correct: true
    why: "tRPC v11 hands you query and mutation options to pass to TanStack Query's own `useQuery` and `useMutation`."
  - text: "Apollo Client"
    why: "Apollo is a GraphQL client."
  - text: "SWR"
    why: "SWR is a different data-fetching library."
---

## Prompt

tRPC's React integration is built on…
