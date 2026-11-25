---
title: "Name the pattern: wrapping a payment SDK"
module: swe
type: mcq
source: "https://refactoring.guru/design-patterns/adapter"
tags: ["design-patterns", "adapter", "decorator"]
stack: ["typescript"]
choices:
  - text: "Decorator"
    why: "A decorator keeps the same interface as the object it wraps and adds behaviour, such as logging or retries. This class changes the interface."
  - text: "Facade"
    why: "A facade puts one simple interface over a whole subsystem. This wraps a single client to fit an interface you already have."
  - text: "Proxy"
    why: "A proxy keeps the same interface and controls access to the real object, for example lazy loading or caching."
  - text: "Adapter"
    correct: true
    why: "It converts the vendor's interface into the one your code expects, so the rest of the app never imports the SDK and the vendor can be swapped."
---

## Prompt

Which pattern is `AcmePayAdapter`?

```ts
interface PaymentGateway {
  charge(amountPence: number, customerId: string): Promise<string>
}

class AcmePayAdapter implements PaymentGateway {
  constructor(private client: AcmePayClient) {}

  async charge(amountPence: number, customerId: string) {
    const res = await this.client.createPayment({
      amount: { value: amountPence / 100, currency: 'GBP' },
      payer: customerId,
    })
    return res.paymentId
  }
}
```
