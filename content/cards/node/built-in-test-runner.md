---
title: "Testing without installing anything"
module: node
type: concept
source: "https://nodejs.org/api/test.html"
tags: ["node", "testing"]
stack: ["nodedotjs"]
---

## Prompt

How do you write and run a unit test in Node with no test framework installed?

## Answer

Use the built-in `node:test` module with `node:assert`, and run `node --test`.

```js
// slug.test.js
import { test } from "node:test";
import assert from "node:assert/strict";
import { slugify } from "./slug.js";

test("lowercases and joins words with hyphens", () => {
  assert.equal(slugify("Hello World"), "hello-world");
});
```

`node --test` finds files such as `*.test.js` and runs them. It supports `describe`/`it`, async tests, mocks, watch mode and coverage, which covers many projects without Jest or Vitest.
