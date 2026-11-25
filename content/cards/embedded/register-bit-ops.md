---
title: "Setting and clearing register bits"
module: embedded
type: what-prints
source: "https://en.wikipedia.org/wiki/Memory-mapped_I/O_and_port-mapped_I/O"
tags: ["registers", "bitwise", "mmio"]
stack: ["c"]
---

## Prompt

`reg` stands in for a memory-mapped control register. What does this print?

```c
#include <stdint.h>
#include <stdio.h>

int main(void) {
    uint32_t reg = 0x12;      /* bits 1 and 4 set */
    reg |= (1u << 5);         /* set bit 5 */
    reg &= ~(1u << 1);        /* clear bit 1 */
    printf("0x%02X\n", reg);
}
```

## Answer

`0x30`

## Explanation

`0x12` is bits 4 and 1. OR with `1 << 5` (0x20) gives 0x32; AND with the inverse of `1 << 1` clears bit 1, leaving 0x30. On a microcontroller the register is a fixed address in the same space as RAM, written through a pointer such as `*(volatile uint32_t *)ADDR`, and this read-modify-write pattern changes one bit while leaving the others alone.
