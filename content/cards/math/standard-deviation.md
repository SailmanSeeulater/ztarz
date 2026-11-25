---
title: "What standard deviation tells you"
module: math
type: concept
source: "https://en.wikipedia.org/wiki/Standard_deviation"
tags: ["statistics", "standard-deviation"]
---

## Prompt

Two services both average 200 ms. One has a standard deviation of 5 ms, the other 150 ms. What does that tell you, and when is the number misleading?

## Answer

Standard deviation measures spread: roughly how far a typical value sits from the mean. It's the square root of the variance, the average squared distance from the mean, so it's in the same units as the data.

- **5 ms:** almost every request is close to 200 ms. Predictable.
- **150 ms:** requests vary wildly. Users see some fast and some slow pages.

For roughly normal data, about 68% of values fall within one standard deviation of the mean, 95% within two and 99.7% within three. Latency is usually skewed with a long right tail, so that rule doesn't hold there; use percentiles to describe it instead.
