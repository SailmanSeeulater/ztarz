import matter from "gray-matter";
import { Marked } from "marked";
import {
  GLOSSARY_CATEGORIES,
  LAB_SECTIONS,
  SOLUTION_SECTIONS,
  glossaryFileSchema,
  solutionFrontMatterSchema,
  type GlossaryCategory,
  type GlossaryTerm,
  type Solution,
  REQUIRED_SECTIONS,
  frontMatterSchema,
  labFrontMatterSchema,
  type Card,
  type Lab,
  type StackLogo,
} from "./schema";
import { resolveStack } from "./stack";

const md = new Marked({ gfm: true });
const render = (s: string) => md.parse(s.trim(), { async: false });
const renderInline = (s: string) => md.parseInline(s.trim(), { async: false });

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Split a Markdown body on `## ` headings, ignoring any inside fenced code. */
export function splitSections(body: string) {
  const sections: { heading: string; lines: string[] }[] = [];
  let inFence = false;
  for (const line of body.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    const h = !inFence && /^## (.+?)\s*$/.exec(line);
    if (h) sections.push({ heading: h[1], lines: [] });
    else sections.at(-1)?.lines.push(line);
  }
  return sections.map((s) => ({
    key: slugify(s.heading),
    heading: s.heading,
    markdown: s.lines.join("\n").trim(),
  }));
}

export class CardError extends Error {
  constructor(
    public cardId: string,
    message: string,
  ) {
    super(`${cardId}: ${message}`);
  }
}

/** Parse one card file. Throws CardError with every problem found. */
export function parseCard(id: string, raw: string): Card {
  const { data, content } = matter(raw);
  const fm = frontMatterSchema.safeParse(data);
  if (!fm.success) {
    const issues = fm.error.issues.map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`);
    throw new CardError(id, `invalid front-matter\n  - ${issues.join("\n  - ")}`);
  }

  if (fm.data.source.startsWith("notes:") && !id.startsWith("private/")) {
    throw new CardError(id, "notes: sources are only allowed in content/private (public cards cite a URL)");
  }

  const sections = splitSections(content);
  const keys = new Set(sections.map((s) => s.key));
  const dupes = sections.filter((s, i) => sections.findIndex((t) => t.key === s.key) !== i);
  if (dupes.length) throw new CardError(id, `duplicate sections: ${dupes.map((d) => d.heading).join(", ")}`);
  const missing = REQUIRED_SECTIONS[fm.data.type].filter((k) => !keys.has(k));
  if (missing.length) {
    throw new CardError(id, `type "${fm.data.type}" is missing sections: ${missing.map((k) => `## ${k}`).join(", ")}`);
  }
  const empty = sections.filter((s) => !s.markdown);
  if (empty.length) throw new CardError(id, `empty sections: ${empty.map((s) => s.heading).join(", ")}`);

  const unknown = fm.data.stack.filter((slug) => !resolveStack(slug));
  if (unknown.length) {
    throw new CardError(
      id,
      `unknown stack: ${unknown.join(", ")} (use a Simple Icons slug from https://simpleicons.org, or add it to LETTERED in stack.ts)`,
    );
  }

  const { title, module, type, source, tags } = fm.data;
  return {
    id,
    title,
    module,
    type,
    source,
    tags,
    stack: fm.data.stack.map((slug) => resolveStack(slug) as StackLogo),
    sections: sections.map((s) => ({ key: s.key, heading: s.heading, html: render(s.markdown) })),
    ...("choices" in fm.data && {
      choices: fm.data.choices.map((c) => ({
        html: renderInline(c.text),
        correct: c.correct,
        whyHtml: renderInline(c.why),
      })),
    }),
  };
}

