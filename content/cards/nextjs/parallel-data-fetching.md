---
title: "A page that waits on three fetches in a row"
module: nextjs
type: out-loud
source: "https://nextjs.org/docs/app/getting-started/fetching-data"
tags: ["nextjs", "data-fetching", "performance"]
stack: ["nextdotjs"]
---

## Prompt

An artist page awaits `getArtist`, then `getAlbums`, then `getTourDates`, each about 300 ms. It takes almost a second to show anything. How do you speed it up?

## Model answer

The requests don't depend on each other, but each `await` waits before starting the next, so it's a waterfall. I'd start them all at once and await them together:

```tsx
const [artist, albums, tours] = await Promise.all([
  getArtist(id), getAlbums(id), getTourDates(id),
]);
```

That brings it down to the slowest request. If one failing shouldn't break the page, I'd use `Promise.allSettled`. Better still for UX, I'd render the artist header as soon as it's ready and move the albums and tours into their own async components inside `<Suspense>`, so they stream in independently. If a request truly depends on another, such as needing the artist's id first, I'd keep that one sequential.
