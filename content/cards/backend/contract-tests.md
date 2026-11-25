---
title: "What a contract test catches"
module: backend
type: concept
source: "https://docs.pact.io/"
tags: ["testing", "contract-tests", "microservices"]
---

## Prompt

What is a consumer-driven contract test, and what does it catch that each side's own tests miss?

## Answer

The consumer (say, the web app) writes tests against a mock of the provider's API. While they run, the tool (Pact, for example) records each request the consumer makes and the response it expects. That record is the contract. The provider's CI then replays the contract against the real provider and checks each response matches.

It catches the classic gap: the API renames `total` to `amount`. The provider's tests are updated and pass, the web app's tests use their own mock and pass, and production breaks. The contract check fails before release.

It's cheaper than an end-to-end environment with every service deployed, and because contracts only cover what consumers actually use, the provider can change everything else freely.
