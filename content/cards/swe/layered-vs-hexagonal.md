---
title: "Layered vs hexagonal (ports and adapters)"
module: swe
type: comparison
source: "https://alistair.cockburn.us/hexagonal-architecture/"
tags: ["architecture", "hexagonal", "layered", "testing"]
---

## What it is

Layered: stack the code as presentation, business logic and data access, each layer calling the one below. Hexagonal: put the application core in the middle and talk to the outside world only through ports (interfaces the core defines), with adapters plugging real technology into them.

## How it models the problem

Layered thinks top to bottom, and the business layer usually ends up depending on the data layer. Hexagonal thinks inside versus outside. Driving adapters (HTTP handlers, a CLI, a test harness) call into the core; driven adapters (Postgres, an email provider) implement ports the core calls out through. Dependencies point inwards.

## Where it shines

Layered: simple CRUD apps, familiar to everyone, little ceremony. Hexagonal: rich business rules, several entry points, and tests that run the core with an in-memory adapter instead of a database.

## Where it bites

Layered: logic leaks into controllers and SQL, and the database becomes hard to fake. Hexagonal: more interfaces and wiring, which is overkill for a thin app over a table.

## What interviewers ask

"How would you test the business logic without a database?" Define a repository port in the core, implement it with Postgres in production and an in-memory fake in tests. That's dependency inversion applied at the architecture level.
