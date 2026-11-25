---
title: "pgvector: HNSW vs IVFFlat"
module: ai
type: comparison
source: "https://github.com/pgvector/pgvector#indexing"
tags: ["vector-database", "indexing", "rag"]
stack: ["pgvector", "postgresql"]
---

## What it is

Two approximate nearest-neighbour index types in pgvector. Without an index, pgvector scans every row: perfect recall, but slow at scale. Either index trades some recall for speed, so results can change once you add one.

## How it models the problem

- **HNSW** builds a layered graph and walks it towards the query vector. Tuned with `m` and `ef_construction` at build time and `hnsw.ef_search` at query time.
- **IVFFlat** clusters vectors into `lists`, then searches only the `probes` lists closest to the query. Tuned with `lists` at build time and `ivfflat.probes` at query time.

## Where it shines

- **HNSW:** better speed for a given recall. It has no training step, so you can create it on an empty table and it stays good as rows arrive.
- **IVFFlat:** builds faster and uses less memory, which helps with large tables and tight RAM.

## Where it bites

- **HNSW:** slower to build and uses more memory.
- **IVFFlat:** lower recall at the same speed. Build it after the table has data, since the lists are learned from existing rows. Start with about `rows / 1000` lists (up to 1M rows) and `sqrt(lists)` probes. The default of one probe is low.
- **Both:** one index per distance function (`vector_cosine_ops` only serves `<=>`), and `WHERE` filters run after the index scan, so filtered queries can return fewer rows than `LIMIT`.

## What interviewers ask

"Which would you start with?" HNSW for most apps, unless build time or memory is the constraint. "Why did results change after adding the index?" Because it's approximate: raise `ef_search` or `probes` to win back recall at the cost of speed.
