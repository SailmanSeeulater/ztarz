---
title: "What should page someone at 3am?"
module: devops
type: mcq
source: "https://sre.google/sre-book/monitoring-distributed-systems/"
tags: ["alerting", "monitoring", "sre", "on-call"]
stack: ["prometheus"]
choices:
  - text: "CPU above 80% on any server for 5 minutes"
    why: "A cause, not a symptom. High CPU often has no effect on users, and paging on it trains people to ignore pages."
  - text: "Any single 500 response in the logs"
    why: "Too noisy. Isolated errors happen. Page on a sustained rate that threatens the SLO."
  - text: "The checkout error rate has been above 2% for 10 minutes"
    correct: true
    why: "It's a symptom users feel, it's urgent, and it needs a human to think. Causes like CPU, disk or one dead replica go on dashboards or tickets unless they're about to cause an outage."
  - text: "A deploy has finished"
    why: "Useful as an annotation on dashboards, but nothing to act on."
---

## Prompt

Which of these should page the on-call engineer?
