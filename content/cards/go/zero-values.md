---
title: "What an unset struct holds"
module: go
type: mcq
source: "https://go.dev/ref/spec#The_zero_value"
tags: ["go", "zero-values", "structs"]
stack: ["go"]
choices:
  - text: "A compile error: `u` is used before it's initialised"
    why: "Go has no uninitialised variables. `var u User` gives every field its zero value."
  - text: "`<nil> 0 false true`"
    why: "Strings are values, not pointers. A string's zero value is the empty string, never nil."
  - text: "`\"\" 0 false true`"
    correct: true
    why: "Zero values: `\"\"` for strings, 0 for numbers, false for booleans, nil for pointers, slices, maps, channels, functions and interfaces. It applies recursively to struct fields."
  - text: "`\"\" 0 false false`"
    why: "An unset slice field is nil, not an empty non-nil slice. You can still `append` to it or range over it."
---

## Prompt

What does this print?

```go
type User struct {
	Name  string
	Age   int
	Admin bool
	Tags  []string
}

var u User
fmt.Printf("%q %d %t %v\n", u.Name, u.Age, u.Admin, u.Tags == nil)
```
