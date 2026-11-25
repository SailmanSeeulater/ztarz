---
title: "Hex digits, bytes and 0xFF"
module: math
type: mcq
source: "https://en.wikipedia.org/wiki/Hexadecimal"
tags: ["binary", "hexadecimal", "number-systems"]
choices:
  - text: "4 bits per pair; 255"
    why: "One hex digit is 4 bits (16 values). A pair of digits is two of them, so 8 bits."
  - text: "8 bits per pair; 256"
    why: "A byte has 256 possible values, but they run from 0 to 255. `0xFF` is the largest, 255."
  - text: "8 bits per pair; 255"
    correct: true
    why: "Each hex digit encodes exactly 4 bits, so two digits are one byte. `0xFF` is 15 × 16 + 15 = 255, binary `11111111`."
  - text: "16 bits per pair; 65,535"
    why: "That's four hex digits, `0xFFFF`. Two digits only cover one byte."
---

## Prompt

A colour is written `#FF8000`: three pairs of hex digits for red, green and blue. How many bits does each pair hold, and what is `0xFF` in decimal?
