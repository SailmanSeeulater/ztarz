---
title: "Design a URL shortener"
module: swe
type: out-loud
source: "https://en.wikipedia.org/wiki/URL_shortening"
tags: ["system-design", "interview", "url-shortener"]
---

## Prompt

Design a URL shortener. Talk it through.

## Model answer

**Requirements.** Create a short link for a long URL; visiting it redirects. Optional: custom aliases, expiry, click counts. It's read-heavy, say 100 redirects per link created. Redirects should be fast and almost never fail.

**Estimates.** 100M new links a month is about 40 writes/s, so roughly 4,000 redirects/s on average. At ~500 bytes a row, five years is 6 billion rows, about 3 TB.

**API.** `POST /links {url, alias?, expiresAt?}` returns the code. `GET /{code}` returns a redirect.

**Keys.** Base62 (a-z, A-Z, 0-9): 7 characters give 62^7, about 3.5 trillion codes. Two ways to make them: encode a unique ID from a counter (no collisions, but codes are guessable, so hand each server its own ID range or scramble the ID), or pick random codes and retry on a unique-constraint clash.

**Data.** One table: `code` (primary key), `long_url`, `owner`, `created_at`, `expires_at`. A key-value lookup by code; Postgres or any key-value store handles it.

**Redirect.** A 302 means every click reaches us and can be counted. A 301 is permanent, so browsers may cache it and skip us next time: cheaper, but we lose analytics.

**Scale.** Stateless app servers behind a load balancer, a Redis cache for hot codes (a few links get most clicks), and read replicas. Count clicks asynchronously through a queue so the redirect path does one cache read.

**Abuse.** Rate-limit link creation and check target URLs against malware lists.
