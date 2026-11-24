---
title: "The site is down and you have SSH"
module: f2
type: out-loud
source: "https://www.brendangregg.com/USEmethod/use-linux.html"
tags: ["linux", "debugging", "ops"]
---

## Prompt

The site is down. You have SSH to the server and nothing else. Walk through what you check, in order.

## Model answer

Work from the app outward.

1. **Is it running?** `docker compose ps` or `systemctl status app`.
2. **Its logs:** `docker compose logs --tail 100 app` or `journalctl -u app -n 100`.
3. **Does it answer locally?** `ss -tlnp` shows it listening; `curl -i localhost:3000` shows a response.
4. **Resources** (the USE method: utilization, saturation, errors for each one): disk (`df -h`; a full disk breaks everything), memory and OOM kills (`free -m`, `dmesg | grep -i kill`), CPU and load (`uptime`, `top`).
5. **The path in:** is nginx up, and what's in its error log? Has the certificate expired? Firewall (`ufw status`)? Does DNS still point here (`dig +short`)?

Say what you'd fix first and how you'd confirm it's fixed.
