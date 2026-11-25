---
title: "When MongoDB fits better than Postgres"
module: backend
type: out-loud
source: "https://www.mongodb.com/docs/manual/data-modeling/"
tags: ["databases", "nosql", "data-modeling", "tradeoffs"]
stack: ["mongodb", "postgresql"]
---

## Prompt

ACID versus BASE: when would you choose a document database like MongoDB over Postgres?

## Model answer

**ACID** (atomic, consistent, isolated, durable) is the relational promise: a transaction across many rows and tables either fully happens or doesn't. **BASE** (basically available, soft state, eventually consistent) describes many distributed NoSQL stores, which accept stale reads for a while in exchange for availability and easy scaling.

MongoDB's core idea is that data accessed together is stored together. An order with its line items, or a product with its own set of attributes, lives in one document and comes back in one read. The schema is flexible, so documents can gain fields without a migration, and you can still add schema validation.

It fits when your data comes in self-contained aggregates that you read and write as a unit and whose shape varies or changes often: catalogues, content, event payloads. Postgres fits when the data is highly relational, with many joins, constraints across entities and ad hoc reporting. It's the safer default, and `jsonb` covers the occasional flexible field.
