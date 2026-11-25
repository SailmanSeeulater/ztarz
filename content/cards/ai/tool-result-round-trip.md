---
title: "The tool loop that drops a message"
module: ai
type: bug-hunt
source: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview"
tags: ["llm", "tool-use", "function-calling"]
stack: ["anthropic"]
choices:
  - text: "The result should go in a message with `role: \"tool\"`"
    why: "That is another provider's convention. In the Messages API a `tool_result` block goes in a `user` message."
  - text: "Drop `tools` from the second request, since the tool has already run"
    why: "Keep sending the same `tools`. The history contains a tool call, and Claude may want to call another tool after reading the result."
  - text: "Use `call.name` as the `tool_use_id`"
    why: "`tool_use_id` must be the `id` of the `tool_use` block, which is what the code already sends."
  - text: "Claude's turn containing the `tool_use` block is never added to `messages`, so the `tool_result` answers a call the history doesn't contain"
    correct: true
    why: "Append `{ role: \"assistant\", content: res.content }` first, then the `user` message with the `tool_result`. The API is stateless: the history you send is the whole conversation."
---

## Prompt

The second request fails. What's missing?

```ts
const res = await client.messages.create({ model, max_tokens: 1024, tools, messages });

if (res.stop_reason === "tool_use") {
  const call = res.content.find((b) => b.type === "tool_use");
  const result = await runTool(call.name, call.input);
  messages.push({
    role: "user",
    content: [{ type: "tool_result", tool_use_id: call.id, content: result }],
  });
  return client.messages.create({ model, max_tokens: 1024, tools, messages });
}
```

## Explanation

The loop is: Claude replies with `stop_reason: "tool_use"` and one or more `tool_use` blocks; you run each one; you send back Claude's turn unchanged plus a `user` turn holding one `tool_result` per call, matched by `tool_use_id`; repeat until the stop reason is `end_turn`. This code also handles only the first call. If Claude asks for several tools at once, each needs a result.
