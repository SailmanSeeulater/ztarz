#!/usr/bin/env bash
# Runs on the VPS for every deploy, from the checkout, after `git pull` (so this is always
# the new commit's version of the script). CI calls it over SSH:
#
#   echo "$GHCR_TOKEN" | ssh vps "cd ~/ztarz && git pull --ff-only && deploy/remote-deploy.sh <sha> <ghcr-user>"
#
# The token arrives on stdin, is only used to log in, and expires when the CI job ends.
set -euo pipefail

tag=${1:?usage: remote-deploy.sh <sha> <ghcr-user>}
user=${2:?usage: remote-deploy.sh <sha> <ghcr-user>}
image=ghcr.io/sailmanseeulater/ztarz
cd "$(dirname "$0")/.."

stamp() { echo "== $1 $(date -u +%H:%M:%S)"; }

stamp "host"
df -h / | tail -1
free -h | head -2

stamp "login"
docker login ghcr.io -u "$user" --password-stdin
trap 'docker logout ghcr.io >/dev/null 2>&1 || true' EXIT

# Pin the tag in .env, so a later hand-run `docker compose up -d` starts this version
# instead of falling back to :latest.
sed -i '/^ZTARZ_TAG=/d' .env
echo "ZTARZ_TAG=$tag" >> .env

stamp "pull $tag"
docker compose pull app

stamp "migrate"
docker compose run --rm migrate

stamp "up"
docker compose up -d app

stamp "check"
docker compose ps

# The right version, not just a running one.
have=$(docker inspect -f '{{.Config.Image}}' ztarz-app)
if [ "$have" != "$image:$tag" ]; then
  echo "ztarz-app is running $have, expected $image:$tag"
  exit 1
fi

# Answering, not just started: ask /api/health (which also queries the database) for up
# to two minutes, and stop early if the container dies.
ok=""
for _ in $(seq 1 24); do
  if curl -fs -m 3 http://127.0.0.1:3020/api/health >/dev/null; then ok=yes; break; fi
  [ "$(docker inspect -f '{{.State.Running}}' ztarz-app)" = "true" ] || break
  sleep 5
done
restarts=$(docker inspect -f '{{.RestartCount}}' ztarz-app)
if [ -z "$ok" ] || [ "$restarts" != "0" ]; then
  echo "ztarz-app is not healthy (restarts=$restarts):"
  docker compose logs --tail=80 app
  exit 1
fi

docker image prune -f >/dev/null
stamp "done: $image:$tag is live"
