---
title: "What the browser validates for free"
module: frontend
type: concept
source: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation"
tags: ["html", "forms", "validation"]
stack: ["html5"]
---

## Prompt

What can HTML validate on a form without any JavaScript, and what can't it replace?

## Answer

Attributes such as `required`, `type="email"` or `"url"`, `min`/`max`, `minlength`/`maxlength` and `pattern` make the browser block submission and show a message. Invalid fields match `:invalid` (and `:user-invalid` once touched) for styling. For custom rules, the Constraint Validation API gives you `checkValidity()`, `reportValidity()` and `setCustomValidity()`.

It's a convenience for the user, not security. Anyone can bypass it, so the server must validate everything again.
