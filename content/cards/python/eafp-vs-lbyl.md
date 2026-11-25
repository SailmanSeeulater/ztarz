---
title: "EAFP: ask forgiveness, not permission"
module: python
type: concept
source: "https://docs.python.org/3/glossary.html#term-EAFP"
tags: ["python", "exceptions", "style"]
stack: ["python"]
---

## Prompt

What does EAFP mean in Python, how does it differ from LBYL, and why is it often safer?

## Answer

**EAFP** (easier to ask forgiveness than permission): just do the operation and catch the exception if it fails.

```python
try:
    price = prices[sku]
except KeyError:
    price = None
```

**LBYL** (look before you leap): check first, `if sku in prices: price = prices[sku]`.

EAFP is the usual Python style. It's safer with threads or files: between an LBYL check and the action, another thread can remove the key or another process can delete the file. Catch the narrowest exception you expect, not a bare `except`.
