---
title: "What a dead-letter queue is for"
module: backend
type: mcq
source: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html"
tags: ["queues", "reliability", "messaging"]
stack: ["sqs"]
choices:
  - text: "Keeping a copy of every successfully processed message, for auditing"
    why: "Successful messages are deleted. A DLQ only holds failures."
  - text: "Holding messages until a consumer comes online"
    why: "That's what the normal queue already does."
  - text: "Catching messages that failed `maxReceiveCount` times, so one bad message stops blocking retries and can be inspected and redriven"
    correct: true
    why: "Set `maxReceiveCount` high enough for real retries, alarm when the DLQ isn't empty, and give it a longer retention than the source queue."
  - text: "Turning at-least-once delivery into exactly-once"
    why: "A DLQ changes where failures end up, not how often messages are delivered."
---

## Prompt

One malformed message makes your SQS consumer throw every time it's received. What does configuring a dead-letter queue (DLQ) give you?
