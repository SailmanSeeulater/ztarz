---
title: "Defer order and when arguments are read"
module: go
type: what-prints
source: "https://go.dev/blog/defer-panic-and-recover"
tags: ["go", "defer"]
stack: ["go"]
---

## Prompt

What prints, in order?

```go
func main() {
	x := 1
	defer fmt.Println("deferred x =", x)
	x = 2
	for i := 0; i < 3; i++ {
		defer fmt.Println(i)
	}
	fmt.Println("x =", x)
}
```

## Answer

```text
x = 2
2
1
0
deferred x = 1
```

## Explanation

Two rules. A deferred call's arguments are evaluated when the `defer` statement runs, so the first one captured `x` as 1. Deferred calls run last in, first out when the function returns, so the loop's defers come out 2, 1, 0 before the first one.
