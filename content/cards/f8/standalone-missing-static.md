---
title: "Standalone output with no CSS"
module: f8
type: bug-hunt
source: "https://nextjs.org/docs/app/api-reference/config/next-config-js/output#automatically-copying-traced-files"
tags: ["nextjs", "docker", "deploy"]
stack: ["nextdotjs", "docker"]
choices:
  - text: "Switch the command to `next start`"
    why: "`next start` doesn't work with `output: \"standalone\"`; it warns you to run `node .next/standalone/server.js` instead. The standalone folder is meant to run without a full install."
  - text: "Set `HOSTNAME=0.0.0.0` so the server answers outside the container"
    why: "Pages already load, so the server is reachable. `HOSTNAME` picks the interface it listens on, not which files it serves."
  - text: "Standalone output leaves out `public` and `.next/static`: copy them in next to `server.js`"
    correct: true
    why: "The traced server doesn't include them, since a CDN would usually serve them. Copied to `./public` and `./.next/static`, `server.js` serves them itself."
  - text: "The build stage ran with the wrong `NODE_ENV`"
    why: "A wrong `NODE_ENV` changes behaviour and performance, but it doesn't make every hashed asset 404."
---

## Prompt

`next.config.ts` sets `output: "standalone"`. Pages render, but every `/_next/static/...` CSS and JS file is a 404 and images from `public/` are missing. What's wrong?

```dockerfile
FROM node:24-alpine AS runner
WORKDIR /app
COPY --from=build /app/.next/standalone ./
CMD ["node", "server.js"]
```

## Explanation

Standalone output is a minimal server plus only the files it traces. Add the two folders yourself:

```dockerfile
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
```
