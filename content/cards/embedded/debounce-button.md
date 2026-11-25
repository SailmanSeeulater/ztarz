---
title: "Why buttons need debouncing"
module: embedded
type: concept
source: "https://docs.arduino.cc/built-in-examples/digital/Debounce/"
tags: ["buttons", "gpio", "debounce"]
stack: ["arduino"]
---

## Prompt

A press counter goes up by 3 or 4 for a single press. Why, and how do you fix it in software?

## Answer

Mechanical contacts bounce: for a few milliseconds after a press they make and break contact repeatedly, and a fast microcontroller reads each transition as a separate press.

Fix: only accept a change once it has been stable for a short time.

```cpp
if (reading != lastReading) lastChange = millis();
if (millis() - lastChange > 50 && reading != state) {
  state = reading;
  if (state == LOW) presses++;   // INPUT_PULLUP: LOW = pressed
}
lastReading = reading;
```

Use `millis()`, not `delay()`, so the rest of the loop keeps running. Hardware debouncing (an RC filter) is the other option.
