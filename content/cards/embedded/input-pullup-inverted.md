---
title: "INPUT_PULLUP reads LOW when pressed"
module: embedded
type: mcq
source: "https://docs.arduino.cc/learn/microcontrollers/digital-pins/"
tags: ["gpio", "pull-up", "buttons"]
stack: ["arduino"]
choices:
  - text: "The internal pull-up holds the pin HIGH; pressing the button connects it to ground, so pressed reads LOW"
    correct: true
    why: "INPUT_PULLUP inverts the logic. Test for `LOW` to detect a press."
  - text: "The pin is floating, so it reads random values"
    why: "That's what plain `INPUT` with nothing connected does. INPUT_PULLUP exists precisely to stop the pin floating."
  - text: "The button is wired backwards and should go to 5V"
    why: "With INPUT_PULLUP the other side of the switch should go to ground. Wiring to 5V would never change the reading."
  - text: "digitalRead needs a delay after pinMode before it's accurate"
    why: "The reading is right immediately. It's the logic that's inverted."
---

## Prompt

A button is wired between pin 2 and GND. The LED is on all the time and turns off only while the button is held. Why?

```cpp
void setup() {
  pinMode(2, INPUT_PULLUP);
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, digitalRead(2));
}
```
