# Deploying ztarz (lab F8)

ztarz runs at **https://ztarz.latesailor.dev** on the shared Oracle VPS (`ssh oracle`), next to the other latesailor.dev apps. Every push to `main` that passes CI deploys itself.

```
push to main ─▶ CI: lint, unit tests, build, e2e
                 └─▶ build image ─▶ ghcr.io/sailmanseeulater/ztarz:<sha>
                      └─▶ deploy: ssh to the VPS ─▶ git pull, pull image, migrate, restart, health check

internet ─443─▶ nginx (host, certbot) ─▶ 127.0.0.1:3020 ztarz-app ─▶ ztarz-postgres
```

## How it fits on the server

- **Host nginx and certbot**, shared with the other sites. The site file is [`deploy/nginx/ztarz.latesailor.dev.conf`](../deploy/nginx/ztarz.latesailor.dev.conf); certbot added the 443 block and the http → https redirect on the server. Renewal is the server's `certbot.timer`.
- **Two containers** from [`compose.prod.yml`](../compose.prod.yml): `ztarz-app` (capped at 256 MB) and `ztarz-postgres` (capped at 128 MB). Both publish only on 127.0.0.1: 3020 for the app, 5435 for the database.
- **The VM has 1 GB of RAM**, so it never builds anything. GitHub builds the image; the VPS only pulls it.
- **`~/ztarz` is a git checkout**, used for the compose file and scripts. Its `.env` (mode 600, never committed) holds the database password, the auth secret, and `ZTARZ_TAG`, the commit that's live. `COMPOSE_FILE=compose.prod.yml` is in there too, so plain `docker compose ...` works in `~/ztarz`.

## The deploy, step by step

The `image` and `deploy` jobs in [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) run only for pushes to `main`, after `check` and `e2e` pass.

1. **image** builds the `runner` target and pushes `:latest` and `:<sha>` to GHCR.
2. **deploy** SSHes in with the deploy key (host key pinned in [`deploy/ssh_host_ed25519_key.pub`](../deploy/ssh_host_ed25519_key.pub)), runs `git pull`, then [`deploy/remote-deploy.sh`](../deploy/remote-deploy.sh), which:
   - logs in to GHCR with the run's own short-lived token (logged out at the end);
   - writes `ZTARZ_TAG=<sha>` into `.env`;
   - pulls the image, runs migrations with it (`docker compose run --rm migrate`), and restarts the app;
   - fails the deploy unless the running container is that exact image **and** `/api/health` answers (which also checks the database), printing the app's logs if not.
3. Finally the job checks `https://ztarz.latesailor.dev/api/health` from outside.

Deploys queue rather than cancel each other, so one is never stopped halfway.

## Repository secrets

| Secret | Value |
| --- | --- |
| `VPS_HOST` | `146.235.217.254` |
| `VPS_USER` | `ubuntu` |
| `VPS_SSH_KEY` | private half of `~/.ssh/ztarz_deploy`, a key used only by this workflow |

To create the key (once, on your machine):

```bash
ssh-keygen -t ed25519 -C "ztarz deploy" -f ~/.ssh/ztarz_deploy -N ""
ssh oracle 'cat >> ~/.ssh/authorized_keys' < ~/.ssh/ztarz_deploy.pub
gh secret set VPS_SSH_KEY -R SailmanSeeulater/ztarz < ~/.ssh/ztarz_deploy
gh secret set VPS_HOST -R SailmanSeeulater/ztarz --body 146.235.217.254
gh secret set VPS_USER -R SailmanSeeulater/ztarz --body ubuntu
```

To revoke it, delete its line (comment `ztarz deploy`) from `~/.ssh/authorized_keys` on the server.

## First-time setup (already done)

```bash
git clone https://github.com/SailmanSeeulater/ztarz.git ~/ztarz
cd ~/ztarz && umask 077 && cp deploy/env.production.example .env   # then fill in the secrets
sudo cp deploy/nginx/ztarz.latesailor.dev.conf /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/ztarz.latesailor.dev /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d ztarz.latesailor.dev --redirect
```

DNS: an `A` record for `ztarz` pointing at the VPS, at Namecheap.

## Creating your account

Sign-up is off; the owner account is created once, from your machine, through an SSH tunnel to the production database:

```bash
ssh -N -L 5435:127.0.0.1:5435 oracle &
DB_PASS=$(ssh oracle "grep ^POSTGRES_PASSWORD= ~/ztarz/.env | cut -d= -f2")
DATABASE_URL="postgres://ztarz:$DB_PASS@localhost:5435/ztarz" \
  OWNER_EMAIL=you@example.com OWNER_NAME="Your Name" OWNER_PASSWORD='choose-one' \
  pnpm owner:create
kill %1
```

## Everyday operations (on the server, in `~/ztarz`)

```bash
docker compose ps                     # what's running, and its health
docker compose logs --tail 100 app    # app logs
docker compose up -d                  # restart at the tag in .env
```

**Rollback:** set `ZTARZ_TAG` in `.env` to an earlier commit's SHA and run `docker compose up -d`. No rebuild: every deployed commit's image stays in GHCR. Migrations aren't rolled back, which is why they must be backwards compatible (expand, then contract).

**Re-run a deploy:** re-run the workflow's `deploy` job in GitHub Actions.

## Backups

[`deploy/backup.sh`](../deploy/backup.sh) dumps the database to `~/backups/ztarz-<stamp>.sql.gz` nightly at 03:15 (cron), keeping 14 days, next to Mordi's backups. Restore:

```bash
gunzip -c ~/backups/ztarz-<stamp>.sql.gz | docker exec -i ztarz-postgres psql -U ztarz -d ztarz
```

A backup you haven't restored isn't a backup: practise once.

## Private cards

The private deck is gitignored, so CI never sees it and production serves the public cards only. Building it into an image would put it in GHCR, so it stays out until there's a way to load it from a file on the server.

## Troubleshooting

- **502 from nginx:** the app isn't answering on 3020. `docker compose ps` and `docker compose logs app`.
- **Deploy fails at "login":** the GHCR token is the run's own; re-run the job rather than the whole workflow if it took too long.
- **Sign-in fails:** `BETTER_AUTH_URL` in `.env` must be exactly `https://ztarz.latesailor.dev`.
- **"Today" starts at the wrong hour:** `APP_TIMEZONE` in `.env`.
- **Out of memory:** `docker stats --no-stream`. The caps are in `compose.prod.yml`; the VM has 2 GB of swap.
