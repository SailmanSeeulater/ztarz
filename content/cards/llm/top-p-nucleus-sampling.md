---
title: "Which tokens survive top-p"
module: llm
type: what-prints
source: "https://huggingface.co/blog/how-to-generate"
tags: ["llm", "sampling", "top-p"]
stack: ["python"]
---

## Prompt

This sketches nucleus (top-p) sampling for one step. What prints?

```python
probs = {"cat": 0.50, "dog": 0.30, "fox": 0.15, "owl": 0.05}
top_p = 0.9

kept, total = {}, 0.0
for token, p in sorted(probs.items(), key=lambda kv: kv[1], reverse=True):
    kept[token] = p
    total += p
    if total >= top_p:
        break

print({t: round(p / total, 2) for t, p in kept.items()})
```

## Answer

`{'cat': 0.53, 'dog': 0.32, 'fox': 0.16}`

## Explanation

Top-p keeps the smallest set of most likely tokens whose probabilities reach p. Here 0.50 + 0.30 = 0.80 isn't enough, so "fox" joins and the total is 0.95; "owl" is cut. The survivors are rescaled to sum to 1 and the model samples among them. When the model is confident the set is small; when it's unsure, it grows. Temperature acts earlier: it sharpens or flattens the distribution before this cut.
