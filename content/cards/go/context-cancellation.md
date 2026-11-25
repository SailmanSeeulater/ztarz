---
title: "How context cancellation reaches your code"
module: go
type: concept
source: "https://go.dev/blog/context"
tags: ["go", "context", "cancellation", "timeouts"]
stack: ["go"]
---

## Prompt

A handler calls `slowQuery(ctx)` with a 100 ms timeout. How does the timeout actually stop the work, and what prints?

```go
func slowQuery(ctx context.Context) error {
	select {
	case <-time.After(2 * time.Second):
		return nil
	case <-ctx.Done():
		return ctx.Err()
	}
}

ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
defer cancel()
fmt.Println(slowQuery(ctx))
```

## Answer

It prints `context deadline exceeded` after about 100 ms.

Nothing is killed from outside. A context carries deadlines and cancellation down the call chain, and its `Done()` channel is closed when it's cancelled or times out. Code that might block has to watch `Done()` (or pass `ctx` to a library that does) and return `ctx.Err()`. Cancelling a parent cancels every context derived from it. Pass `ctx` as the first parameter, and always call `cancel` to free its resources.