/** Parse one lab file. Throws CardError (the id names the lab) with every problem found. */
export function parseLab(id: string, raw: string): Lab {
  const { data, content } = matter(raw);
  const fm = labFrontMatterSchema.safeParse(data);
  if (!fm.success) {
    const issues = fm.error.issues.map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`);
    throw new CardError(id, `invalid front-matter\n  - ${issues.join("\n  - ")}`);
  }
  for (const c of fm.data.checks) {
    try {
      new RegExp(c.pattern, "im");
    } catch (e) {
      throw new CardError(id, `check "${c.label}" has an invalid pattern: ${String(e)}`);
    }
  }
  const unknown = fm.data.stack.filter((slug) => !resolveStack(slug));
  if (unknown.length) throw new CardError(id, `unknown stack: ${unknown.join(", ")}`);

  const sections = splitSections(content);
  const missing = LAB_SECTIONS.filter((k) => !sections.some((s) => s.key === k));
  if (missing.length) throw new CardError(id, `missing sections: ${missing.map((k) => `## ${k}`).join(", ")}`);

  const { title, module, minutes, source, checks } = fm.data;
  return {
    id,
    title,
    module,
    minutes,
    source,
    checks,
    stack: fm.data.stack.map((slug) => resolveStack(slug) as StackLogo),
    sections: sections.map((s) => ({ key: s.key, heading: s.heading, html: render(s.markdown) })),
  };
}

const formatIssues = (issues: { path: PropertyKey[]; message: string }[]) =>
  issues.map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`).join("\n  - ");

/** Parse one glossary file (YAML, `terms:` list) for a category. */
export function parseGlossary(category: string, raw: string): GlossaryTerm[] {
  const id = `glossary/${category}`;
  if (!(category in GLOSSARY_CATEGORIES)) {
    throw new CardError(id, `unknown category (use one of ${Object.keys(GLOSSARY_CATEGORIES).join(", ")})`);
  }
  const { data } = matter(`---\n${raw}\n---\n`);
  const parsed = glossaryFileSchema.safeParse(data);
  if (!parsed.success) throw new CardError(id, `invalid file\n  - ${formatIssues(parsed.error.issues)}`);
  return parsed.data.terms.map((t) => {
    const unknown = t.stack.filter((slug) => !resolveStack(slug));
    if (unknown.length) throw new CardError(id, `${t.term}: unknown stack: ${unknown.join(", ")}`);
    return {
      id: slugify(t.term),
      term: t.term,
      ...(t.aka && { aka: t.aka }),
      category: category as GlossaryCategory,
      shortHtml: renderInline(t.short),
      ...(t.detail && { detailHtml: render(t.detail) }),
      ...(t.fun && { funHtml: renderInline(t.fun) }),
      source: t.source,
      stack: t.stack.map((slug) => resolveStack(slug) as StackLogo),
      see: t.see,
    };
  });
}

/** Parse one LeetCode solution walk-through. */
export function parseSolution(id: string, raw: string): Solution {
  const { data, content } = matter(raw);
  const fm = solutionFrontMatterSchema.safeParse(data);
  if (!fm.success) throw new CardError(id, `invalid front-matter\n  - ${formatIssues(fm.error.issues)}`);
  if (!/^https:\/\/leetcode\.com\/problems\/[a-z0-9-]+\/$/.test(fm.data.source)) {
    throw new CardError(id, "source must be the problem page, https://leetcode.com/problems/<slug>/");
  }
  const unknown = fm.data.stack.filter((slug) => !resolveStack(slug));
  if (unknown.length) throw new CardError(id, `unknown stack: ${unknown.join(", ")}`);
  const sections = splitSections(content);
  const missing = SOLUTION_SECTIONS.filter((k) => !sections.some((s) => s.key === k));
  if (missing.length) throw new CardError(id, `missing sections: ${missing.map((k) => `## ${k}`).join(", ")}`);
  return {
    id,
    ...fm.data,
    stack: fm.data.stack.map((slug) => resolveStack(slug) as StackLogo),
    sections: sections.map((s) => ({ key: s.key, heading: s.heading, html: render(s.markdown) })),
  };
}
