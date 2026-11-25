---
title: "Which case a select picks"
module: go
type: mcq
source: "https://go.dev/ref/spec#Select_statements"
tags: ["go", "select", "channels"]
stack: ["go"]
choices:
  - text: "The `jobs` case, because it's listed first, like a switch"
    why: "Unlike `switch`, `select` doesn't favour order. Relying on it gives you a starved channel."
  - text: "`default`, because it always runs when present"
    why: "`default` runs only if no other case can proceed right now."
  - text: "One of the two ready cases, chosen pseudo-randomly; `default` only if neither were ready"
    correct: true
    why: "When several communications can proceed, `select` picks one with uniform pseudo-random selection. Without a `default`, it blocks until one is ready."
  - text: "Both ready cases, in order"
    why: "A `select` runs exactly one case each time it executes. Put it in a loop to keep handling both."
---

## Prompt

Both `jobs` and `quit` already have a value waiting. Which case runs?

```go
select {
case j := <-jobs:
	handle(j)
case <-quit:
	return
default:
	fmt.Println("idle")
}
```
