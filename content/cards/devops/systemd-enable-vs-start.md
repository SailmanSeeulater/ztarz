---
title: "Running after start, gone after reboot"
module: devops
type: mcq
source: "https://www.freedesktop.org/software/systemd/man/latest/systemctl.html"
tags: ["systemd", "linux", "services"]
stack: ["systemd", "linux"]
choices:
  - text: "The unit was never enabled; `start` only runs it now, so use `systemctl enable --now app`"
    correct: true
    why: "`enable` creates the symlinks named in the unit's `[Install]` section (usually `WantedBy=multi-user.target`), which is what starts it at boot. It doesn't start the unit by itself, hence `--now`."
  - text: "systemd forgets units on reboot unless you run `daemon-reload` first"
    why: "`daemon-reload` re-reads changed unit files into the running manager. It has nothing to do with boot-time start-up."
  - text: "The unit needs `Restart=always` to come back after a reboot"
    why: "`Restart=` restarts the process when it exits while the system is running. Starting at boot is the job of `enable`."
  - text: "Units in `/etc/systemd/system` are temporary; move it to `/run/systemd/system`"
    why: "Backwards. `/run` is the runtime directory, wiped at boot. `/etc/systemd/system` is where admins put persistent units."
---

## Prompt

You wrote `/etc/systemd/system/app.service`, ran `systemctl start app`, and the site worked. After the VPS rebooted overnight the app is not running and `systemctl status app` says `inactive (dead)`. Most likely cause?
