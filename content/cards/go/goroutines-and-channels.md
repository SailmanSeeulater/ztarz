---
title: "Goroutines and sharing by communicating"
module: go
type: out-loud
source: "https://go.dev/doc/effective_go#concurrency"
tags: ["go", "goroutines", "channels", "concurrency"]
stack: ["go"]
---

## Prompt

What is a goroutine, and what does Go mean by "share memory by communicating"?

## Model answer

A goroutine is a function running concurrently with others in the same address space. You start one by putting `go` in front of a call. They're cheap: little more than a small stack that grows as needed, so a program can run thousands. The runtime multiplexes them onto OS threads.

Goroutines share memory, so two of them touching the same variable is a data race unless something coordinates them. Go's preferred tool is a channel: a typed pipe one goroutine sends on and another receives from. The slogan is "don't communicate by sharing memory; share memory by communicating." Instead of several goroutines locking a shared value, you pass the value along a channel, and whoever holds it owns it.

Mutexes are still fine for simple shared state like a counter or cache. Channels shine for handing off work and signalling when it's done.
