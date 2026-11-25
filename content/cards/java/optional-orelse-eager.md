---
title: "orElse runs its argument anyway"
module: java
type: bug-hunt
source: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Optional.html"
tags: ["java", "optional", "performance"]
stack: ["java"]
choices:
  - text: "`Optional.of` can't hold a value from a database, use `Optional.ofNullable`"
    why: "`ofNullable` matters when the value might be null; it doesn't change when the fallback is evaluated."
  - text: "`findUser` returns an empty Optional because of a missing `isPresent()` check"
    why: "The user is found; the problem is the extra work done even then."
  - text: "`orElse(x)` evaluates `x` before the call, every time; use `orElseGet(() -> createGuest())` so the fallback only runs when the Optional is empty"
    correct: true
    why: "Java evaluates method arguments eagerly. `orElseGet` takes a `Supplier` it calls only on the empty path."
  - text: "`Optional` caches the fallback, so `createGuest` runs once at start-up"
    why: "There's no caching. It runs on every call, because it's an ordinary method argument."
---

## Prompt

Users are found almost every time, yet `createGuest()` (which inserts a row) runs on every request. Why?

```java
User user = findUser(id).orElse(createGuest());
```

## Explanation

`orElse` takes a value, so Java computes `createGuest()` first and passes the result in, whether or not the Optional has a value. Use `orElse` only for cheap constants like `orElse("")`; for anything with cost or side effects use `orElseGet`, or `orElseThrow` when absence is an error. `Optional` itself is meant mainly as a method return type for "maybe no result", not for fields or parameters.
