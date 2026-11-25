---
title: "path.join vs path.resolve"
module: node
type: what-prints
source: "https://nodejs.org/api/path.html#pathresolvepaths"
tags: ["node", "path", "files"]
stack: ["nodedotjs"]
---

## Prompt

On Linux, what prints?

```js
import path from "node:path";

console.log(path.join("/srv/app", "/uploads", "a.png"));
console.log(path.resolve("/srv/app", "/uploads", "a.png"));
```

## Answer

```
/srv/app/uploads/a.png
/uploads/a.png
```

## Explanation

`join` glues the segments together and normalises the result, so the leading `/` on `/uploads` is just a separator. `resolve` works right to left until it has an absolute path, so `/uploads` starts again from the root. Neither one stops `..` from leaving a folder: `path.join("/srv/app", "../etc")` is `/srv/etc`, so check user-supplied paths after resolving them.
