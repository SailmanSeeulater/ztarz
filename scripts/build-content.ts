/**
 * Reads content/cards/**\/*.md, validates each card, and writes src/generated/cards.json.
 * Card ids are file paths without ".md", so renaming a file is a deliberate act
 * (it orphans that card's review history).
 */
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { CardError, parseCard } from "../src/lib/content/parse";
import type { Card } from "../src/lib/content/schema";

const root = join(import.meta.dirname, "..");
const cardsDir = join(root, "content", "cards");
const outFile = join(root, "src", "generated", "cards.json");

const files = readdirSync(cardsDir, { recursive: true, encoding: "utf8" })
  .filter((f) => f.endsWith(".md"))
  .sort();

const cards: Card[] = [];
const errors: string[] = [];
for (const file of files) {
  const id = relative(cardsDir, join(cardsDir, file)).replace(/\.md$/, "").split(sep).join("/");
  if (!/^[a-z0-9]+(?:[/-][a-z0-9]+)*$/.test(id)) {
    errors.push(`${id}: file paths must be lowercase-kebab (a-z, 0-9, -, /)`);
    continue;
  }
  try {
    cards.push(parseCard(id, readFileSync(join(cardsDir, file), "utf8")));
  } catch (e) {
    errors.push(e instanceof CardError ? e.message : `${id}: ${String(e)}`);
  }
}

if (errors.length) {
  console.error(`✗ ${errors.length} invalid card(s):\n\n${errors.join("\n\n")}`);
  process.exit(1);
}

mkdirSync(join(root, "src", "generated"), { recursive: true });
writeFileSync(outFile, JSON.stringify(cards, null, 2) + "\n");
console.log(`✓ ${cards.length} cards → ${relative(root, outFile)}`);
