---
title: "An in-app survey says users love it"
module: data
type: mcq
source: "https://en.wikipedia.org/wiki/Sampling_bias"
tags: ["sampling-bias", "statistics", "surveys"]
choices:
  - text: "The sample is too small; 400 isn't significant"
    why: "400 responses gives a fairly tight estimate for the people who answered. The problem is who they are, not how many."
  - text: "Only current users who chose to answer were asked, so unhappy and departed users are missing"
    correct: true
    why: "This is sampling bias: users who left (survivorship) and users who skip pop-ups (self-selection) never get counted. A larger sample from the same source keeps the same bias."
  - text: "Percentages from surveys are always unreliable"
    why: "Surveys work when the sample represents the population. This one doesn't."
  - text: "The question should have used a 1 to 10 scale"
    why: "Question design matters, but no scale fixes asking the wrong people."
---

## Prompt

A pop-up in the app asked "Do you like the new editor?" 400 people answered, 90% said yes. Why shouldn't the team conclude 90% of customers like it?
