---
title: "Default methods in interfaces"
module: java
type: concept
source: "https://docs.oracle.com/javase/tutorial/java/IandI/defaultmethods.html"
tags: ["java", "interfaces", "oop"]
stack: ["java"]
---

## Prompt

What is a default method in an interface, and why was it added?

## Answer

A method with a body, declared with `default` inside an interface:

```java
interface Greeter {
  String name();
  default String greet() { return "Hello, " + name(); }
}
```

It lets you **add methods to an existing interface without breaking every class that implements it**: old implementations inherit the default, and any class can override it. This is how the JDK added methods such as `Comparator.reversed()` and `thenComparing(...)` to an interface that already had many implementations, many of them lambdas.

An interface that extends one with a default method can inherit it, redeclare it as abstract, or override it. Interfaces still can't hold instance state.
