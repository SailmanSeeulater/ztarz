---
title: "srcset, sizes, width and loading on one img"
module: frontend
type: concept
source: "https://web.dev/learn/design/responsive-images"
tags: ["html", "images", "performance", "cls"]
stack: ["html5"]
---

## Prompt

What does each attribute do here?

```html
<img src="card-600.jpg" alt="Team at the offsite"
     srcset="card-300.jpg 300w, card-600.jpg 600w, card-1200.jpg 1200w"
     sizes="(min-width: 44em) 50vw, 100vw"
     width="600" height="400" loading="lazy">
```

## Answer

- `srcset` lists the files and their real widths.
- `sizes` says how wide the image will be shown at each breakpoint, so the browser can pick the smallest file that's sharp enough before the CSS has loaded.
- `width` and `height` give the aspect ratio, so space is reserved and nothing jumps when it loads (lower CLS).
- `loading="lazy"` defers images below the fold. Never use it on the hero image: that delays your LCP.
