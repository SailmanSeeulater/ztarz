---
title: "When a trie beats a hash map"
module: f5
type: out-loud
source: "https://en.wikipedia.org/wiki/Trie"
tags: ["data-structures", "trie", "hashing", "strings"]
---

## Prompt

You're building search-as-you-type over a list of product names. When would you use a trie instead of a hash map, and what does it cost you?

## Model answer

A trie is a tree where each edge is one character, so every key that shares a prefix shares a path from the root. Looking up a key of length m takes O(m) steps however many keys are stored, and there are no hash collisions.

A hash map answers "is this exact key present?" very well, but it can't answer "which keys start with `lap`?" without scanning every key. A trie can: walk down three characters, then everything below that node is a match. Walking the children in alphabetical order also gives the matches already sorted. So I'd reach for a trie for autocomplete and prefix filters.

The cost is memory. A basic trie stores a node per character with child pointers, which can be far heavier than a hash map holding the same strings. Compressed tries, which merge chains of single-child nodes, cut that down. For plain exact-match lookups I'd stick with a hash map.
