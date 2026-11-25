---
title: "How many matrix jobs run?"
module: devops
type: what-prints
source: "https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/run-job-variations"
tags: ["github-actions", "ci", "matrix"]
stack: ["githubactions"]
---

## Prompt

How many jobs does this matrix start?

```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest]
    node: [20, 22, 24]
    exclude:
      - os: windows-latest
        node: 20
    include:
      - os: macos-latest
        node: 24
```

## Answer

6

## Explanation

The base matrix is every combination: 2 × 3 = 6. `exclude` removes Windows on Node 20, leaving 5. `include` then tries to add its keys to existing combinations, but `os: macos-latest` would overwrite the `os` of every one of them, so it becomes a new standalone combination: 6 jobs.

By default a failing matrix job cancels the others still running (`fail-fast`), and `max-parallel` caps how many run at once.
