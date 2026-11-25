---
title: "Least privilege for the app's DB user and CI"
module: f9
type: concept
source: "https://cheatsheetseries.owasp.org/cheatsheets/Database_Security_Cheat_Sheet.html#creating-secure-permissions"
tags: ["security", "least-privilege", "ci"]
stack: ["postgresql", "githubactions"]
---

## Prompt

Apply least privilege to the database user your app connects as, and to the credentials your CI deploy job uses.

## Answer

Give each credential only what its job needs, so a leak or an injection does limited damage.

- **App's database user:** not a superuser and not the database's owner, which could alter or drop everything. Grant only the table permissions it uses. Run migrations as a separate role. Use separate accounts per environment.
- **CI deploy:** a key used only by that job and that server, so revoking it breaks nothing else. Give the job's token the narrowest scopes (for example, read code and read packages). Keep long-lived secrets out of the server: prefer a short-lived token per run.
