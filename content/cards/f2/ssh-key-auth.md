---
title: "How SSH keys work"
module: f2
type: concept
source: "https://man.openbsd.org/ssh#AUTHENTICATION"
tags: ["ssh", "security"]
---

## Prompt

How does SSH key authentication work, and which key goes where?

## Answer

`ssh-keygen -t ed25519` makes a key pair.

- The **private key** stays on your machine (`~/.ssh/id_ed25519`, mode 600, ideally with a passphrase).
- The **public key** goes into `~/.ssh/authorized_keys` on the server; `ssh-copy-id` does this for you.

When you connect, the client proves it holds the private key by signing data for that session, and the server checks the signature against `authorized_keys`. The private key never leaves your machine. Once keys work, turn off password logins (`PasswordAuthentication no` in `sshd_config`).
