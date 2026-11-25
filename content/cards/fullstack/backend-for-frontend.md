---
title: "What a backend-for-frontend is for"
module: fullstack
type: concept
source: "https://learn.microsoft.com/en-us/azure/architecture/patterns/backends-for-frontends"
tags: ["bff", "architecture", "api"]
---

## Prompt

What is a backend-for-frontend (BFF), and when isn't it worth it?

## Answer

A thin server layer built for one specific client (the web app, the mobile app) that sits between it and the general backend services. It shapes, aggregates and trims data for that client's screens, so the shared backend doesn't fill up with client-specific tweaks, and the frontend team can change it on its own schedule.

The costs: another service to deploy and secure, an extra network hop, and some duplicated code across BFFs. It isn't worth it when there's only one client, or when every client makes the same requests. Keep cross-cutting concerns such as auth and rate limiting out of it.
