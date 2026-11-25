---
title: "Choosing UART, I2C or SPI"
module: embedded
type: out-loud
source: "https://docs.arduino.cc/learn/communication/uart/"
tags: ["uart", "i2c", "spi", "serial"]
---

## Prompt

Your board needs a GPS module, three sensors and an SD card. Compare UART, I2C and SPI and say which you'd use for each.

## Model answer

- **UART:** asynchronous, no shared clock. Two data lines (TX to RX, RX to TX) plus a common ground, and both ends must agree on the baud rate. Point-to-point between two devices. Simple and everywhere: it's what `Serial.print()` uses.
- **I2C:** synchronous, two shared lines (SCL clock, SDA data) for many devices. The controller starts each message with the target's address, so adding a device costs no extra pins. Slower, and the lines need pull-up resistors.
- **SPI:** synchronous, a clock plus separate data lines in each direction, and one chip-select line per device. Full duplex and fast, but every extra device costs a pin.

Picks:

- **GPS:** UART. Most modules stream text sentences over serial.
- **Sensors:** I2C. Many slow devices on two pins, each with its own address.
- **SD card:** SPI. It needs the throughput.

Mention the trade-off you're making: pins versus speed versus number of devices.
