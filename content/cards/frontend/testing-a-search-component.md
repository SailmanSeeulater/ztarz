---
title: "Testing a search component"
module: frontend
type: out-loud
source: "https://testing-library.com/docs/react-testing-library/example-intro"
tags: ["testing", "react"]
stack: ["react"]
---

## Prompt

How would you test a component that fetches users and filters them with a search box?

## Model answer

Mock fetch, render, and assert the loading text. Then `findByText` a user, type into the search box with `userEvent`, and assert non-matching users disappear. Test the error path and the empty state too.
