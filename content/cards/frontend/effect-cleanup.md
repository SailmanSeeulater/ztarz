---
title: What effect cleanup does
module: frontend
type: concept
source: https://react.dev/reference/react/useEffect
tags: [react, useEffect]
stack: [react]
---

## Prompt

What does an effect's cleanup function do, and when does React run it?

## Answer

Cleanup **undoes what setup did**: clears the interval, unsubscribes, disconnects, ignores a stale fetch.

React runs it:

1. **Before re-running the effect** when a dependency changed (cleanup with the old values, then setup with the new ones).
2. **On unmount.**

In development with Strict Mode, React also runs one extra setup → cleanup cycle right after mount, to flush out effects that are missing a cleanup.
