---
title: "Two ways @Transactional silently fails"
module: springboot
type: out-loud
source: "https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/annotations.html"
tags: ["spring", "transactions", "aop"]
stack: ["springboot"]
---

## Prompt

Name two common ways a `@Transactional` method doesn't behave as expected, and how to fix each.

## Model answer

**1. Self-invocation.** Spring applies `@Transactional` through a proxy wrapped around your bean. Only calls that come in from outside go through the proxy. If `placeOrder()` in the same class calls `this.saveItems()`, the annotation on `saveItems` is ignored and no transaction starts. Fix: move the transactional method to another bean and inject it, or put the annotation on the outer method that's called from outside.

**2. Checked exceptions commit.** By default only a `RuntimeException` or `Error` triggers a rollback. A checked exception, say an `IOException` thrown halfway through, propagates but the transaction **commits** what was written so far. Fix: `@Transactional(rollbackFor = Exception.class)`, or throw unchecked exceptions.

A related trap from the same proxy mechanism: annotating a method that isn't called through the proxy at all, for example from a `@PostConstruct` method, does nothing either.
