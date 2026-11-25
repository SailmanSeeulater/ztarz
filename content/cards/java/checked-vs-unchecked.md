---
title: "Checked or unchecked exception?"
module: java
type: mcq
source: "https://docs.oracle.com/javase/tutorial/essential/exceptions/runtime.html"
tags: ["java", "exceptions", "errors"]
stack: ["java"]
choices:
  - text: "Make every exception checked, so callers can never ignore an error"
    why: "That forces callers to catch or declare errors they can't do anything about, which breeds empty catch blocks."
  - text: "Checked if a caller can reasonably be expected to recover; unchecked (a `RuntimeException`) if it can't, such as a programming error"
    correct: true
    why: "A missing file is something a caller can handle; a `null` argument or a bad index is a bug to fix, not to catch."
  - text: "Unchecked for anything involving I/O, because I/O is unpredictable"
    why: "The JDK does the opposite: `IOException` is checked, precisely because callers can often recover (retry, ask for another file)."
  - text: "Use unchecked exceptions just to avoid writing `throws` clauses"
    why: "The tutorial calls this out as the wrong reason: convenience isn't a design criterion."
---

## Prompt

The compiler forces callers to catch or declare checked exceptions, but not `RuntimeException`s. What's the usual guideline for choosing between them?
