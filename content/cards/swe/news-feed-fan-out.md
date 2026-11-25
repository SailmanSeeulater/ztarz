---
title: "News feed: fan-out on write or on read"
module: swe
type: out-loud
source: "https://highscalability.com/the-architecture-twitter-uses-to-deal-with-150m-active-users/"
tags: ["system-design", "interview", "feeds"]
---

## Prompt

You're designing the home feed for a social app. Do you build each user's feed when someone posts, or when the user opens the app? Talk it through.

## Model answer

**Fan-out on write (push).** When someone posts, write the post ID into a precomputed timeline for each follower, for example a capped list per user in Redis. Reading the feed is one fetch, then hydrate the IDs into posts from a cache. Reads are cheap, and feeds are read far more often than posts are written. The cost: one post makes as many writes as the author has followers. An account with 50 million followers turns one post into 50 million writes, and the last followers see it late.

**Fan-out on read (pull).** Store posts only by author. When a user opens the feed, fetch recent posts from everyone they follow and merge them. Writes are cheap and nothing is wasted on inactive users, but every feed load is a big scatter-gather, which is slow at scale.

**What I'd do: a hybrid.** Push for ordinary accounts; for accounts above a follower threshold, skip the fan-out and merge their recent posts in at read time. Most users follow only a few such accounts, so the merge stays small. Twitter described moving towards this, merging very large accounts' tweets in at read time.

**Details worth mentioning:** store IDs not full posts, so edits and deletes don't need rewriting; skip or lazily rebuild timelines for inactive users; cap timeline length; and apply ranking after the merge, not inside the fan-out.
