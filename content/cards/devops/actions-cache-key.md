---
title: "A dependency cache that never refreshes"
module: devops
type: mcq
source: "https://docs.github.com/en/actions/reference/workflows-and-actions/dependency-caching"
tags: ["github-actions", "ci", "caching"]
stack: ["githubactions"]
choices:
  - text: "Caches expire after every run, so it's re-downloading anyway"
    why: "Caches persist between runs until evicted for age or size. A fixed key keeps hitting the same old entry."
  - text: "Use `restore-keys: npm-` instead of `key`"
    why: "`restore-keys` is a fallback prefix for when the exact key misses. It doesn't replace a key that changes with the lockfile."
  - text: "The key is fixed, and an existing cache can't be updated, so new dependencies never get saved"
    correct: true
    why: "Key on the lockfile: `npm-${{ hashFiles('**/package-lock.json') }}`. A lockfile change gives a new key, a miss, and a fresh save. `actions/setup-node` with `cache: npm` does this for you."
  - text: "`~/.npm` can't be cached; cache `node_modules` instead"
    why: "Caching npm's download cache and running `npm ci` is the documented pattern. `node_modules` depends on the OS and Node version."
---

## Prompt

This step restores a cache on every run, yet `npm ci` downloads new packages each time you add one. Why?

```yaml
- uses: actions/cache@v4
  with:
    path: ~/.npm
    key: npm-cache
```
