---
title: "Checking a wrapped error"
module: go
type: mcq
source: "https://go.dev/blog/go1.13-errors"
tags: ["go", "errors", "wrapping"]
stack: ["go"]
choices:
  - text: "`if err == fs.ErrNotExist`"
    why: "`err` is a new error that wraps `fs.ErrNotExist`, so a direct comparison is false. It only works until someone adds context."
  - text: "`if strings.Contains(err.Error(), \"file does not exist\")`"
    why: "It matches today's text, not the error's identity, and breaks when a message changes."
  - text: "`if errors.As(err, fs.ErrNotExist)`"
    why: "`errors.As` finds an error of a given type and needs a pointer to a variable of that type, like `var pe *fs.PathError; errors.As(err, &pe)`. For a sentinel value, use `errors.Is`."
  - text: "`if errors.Is(err, fs.ErrNotExist)`"
    correct: true
    why: "`%w` gives the new error an `Unwrap` method, and `errors.Is` walks the chain comparing each error to the target."
---

## Prompt

A lower layer returns this. What's the right way for a caller to check for "file not found"?

```go
return fmt.Errorf("load config: %w", fs.ErrNotExist)
```
