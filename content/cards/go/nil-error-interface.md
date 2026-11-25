---
title: "The nil error that isn't nil"
module: go
type: what-prints
source: "https://go.dev/doc/faq#nil_error"
tags: ["go", "interfaces", "errors", "nil", "gotcha"]
stack: ["go"]
---

## Prompt

What prints?

```go
type MyErr struct{}

func (*MyErr) Error() string { return "boom" }

func check() error {
	var p *MyErr = nil
	return p
}

func main() {
	err := check()
	fmt.Println(err == nil)
}
```

## Answer

`false`

## Explanation

An interface value holds two things: a type and a value. It equals nil only when both are unset. Returning `p` stores the type `*MyErr` with a nil pointer, so the `error` is not nil, and callers will treat success as failure. Return a literal `nil` on the success path, never a typed nil pointer.
