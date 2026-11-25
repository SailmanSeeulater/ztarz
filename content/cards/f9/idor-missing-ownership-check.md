---
title: "Fetching an invoice by id"
module: f9
type: bug-hunt
source: "https://cheatsheetseries.owasp.org/cheatsheets/Insecure_Direct_Object_Reference_Prevention_Cheat_Sheet.html"
tags: ["security", "authorisation", "idor"]
stack: ["owasp", "drizzle"]
choices:
  - text: "Switch to random UUIDs so ids can't be guessed"
    why: "Harder to guess, but defence in depth only. A leaked or shared URL still opens someone else's invoice."
  - text: "Validate `id` with Zod"
    why: "That checks the id's shape, not whose invoice it is."
  - text: "It checks who you are, not whether the invoice is yours. Scope the query to the session's user"
    correct: true
    why: "Authentication isn't authorisation. Check ownership on every object access."
  - text: "Add rate limiting to the route"
    why: "It slows down enumeration but still serves any invoice a signed-in user asks for."
---

## Prompt

Any signed-in user can call this. What's wrong?

```ts
// GET /api/invoices/[id]
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  await requireSession();
  const { id } = await params;
  const [invoice] = await db.select().from(invoices).where(eq(invoices.id, id));
  if (!invoice) return new Response("Not found", { status: 404 });
  return Response.json(invoice);
}
```

## Explanation

Change the id in the URL and you get another customer's invoice. Fix:

```ts
const session = await requireSession();
const [invoice] = await db.select().from(invoices)
  .where(and(eq(invoices.id, id), eq(invoices.userId, session.user.id)));
```

Returning 404 for other people's records also hides that they exist.
