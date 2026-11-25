/**
 * Reads content/cards/**\/*.md (public, in git) and content/private/**\/*.md (gitignored,
 * ids prefixed "private/"), validates each card, and writes src/generated/cards.json.
 * Card ids are file paths without ".md", so renaming a file is a deliberate act
 * (it orphans that card's review history).
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { CardError, parseCard, parseLab } from "../src/lib/content/parse";
import type { Card, Lab } from "../src/lib/content/schema";

const root = join(import.meta.dirname, "..");
const outFile = join(root, "src", "generated", "cards.json");
const sources = [
  { dir: join(root, "content", "cards"), prefix: "" },
  { dir: join(root, "content", "private"), prefix: "private/" },
].filter((s) => existsSync(s.dir));

const files = sources.flatMap(({ dir, prefix }) =>
  readdirSync(dir, { recursive: true, encoding: "utf8" })
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((f) => ({ path: join(dir, f), id: prefix + f.replace(/\.md$/, "").split(sep).join("/") })),
);

const cards: Card[] = [];
const errors: string[] = [];
for (const { path, id } of files) {
  if (!/^[a-z0-9]+(?:[/-][a-z0-9]+)*$/.test(id)) {
    errors.push(`${id}: file paths must be lowercase-kebab (a-z, 0-9, -, /)`);
    continue;
  }
  try {
    cards.push(parseCard(id, readFileSync(path, "utf8")));
  } catch (e) {
    errors.push(e instanceof CardError ? e.message : `${id}: ${String(e)}`);
  }
}

// Labs: content/labs/*.md, all public.
const labsDir = join(root, "content", "labs");
const labs: Lab[] = [];
if (existsSync(labsDir)) {
  for (const f of readdirSync(labsDir).filter((f) => f.endsWith(".md")).sort()) {
    const id = f.replace(/\.md$/, "");
    try {
      labs.push(parseLab(id, readFileSync(join(labsDir, f), "utf8")));
    } catch (e) {
      errors.push(e instanceof CardError ? e.message : `lab ${id}: ${String(e)}`);
    }
  }
}

if (errors.length) {
  console.error(`✗ ${errors.length} invalid card(s):\n\n${errors.join("\n\n")}`);
  process.exit(1);
}

mkdirSync(join(root, "src", "generated"), { recursive: true });
writeFileSync(outFile, JSON.stringify(cards, null, 2) + "\n");
writeFileSync(join(root, "src", "generated", "labs.json"), JSON.stringify(labs, null, 2) + "\n");
const priv = cards.filter((c) => c.id.startsWith("private/")).length;
console.log(`✓ ${cards.length} cards (${priv} private), ${labs.length} labs → ${relative(root, outFile)}`);
