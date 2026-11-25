---
title: "Pub/sub vs a work queue"
module: swe
type: comparison
source: "https://learn.microsoft.com/en-us/azure/architecture/patterns/competing-consumers"
tags: ["system-design", "messaging", "queues"]
---

## What it is

Two ways to deliver messages through a broker. In a **work queue** (competing consumers), many workers read one queue and each message goes to exactly one of them. In **pub/sub**, a publisher sends to a topic and every subscriber gets its own copy.

## How it models the problem

A work queue models a pile of jobs to share out: resize this image, send this email. Pub/sub models an announcement: "order 42 was placed", and anyone interested reacts. Each subscriber usually has its own queue behind the topic, often with several competing workers on it, so you combine the two.

## Where it shines

- **Work queue:** scaling out background work. Add workers to drain faster; a crashed worker's message goes back to the queue for another one.
- **Pub/sub:** decoupling. Email, analytics and inventory can all react to `order.placed` without the order service knowing they exist, and a new consumer is just a new subscription.

## Where it bites

- **Work queue:** no ordering guarantee across workers; poison messages need a dead-letter queue.
- **Pub/sub:** harder to trace a flow end to end; schema changes reach consumers you may not know about.
- **Both:** delivery is usually at least once, so consumers must be idempotent.

## What interviewers ask

"Three teams need to react to every new order, and the email step is slow. How do you wire it?" A topic with one subscription per team (pub/sub), and the email team runs several workers competing on its subscription's queue (work queue).
