---
title: "Why fetch on the server"
module: frontend
type: out-loud
source: "https://nextjs.org/docs/app/getting-started/fetching-data"
tags: ["nextjs", "rsc", "data-fetching"]
---

## Prompt

Why not fetch the users in the Client Component?

## Model answer

Fetching in a Server Component means the HTML arrives with the data: no loading flash, no fetch code in the bundle, and database access and secrets stay on the server. The client only gets the small interactive piece.
