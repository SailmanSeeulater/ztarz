---
title: "Explaining an API to a non-engineer"
module: f11
type: out-loud
source: "https://developer.mozilla.org/en-US/docs/Glossary/API"
tags: ["communication", "api"]
---

## Prompt

A product manager asks, "What is an API, and why does changing ours need so much care?" Explain it without jargon.

## Model answer

A screen is how a person uses an app. An API is how another program uses it: a published list of requests it accepts and what it promises to send back.

Think of a restaurant menu. You don't walk into the kitchen; you order from the menu, and the kitchen promises to deliver what's listed. When our app shows the weather, it orders "forecast for London" from a weather service's API and gets the answer in an agreed format.

That promise is a contract. The kitchen can change its recipes freely, as long as the menu stays the same. If we remove or rename something on our menu, every app that orders it breaks, which is why API changes get announced and phased in.

(Approach: start from what they care about, use one analogy, give one example from their world, then check it landed.)
