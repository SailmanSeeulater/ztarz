---
title: "What auto-configuration does"
module: springboot
type: concept
source: "https://docs.spring.io/spring-boot/reference/using/auto-configuration.html"
tags: ["spring-boot", "auto-configuration", "beans"]
stack: ["springboot"]
---

## Prompt

What does Spring Boot's auto-configuration do, and how do you override or inspect it?

## Answer

It configures beans for you based on what's on the classpath and what you've already defined. Add an embedded database driver and no `DataSource` bean, and Boot creates an in-memory database for you.

It's **non-invasive**: define your own bean of that type and the auto-configured one backs away. You switch it on with `@EnableAutoConfiguration`, which `@SpringBootApplication` includes.

- To see what was applied and why, start the app with `--debug` for the conditions report.
- To turn off a specific piece, use `@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)`.
