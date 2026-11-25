---
title: "Fix a permission-denied deploy script"
module: f2
minutes: 15
source: "https://man7.org/linux/man-pages/man1/chmod.1.html"
stack: ["linux", "bash"]
checks:
  - label: "you saw it fail first"
    pattern: "permission denied"
  - label: "deploy.sh is executable by its owner"
    pattern: "^[-.]rwx\\S*\\s.*deploy\\.sh$"
  - label: "app.env is readable and writable by its owner only"
    pattern: "^[-.]rw-------\\S*\\s.*app\\.env$"
  - label: "the script ran"
    pattern: "^deployed$"
---

## Goal

Hit a "permission denied", read the mode bits that cause it, and fix it without opening the file to everyone.

## Steps

1. Set up a script and a secrets file:

   ```console
   mkdir -p ~/perm-lab && cd ~/perm-lab
   printf '#!/bin/sh\necho deployed\n' > deploy.sh
   echo 'SECRET=change-me' > app.env
   ./deploy.sh
   ```

   The last line fails. Why?

2. Make the script executable for its owner only, and lock the env file down to its owner:

   ```console
   chmod u+x deploy.sh
   chmod 600 app.env
   ls -l deploy.sh app.env
   ./deploy.sh
   ```

3. Explain to yourself what `rwx------` and `rw-------` mean, digit by digit.

## Evidence

Paste everything from the first `./deploy.sh` to the end.
