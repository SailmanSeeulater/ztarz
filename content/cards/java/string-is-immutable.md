---
title: "The ignored toUpperCase"
module: java
type: bug-hunt
source: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html"
tags: ["java", "strings", "immutability"]
stack: ["java"]
choices:
  - text: "`toUpperCase` needs a `Locale` argument or it does nothing"
    why: "Without a `Locale` it uses the default one. It still returns an upper-cased string."
  - text: "String literals are stored in the string pool, so they can't be changed, but `new String(\"pending\")` could be"
    why: "Every `String` is immutable, pooled or not."
  - text: "`status` must be declared `final` for the change to stick"
    why: "`final` stops reassignment; it doesn't make methods modify the string."
  - text: "Strings are immutable: `toUpperCase` returns a new string, and the code throws it away. Write `status = status.toUpperCase();`"
    correct: true
    why: "No `String` method changes the string it's called on; they all return a new one."
---

## Prompt

This prints `pending`, not `PENDING`. Why?

```java
String status = "pending";
status.toUpperCase();
System.out.println(status);
```

## Explanation

A `String`'s value can't change after it's created, which makes strings safe to share between threads and to use as map keys. The flip side: every "change" builds a new object. Building text with `+=` in a loop creates a new string each time; use a `StringBuilder`, which is a mutable buffer, and call `toString()` once at the end.
