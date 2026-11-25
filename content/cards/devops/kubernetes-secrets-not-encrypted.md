---
title: "How secret is a Kubernetes Secret?"
module: devops
type: mcq
source: "https://kubernetes.io/docs/concepts/configuration/secret/"
tags: ["kubernetes", "secrets", "security"]
stack: ["kubernetes"]
choices:
  - text: "Values are base64-encoded, which is not encryption, and by default they're stored unencrypted in etcd"
    correct: true
    why: "Anyone who can read the Secret, or create a Pod in its namespace, can get the value. Turn on encryption at rest, restrict access with RBAC, and keep Secret manifests out of git."
  - text: "Values are encrypted with the cluster's private key, so committing the YAML is safe"
    why: "base64 is reversible by anyone. Committing a Secret manifest is the same as committing the password."
  - text: "Secrets and ConfigMaps are identical; the name is only a label"
    why: "Secrets are meant for confidential data and get some extra care (for example, kept off node disks where possible), but they're not encrypted by default."
  - text: "Only cluster admins can read Secrets, whatever the RBAC rules say"
    why: "Access follows RBAC. Anyone allowed to create a Pod or Deployment in the namespace can mount any Secret there."
---

## Prompt

You move `DATABASE_URL` from a ConfigMap into a Secret. What does that actually protect, out of the box?
