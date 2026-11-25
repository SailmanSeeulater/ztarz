---
title: "Running a system design interview answer"
module: swe
type: out-loud
source: "https://sre.google/workbook/non-abstract-design/"
tags: ["system-design", "interview"]
---

## Prompt

You're asked to design a system in 45 minutes. Walk through how you structure the answer.

## Model answer

**1. Requirements (5 min).** I ask what the system must do and for whom, then the non-functional side: how many users, read/write ratio, latency target, how fresh the data must be, and what can be lost. I write the answers down as numbers, ideally as SLOs, because every later choice is judged against them.

**2. Estimates (5 min).** Requests per second, average and peak, storage per year and bandwidth. Rough is fine; the point is to know whether this fits on one machine or not.

**3. API.** Three to five endpoints with their inputs and outputs, so we agree what "done" means.

**4. Data model.** The main entities, their keys, and the access patterns that decide the store and the indexes.

**5. High-level design.** First a version that works on one machine, then I scale it: load balancer, stateless app servers, database with replicas, cache, queue for slow work.

**6. Deep dives.** I pick the parts that break first: the hot path, the bottleneck from my estimates, what happens when a node or a whole zone fails. Then I check the design against each requirement and name the trade-offs I made and what I'd change at 10x.

Throughout, I say my assumptions out loud and ask which area the interviewer wants to go deeper on.
