---
title: "Why consistent hashing"
module: swe
type: concept
source: "https://en.wikipedia.org/wiki/Consistent_hashing"
tags: ["system-design", "sharding", "caching"]
---

## Prompt

Why spread keys across cache servers with consistent hashing instead of `hash(key) % N`?

## Answer

With `% N`, changing N (adding a server, or one dying) remaps nearly every key. The cache suddenly misses almost everything and the database takes the full load.

Consistent hashing places servers and keys on the same ring of hash values. Each key belongs to the next server clockwise. Adding or removing a server only moves the keys in its slice of the ring: about 1/n of them for n servers.

Each physical server usually gets many **virtual nodes** spread around the ring. That evens out the share each server owns, lets a bigger server take more by having more nodes, and spreads a failed server's keys across many others instead of doubling the load on one neighbour.
