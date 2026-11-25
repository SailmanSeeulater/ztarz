---
title: "Backups you have actually restored"
module: f8
type: out-loud
source: "https://www.postgresql.org/docs/current/backup-dump.html"
tags: ["postgres", "backups", "ops"]
stack: ["postgresql", "docker", "linux"]
---

## Prompt

How do you back up a small Postgres running in Docker, and how do you know the backups work?

## Model answer

**Back up:** a nightly cron job runs `docker exec <db> pg_dump -U app app | gzip > app-<stamp>.sql.gz`. `pg_dump` gives a consistent snapshot without blocking normal reads and writes. The script fails loudly if the file is empty, keeps a fixed number of days, and copies dumps off the server: a backup on the same disk dies with it.

**Prove it:** restore into a scratch database on a schedule:

```bash
createdb -T template0 restore_test
gunzip -c app-<stamp>.sql.gz | psql -X --set ON_ERROR_STOP=on restore_test
```

Then check row counts, or point the app at it. The roles that own objects must already exist.

An untested backup fails when you need it: empty, cut short, missing roles, or a restore nobody has done. You only trust the backups you've restored.
