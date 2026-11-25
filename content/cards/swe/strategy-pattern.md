---
title: "Name the pattern: a map of shipping functions"
module: swe
type: mcq
source: "https://refactoring.guru/design-patterns/strategy"
tags: ["design-patterns", "strategy", "refactoring"]
stack: ["typescript"]
choices:
  - text: "Factory"
    why: "A factory decides which object to create. Here nothing is constructed; an algorithm is chosen and run."
  - text: "Strategy"
    correct: true
    why: "Each shipping method is an interchangeable algorithm behind one signature, picked at runtime. In TypeScript, plain functions can stand in for strategy classes."
  - text: "Observer"
    why: "Observer notifies a list of subscribers when something happens. There's no event or subscription here."
  - text: "Adapter"
    why: "Adapter wraps an object to make its interface fit another. These functions already share one interface."
---

## Prompt

This replaced a growing `switch (order.method)`. Which pattern is it?

```ts
type CostFn = (kg: number) => number

const shippingCost: Record<ShippingMethod, CostFn> = {
  standard: (kg) => 4 + kg * 0.5,
  express: (kg) => 10 + kg * 1.2,
  pickup: () => 0,
}

const cost = shippingCost[order.method](order.weightKg)
```
