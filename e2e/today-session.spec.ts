import { expect, test, type Page } from "@playwright/test";
import { E2E_OWNER } from "./env";

async function signIn(page: Page) {
  await page.goto("/");
  await expect(page).toHaveURL(/\/sign-in$/);
  await page.getByLabel("Email").fill(E2E_OWNER.email);
  await page.getByLabel("Password").fill(E2E_OWNER.password);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("heading", { name: "Today", level: 1 })).toBeVisible();
}

test("complete today's session", async ({ page }) => {
  test.setTimeout(120_000);
  await signIn(page);
  // Buttons only respond once React has hydrated.
  await page.waitForLoadState("networkidle");

  const done = page.getByRole("heading", { name: "Session complete" });
  const counter = page.getByText(/^\d+ \/ \d+$/);
  const title = page.locator("main h2").first();
  const choices = page.locator("ol > li > button");
  // A missed card comes back in the same session; next time, pick the answer the reveal showed.
  const learned = new Map<string, string>();
  let answered = 0;

  await expect(done.or(counter)).toBeVisible();
  while (!(await done.isVisible())) {
    expect(answered, "session should end").toBeLessThan(50);
    const position = await counter.textContent();
    const name = (await title.textContent())!.trim();

    if ((await choices.count()) > 0) {
      const known = learned.get(name);
      await (known ? choices.filter({ hasText: known }).first() : choices.first()).click();
      const verdict = page.getByText(/^(Correct\.|Not quite\.)$/);
      await expect(verdict).toBeVisible();
      if ((await verdict.textContent()) === "Not quite.") {
        // After answering, the right choice is highlighted; its text finds it again next time.
        const right = page.locator("ol > li > button.border-good .card-md").first();
        learned.set(name, (await right.textContent())!.trim());
        await page.getByRole("button", { name: /^Continue/ }).click();
      } else {
        await page.getByRole("button", { name: /^Easy/ }).click();
      }
    } else {
      await page.getByRole("button", { name: "Reveal answer" }).click();
      // Easy graduates a card straight to review, so it won't come back today.
      await page.getByRole("button", { name: /^Easy/ }).click();
    }
    answered++;

    // The answer is saved before the next card shows, and the counter always moves on.
    await expect(done.or(counter.filter({ hasNotText: position! }))).toBeVisible();
  }

  expect(answered).toBeGreaterThanOrEqual(3);

  // Every answer was saved: after a reload there's nothing left for today.
  await page.reload();
  await expect(page.getByRole("heading", { name: "All caught up" })).toBeVisible();
});
