---
title: "Two appends, one backing array"
module: go
type: what-prints
source: "https://go.dev/blog/slices-intro"
tags: ["go", "slices", "append", "gotcha"]
stack: ["go"]
---

## Prompt

What prints?

```go
a := make([]int, 3, 4)
b := append(a, 10)
c := append(a, 20)
fmt.Println(b[3], c[3])
```

## Answer

`20 20`

## Explanation

A slice is a small header: a pointer to an array, a length and a capacity. `a` has length 3 and capacity 4, so both appends fit without allocating and write into the same slot of the same array. `b` and `c` share it, and the second append overwrites the first. When capacity runs out, `append` allocates a new array instead, which is why this bug comes and goes. Don't append to a slice you don't own; copy it first if both results must survive.
