---
title: "Caching from the browser to the database"
module: fullstack
type: out-loud
source: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching"
tags: ["caching", "http", "performance"]
---

## Prompt

Walk through where a response can be cached between the user and the database, and the mistake to avoid.

## Model answer

The browser's private cache, controlled by `Cache-Control`, saves the request entirely. A shared cache such as a CDN or reverse proxy serves many users from the edge. On the server, the framework's data cache or an in-memory store like Redis saves recomputing or re-querying. The database keeps hot pages in memory too.

Each layer needs its own invalidation story, and the closer to the user, the harder it is to purge. The classic mistake is letting a personalised response into a shared cache, so one user sees another's page. Mark those responses `Cache-Control: private`; a cookie on the request doesn't do that for you.
