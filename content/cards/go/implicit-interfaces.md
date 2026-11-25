---
title: "How a Go type implements an interface"
module: go
type: concept
source: "https://go.dev/doc/effective_go#interfaces_and_types"
tags: ["go", "interfaces", "types"]
stack: ["go"]
---

## Prompt

How does a Go type declare that it implements `io.Reader`?

## Answer

It doesn't. There's no `implements` keyword: any type with a `Read(p []byte) (n int, err error)` method satisfies `io.Reader` automatically, wherever it was defined.

```go
type Upper struct{ r io.Reader }

func (u Upper) Read(p []byte) (int, error) { /* ... */ }

var r io.Reader = Upper{strings.NewReader("hi")} // compiles: Upper has Read
```

So small interfaces like `io.Reader` and `fmt.Stringer` work with types written long before them. To get a compile-time check without using the value, write `var _ io.Reader = Upper{}`.
