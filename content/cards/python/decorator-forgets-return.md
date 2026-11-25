---
title: "The timing decorator that ate the result"
module: python
type: bug-hunt
source: "https://docs.python.org/3/library/functools.html#functools.wraps"
tags: ["python", "decorators", "functions"]
stack: ["python"]
choices:
  - text: "Remove `@functools.wraps(func)`; it replaces the return value"
    why: "`wraps` copies metadata like `__name__` and `__doc__` from `func` onto the wrapper. It doesn't touch return values, and you want to keep it."
  - text: "Store the result of `func(*args, **kwargs)` and return it from `wrapper`"
    correct: true
    why: "The decorated name now points at `wrapper`. Whatever `wrapper` returns is what callers get, and a function with no `return` returns None."
  - text: "Call `func` without `*args, **kwargs`"
    why: "Then `total` would get no arguments and raise a TypeError. Forwarding them is correct."
  - text: "Decorators can't be used on functions that return values"
    why: "They can; the wrapper just has to pass the value back."
---

## Prompt

`total([3, 4])` prints the timing line, then `None` instead of 7. What's the fix?

```python
import functools, time

def timed(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        func(*args, **kwargs)
        print(f"{func.__name__} took {time.perf_counter() - start:.3f}s")
    return wrapper

@timed
def total(prices):
    return sum(prices)

print(total([3, 4]))
```

## Explanation

`@timed` is shorthand for `total = timed(total)`, so every call goes through `wrapper`. It calls the real function and throws the result away. Write `result = func(*args, **kwargs)` and end with `return result`.
