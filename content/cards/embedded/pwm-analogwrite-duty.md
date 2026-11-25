---
title: "What analogWrite really outputs"
module: embedded
type: mcq
source: "https://docs.arduino.cc/language-reference/en/functions/analog-io/analogWrite/"
tags: ["pwm", "timers", "gpio"]
stack: ["arduino"]
choices:
  - text: "A steady 1.25 V"
    why: "Most boards have no DAC on these pins. The pin is only ever fully on or fully off; averaged over time it looks like about 1.25 V."
  - text: "A square wave at about 490 Hz that's on for roughly a quarter of each cycle"
    correct: true
    why: "64 out of 255 is about 25% duty cycle. LEDs and motors respond to the average, so the LED looks dimmer."
  - text: "Pin 9 at full brightness, because any non-zero value turns it on"
    why: "The value sets the duty cycle from 0 (always off) to 255 (always on)."
  - text: "A 64 Hz square wave"
    why: "The value sets the duty cycle, not the frequency. The frequency is fixed by the timer, about 490 Hz on most Uno pins."
---

## Prompt

On an Arduino Uno, what does `analogWrite(9, 64);` produce on pin 9?
