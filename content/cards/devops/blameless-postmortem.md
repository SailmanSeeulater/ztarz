---
title: "A blameless postmortem"
module: devops
type: out-loud
source: "https://sre.google/sre-book/postmortem-culture/"
tags: ["incident-response", "postmortem", "sre"]
---

## Prompt

What is a blameless postmortem, when do you write one, and what goes in it?

## Model answer

A postmortem is a written record of an incident, written after it's resolved. **Blameless** means it looks for the contributing causes in systems and processes, and assumes everyone acted reasonably with what they knew at the time. If people fear blame, they hide mistakes, and you lose the information you need.

Write one after anything you agreed in advance counts: user-visible downtime past a threshold, any data loss, an on-call rollback or traffic shift, a long time to resolve, or monitoring that failed to catch it.

It contains a summary and impact (who was affected, for how long), a timeline, the root causes and triggers, what went well and badly, and action items with owners and dates. "Be more careful" is not an action item; "add a migration check to CI" is. It's reviewed and shared so other teams learn from it.
