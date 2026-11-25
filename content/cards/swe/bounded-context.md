---
title: "What a bounded context is"
module: swe
type: concept
source: "https://martinfowler.com/bliki/BoundedContext.html"
tags: ["ddd", "bounded-context", "modelling"]
---

## Prompt

In domain-driven design, what's a bounded context, and why not have one model for the whole company?

## Answer

A bounded context is a boundary inside which one model, and one meaning for each term, holds. The same word means different things in different parts of a business: to sales a "customer" is a lead with a pipeline stage, to support it's an account with tickets, to billing it's a payer with invoices. One shared `Customer` class that serves everyone grows huge and contradicts itself.

So each context keeps its own model, and the places where they meet are made explicit, for example by translating ids and events at the boundary. A context map records how the contexts relate. Contexts are also good candidates for module or service boundaries.
