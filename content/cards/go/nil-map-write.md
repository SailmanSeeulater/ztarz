---
title: "The counter that panics on first use"
module: go
type: bug-hunt
source: "https://go.dev/blog/maps"
tags: ["go", "maps", "nil", "gotcha"]
stack: ["go"]
choices:
  - text: "Read `c.hits[path]` before writing, so the key exists"
    why: "Reading a nil map is fine and returns the zero value, but it doesn't create anything. The write still panics."
  - text: "Give `Hit` a value receiver instead of a pointer receiver"
    why: "The receiver isn't the problem; the map inside it was never created."
  - text: "Create the map before use, for example in a constructor: `return &Counter{hits: make(map[string]int)}`"
    correct: true
    why: "A map field's zero value is nil. Reads on a nil map behave like an empty map, but writes panic, so it must be made with `make` or a literal first."
  - text: "Protect the map with a mutex"
    why: "A mutex is needed if several goroutines use the map, but this panics in a single goroutine. Locking a nil map doesn't make it writable."
---

## Prompt

The first call to `Hit` panics with `assignment to entry in nil map`. What's the fix?

```go
type Counter struct {
	hits map[string]int
}

func (c *Counter) Hit(path string) {
	c.hits[path]++
}

func main() {
	var c Counter
	c.Hit("/")
}
```

## Explanation

`var c Counter` zeroes every field, and a map's zero value is nil. Initialise maps where the struct is created, so no method has to remember to. Also note: the order of `for k, v := range` over a map is not specified and can change between runs, so sort the keys if output order matters.
