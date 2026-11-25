---
title: "Hardening sshd without locking yourself out"
module: devops
type: concept
source: "https://man7.org/linux/man-pages/man5/sshd_config.5.html"
tags: ["ssh", "security", "linux"]
stack: ["linux"]
---

## Prompt

Which `sshd_config` settings make a server key-only with no root login, and how do you apply them without locking yourself out?

## Answer

```text
PermitRootLogin no
PasswordAuthentication no
KbdInteractiveAuthentication no
```

- `PermitRootLogin` defaults to `prohibit-password` (root by key only). `no` forces everyone to log in as a named user and use `sudo`, which leaves an audit trail.
- `PasswordAuthentication` defaults to `yes`. Turning it off, along with keyboard-interactive, removes password guessing entirely.

Safe order: confirm your key login works for a sudo user, check the file with `sshd -t`, reload sshd, then open a **second** terminal and log in before you close the first one. If the new login fails, fix it from the session you still have.
