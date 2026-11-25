---
title: "final, static and what they don't mean"
module: java
type: mcq
source: "https://docs.oracle.com/javase/specs/jls/se21/html/jls-4.html#jls-4.12.4"
tags: ["java", "final", "static", "immutability"]
stack: ["java"]
choices:
  - text: "It doesn't compile, because a `final` list can't be modified"
    why: "`final` applies to the variable, not the object it points to. `add` is allowed."
  - text: "It compiles, but `add` throws `UnsupportedOperationException`"
    why: "That's what `List.of(...)` or `Collections.unmodifiableList` would do. A plain `ArrayList` accepts the add."
  - text: "Each instance of the class gets its own copy of `NAMES`"
    why: "`static` means one field shared by the class, not one per instance."
  - text: "It compiles and works: `final` stops `NAMES` being reassigned, but the `ArrayList` it refers to can still change, and `static` means all instances share that one list"
    correct: true
    why: "For a truly constant collection, use `List.of(...)`, which is unmodifiable."
---

## Prompt

What happens here?

```java
class Registry {
  static final List<String> NAMES = new ArrayList<>();
  void register(String n) { NAMES.add(n); }
}
```
