---
title: "npm ci in a pipeline"
module: node
type: mcq
source: "https://docs.npmjs.com/cli/v11/commands/npm-ci"
tags: ["node", "npm", "lockfile", "ci"]
stack: ["npm", "nodedotjs"]
choices:
  - text: "It skips downloading packages by reusing the global cache only"
    why: "It still downloads whatever the cache doesn't have. Speed comes from not resolving versions, not from skipping downloads."
  - text: "It upgrades every dependency to the newest version its range allows"
    why: "That's closer to `npm update`. `npm ci` does the opposite: it never changes the versions in the lockfile."
  - text: "It leaves out devDependencies, so builds are smaller"
    why: "It installs devDependencies unless you pass `--omit=dev`. Most CI jobs need them for tests and builds."
  - text: "It installs exactly what the lockfile says, deletes any existing node_modules, and fails if package.json and the lockfile disagree"
    correct: true
    why: "That gives every CI run the same dependency tree as your laptop, and it never writes to package.json or the lockfile. pnpm's equivalent is `pnpm install --frozen-lockfile`."
---

## Prompt

Why run `npm ci` instead of `npm install` in CI?
