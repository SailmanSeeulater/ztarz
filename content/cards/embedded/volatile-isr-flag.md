---
title: "The flag the main loop never sees"
module: embedded
type: mcq
source: "https://en.cppreference.com/w/c/language/volatile"
tags: ["volatile", "interrupts", "compiler"]
stack: ["c"]
choices:
  - text: "The ISR isn't firing"
    why: "A breakpoint or toggled pin shows it does fire. The loop just never rereads the variable."
  - text: "Without `volatile`, the compiler may read `ready` once and spin on the cached value forever; declare it `volatile bool ready`"
    correct: true
    why: "Every access to a volatile object counts as a side effect, so the compiler must reload it on each check."
  - text: "`bool` can't be shared with an ISR; use `int`"
    why: "The type isn't the issue. An `int` without `volatile` gets the same optimisation."
  - text: "`volatile` would also make the variable thread-safe, so it's needed for atomicity"
    why: "`volatile` gives no atomicity or ordering between threads. It only stops the compiler optimising away accesses."
---

## Prompt

This works with optimisation off and hangs at `-O2`. Why?

```c
bool ready = false;

void timer_isr(void) { ready = true; }

int main(void) {
    start_timer();
    while (!ready) { }
    led_on();
}
```
