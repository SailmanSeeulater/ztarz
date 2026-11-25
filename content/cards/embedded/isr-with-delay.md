---
title: "An interrupt handler that misbehaves"
module: embedded
type: bug-hunt
source: "https://docs.arduino.cc/language-reference/en/functions/external-interrupts/attachInterrupt/"
tags: ["interrupts", "isr"]
stack: ["arduino"]
choices:
  - text: "`RISING` should be `FALLING`"
    why: "The edge choice decides when the ISR fires. It wouldn't make the sketch freeze."
  - text: "The ISR calls `delay()` and `Serial.println()`, which depend on interrupts that are paused while an ISR runs"
    correct: true
    why: "Keep the ISR short: set a `volatile` flag or bump a counter, and do the printing and waiting in `loop()`."
  - text: "`attachInterrupt` must be called inside `loop()`"
    why: "It's set up once, normally in `setup()`."
  - text: "ISRs must return a value to clear the interrupt"
    why: "Arduino ISRs take no arguments and return nothing."
---

## Prompt

The sketch hangs or loses serial output whenever the sensor pulses. What's wrong?

```cpp
void onPulse() {
  Serial.println("pulse");
  delay(50);
}

void setup() {
  Serial.begin(115200);
  attachInterrupt(digitalPinToInterrupt(2), onPulse, RISING);
}

void loop() {}
```

## Explanation

While an ISR runs, other interrupts wait. `millis()` doesn't advance, so `delay()` never finishes, and serial data that relies on interrupts can be lost. Only one ISR runs at a time, so a slow one delays every other interrupt too. An ISR should be as short and fast as possible.
