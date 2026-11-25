/**
 * Reads content/cards/**\/*.md (public, in git) and content/private/**\/*.md (gitignored,
 * ids prefixed "private/"), validates each card, and writes src/generated/cards.json.
 * Card ids are file paths without ".md", so renaming a file is a deliberate act
 * (it orphans that card's review history).
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { CardError, slugify, parseCard, parseGlossary, parseLab, parseSolution } from "../src/lib/content/parse";
import type { Card, GlossaryTerm, Lab, Solution } from "../src/lib/content/schema";

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

// Glossary: content/glossary/<category>.yml, one list of terms per category.
const glossaryDir = join(root, "content", "glossary");
const glossary: GlossaryTerm[] = [];
if (existsSync(glossaryDir)) {
  for (const f of readdirSync(glossaryDir).filter((f) => f.endsWith(".yml")).sort()) {
    try {
      glossary.push(...parseGlossary(f.replace(/\.yml$/, ""), readFileSync(join(glossaryDir, f), "utf8")));
    } catch (e) {
      errors.push(e instanceof CardError ? e.message : `glossary ${f}: ${String(e)}`);
    }
  }
  const seen = new Map<string, string>();
  for (const t of glossary) {
    if (seen.has(t.id)) errors.push(`glossary: "${t.term}" appears twice (${seen.get(t.id)} and ${t.category})`);
    seen.set(t.id, t.category);
  }
  const ids = new Set(glossary.map((t) => t.id));
  for (const t of glossary) {
    const dangling = t.see.filter((s) => !ids.has(slugify(s)));
    if (dangling.length) errors.push(`glossary: "${t.term}" refers to missing terms: ${dangling.join(", ")}`);
  }
  glossary.sort((a, b) => a.term.localeCompare(b.term, "en", { sensitivity: "base" }));
}

// LeetCode solutions: content/solutions/NNNN-slug.md
const solutionsDir = join(root, "content", "solutions");
const solutions: Solution[] = [];
if (existsSync(solutionsDir)) {
  for (const f of readdirSync(solutionsDir).filter((f) => f.endsWith(".md")).sort()) {
    const id = f.replace(/\.md$/, "");
    try {
      const s = parseSolution(id, readFileSync(join(solutionsDir, f), "utf8"));
      if (!id.startsWith(String(s.number).padStart(4, "0") + "-")) errors.push(`solution ${id}: file name must start with ${String(s.number).padStart(4, "0")}-`);
      solutions.push(s);
    } catch (e) {
      errors.push(e instanceof CardError ? e.message : `solution ${id}: ${String(e)}`);
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
writeFileSync(join(root, "src", "generated", "glossary.json"), JSON.stringify(glossary, null, 2) + "\n");
writeFileSync(join(root, "src", "generated", "solutions.json"), JSON.stringify(solutions, null, 2) + "\n");
const priv = cards.filter((c) => c.id.startsWith("private/")).length;
console.log(
  `✓ ${cards.length} cards (${priv} private), ${labs.length} labs, ${glossary.length} glossary terms, ${solutions.length} solutions → ${relative(root, outFile)}`,
);
