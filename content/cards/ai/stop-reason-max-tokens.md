---
title: "Summaries that stop mid-sentence"
module: ai
type: bug-hunt
source: "https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons"
tags: ["llm", "api", "stop-reason"]
stack: ["anthropic"]
choices:
  - text: "`max_tokens` counts the ticket too, so long tickets leave no room for the reply"
    why: "`max_tokens` caps the output only. Input size matters for the context window, not for this limit."
  - text: "Add \"Always finish your sentences\" to the prompt"
    why: "The cut-off is a hard limit applied by the API. An instruction can make replies shorter on average, but nothing stops the next long one being cut."
  - text: "The code never checks `res.stop_reason`. When it is `max_tokens`, the text was cut off: raise the limit, or mark the summary as truncated instead of saving it as complete"
    correct: true
    why: "A truncated reply is still a normal 200 response. Only `stop_reason` tells you it ended at the limit rather than at `end_turn`."
  - text: "Non-streaming calls return only the first chunk of the reply in `content`"
    why: "A non-streaming call returns the whole message. Streaming changes when you see text, not how much there is."
---

## Prompt

Some saved ticket summaries end mid-sentence. No error is ever logged. What's the bug?

```ts
const res = await client.messages.create({
  model,
  max_tokens: 200,
  messages: [{ role: "user", content: `Summarise this ticket:\n${ticket}` }],
});
const text = res.content.find((b) => b.type === "text")?.text ?? "";
await db.tickets.update(id, { summary: text });
```

## Explanation

Every response says why generation stopped: `end_turn` (finished), `max_tokens` (hit your limit), `stop_sequence`, `tool_use` (wants a tool run), `refusal`, and a few more. Treat anything other than the reason you expect as a branch in your code. For `max_tokens`, retry with a higher limit or flag the output; don't store it as if it were whole.
