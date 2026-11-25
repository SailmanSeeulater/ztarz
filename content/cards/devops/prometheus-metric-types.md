---
title: "Counter, gauge or histogram?"
module: devops
type: mcq
source: "https://prometheus.io/docs/concepts/metric_types/"
tags: ["prometheus", "metrics", "observability"]
stack: ["prometheus"]
choices:
  - text: "Gauge for requests, counter for queue depth, summary for latency"
    why: "Queue depth goes down as well as up, which a counter can't do. A request total only ever increases, which is a counter's job."
  - text: "Counter for all three, using `rate()` to get the values"
    why: "A counter only increases or resets to zero. Queue depth falls, and a single counter can't give latency percentiles."
  - text: "Counter for requests served, gauge for queue depth, histogram for latency"
    correct: true
    why: "Graph the counter with `rate()`. A gauge goes up and down. A histogram counts observations into buckets, so `histogram_quantile(0.99, ...)` can give p99 even aggregated across instances."
  - text: "Histogram for all three, since it records everything"
    why: "A histogram records the distribution of observations like durations. It's the wrong shape for a running total or a current level."
---

## Prompt

Which Prometheus metric types fit: total HTTP requests served, current jobs waiting in a queue, and request latency so you can chart p99?
