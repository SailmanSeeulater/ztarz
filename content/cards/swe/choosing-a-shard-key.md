---
title: "Choosing a shard key"
module: swe
type: mcq
source: "https://learn.microsoft.com/en-us/azure/architecture/patterns/sharding#shard-key-selection"
tags: ["system-design", "sharding", "databases"]
choices:
  - text: "`created_at`"
    why: "It increases steadily, so every new order lands on the newest shard: a write hotspot. Tenant queries would also span many shards."
  - text: "`status`"
    why: "A handful of values can't spread data across many shards, and it changes, which would move rows between shards on every update."
  - text: "The auto-increment `id`"
    why: "Sequential values cause hotspots under range sharding, auto-increment can't coordinate across shards, and \"orders for tenant X\" would have to query every shard."
  - text: "`tenant_id`, hashed or mapped through a lookup table"
    correct: true
    why: "It never changes, has many values, and matches the main query, so most requests touch one shard. A lookup table also lets you move a very large tenant to its own shard."
---

## Prompt

You're sharding the `orders` table of a multi-tenant SaaS app. Almost every query is "orders for tenant X". Which shard key fits best?

## Notes

A good shard key is stable, has high cardinality, spreads load evenly, and keeps the common query on one shard. Changing it later means migrating all the data, so it's the decision to get right first.
