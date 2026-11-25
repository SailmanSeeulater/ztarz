---
title: "Gating production deploys in GitHub Actions"
module: devops
type: mcq
source: "https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments"
tags: ["github-actions", "ci-cd", "secrets"]
stack: ["githubactions"]
choices:
  - text: "Store the key as a repository secret and add `if: github.ref == 'refs/heads/main'` to the job"
    why: "Every workflow in the repo can read a repository secret, and an `if:` line is easy to edit in a PR. Nothing requires a human to approve."
  - text: "Put the key in the workflow file and make the repository private"
    why: "Anyone with read access sees it, and it stays in git history forever."
  - text: "Ask reviewers to check the Actions tab before merging"
    why: "A process note, not a control. Nothing stops the job running unapproved."
  - text: "A `production` environment with required reviewers, a `main`-only branch rule, and the key stored as an environment secret"
    correct: true
    why: "A job with `environment: production` waits for approval, and it can only read that environment's secrets after the protection rules pass."
---

## Prompt

You want deploys to production to run only from `main`, only after a named person approves, and you want the production deploy key unreadable by any other job. Which setup does that?
