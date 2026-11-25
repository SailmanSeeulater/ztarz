---
title: "CAP and PACELC in plain terms"
module: swe
type: concept
source: "https://en.wikipedia.org/wiki/PACELC_design_principle"
tags: ["system-design", "consistency", "distributed-systems"]
---

## Prompt

Explain CAP and PACELC in plain terms.

## Answer

**CAP:** when the network splits your nodes into groups that can't talk (a partition), each node has to choose. It can refuse requests it can't be sure are up to date (**consistency**), or answer with what it has, possibly stale (**availability**). You can't have both during the split. Without a partition, you can have both, so the useful question isn't "pick two of three" but "what does each node do when a partition occurs?"

**PACELC** adds the normal case. **If** there's a **P**artition, choose **A** or **C**; **E**lse, choose between **L**atency and **C**onsistency. Even on a healthy network, waiting for replicas to confirm every write makes it slower.

Examples: Cassandra and default Dynamo-style stores favour availability and low latency (PA/EL) and are eventually consistent. A single-leader Postgres setup favours consistency (PC/EC). In practice you choose per operation: a bank balance wants strong consistency; a like counter can be eventually consistent.
