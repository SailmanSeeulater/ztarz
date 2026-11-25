---
title: "Versioning a public API"
module: backend
type: out-loud
source: "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design#implement-versioning"
tags: ["api-design", "versioning", "rest"]
---

## Prompt

You need to make a breaking change to a public API. How do you version it?

## Model answer

First, check it's really breaking. Adding an optional field or a new endpoint isn't; renaming or removing a field, or changing its meaning, is.

The common options:

- **In the URI:** `/v2/customers/3`. Simple, visible in logs, and cache-friendly. The catch: one resource now lives at two URLs, and every link must carry the version.
- **Query string:** `/customers/3?version=2`, defaulting to 1 when it's missing. Same URL per resource.
- **Custom header:** `Api-Version: 2`. Clean URLs, but clients must remember it and caches must vary on it.
- **Media type:** `Accept: application/vnd.example.v2+json`. The most "RESTful", and the hardest for clients and caches.

For a public API I'd pick the URI: everyone understands it. Then run v1 and v2 side by side, announce a deprecation date, and watch v1 traffic before removing it.
