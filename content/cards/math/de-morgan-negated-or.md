---
title: "De Morgan and a broken permission check"
module: math
type: bug-hunt
source: "https://en.wikipedia.org/wiki/De_Morgan%27s_laws"
tags: ["boolean-algebra", "de-morgan", "logic"]
stack: ["javascript"]
choices:
  - text: "Nothing: the two versions are equivalent"
    why: "Try an owner who isn't an admin: the original lets them through, the refactor returns 403."
  - text: "The negation was pushed in without flipping `||` to `&&`"
    correct: true
    why: "De Morgan: not (A or B) equals (not A) and (not B). The refactor wrote (not A) or (not B), which equals not (A and B): only admins who are also owners get in."
  - text: "`!` binds more loosely than `||`, so the original is parsed wrongly"
    why: "`!` binds tighter than `||`, which is why the original needed brackets. The original is correct."
  - text: "It should be `!isAdmin && isOwner`"
    why: "That rejects owners and allows non-admin non-owners through. Only the negation of both terms is right."
---

## Prompt

A refactor "simplified" this check. Owners who aren't admins now get 403. What went wrong?

```js
// before
if (!(user.isAdmin || user.isOwner)) return res.sendStatus(403);

// after
if (!user.isAdmin || !user.isOwner) return res.sendStatus(403);
```

## Explanation

De Morgan's laws: `!(a || b)` is `!a && !b`, and `!(a && b)` is `!a || !b`. When you push a `!` inside brackets, negate each term and swap the operator. The correct refactor is `if (!user.isAdmin && !user.isOwner)`. A two-row truth table (admin only, owner only) catches this in seconds.
