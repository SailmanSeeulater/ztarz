---
title: "What a 99.9% SLO allows"
module: devops
type: what-prints
source: "https://sre.google/sre-book/embracing-risk/"
tags: ["sre", "slo", "reliability"]
---

## Prompt

Your SLO says 99.9% of minutes in a 30-day window are "good". How many bad minutes is your error budget, and what happens when it runs out?

## Answer

43.2 minutes. When it's spent, you slow or stop risky releases and put the effort into reliability until the window recovers.

## Explanation

The error budget is 100% minus the SLO: 0.1% of 30 × 24 × 60 = 43,200 minutes, which is 43.2. A 99.99% target would allow about 4.3 minutes.

The terms:

- **SLI:** the measurement, such as the share of requests that succeed in under 300 ms.
- **SLO:** the target for that SLI, such as 99.9% over 30 days.
- **SLA:** a contract with consequences, often refunds, if you miss a promised level. It's usually looser than the internal SLO.

The budget turns "is it safe to ship?" into a number both product and operations agree on. Budget left means ship; budget gone means freeze or slow down.
