---
title: "JVM, JRE and JDK"
module: java
type: concept
source: "https://docs.oracle.com/javase/8/docs/technotes/guides/index.html"
tags: ["java", "jvm", "tooling"]
stack: ["java"]
---

## Prompt

What are the JVM, the JRE and the JDK, and how do they nest?

## Answer

- **JVM** (Java Virtual Machine): runs bytecode. `javac` compiles `.java` files into `.class` files of bytecode, not native code, and the JVM executes them on whatever OS it runs on.
- **JRE** (Java Runtime Environment): the JVM plus the standard class libraries and other pieces needed to *run* a Java program.
- **JDK** (Java Development Kit): the JRE plus development tools such as the compiler (`javac`) and debuggers, needed to *build* one.

So JDK contains JRE contains JVM. Developers install a JDK; "write once, run anywhere" comes from shipping bytecode that any JVM can run.
