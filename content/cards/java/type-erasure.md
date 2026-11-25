---
title: "Generics and type erasure"
module: java
type: mcq
source: "https://docs.oracle.com/javase/tutorial/java/generics/erasure.html"
tags: ["java", "generics", "type-erasure"]
stack: ["java"]
choices:
  - text: "`false`, because each parameterised type gets its own class at runtime"
    why: "That's how C++ templates work. Java compiles one `ArrayList` class and erases the type argument."
  - text: "It doesn't compile, because you can't compare classes of different generic types"
    why: "It compiles: both expressions have the raw runtime type `Class<? extends ArrayList>`."
  - text: "`true`, because the compiler erases type parameters to their bounds (or `Object`) and inserts casts, so both are just `ArrayList` at runtime"
    correct: true
    why: "Generic types are checked at compile time only. That's also why you can't write `new T()` or `x instanceof List<String>`."
  - text: "`true`, but only because both lists are empty"
    why: "Contents don't matter. The class is the same whatever the lists hold."
---

## Prompt

What does this print?

```java
var names = new ArrayList<String>();
var ids = new ArrayList<Integer>();
System.out.println(names.getClass() == ids.getClass());
```
