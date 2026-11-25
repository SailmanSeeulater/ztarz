---
title: "Kafka vs RabbitMQ"
module: backend
type: comparison
source: "https://kafka.apache.org/intro"
tags: ["messaging", "queues", "event-streaming", "tradeoffs"]
stack: ["apachekafka", "rabbitmq"]
---

## What it is

- **Kafka:** a distributed event streaming platform. Producers append events to topics, which are stored durably and replicated across brokers.
- **RabbitMQ:** a message broker. Producers publish to exchanges, which route copies of each message into queues for consumers.

## How it models the problem

- **Kafka:** a topic is a set of partitioned, append-only logs. Reading doesn't delete anything: events stay until the topic's retention setting removes them, and each consumer group tracks its own position, so a new service can replay history. Events with the same key go to the same partition and keep their order there.
- **RabbitMQ:** a queue holds work until someone takes it. Exchanges (direct, fanout, topic, headers) and bindings decide which queues get a message. With explicit acks the broker removes a message once it's acknowledged, and redelivers it to another consumer if the first one dies first.

## Where it shines

- **Kafka:** high-volume event streams that many independent consumers read: analytics, change data capture, audit logs, rebuilding state by replaying events.
- **RabbitMQ:** task queues and flexible routing: send this job to one worker, fan that notification out to three services, route by topic pattern. Simple to run at moderate scale.

## Where it bites

- **Kafka:** more to operate and to understand (partitions, offsets, rebalancing). Parallelism is capped by the partition count, and per-message routing or priorities aren't its model.
- **RabbitMQ:** messages are gone once acknowledged, so there's no replay for a consumer added later. A long backlog in a queue is a problem, not a feature.

## What interviewers ask

- *Which for background jobs?* A queue: RabbitMQ, SQS, or BullMQ on Redis. Each job goes to one worker and is then done.
- *Which for "every service reacts to OrderPlaced, and we may add more later"?* Kafka: each service gets its own consumer group and can start from the beginning.
- *How do you keep per-customer ordering in Kafka?* Use the customer id as the message key, so all their events land in one partition.
