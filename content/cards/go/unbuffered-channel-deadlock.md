---
title: "Sending on an unbuffered channel in main"
module: go
type: mcq
source: "https://go.dev/ref/spec#Channel_types"
tags: ["go", "channels", "deadlock"]
stack: ["go"]
choices:
  - text: "It prints 1"
    why: "It never reaches the receive. The send blocks first."
  - text: "It prints 0, the zero value"
    why: "A receive only gets a zero value from a closed channel. Here nothing runs past the send."
  - text: "It fails to compile, because the send has no receiver"
    why: "The compiler doesn't track this. It's a runtime deadlock."
  - text: "It crashes with `fatal error: all goroutines are asleep - deadlock!`"
    correct: true
    why: "An unbuffered channel's send completes only when a receiver is ready at the same time. The only goroutine is stuck sending, so the runtime detects that nothing can proceed."
---

## Prompt

What happens when this runs?

```go
func main() {
	ch := make(chan int)
	ch <- 1
	fmt.Println(<-ch)
}
```

Fixes: receive in another goroutine, or give the channel a buffer with `make(chan int, 1)`, whose send succeeds while the buffer isn't full.
