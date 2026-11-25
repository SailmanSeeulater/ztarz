#!/usr/bin/env bash
# Nightly database dump on the VPS, kept for 14 days. Installed in cron as:
#   15 3 * * * /home/ubuntu/ztarz/deploy/backup.sh >> /home/ubuntu/backups/ztarz-backup.log 2>&1
# Restore: gunzip -c ~/backups/ztarz-<stamp>.sql.gz | docker exec -i ztarz-postgres psql -U ztarz -d ztarz
set -euo pipefail

dir=/home/ubuntu/backups
file="$dir/ztarz-$(date +%Y%m%d-%H%M%S).sql.gz"
mkdir -p "$dir"

docker exec ztarz-postgres pg_dump -U ztarz ztarz | gzip > "$file"

if [ ! -s "$file" ]; then
  echo "$(date): ztarz backup FAILED: empty or missing $file" >&2
  exit 1
fi
echo "$(date): ztarz backup ok: $file ($(du -h "$file" | cut -f1))"

find "$dir" -name 'ztarz-*.sql.gz' -mtime +14 -delete
