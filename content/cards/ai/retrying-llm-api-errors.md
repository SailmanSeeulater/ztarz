---
title: "A retry loop that makes outages worse"
module: ai
type: bug-hunt
source: "https://platform.claude.com/docs/en/api/errors#retries"
tags: ["llm", "api", "retries", "rate-limits"]
stack: ["anthropic"]
choices:
  - text: "Remove the sleep so it recovers faster once capacity returns"
    why: "Retrying with no delay hammers an API that's already overloaded or rate-limiting you."
  - text: "Rotate to a different API key on each retry to get around the limit"
    why: "Rate limits apply to your organisation, not to a single key. And dodging limits isn't a fix."
  - text: "Catch only 400 errors, since those are the temporary ones"
    why: "A 400 means the request itself is wrong. Sending it again gets the same answer."
  - text: "It retries every error forever at a fixed interval. Retry only retryable errors (429, 5xx including 529 overloaded, timeouts, dropped connections), honour `retry-after`, back off exponentially, and cap the attempts"
    correct: true
    why: "The SDK already retries twice by default with backoff and follows `retry-after` and `x-should-retry`. Wrapping it in another endless loop multiplies the attempts."
---

## Prompt

During a traffic spike this made things worse, and one bad request hung a worker forever. What's wrong?

```ts
async function callWithRetry(params) {
  for (;;) {
    try {
      return await client.messages.create(params);
    } catch {
      await sleep(1000);
    }
  }
}
```

## Explanation

Sort errors into "fix the request" (400, 401, 403, 413) and "try again later" (429, 500, 529, timeouts). For the second kind, wait as long as `retry-after` says or back off exponentially, and give up after a few attempts with a clear error. A 429 caused by a spend cap keeps failing until access resumes, which is one more reason to limit retries.
