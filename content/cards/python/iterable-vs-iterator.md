---
title: "Iterable versus iterator"
module: python
type: concept
source: "https://docs.python.org/3/glossary.html#term-iterator"
tags: ["python", "iterators", "protocols"]
stack: ["python"]
---

## Prompt

What's the difference between an iterable and an iterator, and what does a `for` loop do with them?

## Answer

- **Iterable:** anything that can hand out its items, like a list, string, dict or file. `iter(x)` returns a fresh iterator for it.
- **Iterator:** the object doing one pass. Each `next()` (its `__next__` method) returns the next item, and it raises `StopIteration` when there are none left. After that it's exhausted for good.

A `for` loop calls `iter()` on what you give it, then calls `next()` until `StopIteration`. That's why you can loop over a list many times but over a generator or open file only once: an iterator's `iter()` returns itself.
