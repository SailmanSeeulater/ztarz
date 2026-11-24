# Deploying ztarz to a VPS (lab F8)

One server runs everything with Docker Compose: Postgres, the Next.js app, nginx in front with a Let's Encrypt certificate, and certbot renewing it.

```
internet ──443──▶ nginx ──▶ app:3000 ──▶ db:5432
            80 ──▶ nginx (ACME challenges, redirect to https)
```

Only nginx publishes ports. The database is reachable from the app container only.

## You need

- A VPS with Docker Engine and the Compose plugin (Ubuntu 24.04 works). **2 GB RAM or more**, or add swap: `next build` runs on the server and needs memory.
- A domain (or subdomain) with an **A record pointing at the server's IP**. Check with `dig +short ztarz.example.com`.
- Ports 80 and 443 open in the firewall (`ufw allow 80,443/tcp`).

## First deploy

```bash
# 1. Get the code onto the server
git clone <your repo url> ztarz && cd ztarz

# 2. Secrets: fill in every value
cp deploy/env.production.example .env.production
nano .env.production
```

Generate the secrets with `openssl rand -base64 32` (auth) and `openssl rand -base64 24 | tr -d '/+='` (database), and put the database password in both `POSTGRES_PASSWORD` and `DATABASE_URL`.

```bash
# 3. Certificate (once). Uses port 80 directly, so run it before nginx starts.
#    This accepts the Let's Encrypt Subscriber Agreement for your domain.
./deploy/init-cert.sh

# 4. Build, migrate, create your account
docker compose -f compose.prod.yml --env-file .env.production build
docker compose -f compose.prod.yml --env-file .env.production run --rm tools pnpm db:migrate
docker compose -f compose.prod.yml --env-file .env.production run --rm tools pnpm owner:create

# 5. Start everything
docker compose -f compose.prod.yml --env-file .env.production up -d
```

## Check it worked (the lab's pass criteria)

```bash
curl -sI https://ztarz.example.com | head -1          # HTTP/2 200 (or 307 to /sign-in)
curl -s https://ztarz.example.com/api/health          # {"ok":true}
curl -sI http://ztarz.example.com | grep -i location  # redirects to https://
docker compose -f compose.prod.yml ps                 # app shows (healthy)
```

Then sign in and finish one session.

## Updating

```bash
git pull
docker compose -f compose.prod.yml --env-file .env.production build app tools
docker compose -f compose.prod.yml --env-file .env.production run --rm tools pnpm db:migrate
docker compose -f compose.prod.yml --env-file .env.production up -d app
```

Migrations run before the new app starts, so they must be backwards compatible with the running version (expand, then contract).

## Private cards

`content/private/` is gitignored, so a fresh clone doesn't have it. To include your private cards, copy the folder up before building:

```bash
rsync -a content/private/ user@server:ztarz/content/private/
```

They're only shown in your signed-in session, never on the public library or card pages.

## Backups

The database lives in the `pgdata` volume. A nightly dump, kept for two weeks:

```bash
# crontab -e on the server
0 3 * * * cd ~/ztarz && docker compose -f compose.prod.yml exec -T db pg_dump -U ztarz ztarz | gzip > ~/backups/ztarz-$(date +\%F).sql.gz && find ~/backups -name 'ztarz-*.sql.gz' -mtime +14 -delete
```

A backup you haven't restored isn't a backup. Practise once:

```bash
gunzip -c ~/backups/ztarz-YYYY-MM-DD.sql.gz | docker compose -f compose.prod.yml exec -T db psql -U ztarz -d ztarz
```

## Troubleshooting

- **nginx won't start, "cannot load certificate"**: step 3 didn't succeed. Check DNS points at this server and port 80 is open, then rerun `./deploy/init-cert.sh`.
- **Sign-in fails in production**: `BETTER_AUTH_URL` must be the exact public URL, including `https://`.
- **"Today" starts at the wrong hour**: set `APP_TIMEZONE` to your IANA timezone.
- **Build killed during `next build`**: out of memory. Add swap (`fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile`).
