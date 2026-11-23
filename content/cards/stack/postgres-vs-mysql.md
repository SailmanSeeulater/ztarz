---
title: Postgres vs MySQL
module: stack
type: comparison
source: https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html
tags: [databases, sql, f6]
---

## What it is

Both are open-source relational databases with SQL, transactions, replication and decades of production use. MySQL here means its default storage engine, **InnoDB**.

## How it models the problem

- **Postgres:** a feature-rich, extensible engine. MVCC keeps old row versions in the table, cleaned up by `VACUUM`. Tables are heaps; every index, including the primary key, points into the heap.
- **MySQL (InnoDB):** the table *is* a **clustered index** on the primary key; rows are stored in PK order. Secondary indexes store the PK value, so a lookup by secondary index then walks the PK index.

## Where it shines

- **Postgres:** rich types (`jsonb`, arrays, ranges), partial and expression indexes, **transactional DDL** (a failed migration rolls back cleanly), and extensions such as **pgvector** and PostGIS.
- **MySQL:** simple to operate, very fast primary-key lookups and range scans thanks to clustering, and huge hosting and tooling support.

## Where it bites

- **Postgres:** `VACUUM` and table bloat need attention under heavy update load, and each connection is a process, so you need a pooler (PgBouncer) at scale.
- **MySQL:** random primary keys (UUIDv4) scatter inserts across the clustered index, causing page splits; prefer auto-increment or time-ordered IDs (UUIDv7). DDL isn't transactional across statements, so a half-applied migration has to be fixed by hand.

## What interviewers ask

- *Why might a UUID primary key hurt in MySQL but matter less in Postgres?* Clustered index vs heap.
- *Which would you pick for a RAG feature?* Postgres with pgvector keeps embeddings next to the relational data.
- *What happens if a migration fails halfway?* Postgres can roll the whole thing back in a transaction; MySQL can't.
