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
        const right = page.locator("ol > li > button[data-state='right'] .card-md").first();
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
  // The closing pass shows today's answers as a barcode.
  await expect(page.getByRole("img", { name: /^\d+ kept, \d+ coming back soon/ })).toBeVisible();

  // Every answer was saved: after a reload there's nothing left for today.
  await page.reload();
  await expect(page.getByRole("heading", { name: "All caught up" })).toBeVisible();
});

test("streak, notes and library navigation", async ({ page }) => {
  test.setTimeout(60_000);
  await signIn(page);
  // The session above reviewed cards today, so the streak is lit.
  await expect(page.getByText(/^1-day streak$/)).toBeVisible();

  // Notes: create, write Markdown, see it rendered (and raw HTML neutralised), delete.
  await page.getByRole("link", { name: "Notes" }).click();
  await expect(page.getByText(/^0 of 15/)).toBeVisible();
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "New note" }).click();
  await expect(page).toHaveURL(/\/notes\/[0-9a-f-]{36}$/);
  await page.getByLabel("Title").fill("Ports to remember");
  await page.getByLabel("Note, in Markdown").fill("## Ports\n\n- **5432** Postgres\n\n<script>window.pwned=1</script>");
  await expect(page.getByText("Saved")).toBeVisible({ timeout: 5_000 });
  await page.getByRole("tab", { name: "preview" }).click();
  await expect(page.getByRole("heading", { name: "Ports", level: 2 })).toBeVisible();
  await expect(page.locator("strong", { hasText: "5432" })).toBeVisible();
  await expect(page.getByText("<script>window.pwned=1</script>")).toBeVisible();
  expect(await page.evaluate(() => (window as { pwned?: number }).pwned)).toBeUndefined();

  await page.reload();
  await expect(page.getByLabel("Title")).toHaveValue("Ports to remember");
  await page.getByRole("button", { name: "Delete note" }).click();
  await page.getByRole("button", { name: "Tap again to delete" }).click();
  await expect(page).toHaveURL(/\/notes$/);
  await expect(page.getByText(/^0 of 15/)).toBeVisible();

  // Library: modules start closed and open one at a time; cards link to their neighbours.
  await page.goto("/library");
  const f1 = page.locator("details", { has: page.locator("#m-f1") });
  await expect(f1).not.toHaveAttribute("open");
  await page.locator("#m-f1").click();
  await expect(f1).toHaveAttribute("open");
  await expect(page.locator("details", { has: page.locator("#m-f2") })).not.toHaveAttribute("open");
  await f1.getByRole("link").nth(1).click(); // the first link is "Drill 10 at random"
  await expect(page.getByText(/^Card 1 of \d+$/)).toBeVisible();
  await page.waitForLoadState("networkidle");
  await page.keyboard.press("ArrowRight");
  await expect(page.getByText(/^Card 2 of \d+$/)).toBeVisible();

  // Glossary and solutions render.
  await page.goto("/library/glossary");
  await page.getByLabel("Search the glossary").fill("dns");
  await expect(page.getByRole("heading", { name: /^DNS/, level: 3 })).toBeVisible();
  await page.goto("/library/solutions/0001-two-sum");
  await expect(page.getByRole("heading", { name: /Two Sum/, level: 1 })).toBeVisible();
});

