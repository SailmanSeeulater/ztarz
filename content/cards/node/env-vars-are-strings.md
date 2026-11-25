---
title: "FEATURE=false turns the feature on"
module: node
type: bug-hunt
source: "https://nodejs.org/api/process.html#processenv"
tags: ["node", "config", "environment"]
stack: ["nodedotjs"]
choices:
  - text: "`dotenv` wasn't loaded, so the variable is undefined"
    why: "If it were undefined the check would be falsy and the feature would stay off."
  - text: "Environment variables are always strings, and `\"false\"` is a non-empty string, so it's truthy"
    correct: true
    why: "Parse config once at startup: `process.env.NEW_CHECKOUT === \"true\"`, `Number(process.env.PORT)`, or a schema such as Zod that fails fast on bad values."
  - text: "`process.env` is only read once at startup, so the old value stuck"
    why: "It's a live object, and the value here is the one the process was started with anyway."
  - text: "Shells uppercase the value, so it arrives as `FALSE`"
    why: "Shells pass values through unchanged. Either spelling would still be a truthy string."
---

## Prompt

The service is started with `NEW_CHECKOUT=false node server.js`, yet the new checkout is live. Why?

```js
if (process.env.NEW_CHECKOUT) {
  app.use("/checkout", newCheckout);
} else {
  app.use("/checkout", oldCheckout);
}
```

## Explanation

Every value in `process.env` is a string, and even assigning a number converts it (`process.env.X = 1` gives `"1"`). So only an unset variable or an empty string is falsy. Convert types explicitly in one config module instead of testing raw env values across the codebase.
