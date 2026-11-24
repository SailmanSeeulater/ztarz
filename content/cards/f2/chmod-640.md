---
title: "chmod 640"
module: f2
type: mcq
source: "https://man7.org/linux/man-pages/man1/chmod.1.html"
tags: ["linux", "permissions"]
choices:
  - text: "Everyone reads; only the owner writes"
    why: "That's 644."
  - text: "Owner reads and writes; group reads; others get nothing"
    correct: true
    why: "The digits are owner, group, others, each a sum of read 4, write 2, execute 1. So 6 = read + write, 4 = read, 0 = nothing. Good for an env file a service's group must read."
  - text: "Owner reads, writes and executes; group reads"
    why: "Execute would make the first digit 7 (4 + 2 + 1)."
  - text: "Group reads and writes; owner reads"
    why: "The order is owner, then group, then others."
---

## Prompt

`chmod 640 secrets.env`: who can do what?
