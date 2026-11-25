---
title: "The 8B model that won't fit on the GPU"
module: llm
type: bug-hunt
source: "https://huggingface.co/docs/transformers/quantization/overview"
tags: ["llm", "quantisation", "memory", "inference"]
stack: ["huggingface", "pytorch"]
choices:
  - text: "Lower max_new_tokens so generation uses less memory"
    why: "Shorter outputs shrink the KV cache a little. The weights alone are about 16 GB, so it still won't fit."
  - text: "Convert the weights to float32 for better numerical stability"
    why: "float32 is 4 bytes per parameter, so about 32 GB. That doubles the problem."
  - text: "Pass a shorter prompt"
    why: "Prompt length affects activations and the KV cache, not the size of the weights, which is what's failing here."
  - text: "Load it with a 4-bit quantization config, so the weights take about 4 to 5 GB instead of about 16 GB, accepting a small loss in accuracy"
    correct: true
    why: "Quantization stores each weight in fewer bits. bf16 is 2 bytes per parameter; 4-bit is about half a byte. Fewer bits cost some accuracy, and methods differ in how much."
---

## Prompt

This runs out of memory on a 12 GB GPU while the model is loading. What's the fix?

```python
from transformers import AutoModelForCausalLM

model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-3.1-8B-Instruct",  # 8B parameters, bf16 weights
    device_map="cuda",
)
```

## Explanation

Memory for weights is roughly parameters times bytes per parameter. 8 billion × 2 bytes (bf16) is about 16 GB, more than the card holds. At 8 bits it's about 8 GB, at 4 bits about 4 to 5 GB. Do this arithmetic before you pick a GPU, and leave room for the KV cache, which grows with context length.
