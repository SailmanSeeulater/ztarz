# syntax=docker/dockerfile:1
# Multi-stage build. `runner` is the production image: the standalone server plus a small
# migrator, so a deploy can migrate with the exact image it's about to run.

FROM node:24-alpine AS base
RUN corepack enable
WORKDIR /app

# ---- dependencies (cached until the lockfile changes)
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# ---- migrator: drizzle-orm's migrate() and the postgres driver, at the lockfile's versions.
# The standalone build bundles both into server chunks and leaves out the migrator.
FROM deps AS migrator
RUN ver() { node -p "JSON.parse(require('fs').readFileSync('/app/node_modules/$1/package.json')).version"; } \
 && mkdir /migrator && cd /migrator \
 && echo '{"private":true,"type":"module"}' > package.json \
 && npm install --omit=dev --no-audit --no-fund "drizzle-orm@$(ver drizzle-orm)" "postgres@$(ver postgres)"

# ---- build
FROM deps AS build
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# ---- runner: the standalone server, static assets, and the migrator
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
RUN addgroup -S app && adduser -S app -G app
COPY --from=build --chown=app:app /app/.next/standalone ./
COPY --from=build --chown=app:app /app/.next/static ./.next/static
COPY --from=build --chown=app:app /app/public ./public
COPY --from=migrator --chown=app:app /migrator ./migrator
COPY --from=build --chown=app:app /app/drizzle ./migrator/drizzle
COPY --from=build --chown=app:app /app/scripts/migrate.mjs ./migrator/migrate.mjs
USER app
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health || exit 1
CMD ["node", "server.js"]
