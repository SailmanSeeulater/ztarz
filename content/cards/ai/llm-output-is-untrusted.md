---
title: "Rendering the model's Markdown"
module: ai
type: bug-hunt
source: "https://genai.owasp.org/llmrisk/llm052025-improper-output-handling/"
tags: ["security", "xss", "output-handling"]
stack: ["owasp", "react"]
choices:
  - text: "No risk: the HTML came from our model, not from a user"
    why: "The model's output is shaped by its input, and here the input is reviews anyone can write. Text injected into a review can steer what the model emits."
  - text: "Only hallucination: the summary might misquote a review"
    why: "That's a quality problem. The security problem is executable markup reaching the page."
  - text: "Model output can contain HTML such as `<img src=x onerror=...>` or Markdown images pointing at an attacker's server. Treat it as untrusted: sanitise the HTML before rendering, and add a strict Content Security Policy"
    correct: true
    why: "Encode or sanitise output for where it's going, exactly as you would user input. A CSP limits what slips through, including image requests that carry data off to another host."
  - text: "None, because Markdown parsers escape raw HTML by default"
    why: "Many don't. `marked`, for one, passes raw HTML through and leaves sanitising to you."
---

## Prompt

A product page shows an AI summary of customer reviews. What's wrong with this?

```tsx
const html = marked.parse(summary); // summary comes from the LLM
return <div dangerouslySetInnerHTML={{ __html: html }} />;
```

## Explanation

OWASP calls this improper output handling: passing model output to another component without validating, sanitising or encoding it. The same rule covers model-written SQL (use parameterised queries), shell commands (don't `exec` them) and file paths. Treat the model like any other untrusted user.
