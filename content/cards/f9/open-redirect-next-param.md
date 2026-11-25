---
title: "Redirecting to ?next="
module: f9
type: bug-hunt
source: "https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html"
tags: ["security", "redirects", "phishing"]
stack: ["owasp"]
choices:
  - text: "`next` can be any absolute URL, so a link on your domain lands on an attacker's page. Only allow your own origin"
    correct: true
    why: "Parse it against your origin and compare origins, falling back to `/`. Or accept a short key you map to known paths."
  - text: "Use 303 instead of 302"
    why: "The status code changes how the browser repeats the request, not where it goes."
  - text: "Check that `next` starts with `/`"
    why: "`//evil.example` starts with `/` and is a link to another host. Prefix checks are easy to get wrong."
  - text: "URL-encode `next` before redirecting"
    why: "Encoding changes how the value is written, not which site it points to."
---

## Prompt

What's wrong with this sign-in callback?

```ts
// GET /auth/callback?next=/today
export async function GET(req: Request) {
  const url = new URL(req.url);
  await finishSignIn(req);
  const next = url.searchParams.get("next") ?? "/";
  return Response.redirect(new URL(next, url.origin), 302);
}
```

## Explanation

`?next=https://evil.example/login` sends a freshly signed-in user to a lookalike page, from a link that really is on your domain. Fix:

```ts
let target = new URL(next, url.origin);
if (target.origin !== url.origin) target = new URL("/", url.origin);
```
