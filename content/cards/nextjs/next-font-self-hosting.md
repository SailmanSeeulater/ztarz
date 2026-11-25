---
title: "What next/font does with Google Fonts"
module: nextjs
type: concept
source: "https://nextjs.org/docs/app/getting-started/fonts"
tags: ["nextjs", "fonts", "performance", "privacy"]
stack: ["nextdotjs"]
---

## Prompt

Why use `next/font/google` instead of a `<link>` to fonts.googleapis.com?

## Answer

```tsx
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

<body className={inter.className}>...</body>
```

`next/font` downloads the font at build time and serves it as a static asset from your own domain, so the visitor's browser never requests anything from Google. That removes an extra connection to another origin, avoids sending user IPs to a third party, and it sets up the font to load with no layout shift. `next/font/local` does the same for your own font files.
