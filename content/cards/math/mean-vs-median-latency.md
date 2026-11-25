---
title: "Mean vs median on skewed latency"
module: math
type: what-prints
source: "https://sre.google/sre-book/monitoring-distributed-systems/"
tags: ["statistics", "latency", "percentiles"]
stack: ["python"]
---

## Prompt

99 requests take 100 ms and one takes 10 seconds. What prints?

```python
import statistics

latencies = [100] * 99 + [10_000]
print(statistics.mean(latencies))
print(statistics.median(latencies))
```

## Answer

```text
199
100.0
```

## Explanation

The mean is the sum divided by the count, so one slow request doubles it, and it describes no real user. The median is the middle value, which ignores how extreme the outlier is. Neither shows the slow tail, which is why dashboards track percentiles: p99 is the value 99% of requests beat. Google's SRE book gives an example of a service averaging 100 ms while 1% of requests take 5 seconds.
