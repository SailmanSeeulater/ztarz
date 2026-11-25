---
title: "The notebook that only works on your machine"
module: data
type: bug-hunt
source: "https://jupyter-notebook.readthedocs.io/en/stable/examples/Notebook/Running%20Code.html"
tags: ["jupyter", "notebooks", "reproducibility"]
stack: ["jupyter", "python"]
choices:
  - text: "The colleague has a different pandas version"
    why: "Possible in general, but a `NameError` on `df_clean` points at a missing variable, not a library change."
  - text: "Cell 3 uses `df_clean`, which was defined in a cell that was later deleted, but it lives on in the author's kernel"
    correct: true
    why: "The kernel keeps every variable ever created until it restarts. Deleting or editing a cell doesn't remove what it already defined, so the notebook depends on history no one can see."
  - text: "Notebooks must be run cell by cell; Run All is unsupported"
    why: "Run All is a normal way to execute a notebook, and the right way to check it works from scratch."
  - text: "The execution counts are out of order, which corrupts the file"
    why: "Out-of-order counts are a symptom that cells ran in a different order, not a file problem."
---

## Prompt

A notebook runs fine for its author. A colleague clicks Run All on a fresh kernel and gets `NameError: name 'df_clean' is not defined` in cell 3. Execution counts on the author's copy read `[7]`, `[2]`, `[12]`. What happened?

## Explanation

Code runs in a kernel that keeps state between cells, so outputs reflect whatever order cells ran in, including cells that no longer exist. Before sharing or committing a notebook, restart the kernel and run everything top to bottom. Move code that matters into functions or modules you can test.
