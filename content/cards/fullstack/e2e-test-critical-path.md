---
title: "The robust step in a checkout end-to-end test"
module: fullstack
type: mcq
source: "https://playwright.dev/docs/best-practices"
tags: ["testing", "e2e", "checkout"]
stack: ["playwright"]
choices:
  - text: "`await page.locator('div.btn-primary > span').click()`"
    why: "Tied to markup and CSS class names, so a restyle breaks the test while the feature still works."
  - text: "`await page.getByRole('button', { name: 'Pay' }).click(); await expect(page.getByText('Order confirmed')).toBeVisible()`"
    correct: true
    why: "A user-facing locator plus a web-first assertion that waits and retries until the text appears."
  - text: "`await page.waitForTimeout(3000); expect(await page.getByText('Order confirmed').isVisible()).toBe(true)`"
    why: "A fixed sleep is slow when the app is fast and flaky when it's slow, and `isVisible()` checks once without waiting."
  - text: "Drive the payment provider's real hosted checkout page in every run."
    why: "Don't test third-party pages you don't control; mock that response or use the provider's test mode."
---

## Prompt

End-to-end tests are slow, so you keep a few for critical paths like checkout. Which step is written the robust way?
