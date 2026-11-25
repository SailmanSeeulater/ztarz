---
title: "Reading a 95% confidence interval"
module: data
type: concept
source: "https://en.wikipedia.org/wiki/Confidence_interval"
tags: ["statistics", "confidence-interval", "ab-testing"]
---

## Prompt

An experiment reports a conversion lift of +2% with a 95% confidence interval of −0.5% to +4.5%. What does the interval mean, and what should you do?

## Answer

The 95% describes the method: if you repeated the experiment many times and built an interval each time, about 95% of those intervals would contain the true lift. It's not quite "a 95% chance the true value is in this interval"; once computed, an interval either contains it or doesn't.

Practically, the interval is the range of lifts the data is compatible with. This one includes zero and even a small loss, so you can't yet claim a win. The width shrinks roughly with √n, so to narrow it, collect more data. Decide the sample size up front rather than stopping when the result looks good.
