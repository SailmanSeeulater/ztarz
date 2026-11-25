---
title: "Embedding and method promotion"
module: go
type: what-prints
source: "https://go.dev/doc/effective_go#embedding"
tags: ["go", "structs", "embedding"]
stack: ["go"]
---

## Prompt

What prints?

```go
type Logger struct{}

func (Logger) Log(msg string) { fmt.Println("log:", msg) }
func (Logger) Name() string  { return "logger" }

type Server struct {
	Logger
}

func (Server) Name() string { return "server" }

func main() {
	s := Server{}
	s.Log("start")
	fmt.Println(s.Name())
	fmt.Println(s.Logger.Name())
}
```

## Answer

```text
log: start
server
logger
```

## Explanation

Embedding `Logger` promotes its methods, so `s.Log` works with no wrapper. A method on the outer type with the same name hides the embedded one, so `s.Name()` is the Server's. The embedded value is still a field named after its type, and `s.Logger.Name()` reaches it. This is composition, not inheritance: a promoted method's receiver is the inner `Logger`, which knows nothing about `Server`.
