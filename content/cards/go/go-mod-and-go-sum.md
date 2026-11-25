---
title: "go.mod, go.sum and go mod tidy"
module: go
type: out-loud
source: "https://go.dev/ref/mod"
tags: ["go", "modules", "dependencies"]
stack: ["go"]
---

## Prompt

Walk me through what `go.mod` and `go.sum` are for, and what `go mod tidy` does.

## Model answer

**go.mod** defines the module: its path (`module example.com/shop`), the minimum Go version (`go` directive), and a `require` line for each dependency. Those versions are minimums, not exact pins. Go uses minimal version selection: across the whole dependency graph it takes the highest version anyone requires, and no newer, so builds are repeatable without a separate lock file.

**go.sum** holds cryptographic hashes of each module version's content and go.mod file. After downloading, the go command checks the hash against go.sum and refuses to use a file that doesn't match. Commit both files.

**go mod tidy** makes go.mod match the code: it adds requirements for imports that need them, removes ones nothing uses, and updates go.sum to match.
