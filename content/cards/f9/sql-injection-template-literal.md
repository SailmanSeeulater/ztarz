---
title: "SQL built from a template literal"
module: f9
type: bug-hunt
source: "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html"
tags: ["security", "sql", "injection"]
stack: ["postgresql", "owasp"]
choices:
  - text: "Escape quotes first: `email.replace(/'/g, \"''\")`"
    why: "Hand-rolled escaping is fragile: the rules differ between databases and settings. OWASP says not to build SQL this way at all."
  - text: "Check it looks like an email with a regex first"
    why: "Worth doing, but it isn't the defence. Valid addresses can contain `'`, as in `o'brien@example.com`."
  - text: "Nothing: template literals escape `${}` values"
    why: "A plain template literal just joins strings. Tagged templates such as Drizzle's `sql` are different: they turn `${}` into parameters."
  - text: "User input is pasted into the SQL text. Pass it as a parameter instead"
    correct: true
    why: "With `$1` and a values array, the query's structure and its data travel separately, so input can never change the SQL."
---

## Prompt

What's wrong?

```ts
export async function findUser(email: string) {
  return pool.query(
    `SELECT id, name FROM users WHERE email = '${email}'`
  );
}
```

## Explanation

An email of `' OR '1'='1` returns every user; worse payloads can modify data. Fix:

```ts
pool.query("SELECT id, name FROM users WHERE email = $1", [email]);
```

Parameters only stand in for values. For a user-chosen column or sort order, map the choice to a fixed allow-list.
