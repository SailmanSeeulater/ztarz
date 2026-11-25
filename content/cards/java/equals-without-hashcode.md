---
title: "equals without hashCode"
module: java
type: bug-hunt
source: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Object.html#hashCode()"
tags: ["java", "equality", "collections", "hashmap"]
stack: ["java"]
choices:
  - text: "`HashSet` compares elements with `==`, so a new `Point` never matches"
    why: "`HashSet` does use `equals`, but only after `hashCode` has picked the bucket to look in."
  - text: "`Point` overrides `equals` but not `hashCode`, so equal points get different hash codes and the lookup searches the wrong bucket"
    correct: true
    why: "The contract says equal objects must have equal hash codes. Override both together, or use a record, which generates both."
  - text: "The fields need to be `final` for `equals` to work"
    why: "They already are, and `final` has nothing to do with how hash-based collections find elements."
  - text: "`instanceof` with a pattern variable doesn't work inside `equals`"
    why: "It works fine. `equals` returns true here; the set just never calls it on the right element."
---

## Prompt

This prints `false`. Why?

```java
final class Point {
  final int x, y;
  Point(int x, int y) { this.x = x; this.y = y; }

  @Override public boolean equals(Object o) {
    return o instanceof Point p && p.x == x && p.y == y;
  }
}

Set<Point> seen = new HashSet<>();
seen.add(new Point(1, 2));
System.out.println(seen.contains(new Point(1, 2)));
```

## Explanation

`HashSet` and `HashMap` use `hashCode()` to choose a bucket, then `equals()` to find the match inside it. The default `hashCode` is per object, so the second `Point` almost certainly lands in a different bucket and `equals` is never tried. The `Object` contract: if `a.equals(b)`, then `a.hashCode() == b.hashCode()`. The reverse needn't hold; collisions are allowed, just slower. A correct fix here is `return Objects.hash(x, y);`.
