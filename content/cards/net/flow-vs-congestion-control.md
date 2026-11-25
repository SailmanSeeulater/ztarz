---
title: "Flow control vs congestion control"
module: net
type: comparison
source: "https://en.wikipedia.org/wiki/Transmission_Control_Protocol"
tags: ["tcp", "flow-control", "congestion"]
---

## What it is

- **Flow control:** stops the sender overwhelming the *receiver*.
- **Congestion control:** stops the sender overwhelming the *network* between them.

## How it models the problem

- **Flow control:** the receiver advertises a receive window in every ACK: how many more bytes it has buffer space for. When the buffer fills, the window drops to zero and the sender pauses.
- **Congestion control:** the sender keeps its own congestion window, a guess at what the path can carry. It grows it while ACKs arrive (slow start, then gradual increase) and cuts it when packets are lost, treating loss as a sign of congestion.

The sender may have at most the smaller of the two windows unacknowledged.

## Where it shines

- **Flow control:** a fast server sending to a slow phone app that reads its socket slowly.
- **Congestion control:** many flows sharing a bottleneck link each back off, so the link stays usable instead of collapsing.

## Where it bites

- **Flow control:** an app that stops reading its socket stalls the sender completely (zero window).
- **Congestion control:** on lossy links (Wi-Fi, mobile) loss that isn't congestion still halves throughput.

## What interviewers ask

- *Which one is end-to-end between two hosts, and which reacts to the path?* Flow control is the receiver's buffer; congestion control is the path.
- *Who sets each window?* The receiver advertises the receive window; the sender computes the congestion window itself.
- *Why is a new connection slow at first?* Slow start: the congestion window begins small and grows with each round trip.
