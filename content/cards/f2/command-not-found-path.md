---
title: "command not found, but the file is there"
module: f2
type: mcq
source: "https://man7.org/linux/man-pages/man1/bash.1.html#COMMAND_EXECUTION"
tags: ["shell", "path"]
stack: ["gnubash"]
choices:
  - text: "The file isn't executable"
    why: "Then running it by its full path would fail too."
  - text: "Commands must live in `/usr/bin`"
    why: "Any directory on `PATH` works."
  - text: "You need to reboot"
    why: "A new shell that reads your profile is enough. (Bash also caches command locations; `hash -r` clears that.)"
  - text: "The shell only searches the directories listed in `$PATH`"
    correct: true
    why: "Add `export PATH=\"/opt/tool/bin:$PATH\"` to your shell profile, or symlink the tool into a directory already on PATH, like `/usr/local/bin`."
---

## Prompt

You installed a tool at `/opt/tool/bin/tool`. Typing `tool` says `command not found`, but `/opt/tool/bin/tool` works. Why?
