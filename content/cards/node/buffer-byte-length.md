---
title: "Characters vs bytes"
module: node
type: what-prints
source: "https://nodejs.org/api/buffer.html#static-method-bufferbytelengthstring-encoding"
tags: ["node", "buffer", "utf-8"]
stack: ["nodedotjs"]
---

## Prompt

What prints?

```js
const s = "héllo";
console.log(s.length, Buffer.from(s).length);
```

## Answer

`5 6`

## Explanation

`s.length` counts UTF-16 code units, so 5. `Buffer.from(s)` encodes as UTF-8 by default, where `é` takes 2 bytes, so 6. Anything measured in bytes, like a `Content-Length` header or a size limit, needs `Buffer.byteLength(s)`, not `s.length`.
