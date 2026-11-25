---
title: "Testing Library vs Playwright"
module: frontend
type: comparison
source: "https://playwright.dev/docs/best-practices"
tags: ["testing", "e2e", "unit-testing"]
stack: ["testinglibrary", "playwright"]
---

## What it is

- **Testing Library:** helpers for rendering a component and querying the DOM the way a user would, usually run in Vitest or Jest with a simulated DOM (jsdom).
- **Playwright:** an end-to-end framework that drives real Chromium, Firefox and WebKit against the running app.

## How it models the problem

- **Testing Library:** one component or feature at a time. You render it, mock the network, then `getByRole("button", { name: "Save" })` and assert what appears. No real browser, no real server.
- **Playwright:** a whole user journey. It loads URLs, clicks through pages, and auto-waits for elements, with each test in a fresh browser context (its own cookies and storage).

## Where it shines

- **Testing Library:** fast (milliseconds per test), cheap to run on every save, and good at edge cases: empty states, error branches, validation messages.
- **Playwright:** proves the pieces work together: routing, auth cookies, real CSS and layout, the API and database. Cross-browser runs, traces and screenshots make failures easy to debug.

## Where it bites

- **Testing Library:** jsdom isn't a browser. No layout, no real navigation, and heavy mocking can test your mocks instead of your app.
- **Playwright:** slower and needs the app and its data running, so flaky setups hurt. Too many of them make CI slow; keep them for critical paths like sign-up and checkout.

## What interviewers ask

- How do you split tests? (Many fast component tests, a few end-to-end tests on the paths that make money.)
- Why query by role rather than by CSS class or test id? (It's what users and assistive tech see, so tests survive refactors and check accessibility.)
- How do you keep end-to-end tests from being flaky? (Isolated tests, web-first assertions that wait, seeded test data, no fixed sleeps.)
