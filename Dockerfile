# syntax=docker/dockerfile:1
# Multi-stage build: `runner` is the small production image; `tools` runs migrations and scripts.

FROM node:24-alpine AS base
RUN corepack enable
WORKDIR /app

# ---- dependencies (cached until the lockfile changes)
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# ---- tools: full source + dev deps, for `pnpm db:migrate` and `pnpm owner:create`
FROM deps AS tools
COPY . .

# ---- build
FROM tools AS build
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# ---- runner: only the standalone server and static assets
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
RUN addgroup -S app && adduser -S app -G app
COPY --from=build --chown=app:app /app/.next/standalone ./
COPY --from=build --chown=app:app /app/.next/static ./.next/static
COPY --from=build --chown=app:app /app/public ./public
USER app
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health || exit 1
CMD ["node", "server.js"]
