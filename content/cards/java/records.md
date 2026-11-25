---
title: "What a record gives you"
module: java
type: concept
source: "https://openjdk.org/jeps/395"
tags: ["java", "records", "immutability"]
stack: ["java"]
---

## Prompt

What does `record Point(int x, int y) {}` generate, and what can't a record do?

## Answer

A record is a transparent carrier for immutable data. From that one line you get:

- `private final` fields `x` and `y`
- a canonical constructor taking both
- accessors `x()` and `y()` (not `getX()`)
- `equals`, `hashCode` and `toString` based on the components

You can add methods, static members, and a compact constructor to validate arguments. You can't add instance fields beyond the components, can't extend another class (records implicitly extend `java.lang.Record`), and the class is implicitly `final`.
