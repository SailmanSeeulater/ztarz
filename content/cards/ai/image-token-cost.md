---
title: "What an image costs in tokens"
module: ai
type: what-prints
source: "https://platform.claude.com/docs/en/build-with-claude/vision#evaluate-image-size"
tags: ["llm", "multimodal", "vision", "cost"]
stack: ["claude"]
---

## Prompt

Claude bills an image as `⌈width / 28⌉ × ⌈height / 28⌉` visual tokens, up to a per-model cap (bigger images are downscaled first). About how many tokens is a 560×280 screenshot, and the same screenshot at 1120×560?

## Answer

200 and 800.

## Explanation

Each 28×28-pixel patch is one token: 20 × 10 = 200, then 40 × 20 = 800. Doubling both sides quadruples the cost, so resize or crop images to what the task needs before sending them. Oversized images get downscaled anyway, so you pay to upload pixels the model never sees, and small text can become hard to read. Images also tend to work best placed before the text that asks about them.
