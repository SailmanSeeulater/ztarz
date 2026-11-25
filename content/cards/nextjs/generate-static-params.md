---
title: "Prerendering dynamic routes"
module: nextjs
type: concept
source: "https://nextjs.org/docs/app/api-reference/functions/generate-static-params"
tags: ["nextjs", "routing", "prerendering"]
stack: ["nextdotjs"]
---

## Prompt

`app/blog/[slug]/page.tsx` renders posts from a CMS. How do you prerender the posts at build time, and what happens to a slug you didn't list?

## Answer

Export `generateStaticParams` from the page. It returns the param objects to build:

```tsx
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
```

You can return a partial list, such as the 100 most-read posts, and the rest render the first time someone visits them. To serve only the listed paths and 404 everything else, add `export const dynamicParams = false` (without Cache Components). With Cache Components enabled, `generateStaticParams` must return at least one param.
