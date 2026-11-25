---
title: "The deploy user lost sudo"
module: devops
type: bug-hunt
source: "https://man7.org/linux/man-pages/man8/usermod.8.html"
tags: ["linux", "users", "groups", "sudo"]
stack: ["linux"]
choices:
  - text: "`-G` without `-a` replaces the user's supplementary groups, so `deploy` was removed from `sudo`"
    correct: true
    why: "`usermod -G docker` sets the list to exactly `docker`. Use `usermod -aG docker deploy` to append. Fix it now with `usermod -aG sudo deploy` from a root shell."
  - text: "Joining `docker` revokes sudo because Docker access already implies root"
    why: "Docker group membership is root-equivalent in practice, but nothing removes other groups because of it. The command did that."
  - text: "Group changes need a reboot before sudo works again"
    why: "New memberships apply at the next login, not after a reboot. And this is a lost membership, not a pending one."
  - text: "`usermod` needs `--force` to keep existing groups"
    why: "There's no such flag. Keeping existing groups is what `-a` (`--append`) is for."
---

## Prompt

To let the `deploy` user run Docker without sudo, an admin ran this as root. On next login, `sudo` fails for `deploy` with "deploy is not in the sudoers file". Why?

```bash
usermod -G docker deploy
```

## Explanation

`-G` takes the complete list of supplementary groups, and any group not listed is dropped. `-a` switches it to append mode and only works with `-G`. Check with `id deploy` before logging out of the root session. Separately, remember that `docker` group membership effectively grants root on that host, so give it deliberately.