test("focus, drill and search", async ({ page }) => {
  test.setTimeout(90_000);
  await signIn(page);

  // Focus: pick Go, and Today shows it.
  await page.getByRole("link", { name: /^Focus: everything/ }).click();
  await expect(page.getByRole("heading", { name: "Focus", level: 1 })).toBeVisible();
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: /^Go\b/, pressed: false }).click();
  await expect(page.getByText(/^1 in focus/)).toBeVisible();
  await expect(page.getByText("Saved")).toBeVisible();
  await page.getByRole("button", { name: "More new cards" }).click();
  await expect(page.getByText("Saved")).toBeVisible();
  await page.goto("/");
  await expect(page.getByRole("link", { name: /^Focus: Go/ })).toBeVisible();

  // Drill a module to the end; it scores you and offers another round.
  await page.goto("/drill?m=f2");
  await page.waitForLoadState("networkidle");
  const done = page.getByRole("heading", { name: "Drill complete" });
  // Finishing a drill writes a line to the activity log; wait for it before leaving the page.
  const logged = page.waitForResponse((r) => r.url().includes("activity.drillFinished") && r.ok());
  for (let i = 0; i < 10 && !(await done.isVisible()); i++) {
    await expect(page.getByText(`${i + 1} / 10`)).toBeVisible();
    const choices = page.locator("ol > li > button");
    if ((await choices.count()) > 0) {
      await choices.first().click();
      await page.getByRole("button", { name: /^(Next|Finish)/ }).click();
    } else {
      await page.getByRole("button", { name: "Reveal answer" }).click();
      await page.getByRole("button", { name: /^Knew it/ }).click();
    }
  }
  await expect(done).toBeVisible();
  await logged;
  await expect(page.getByText(/^\d+ of 10$/)).toBeVisible();
  await expect(page.getByRole("link", { name: "Drill again" })).toBeVisible();

  // The missed-lately drill loads (the first test rated some cards "again", or it says there's nothing).
  await page.goto("/drill");
  await expect(page.getByRole("heading", { name: "Missed lately", level: 1 })).toBeVisible();

  // Search finds a glossary term, a card and a solution.
  await page.goto("/library");
  await page.waitForLoadState("networkidle");
  const search = page.getByLabel("Search the library");
  await search.fill("dns");
  const results = page.locator("ul").filter({ has: page.getByText("Glossary", { exact: true }) });
  await expect(results.getByRole("link").first()).toContainText("DNS");
  await search.fill("two sum");
  await expect(page.getByRole("link", { name: /1\. Two Sum/ })).toBeVisible();
  await search.fill("");
  await expect(page.locator("#m-f1")).toBeVisible();
});

test("exam, progress and activity log", async ({ page }) => {
  test.setTimeout(90_000);
  await signIn(page);

  // Sit a 10-question exam on one module: answer some, leave some blank, hand in.
  await page.getByRole("link", { name: "Exams" }).click();
  await page.getByLabel("What on").selectOption("f1");
  await page.getByRole("button", { name: "Start exam" }).click();
  await expect(page.getByRole("timer")).toBeVisible();
  await page.waitForLoadState("networkidle");
  const total = await page.getByRole("navigation", { name: "Questions" }).getByRole("button").count();
  expect(total).toBeGreaterThan(2);
  for (let i = 0; i < total - 1; i++) {
    await page.locator("ol > li > button").first().click();
    await page.getByRole("button", { name: "Next", exact: true }).click();
  }
  await expect(page.getByText(`${total - 1} of ${total} answered`)).toBeVisible();
  await page.getByRole("button", { name: "Hand in" }).click();
  await page.getByRole("button", { name: "Hand in with 1 blank?" }).click();

  // The result is marked on the server and kept.
  await expect(page).toHaveURL(/\/exams\/[0-9a-f-]{36}$/);
  await expect(page.getByRole("heading", { level: 1, name: /^\d+%$/ })).toBeVisible();
  await expect(page.getByText(new RegExp(`^\\d+ of ${total}$`))).toBeVisible();
  await expect(page.getByText("Left blank")).toBeVisible();
  await page.getByRole("link", { name: "Exams" }).first().click();
  await expect(page.getByRole("heading", { name: "Past exams" })).toBeVisible();
  await expect(page.getByRole("link", { name: /^\d+% How the web works/ })).toBeVisible();

  // Progress: the tracker and analytics reflect today's reviews.
  await page.getByRole("link", { name: "Progress" }).click();
  await expect(page.getByRole("img", { name: /^Practice over the last 26 weeks: reviews on 1 days$/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Retention by week" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Coming due" })).toBeVisible();

  // The log has the exam, the drill and focus change from earlier tests, and a study sitting.
  await page.getByRole("navigation", { name: "Progress" }).getByRole("link", { name: "Log" }).click();
  await expect(page.getByText(/^Exam on How the web works: \d+ of \d+/)).toBeVisible();
  await expect(page.getByText(/^Drilled Linux and the shell: knew \d+ of 10$/)).toBeVisible();
  await expect(page.getByText(/^Focus: Go · 6 new a day$/)).toBeVisible();
  await expect(page.getByText("Created a note")).toBeVisible();
  await expect(page.getByText(/^Reviewed \d+ cards/).first()).toBeVisible();
  await expect(page.getByText("Signed in").first()).toBeVisible();
});
