---
title: "express.static and the working directory"
module: express
type: concept
source: "https://expressjs.com/en/starter/static-files.html"
tags: ["express", "static-files"]
stack: ["express", "nodedotjs"]
---

## Prompt

`app.use(express.static("public"))` works locally but returns 404s in production, where the process starts from a different folder. Why, and how do you fix it?

## Answer

A relative path given to `express.static` is resolved from the directory where the Node process was launched, not from the file that calls it. Use an absolute path:

```js
import path from "node:path";

app.use("/static", express.static(path.join(import.meta.dirname, "public")));
```

The optional mount path (`/static`) is a URL prefix only; the folder name never appears in the URL. Put static middleware early so asset requests don't run through auth or body parsing.
