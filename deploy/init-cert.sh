#!/bin/sh
# First-time certificate for $DOMAIN. Run once on the server before `up`, while port 80 is free.
# Requesting a certificate means accepting the Let's Encrypt Subscriber Agreement.
set -eu
cd "$(dirname "$0")/.."
. ./.env.production
: "${DOMAIN:?set DOMAIN in .env.production}"
: "${LETSENCRYPT_EMAIL:?set LETSENCRYPT_EMAIL in .env.production}"

docker compose -f compose.prod.yml --env-file .env.production run --rm -p 80:80 --entrypoint certbot certbot \
  certonly --standalone -d "$DOMAIN" --email "$LETSENCRYPT_EMAIL" --agree-tos --no-eff-email
