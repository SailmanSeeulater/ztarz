/** One searchable thing in the library: a card, a glossary term or a LeetCode solution. */
export type SearchItem = {
  kind: "card" | "term" | "solution";
  href: string;
  title: string;
  /** Shown under the title: the module, "Glossary", or the solution's patterns. */
  context: string;
  /** Extra words that should match but aren't shown: tags, aliases, stack names. */
  extra: string;
};

const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9+#. ]+/g, " ");

/**
 * Every word of the query must appear somewhere in the item. Title matches rank first
 * (a title that starts with the query highest), then context, then hidden words.
 */
export function searchLibrary(items: readonly SearchItem[], query: string, limit = 40): SearchItem[] {
  const words = norm(query).split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];
  const q = words.join(" ");
  const scored: { item: SearchItem; score: number; i: number }[] = [];
  items.forEach((item, i) => {
    const title = norm(item.title);
    const context = norm(item.context);
    const all = `${title} ${context} ${norm(item.extra)}`;
    if (!words.every((w) => all.includes(w))) return;
    let score = 0;
    if (title === q) score += 100;
    else if (title.startsWith(q)) score += 60;
    else if (title.includes(q)) score += 40;
    score += words.filter((w) => title.includes(w)).length * 10;
    score += words.filter((w) => context.includes(w)).length * 3;
    if (item.kind === "term" && title.startsWith(q)) score += 15; // "dns" → the definition first
    scored.push({ item, score, i });
  });
  return scored
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .slice(0, limit)
    .map((s) => s.item);
}
