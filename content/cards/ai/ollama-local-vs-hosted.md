---
title: "Local model with Ollama vs a hosted API"
module: ai
type: comparison
source: "https://docs.ollama.com/faq"
tags: ["llm", "open-weight", "self-hosting"]
stack: ["ollama"]
---

## What it is

Ollama runs open-weight models on your own machine or server and serves them over a local HTTP API, including an OpenAI-compatible endpoint. A hosted API (Anthropic, OpenAI and others) runs the provider's models on their hardware.

## How it models the problem

You trade the provider's hardware and operations for your own. With Ollama you pick a model small enough for your GPU or RAM, it loads into memory on first use, and your box does the generating. With a hosted API you send a request and pay per token.

## Where it shines

- **Data stays local.** Ollama says it doesn't see your prompts or data when you run locally.
- **No per-token bill**, and it works offline. Good for prototyping, development, and batch jobs on hardware you already own.
- **Swappable:** the OpenAI-compatible endpoint lets the same client code point at local or hosted models.

## Where it bites

- **Capability:** models that fit on one machine are usually weaker than frontier hosted models. Measure the gap with your evals.
- **Defaults that surprise:** the context window defaults to 4,096 tokens, too small for many RAG prompts, so raise `num_ctx`, which costs memory.
- **Throughput:** by default many backends serve one request at a time per model (`OLLAMA_NUM_PARALLEL`), and models unload after five idle minutes, so the next request waits for a reload.
- **You run it:** GPUs, updates, scaling and uptime are now your job.

## What interviewers ask

"When would you self-host?" When data can't leave your network, volume is high and steady enough that hardware beats per-token pricing, or you need offline use, and only once evals show a local model is good enough.
