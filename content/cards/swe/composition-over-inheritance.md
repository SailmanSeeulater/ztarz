---
title: "Why prefer composition over inheritance"
module: swe
type: out-loud
source: "https://en.wikipedia.org/wiki/Composition_over_inheritance"
tags: ["composition", "inheritance", "oop"]
---

## Prompt

Why do people say "prefer composition over inheritance"? When is inheritance still fine?

## Model answer

Inheritance fixes behaviour into a class tree at design time. When a new combination comes along, say a notifier that sends by email and SMS and retries, you end up with classes like `RetryingEmailSmsNotifier`, and changes to the base class ripple into every subclass.

With composition, the object holds smaller parts, such as a list of channels and a retry policy, and delegates to them. You assemble combinations instead of subclassing, and can swap parts at runtime or in tests.

The cost is some forwarding code you'd get free from a base class. Inheritance is still fine for a shallow, stable "is-a" relationship where the subclass truly keeps the parent's behaviour.
