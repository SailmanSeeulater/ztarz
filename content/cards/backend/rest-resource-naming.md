---
title: "Naming a REST endpoint"
module: backend
type: mcq
source: "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design#define-restful-web-api-resource-uris"
tags: ["rest", "api-design"]
choices:
  - text: "`POST /getOrderProducts` with `{ \"orderId\": 99 }` in the body"
    why: "A verb in the path and a POST for a read. The HTTP method is already the verb, and a POST can't be cached like a GET."
  - text: "`GET /customers/1/orders/99/products`"
    why: "Deep nesting ties the URL to today's relationships and is hard to maintain. You already know the order id, so the customer segment adds nothing."
  - text: "`GET /orders/99/products`"
    correct: true
    why: "Plural nouns, a collection, an item, then a related collection. Keep URIs no more complex than collection/item/collection and let GET say \"read\"."
  - text: "`GET /order/99/product/list`"
    why: "Singular names and a `list` suffix. A GET on a plural collection already means \"list them\"."
---

## Prompt

You need an endpoint that returns the products in order 99. Which path follows REST conventions best?
