---
title: "Why embedded code uses fixed-width integers"
module: embedded
type: mcq
source: "https://docs.arduino.cc/language-reference/en/variables/data-types/int/"
tags: ["integers", "types", "portability"]
stack: ["arduino", "c"]
choices:
  - text: "The Uno's compiler doesn't support numbers over 9,999"
    why: "It does; the limit comes from the size of `int` on that chip."
  - text: "`int` is 16 bits on the Uno, so it holds at most 32,767 and 45,000 overflows; use `uint32_t` (or `unsigned long`) for millisecond values"
    correct: true
    why: "`int` is 32 bits on SAMD boards like the Zero, which is why it worked there. `<stdint.h>` types like `uint32_t` are the same width everywhere."
  - text: "Timeouts must be stored as `float`"
    why: "Floats are slower on small chips and lose precision. An unsigned 32-bit integer is the usual choice, matching `millis()`."
  - text: "The Zero rounds large values down automatically"
    why: "Nothing is rounded. The Zero simply has a 32-bit `int`."
---

## Prompt

This timeout works on an Arduino Zero but behaves erratically on an Arduino Uno. Why?

```cpp
int timeoutMs = 45000;
```
