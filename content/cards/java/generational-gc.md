---
title: "How Java's garbage collector decides what to free"
module: java
type: out-loud
source: "https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/generations.html"
tags: ["java", "jvm", "garbage-collection", "memory"]
stack: ["java"]
---

## Prompt

Explain, at a high level, how the JVM's garbage collector works and why it splits the heap into generations.

## Model answer

You never free memory in Java. An object becomes garbage when no running code can reach it any more: there's no chain of references to it from live threads, static fields and so on. The collector finds the reachable objects and reclaims the rest.

Scanning the whole heap every time would be slow, so collectors exploit the **weak generational hypothesis**: most objects die young. New objects are allocated in the **young generation**. When it fills, a quick **minor collection** reclaims it; since most objects there are already dead, little needs copying. Objects that survive several minor collections are promoted to the **old generation**, which is collected less often and more expensively.

In practice: short-lived allocations are cheap, a leak in Java means something still holds a reference (a growing static map, say), and long pauses usually point at old-generation pressure.
