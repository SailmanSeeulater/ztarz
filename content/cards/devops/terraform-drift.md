---
title: "Someone changed it in the console"
module: devops
type: mcq
source: "https://developer.hashicorp.com/terraform/tutorials/state/resource-drift"
tags: ["terraform", "iac", "drift"]
stack: ["terraform"]
choices:
  - text: "`plan` won't notice, because Terraform only compares the config with the state file"
    why: "`plan` refreshes from the real infrastructure first, so it does see the manual change."
  - text: "`plan` shows a change setting the port back to 22, and `apply` would revert the console edit"
    correct: true
    why: "That's drift: reality no longer matches config. Either put the change into the code, or accept it into state with `apply -refresh-only` and then update the config to match."
  - text: "Terraform adopts the console change automatically on the next `plan`"
    why: "Config is the source of truth. Terraform plans to make reality match the config, not the other way round."
  - text: "`plan` fails with a state lock error until someone runs `terraform import`"
    why: "Locking is about concurrent runs. `import` is for bringing in resources Terraform doesn't manage yet."
---

## Prompt

A security group managed by Terraform allows port 22. During an incident, someone changes it to port 2222 in the AWS console. Nobody touches the `.tf` files. What happens on the next `terraform plan`?
