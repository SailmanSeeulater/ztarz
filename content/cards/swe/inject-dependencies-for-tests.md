---
title: "The function that builds its own dependencies"
module: swe
type: bug-hunt
source: "https://en.wikipedia.org/wiki/Dependency_injection"
tags: ["dependency-injection", "testing", "solid"]
stack: ["typescript"]
choices:
  - text: "Nothing needs changing; module mocking in the test runner covers it."
    why: "Mocking imports can make a test pass, but the function still hides its collaborators and stays welded to Postgres and SES."
  - text: "It creates its own repository, mailer and clock, so a test can't swap them. Pass them in as parameters typed by interfaces."
    correct: true
    why: "Then a unit test hands in an in-memory repo, a fake mailer and a fixed date, with no network and no flaky timing."
  - text: "Use a real database and mail server in every unit test."
    why: "That's an integration test: slower, needs setup, and still can't control the date."
  - text: "Make the function synchronous so it's easier to test."
    why: "Async isn't the problem; test runners handle promises fine."
---

## Prompt

Why is this hard to unit test, and what's the fix?

```ts
export async function sendTrialReminder(userId: string) {
  const user = await new PostgresUserRepo().find(userId)
  if (user.trialEndsAt < new Date()) return
  await new SesMailer().send(user.email, 'Your trial ends soon')
}
```

## Explanation

Dependency injection: the caller supplies collaborators instead of the code constructing them.

```ts
export async function sendTrialReminder(
  userId: string,
  deps: { users: UserRepo; mailer: Mailer; now: () => Date },
) { /* same logic, using deps */ }
```

It's the usual way to follow dependency inversion: the business logic depends on `UserRepo` and `Mailer` abstractions, and the concrete classes are wired up in one place at startup.
