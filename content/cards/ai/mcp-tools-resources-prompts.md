---
title: "MCP: tools, resources and prompts"
module: ai
type: mcq
source: "https://modelcontextprotocol.io/docs/learn/server-concepts"
tags: ["mcp", "tool-use", "agents"]
stack: ["modelcontextprotocol"]
choices:
  - text: "All three are called by the model whenever it decides they're useful"
    why: "Only tools are model-controlled. Resources and prompts are pulled in by the app or picked by the user."
  - text: "Tool: the user runs it. Resource: the model fetches it. Prompt: the app injects it"
    why: "The roles are shuffled. Prompts are the user-invoked ones, often shown as slash commands."
  - text: "Resources can write data; tools are read-only lookups"
    why: "It's the other way round. Resources are read-only context; tools perform actions such as writing to a database or calling an API."
  - text: "Tool: the model decides when to call it. Resource: the app decides what to load into context. Prompt: the user invokes it explicitly"
    correct: true
    why: "Because tools act on the world, the host app can add approval dialogs, per-tool permissions and activity logs around them."
---

## Prompt

An MCP server exposes a `create_ticket` tool, a read-only `schema://tickets` resource and a `triage` prompt template. Who controls each one?
