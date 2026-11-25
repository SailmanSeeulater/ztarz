---
title: "A test suite shaped like an ice-cream cone"
module: swe
type: mcq
source: "https://martinfowler.com/bliki/TestPyramid.html"
tags: ["testing", "test-pyramid", "e2e"]
choices:
  - text: "Add automatic retries to the flaky browser tests."
    why: "Retries hide the nondeterminism instead of fixing it, and make the suite slower still."
  - text: "Flip the shape: many fast unit tests, fewer service-level tests through the API, a handful of end-to-end tests for key journeys."
    correct: true
    why: "Browser tests are slow, brittle and prone to flakiness, so they shouldn't carry the suite. When one catches a bug, reproduce it with a unit test before fixing it."
  - text: "Delete the unit tests, since the end-to-end tests already exercise that code."
    why: "That makes the suite slower and failures harder to locate. Unit tests pinpoint the broken function."
  - text: "Keep the mix and run the browser tests in more parallel workers."
    why: "Faster wall-clock time, but the tests are still brittle and still fail randomly."
---

## Prompt

A suite has 400 browser end-to-end tests and 30 unit tests. It takes 40 minutes and fails randomly. What does the test pyramid suggest?
