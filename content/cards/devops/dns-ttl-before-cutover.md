---
title: "Lowering TTL before a DNS change"
module: devops
type: concept
source: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/migrate-dns-domain-in-use.html"
tags: ["dns", "migration", "networking"]
---

## Prompt

You're moving a site to a new server next week, and its A record has a TTL of 86400. What should you do with the TTL, and when?

## Answer

TTL is how long resolvers may cache a record before asking again. With 86400 seconds, some users would keep hitting the old IP for up to a day after the change, and rolling back would be just as slow.

1. Days ahead, lower the TTL to something like 60 to 300 seconds.
2. Wait at least the **old** TTL (a full day here) so every cached copy has expired and picked up the short TTL.
3. Change the record. Most clients move within minutes, and a rollback is equally fast.
4. Keep the old server running for a while, then raise the TTL again to cut lookup traffic and latency.
