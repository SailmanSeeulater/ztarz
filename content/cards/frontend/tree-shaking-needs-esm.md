---
title: "One import, whole library bundled"
module: frontend
type: mcq
source: "https://webpack.js.org/guides/tree-shaking/"
tags: ["bundling", "performance", "modules"]
stack: ["webpack", "vite"]
choices:
  - text: "Named imports always pull in the whole module; a default import would fix it"
    why: "Backwards. Named imports of ES module exports are exactly what lets the bundler drop the rest."
  - text: "You need a dynamic `import()` to tree-shake"
    why: "Dynamic import splits code into a separate chunk loaded later. It doesn't remove unused code."
  - text: "The library ships CommonJS (or declares side effects), so the bundler can't prove the other exports are safe to drop"
    correct: true
    why: "Tree shaking relies on the static structure of `import`/`export`. Prefer the package's ES module build, and check its `sideEffects` field."
  - text: "Tree shaking only removes code from your own files, never from `node_modules`"
    why: "It works on dependencies too, when they ship ES modules and are side-effect free."
---

## Prompt

In a production build, you import one helper with `import { debounce } from "some-utils"`, yet the bundle analyser shows the whole library. What's the most likely reason?
