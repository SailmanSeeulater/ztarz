---
title: "A thousand goroutines, 945 hits"
module: go
type: bug-hunt
source: "https://go.dev/doc/articles/race_detector"
tags: ["go", "concurrency", "data-race", "sync"]
stack: ["go"]
choices:
  - text: "Move `wg.Add(1)` inside the goroutine"
    why: "That makes it worse: `wg.Wait()` could return before some goroutines have even called `Add`. The race on `count` remains."
  - text: "Guard the increment with a `sync.Mutex`: `mu.Lock(); count++; mu.Unlock()`"
    correct: true
    why: "`count++` is a read, an add and a write. Without a lock, two goroutines can read the same value and one update is lost. A mutex (or `sync/atomic`) makes each increment happen alone."
  - text: "Add `time.Sleep` before printing so all goroutines finish"
    why: "`wg.Wait()` already waits for all of them. They finished; their updates collided."
  - text: "Make `count` a pointer so every goroutine sees the same variable"
    why: "They already share the same variable through the closure. Sharing it is the problem, not the fix."
---

## Prompt

This should print 1000 but prints numbers like 945 that change each run. What's the fix?

```go
var wg sync.WaitGroup
count := 0
for i := 0; i < 1000; i++ {
	wg.Add(1)
	go func() {
		defer wg.Done()
		count++
	}()
}
wg.Wait()
fmt.Println(count)
```

## Explanation

A data race is two goroutines touching the same variable at the same time, at least one of them writing. The WaitGroup only waits for the goroutines to finish; it doesn't protect anything. Run tests with `go test -race` (or `go run -race`) and the race detector reports this line.
