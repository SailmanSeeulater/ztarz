---
title: "CSV vs Parquet"
module: data
type: comparison
source: "https://parquet.apache.org/docs/file-format/"
tags: ["file-formats", "parquet", "csv"]
stack: ["apacheparquet"]
---

## What it is

**CSV** is plain text: one line per row, values separated by commas. **Parquet** is a binary, column-oriented file format: values for each column are stored together in column chunks, grouped into row groups, with metadata written at the end of the file.

## How it models the problem

CSV stores rows and nothing else: no types, so every reader guesses whether `007` is a number or a string and how dates are written. Parquet stores each column's values together with metadata about where every column chunk starts, so a reader reads the metadata first and then fetches only the columns it needs. Columns of similar values also compress well.

## Where it shines

- **CSV:** human-readable, opens in any spreadsheet or text editor, trivial to produce, good for small exports and hand-offs.
- **Parquet:** analytics on wide tables. `SELECT avg(price)` touches one column, not the whole file. Smaller on disk and keeps types. Read natively by pandas, Polars, DuckDB and Spark.

## Where it bites

- **CSV:** type guessing, quoting and encoding bugs, and every query reads every byte.
- **Parquet:** not human-readable, and files are written in one go, so appending a row or editing a value in place isn't how it's used. Overkill for a 200-row config export.

## What interviewers ask

- Why is a columnar format faster for analytics queries? (Read fewer bytes; better compression.)
- When would you still choose CSV? (Small data, humans or other tools in the loop.)
- How would you store a growing event log for analysis? (Batches of Parquet files, often partitioned by date.)
