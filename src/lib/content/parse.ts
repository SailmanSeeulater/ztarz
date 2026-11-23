import matter from "gray-matter";
import { Marked } from "marked";
import { REQUIRED_SECTIONS, frontMatterSchema, type Card } from "./schema";

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

  const { title, module, type, source, tags } = fm.data;
  return {
    id,
    title,
    module,
    type,
    source,
    tags,
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
