---
title: "The Integer cache and =="
module: java
type: what-prints
source: "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Integer.html#valueOf(int)"
tags: ["java", "autoboxing", "equality"]
stack: ["java"]
---

## Prompt

What prints?

```java
Integer a = 127, b = 127;
Integer c = 128, d = 128;
System.out.println(a == b);
System.out.println(c == d);
System.out.println(c.equals(d));
```

## Answer

```text
true
false
true
```

## Explanation

Assigning an `int` literal to an `Integer` autoboxes it through `Integer.valueOf`, which always caches values from -128 to 127. So `a` and `b` are the same cached object, while `128` produces two distinct objects. On wrapper types `==` compares references, not values, so always compare boxed numbers with `equals` (or unbox to `int`). The cache's upper bound can be raised with a JVM flag, which is one more reason never to rely on `==` here.
