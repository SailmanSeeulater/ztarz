---
title: "Normalising, and denormalising on purpose"
module: f6
type: concept
source: "https://en.wikipedia.org/wiki/Denormalization"
tags: ["sql", "schema", "modelling"]
---

## Prompt

What does normalising a schema buy you, and when would you denormalise on purpose?

## Answer

**Normalised:** each fact is stored once. A customer's email lives in `customers`; orders hold a `customer_id`. An update touches one row, and there are no copies to drift apart. The cost is joins on reads.

**Denormalise on purpose** when a specific, hot read is slow because of joins or aggregates, for example by storing `order_count` on `users`. The cost moves to writes: every write must update the copy too, and one missed path leaves the data inconsistent. Under heavy writes it can end up slower than the normalised design.

Normalise first, measure, then denormalise one read path with a plan for keeping it consistent. Prefer letting the database keep the copy, with a materialized view or a trigger, over hand-written sync code.
