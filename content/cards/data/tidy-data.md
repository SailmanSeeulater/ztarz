---
title: "What makes data tidy"
module: data
type: mcq
source: "https://r4ds.hadley.nz/data-tidy.html"
tags: ["tidy-data", "data-cleaning"]
choices:
  - text: "Keep it as is: one row per city is the most compact"
    why: "Compact for reading, awkward for analysis. The year is a variable hiding in the column names, so filtering or grouping by year needs reshaping first."
  - text: "Three columns, `city`, `year`, `sales`, with one row per city per year"
    correct: true
    why: "Tidy data: each variable is a column, each observation is a row, each value is a cell. Here an observation is one city in one year. pandas' `melt` (or R's `pivot_longer`) does the reshape."
  - text: "One row per year, one column per city"
    why: "That just moves the problem: now city names are column headers instead of values."
  - text: "One column holding strings like `Leeds-2023-120`"
    why: "That packs three variables into one cell, breaking the one-value-per-cell rule. You'd have to parse it before every query."
---

## Prompt

A spreadsheet has columns `city`, `2023`, `2024`, `2025`, holding sales figures. Which layout is tidy?
