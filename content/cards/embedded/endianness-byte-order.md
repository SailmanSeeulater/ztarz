---
title: "Which byte comes first in memory"
module: embedded
type: what-prints
source: "https://en.wikipedia.org/wiki/Endianness"
tags: ["endianness", "memory", "protocols"]
stack: ["c"]
---

## Prompt

On a little-endian CPU (x86, most ARM cores), what does this print?

```c
#include <stdint.h>
#include <stdio.h>

int main(void) {
    uint32_t x = 0x12345678;
    uint8_t *p = (uint8_t *)&x;
    printf("%02x %02x\n", p[0], p[3]);
}
```

## Answer

`78 12`

## Explanation

Little-endian stores the least significant byte at the lowest address, so the bytes in memory are `78 56 34 12`. A big-endian machine would print `12 78`. Network protocols use big-endian ("network byte order"), which is why code that copies a struct straight onto the wire, or reads a sensor's multi-byte register, has to convert explicitly (`htonl`, or shifting bytes together).
