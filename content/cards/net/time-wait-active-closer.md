---
title: "Who ends up in TIME-WAIT"
module: net
type: mcq
source: "https://www.rfc-editor.org/rfc/rfc9293"
tags: ["tcp", "connections", "teardown"]
choices:
  - text: "The server, always"
    why: "It's about who closes first, not who's the server. A client that closes first sits in TIME-WAIT instead."
  - text: "Both sides, for the same time"
    why: "The passive closer goes through CLOSE-WAIT and LAST-ACK and is done once its FIN is acknowledged. Only the active closer waits."
  - text: "Neither: TIME-WAIT only happens after an error"
    why: "It's part of every normal close. Errors and resets skip it."
  - text: "The side that sent the first FIN (the active closer), for 2 × MSL"
    correct: true
    why: "It lingers so a lost final ACK can be resent and stray old segments die out before the same address and port pair is reused."
---

## Prompt

A TCP connection opens with SYN, SYN-ACK, ACK and closes with each side sending a FIN and acknowledging the other's. Which side then sits in TIME-WAIT, and for how long?
