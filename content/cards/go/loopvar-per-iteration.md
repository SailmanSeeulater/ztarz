---
title: "Loop variables and the go line in go.mod"
module: go
type: mcq
source: "https://go.dev/blog/loopvar-preview"
tags: ["go", "closures", "loops", "modules"]
stack: ["go"]
choices:
  - text: "`0 1 2`, because the newer toolchain always uses per-iteration variables"
    why: "The semantics follow the module's declared `go` version, not the toolchain, so old code keeps its old behaviour."
  - text: "`3 3 3`, because the module declares a version before 1.22, so all closures share one `i`"
    correct: true
    why: "Before Go 1.22 a for loop had one variable for the whole loop. Every closure captured it and saw its final value, 3. From `go 1.22` in go.mod, each iteration gets its own `i` and this prints `0 1 2`."
  - text: "A random order of 0, 1 and 2"
    why: "There are no goroutines here; the closures run one after another in slice order."
  - text: "A compile error about capturing a loop variable"
    why: "It compiles in every version. That's what made the old behaviour a common bug."
---

## Prompt

The module's go.mod says `go 1.21`, and it's built with a recent Go toolchain. What prints?

```go
var prints []func()
for i := 0; i < 3; i++ {
	prints = append(prints, func() { fmt.Print(i, " ") })
}
for _, p := range prints {
	p()
}
```
