---
title: "Which chart for a distribution"
module: data
type: mcq
source: "https://en.wikipedia.org/wiki/Histogram"
tags: ["visualisation", "charts"]
choices:
  - text: "A pie chart of fast, medium and slow requests"
    why: "Pies compare a few parts of a whole, poorly. Binning into three hand-picked groups also throws away the shape of the distribution."
  - text: "A histogram of response times"
    correct: true
    why: "A histogram bins numeric values into ranges and shows how many fall in each, so a long tail or two humps is visible at a glance. Try a couple of bin widths, since the choice changes the picture."
  - text: "A line chart with request number on the x-axis"
    why: "Line charts suit a value changing over an ordered axis like time. Request order isn't meaningful, so it shows noise."
  - text: "A bar chart of the mean per endpoint"
    why: "Bar charts compare categories. A single mean per endpoint hides the spread you were asked to show."
---

## Prompt

You have 50,000 API response times and want to show whether most requests are fast with a slow tail. Which chart fits best?
