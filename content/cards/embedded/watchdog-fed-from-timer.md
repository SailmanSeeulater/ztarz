---
title: "A watchdog that can't catch a hang"
module: embedded
type: bug-hunt
source: "https://en.wikipedia.org/wiki/Watchdog_timer"
tags: ["watchdog", "reliability", "interrupts"]
choices:
  - text: "The watchdog timeout is too long"
    why: "A shorter timeout doesn't help: the timer interrupt still feeds it on time while the main loop is stuck."
  - text: "The timer interrupt kicks the watchdog, so it keeps getting fed even when the main loop has hung"
    correct: true
    why: "Kick it from the main loop, and only after checking the system is healthy, so a stuck loop lets it expire and reset the chip."
  - text: "Watchdogs only detect power failures, not software hangs"
    why: "Detecting software that stops making progress is exactly what a watchdog is for."
  - text: "The watchdog must be disabled inside interrupts"
    why: "The problem isn't where it's disabled; it's that the wrong code feeds it."
---

## Prompt

The device locks up in the field when a sensor read never returns, but the watchdog never resets it. Why?

```c
void timer_isr_10ms(void) {
    watchdog_kick();
}

int main(void) {
    watchdog_start(500); /* ms */
    for (;;) {
        read_sensor();   /* can block forever */
        send_reading();
    }
}
```

## Explanation

A watchdog resets the system when it isn't restarted ("kicked") in time. Its whole point is that only healthy code kicks it. A timer interrupt keeps running when the main loop is stuck, so the watchdog is fed regardless. Kick it once per loop iteration, ideally after checks that the work is actually progressing.
