---
title: "Turning on ufw over SSH"
module: devops
type: mcq
source: "https://manpages.ubuntu.com/manpages/noble/man8/ufw.8.html"
tags: ["firewall", "ufw", "ssh", "linux"]
stack: ["ubuntu", "linux"]
choices:
  - text: "`ufw enable`, then `ufw allow 22/tcp` once it's running"
    why: "Enabling flushes the chains and applies a default incoming policy of deny, which can drop your SSH session before you get to the allow rule."
  - text: "`ufw default allow incoming`, then `ufw enable`"
    why: "This keeps you connected but leaves every listening port open, which defeats the point of a firewall."
  - text: "`ufw default deny incoming`, `ufw allow 22/tcp`, `ufw allow 80,443/tcp`, then `ufw enable`"
    correct: true
    why: "Rules can be added before the firewall is on. Deny by default, allow only SSH and the web ports, then enable. Keep the current session open and test a new SSH login before you disconnect."
  - text: "`ufw deny 22/tcp` first so attackers can't brute-force while you configure"
    why: "That blocks your own way in. To slow brute-forcing, use `ufw limit ssh/tcp` and key-only logins."
---

## Prompt

You're on a fresh Ubuntu VPS over SSH and want a default-deny firewall that only lets in SSH and HTTPS traffic. Which sequence is safe?
