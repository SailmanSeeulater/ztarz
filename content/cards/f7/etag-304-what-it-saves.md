---
title: "What a 304 actually saves"
module: f7
type: mcq
source: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/ETag"
tags: ["http", "caching", "etag"]
choices:
  - text: "The round trip: the browser answered from its cache without asking"
    why: "That's a fresh response within `max-age`. `If-None-Match` is sent to the server, so it costs a round trip."
  - text: "The database query, always"
    why: "Only if the ETag can be worked out without it. If you hash the rendered response, the server runs the full query first."
  - text: "Sending the body; the request still reached the server, which had to work out the current ETag"
    correct: true
    why: "A 304 has no body, so it saves bandwidth. Make the ETag cheap, e.g. from a version number or `updated_at`, so the server can answer 304 without building the response."
  - text: "Nothing: after a 304 the client must refetch with a plain GET"
    why: "A 304 tells the client its stored copy is still current, so it reuses it."
---

## Prompt

`GET /api/decks/42` returned `ETag: "v17"`. Later the client sends the same request with `If-None-Match: "v17"` and gets `304 Not Modified`. What did the 304 save?
