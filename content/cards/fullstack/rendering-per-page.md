---
title: "Choosing rendering page by page"
module: fullstack
type: mcq
source: "https://web.dev/articles/rendering-on-the-web"
tags: ["rendering", "ssr", "static", "csr"]
choices:
  - text: "Render every page on the server per request, for consistency."
    why: "It works, but pays server time on every pricing view for HTML that never changes. Static output can be served from a CDN."
  - text: "Client-render everything; one approach is simpler."
    why: "More JavaScript, a slower first paint and weaker SEO for the pricing page. Client rendering suits the interactive parts."
  - text: "Pricing static; account page rendered on the server per request; the board editor client-rendered inside a server-rendered shell."
    correct: true
    why: "Static for content that's the same for everyone, server rendering for personalised data, client rendering for heavy interactivity."
  - text: "Make the account page static and regenerate it hourly."
    why: "One static file is shared by every visitor, so it can't hold one user's details."
---

## Prompt

An app has a pricing page (same for everyone, changes on deploy), an account page (per user), and a drag-and-drop board editor. Which rendering split fits?
