---
title: "Turning an ADC reading into volts"
module: embedded
type: mcq
source: "https://docs.arduino.cc/language-reference/en/functions/analog-io/analogRead/"
tags: ["adc", "analog", "sensors"]
stack: ["arduino"]
choices:
  - text: "300 V"
    why: "The reading is a count of steps, not volts."
  - text: "About 1.47 V"
    correct: true
    why: "A 10-bit ADC splits 0 to 5 V into 1024 steps of about 4.9 mV, so 300 × 5 / 1024 ≈ 1.46 V."
  - text: "About 0.30 V"
    why: "That treats each step as 1 mV. On a 5 V, 10-bit ADC each step is about 4.9 mV."
  - text: "About 5.9 V"
    why: "That's beyond the reference voltage. The ADC can't report more than its 5 V range."
---

## Prompt

An Arduino Uno (10-bit ADC, 5 V reference) returns `analogRead(A0) == 300`. Roughly what voltage is on the pin?
