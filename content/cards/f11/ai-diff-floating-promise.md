---
title: "Reviewing an AI-written revoke function"
module: f11
type: bug-hunt
source: "https://typescript-eslint.io/rules/no-floating-promises/"
tags: ["code-review", "ai", "async"]
stack: ["typescript"]
choices:
  - text: "`findMany` should be paginated"
    why: "Worth a thought if a user can have thousands of keys, but it doesn't make this code wrong."
  - text: "`db.apiKeys.update(...)` isn't awaited, so the email goes out and the function returns before the keys are revoked, and a failed update is never caught"
    correct: true
    why: "Each update is a floating promise. Await it in the loop, or `await Promise.all(keys.map(...))` to run them in parallel."
  - text: "`new Date()` should be created once, outside the loop"
    why: "The timestamps would differ by microseconds. A style point, not a bug."
  - text: "The email should be sent before revoking the keys"
    why: "Then you'd tell the user it happened before it did."
---

## Prompt

An AI assistant wrote this function for you. Tests pass. What do you flag in review?

```diff
+export async function revokeAllKeys(userId: string) {
+  const keys = await db.apiKeys.findMany({ userId });
+  for (const key of keys) {
+    db.apiKeys.update(key.id, { revokedAt: new Date() });
+  }
+  await mailer.send(userId, "Your API keys have been revoked");
+  return keys.length;
+}
```

## Explanation

A promise with no `await`, `.catch()` or `return` floats: the code moves on without waiting, and if it rejects, nothing handles it. Here the caller is told the keys are revoked while they may still work. Tests with a fast fake database often miss this. typescript-eslint's `no-floating-promises` rule catches it, so turn it on before you review AI-written async code.
