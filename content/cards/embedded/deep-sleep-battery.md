---
title: "Making a battery sensor last"
module: embedded
type: out-loud
source: "https://docs.espressif.com/projects/esp-idf/en/stable/esp32/api-reference/system/sleep_modes.html"
tags: ["power", "sleep", "battery"]
stack: ["espressif"]
---

## Prompt

An ESP32 reads a temperature sensor and reports it over Wi-Fi every 10 minutes, on batteries. How do you make it last months instead of days?

## Model answer

The device should be awake for a second and asleep for the rest of the 10 minutes, so it's the sleep current that sets battery life.

- **Deep sleep between readings:** the CPUs, most of the RAM and the digital peripherals are powered off; only the RTC domain stays on. Wake it with a timer (`esp_sleep_enable_timer_wakeup`) or a pin.
- **Know what deep sleep costs you:** waking is like a reset, so the program starts from the top. Keep anything you need across sleeps, such as a counter, in RTC memory (`RTC_DATA_ATTR`).
- **Light sleep** keeps RAM and resumes where it left off, but saves less. It suits short gaps.
- **Radio:** Wi-Fi connections don't survive deep or light sleep, so connect, send and disconnect quickly. Batch several readings into one transmission if you can.
- **Measure it:** check the whole board's current while asleep, not just the chip's figure, since anything else left powered counts too.
