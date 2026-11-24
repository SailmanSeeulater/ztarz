---
title: "ES modules vs CommonJS"
module: f4
type: concept
source: "https://nodejs.org/api/esm.html"
tags: ["javascript", "node", "modules"]
---

## Prompt

ES modules vs CommonJS in Node: what's the difference?

## Answer

- **CommonJS:** `require()` and `module.exports`. Loading is synchronous and `require` can be called anywhere at runtime.
- **ES modules:** `import` and `export`. Imports are static, resolved before any code runs (which is what lets bundlers tree-shake), and top-level `await` works.

Node treats `.mjs` files, and `.js` files under `"type": "module"` in package.json, as ESM; `.cjs` files as CommonJS. ESM can import CommonJS. ESM has no `__dirname`; use `import.meta.dirname`.
