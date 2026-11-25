---
title: "npm ci on every code change"
module: devops
type: bug-hunt
source: "https://docs.docker.com/build/cache/optimize/"
tags: ["docker", "build-cache", "ci"]
stack: ["docker", "nodedotjs"]
choices:
  - text: "`node:22-slim` is not cacheable; pin it by digest"
    why: "Base images are cached like any layer. Pinning helps reproducibility, but it isn't why `npm ci` re-runs."
  - text: "`npm ci` always ignores the cache; use `npm install`"
    why: "Docker caches the RUN step as a whole. Whether it re-runs depends on the layers above it, not on which npm command it is."
  - text: "`WORKDIR` creates a new layer every build"
    why: "`WORKDIR` with the same path is cached. It doesn't invalidate anything."
  - text: "`COPY . .` comes before `npm ci`, so any source change invalidates the install layer"
    correct: true
    why: "A layer is rebuilt when its instruction or input files change, and every step after it rebuilds too. Copy only the package files, install, then copy the source."
---

## Prompt

Every push rebuilds this image from `npm ci` onwards, even when only a `.tsx` file changed. What's wrong?

```dockerfile
FROM node:22-slim
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
CMD ["node", "server.js"]
```

## Explanation

Order layers from least to most frequently changed:

```dockerfile
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
```

Now a code change only invalidates the last `COPY` and the build. The install layer is reused until the lockfile changes. A `.dockerignore` that excludes `node_modules` and `.git` keeps the final `COPY` from changing for no reason.
