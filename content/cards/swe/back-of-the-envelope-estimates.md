---
title: "Back-of-the-envelope estimates"
module: swe
type: concept
source: "https://gist.github.com/jboner/2841832"
tags: ["system-design", "estimation", "latency"]
---

## Prompt

A service has 10 million daily users who each load 20 pages a day. Estimate average and peak requests per second, and name the latency numbers you keep in your head.

## Answer

**QPS:** 10M × 20 = 200M requests a day. A day is about 86,400 s; round to 100,000 for mental maths. So roughly 2,000 requests/s on average, and 2 to 3 times that at peak: about 5,000 to 6,000/s.

**Latency numbers (orders of magnitude, from Jonas Bonér's list):**

| Operation | Time |
|---|---|
| Main memory reference | 100 ns |
| Random 4 KB read from SSD | 150 µs |
| Read 1 MB sequentially from memory | 250 µs |
| Round trip inside one datacenter | 0.5 ms |
| Read 1 MB sequentially from SSD | 1 ms |
| Read 1 MB sequentially from disk | 20 ms |
| Round trip California to the Netherlands | 150 ms |

What they tell you: memory is far faster than SSD, and a cross-continent round trip costs about 300 datacenter round trips. Keep hot data in memory and avoid serial cross-region calls inside one request. The exact figures date from around 2012; the ratios are what matter.
