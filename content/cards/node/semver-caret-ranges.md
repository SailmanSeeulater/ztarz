---
title: "What ^ lets npm install"
module: node
type: mcq
source: "https://github.com/npm/node-semver#caret-ranges-123-025-004"
tags: ["node", "npm", "semver", "dependencies"]
stack: ["npm", "nodedotjs"]
choices:
  - text: "`zod` 3.25.0 and `tiny-lib` 0.5.0"
    why: "Caret allows changes that don't touch the left-most non-zero digit. For `0.4.2` that digit is the 4, so 0.5.0 is out."
  - text: "`zod` 4.0.0 and `tiny-lib` 0.4.9"
    why: "A caret range never crosses a major version: `^3.22.4` means `>=3.22.4 <4.0.0`."
  - text: "`zod` 3.25.0 and `tiny-lib` 0.4.9"
    correct: true
    why: "`^3.22.4` is `>=3.22.4 <4.0.0`, and `^0.4.2` is `>=0.4.2 <0.5.0`, because below 1.0 a minor bump is treated as breaking."
  - text: "`zod` 3.22.9 only, and `tiny-lib` 0.4.9"
    why: "Patch-only updates are what tilde (`~3.22.4`) allows. Caret also takes new minors."
---

## Prompt

`package.json` has `"zod": "^3.22.4"` and `"tiny-lib": "^0.4.2"`. Which pair of versions is inside both ranges?
