---
title: "Why every project gets a virtual environment"
module: python
type: out-loud
source: "https://docs.python.org/3/tutorial/venv.html"
tags: ["python", "packaging", "venv", "pip"]
stack: ["python", "pypi"]
---

## Prompt

A teammate installs packages with `pip install` into the system Python. Why should they use a virtual environment, and what's the basic workflow?

## Model answer

Different projects need different versions of the same library, and one Python installation can hold only one version of each. A virtual environment is a self-contained directory with its own Python and its own packages, so upgrading something for project B can't break project A, and you don't touch the system Python.

The workflow:

1. `python -m venv .venv` in the project folder.
2. Activate it: `source .venv/bin/activate` on macOS or Linux, `.venv\Scripts\activate` on Windows. Now `python` and `pip` point into `.venv`.
3. `python -m pip install requests`.
4. `python -m pip freeze > requirements.txt` to record exact versions, and commit that file, not `.venv`.
5. On another machine: create a venv, then `python -m pip install -r requirements.txt`.
