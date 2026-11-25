---
title: "Terraform state and locking"
module: devops
type: concept
source: "https://developer.hashicorp.com/terraform/language/state/locking"
tags: ["terraform", "iac", "state"]
stack: ["terraform"]
---

## Prompt

What is Terraform state, and why do teams keep it in a remote backend with locking instead of a local `terraform.tfstate`?

## Answer

State maps each resource in your configuration to the real object it created (IDs, attributes, dependencies). `plan` compares config, state and reality to work out what to change.

A local file breaks down in a team: each person has a different copy, and losing it means Terraform no longer knows what it manages. A remote backend (an S3 bucket, HCP Terraform and so on) gives one shared copy.

**Locking** stops two `apply` runs writing state at once and corrupting it: the second run waits or fails until the lock is released. Use `force-unlock` only for your own stuck lock.

State can contain secrets in plain text, so never commit it to git, and restrict who can read the backend.
