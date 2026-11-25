---
title: "Keeping dependencies from biting"
module: f9
type: out-loud
source: "https://cheatsheetseries.owasp.org/cheatsheets/NPM_Security_Cheat_Sheet.html"
tags: ["security", "dependencies", "supply-chain"]
stack: ["npm", "pnpm"]
---

## Prompt

How do you stop third-party packages becoming your security problem?

## Model answer

- **Commit the lockfile and enforce it.** CI installs with `pnpm install --frozen-lockfile` or `npm ci`, which abort on any mismatch, so you run exactly the versions you reviewed, transitive ones included.
- **Read lockfile diffs in PRs.** A new package or a surprise version jump deserves a look.
- **Treat install scripts as code execution.** `preinstall` and `postinstall` run arbitrary commands on install. Use `--ignore-scripts` (or `ignore-scripts=true` in `.npmrc`) and allow only the packages that need them.
- **Check names before adding.** Typosquats look like popular packages and can read `process.env`.
- **Audit and get alerts** for new advisories, and update on purpose.
- **Add fewer packages.** Each one is code you've chosen to trust.
