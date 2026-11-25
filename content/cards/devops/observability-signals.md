---
title: "Logs, metrics and traces"
module: devops
type: out-loud
source: "https://opentelemetry.io/docs/concepts/signals/"
tags: ["observability", "monitoring", "opentelemetry"]
stack: ["opentelemetry", "prometheus", "grafana"]
---

## Prompt

What are logs, metrics and traces, and which do you reach for when?

## Model answer

- **Metrics** are numbers measured over time: request rate, error rate, p99 latency, memory. Cheap to store and query, so they drive dashboards and alerts. They tell you *that* something is wrong.
- **Traces** follow one request across services as a tree of timed spans. They tell you *where* the time or the failure is: the slow database call, the third-party API.
- **Logs** are records of individual events with detail. They tell you *why*: the exact error, the input, the stack trace.

In practice: an alert fires on a metric, a trace narrows it to one service or call, and that service's logs explain it. Putting the trace ID in every log line links them. OpenTelemetry gives one vendor-neutral way to emit all three, and you send them to whatever backend you like, such as Prometheus and Grafana.
