---
title: "A secret pushed to git"
module: f9
type: out-loud
source: "https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository"
tags: ["security", "secrets", "git"]
stack: ["git", "github"]
---

## Prompt

You've just noticed a commit you pushed contains a live API key. A teammate says to delete it in a new commit. What do you do?

## Model answer

**Rotate it first.** Assume it's been seen: revoke the key at the provider and issue a new one. Once it's revoked, the leaked copy is useless.

A new commit doesn't remove it. Every earlier commit still contains the key, so anyone with the history can find it with `git log -p`.

Then:

1. Check the provider's logs for use of the old key.
2. Move the new key into an env var or secret store, and gitignore the file.
3. Optionally rewrite history (`git filter-repo`), knowing copies survive in clones, forks, pull requests and cached commit views.
4. Turn on secret scanning so it's caught at push next time.

Order matters: rotate, check, clean up, prevent.
