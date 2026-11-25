---
title: "Building and running a Spring Boot jar"
module: springboot
type: concept
source: "https://docs.spring.io/spring-boot/maven-plugin/packaging.html"
tags: ["spring-boot", "build", "deployment"]
stack: ["springboot", "apachemaven"]
---

## Prompt

How do you package a Spring Boot app as a single file and run it?

## Answer

The Spring Boot Maven plugin's `repackage` goal turns the normal jar from the `package` phase into an **executable jar** that contains your classes and all their dependencies, including the embedded web server:

```bash
./mvnw package
java -jar target/shop-0.0.1-SNAPSHOT.jar
```

With `spring-boot-starter-parent` the `repackage` step is already wired into `package`; you only declare the plugin. Because the server is inside the jar, the only thing the host needs is a Java runtime, which also makes it easy to put in a container image.
