---
title: "Microcontroller vs microprocessor"
module: embedded
type: comparison
source: "https://en.wikipedia.org/wiki/Microcontroller"
tags: ["hardware", "mcu", "soc"]
stack: ["arduino", "raspberrypi"]
---

## What it is

- **Microcontroller (MCU):** a small computer on one chip: processor core, flash for the program, a little RAM, and peripherals (GPIO, timers, ADC, UART, I2C, SPI). The chip on an Arduino Uno or an ESP32.
- **Microprocessor (MPU):** a CPU that relies on separate chips for memory, storage and much of its I/O. The processor in a PC, or the SoC on a Raspberry Pi running Linux.

## How it models the problem

- **MCU:** one program, often with no operating system, running straight from on-chip flash and talking to hardware through registers.
- **MPU:** a general-purpose machine running a full OS that loads programs from storage into external RAM.

## Where it shines

- **MCU:** cheap, tiny, low power, boots instantly, predictable timing. Sensors, motor control, remote controls, appliances.
- **MPU:** lots of memory and speed, a real OS with networking, filesystems, displays and high-level languages.

## Where it bites

- **MCU:** kilobytes of RAM, no memory protection, everything hand-managed.
- **MPU:** more power and cost, slower boot, and a general-purpose OS makes tight real-time timing harder.

## What interviewers ask

- *Is a Linux single-board computer a microcontroller?* No: it runs a general-purpose OS from external memory and storage.
- *Why not just use a Pi for a sensor node?* Power draw, size and cost: an MCU does the job with one cheap chip.
- *What's on an MCU besides the CPU?* Flash, RAM and peripherals on the same die.
