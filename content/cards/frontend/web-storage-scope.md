---
title: "sessionStorage across two tabs"
module: frontend
type: mcq
source: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API"
tags: ["browser", "storage", "cookies"]
stack: ["javascript"]
choices:
  - text: "Yes: both storages are shared by every page on the origin"
    why: "That's true of `localStorage` only."
  - text: "No: `sessionStorage` is per tab (and per origin) and is cleared when the tab closes"
    correct: true
    why: "Use `localStorage` to share between tabs; it persists across restarts. Neither is sent to the server, unlike cookies."
  - text: "Yes, until the whole browser is closed"
    why: "Sounds like a session cookie, but `sessionStorage` is scoped to the tab, not the browser session."
  - text: "No, because `sessionStorage` is scoped to the URL path"
    why: "Web Storage is partitioned by origin, never by path. Cookies are the ones with a `Path` attribute."
---

## Prompt

A user has your app open in tabs A and B. Tab A runs `sessionStorage.setItem("draft", "hi")`. Can tab B read it?
