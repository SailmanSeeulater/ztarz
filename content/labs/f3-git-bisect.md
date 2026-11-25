---
title: "Find the commit that broke it with git bisect"
module: f3
minutes: 20
source: "https://git-scm.com/docs/git-bisect"
stack: ["git"]
checks:
  - label: "bisect named a first bad commit"
    pattern: "is the first bad commit"
  - label: "it's the commit that actually broke the test"
    pattern: "is the first bad commit\\n(?:.*\\n){0,6}?\\s+step 13\\b"
---

## Goal

Let git binary-search twenty commits for the one that broke a test, instead of reading them one by one.

## Steps

1. Build a repo with twenty commits, one of which breaks things (you're not told which):

   ```console
   mkdir ~/bisect-lab && cd ~/bisect-lab && git init -q
   for i in $(seq 1 20); do
     if [ "$i" -ge 13 ]; then echo bad > status; else echo good > status; fi
     echo "$i" > counter
     git add . && git commit -qm "step $i"
   done
   printf '#!/bin/sh\ngrep -qx good status\n' > test.sh && chmod +x test.sh
   ```

2. Tell bisect the newest commit is bad and the first is good, then let it run the test at each step:

   ```console
   git bisect start HEAD "$(git rev-list --max-parents=0 HEAD)"
   git bisect run ./test.sh
   git bisect reset
   ```

3. Count how many commits it tested. Twenty commits need at most five tries: why?

## Evidence

Paste the output of `git bisect run`.
