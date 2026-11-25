---
title: "Unit tests, integration tests and a test database"
module: backend
type: out-loud
source: "https://martinfowler.com/articles/practical-test-pyramid.html"
tags: ["testing", "databases", "integration-tests"]
stack: ["postgresql"]
---

## Prompt

How do you split unit and integration tests for a backend service, and what do the integration tests run against?

## Model answer

**Unit tests** are the bulk: fast tests of pricing rules, validation and mapping, with collaborators swapped for test doubles. No database, no network, milliseconds each.

**Integration tests** cover the places where data crosses a boundary: database queries, HTTP clients, queues. For the database I run the same Postgres version as production, in Docker, with the real migrations applied. Not SQLite or an in-memory stand-in, because then you're testing a different database. Each test starts clean, either inside a transaction that's rolled back or by truncating tables, so tests don't depend on each other's data.

External APIs get a fake server in integration tests, and contract tests keep that fake honest. Never point automated tests at a production system. On top sit a few end-to-end tests for the critical paths: fewer tests the higher you go.
