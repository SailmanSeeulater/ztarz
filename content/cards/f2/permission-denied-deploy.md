---
title: "Permission denied on a fresh clone"
module: f2
type: bug-hunt
source: "https://man7.org/linux/man-pages/man1/chmod.1.html"
tags: ["linux", "permissions", "git"]
choices:
  - text: "Run it with `sudo`"
    why: "Even root can't execute a file that has no execute bit at all, and deploying as root hides the real problem."
  - text: "The file has Windows line endings"
    why: "That fails differently: `bad interpreter: /bin/bash^M`."
  - text: "The script has no execute bit: `chmod +x deploy.sh`, and commit the mode"
    correct: true
    why: "`git update-index --chmod=+x deploy.sh` records mode 100755, so every clone gets it executable."
  - text: "The directory needs `chmod 777`"
    why: "You already `cd`'d into it, so you can traverse it. 777 lets anyone write there; never the fix."
---

## Prompt

What's wrong?

```console
$ ./deploy.sh
bash: ./deploy.sh: Permission denied
$ ls -l deploy.sh
-rw-r--r-- 1 deploy deploy 812 Nov 23 10:00 deploy.sh
```

## Explanation

Running a file needs its `x` bit. `bash deploy.sh` would also work, since bash only reads the file. Git stores just one permission per file, executable or not, so commit the mode once and it follows the file everywhere.
