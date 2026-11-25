---
title: "Streams process one element at a time"
module: java
type: what-prints
source: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/package-summary.html"
tags: ["java", "streams", "laziness"]
stack: ["java"]
---

## Prompt

What prints?

```java
String first = Stream.of("a", "b", "c")
    .filter(s -> { System.out.println("filter " + s); return true; })
    .map(s -> { System.out.println("map " + s); return s.toUpperCase(); })
    .findFirst()
    .orElseThrow();
System.out.println(first);
```

## Answer

```text
filter a
map a
A
```

## Explanation

Intermediate operations (`filter`, `map`) are lazy: nothing happens until a terminal operation (`findFirst`) pulls elements through. Each element goes through the whole pipeline before the next one starts, and `findFirst` is short-circuiting, so after `"a"` passes there's no need to look at `"b"` or `"c"`. Without any terminal operation, nothing would print at all.
