---
title: "When the API does the filtering"
module: frontend
type: out-loud
source: "https://react.dev/learn/synchronizing-with-effects#fetching-data"
tags: ["react", "useEffect", "race-condition"]
stack: ["react"]
---

## Prompt

Your search box filters client-side. What changes if the API does the filtering instead?

## Model answer

Put the debounced query in the effect's dependency array, fetch `?q=`, and abort the previous request (or set an `ignore` flag) in the cleanup, so a slow old response can't overwrite a newer one. Debouncing cuts requests but doesn't fix the race on its own.
