---
title: "Parameters, tokens and FLOPs"
module: llm
type: concept
source: "https://en.wikipedia.org/wiki/Neural_scaling_law"
tags: ["llm", "scaling", "compute"]
---

## Prompt

What do parameters, training tokens and FLOPs each measure, and what's the rule of thumb that links them for training?

## Answer

- **Parameters (N):** the number of learned weights. Sets the model's size and memory.
- **Training tokens (D):** how much text it was trained on.
- **FLOPs (C):** floating-point operations, the total compute spent.

Training costs about **C ≈ 6 × N × D**: roughly 6 operations per parameter for each training token. A 1-billion-parameter model trained on 20 billion tokens needs about 6 × 10⁹ × 2 × 10¹⁰ = 1.2 × 10²⁰ FLOPs. Double the model or the data and the compute doubles.
