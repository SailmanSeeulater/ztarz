---
title: "The profile update that grants admin"
module: backend
type: bug-hunt
source: "https://cheatsheetseries.owasp.org/cheatsheets/Mass_Assignment_Cheat_Sheet.html"
tags: ["validation", "security", "api"]
stack: ["zod", "express"]
choices:
  - text: "It should be `PUT`, not `PATCH`"
    why: "The method doesn't change what gets written. Either way the whole body goes to the database."
  - text: "The body goes straight into the update, so a client can send `role: \"admin\"`. Parse it with a schema of allowed fields first"
    correct: true
    why: "Mass assignment. Validate at the boundary and only pass on fields the user may change."
  - text: "It's missing an ownership check"
    why: "The `where` already scopes the update to the signed-in user. The problem is which columns they can set."
  - text: "It needs a try/catch around the update"
    why: "Error handling doesn't stop a successful, malicious write."
---

## Prompt

Users can edit their display name and bio. What's wrong?

```ts
app.patch("/me", requireUser, async (req, res) => {
  await db.update(users).set(req.body).where(eq(users.id, req.user.id));
  res.status(204).end();
});
```

## Explanation

Anything in the body becomes a column update: `role`, `emailVerified`, `plan`. Allow-list instead:

```ts
const ProfileUpdate = z.object({
  displayName: z.string().min(1).max(50).optional(),
  bio: z.string().max(500).optional(),
});

const parsed = ProfileUpdate.safeParse(req.body);
if (!parsed.success) return res.status(422).json(parsed.error.issues);
await db.update(users).set(parsed.data).where(eq(users.id, req.user.id));
```

`z.object` strips unknown keys by default; `z.strictObject` rejects them instead. A block-list of forbidden fields fails the day someone adds a new sensitive column.
